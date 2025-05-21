import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBarCatalog.css';
import MobileMenu from './MobileMenu';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { ShoppingCart } from '@mui/icons-material'
import Badge, { badgeClasses } from '@mui/material/Badge';
import LogoWhite from '../../assets/hardwareTech/WhiteLogo/SIMBOLO.png';
import LogoNomeWhite from '../../assets/hardwareTech/WhiteLogo/NOME.png';
import { getListOfItemsFromLocalStorage } from '../../utils/storage/storage';

const navItems = ['Componentes', 'Mais vendidos', 'Promoções', 'Novidades'];
const ContainerStyled = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100px',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1600px',
  },
}))

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -25px;
    right: -10px;
    transform: scale(1.2); /* Aumenta o tamanho da notificação */
  }
`;


function DrawerAppBar(props) {
  const { window, menuItems, redirectButtonName } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();



  const handleNavigation = (path) => {
    setMobileOpen(false);

    navigate(path);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  // Contador de itens no carrinho
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(getListOfItemsFromLocalStorage().length);

  // Atualizar o contador sempre que houver mudanças no localStorage
  useEffect(() => {
    // Função para atualizar o contador
    function updateCartCount() {
      setNumberOfItemsInCart(getListOfItemsFromLocalStorage().length);
    }

    // Inicializa contador na montagem
    updateCartCount();

    // Adiciona event listener para o evento 'storage'
    window.addEventListener('storage', updateCartCount);

    // Adiciona um intervalo para verificar periodicamente por mudanças
    const intervalId = setInterval(updateCartCount, 1000);

    // Cleanup na desmontagem do componente
    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar component="nav" sx={{
        backgroundColor: '#5F1516',
        position: 'static',
      }}>
        <ContainerStyled>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: '10px' }}>
            <img src={LogoWhite} alt="" style={{ height: '50px' }} />
          </Box>
          <Box
            onClick={() => handleNavigation('/catalogPage')}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center', gap: '10px',
              cursor: 'pointer'
            }}>
            <img src={LogoWhite} alt="" style={{ height: '50px' }} />
            <img className='logo-name-hardwareTech' src={LogoNomeWhite} alt="" style={{ height: '20px' }} />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            gap: '20px',
            width: '600px'
          }}>
            {/* <SearchInputNavBar /> */}
            <IconButton className='cart-button'
              onClick={() => handleNavigation("/cart")}
              sx={{
                padding: '10px',
                color: '#fff',
                textTransform: 'none',
                fontWeight: '400',
              }}>
              <ShoppingCart sx={{ fontSize: '35px', cursor: 'pointer' }} />
              <CartBadge badgeContent={numberOfItemsInCart && numberOfItemsInCart} color="primary" overlap="circular" />
            </IconButton>
            {menuItems && menuItems.length > 0 && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

        </ContainerStyled>
      </AppBar>
      {menuItems && menuItems.length > 0 && (
        <AppBar component="nav" sx={{
          backgroundColor: '#4F1516',
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: '0',
        }}>
          <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px'
          }}>
            <Box sx={{
              display: { xs: 'none', sm: 'flex' }, gap: '40px'
            }}>
              {menuItems.map((item) => (
                <Button
                  key={item.title}
                  onClick={() => {
                    const section = document.getElementById(item.anchor); // Obtém o elemento pelo ID
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a seção
                    }
                  }}
                  className="items items-animation"
                  sx={{
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: '400',
                  }}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          </Container>
        </AppBar>
      )}
      <nav>
        <MobileMenu
          container={container}
          menuItems={menuItems}
          redirectButtonName={redirectButtonName}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
      </nav>
    </>
  );
}

export default DrawerAppBar;