import * as React from 'react';
import './NavBarCatalog.css'
import SearchInputNavBar from '../navBar/SearchInputNavBar';
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

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{
        backgroundColor: '#5F1516',
        position: { xs: 'fixed', md: 'fixed' }
      }}>
        <ContainerStyled>
          
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: '10px' }}>
            <img src={LogoWhite} alt="" style={{ height: '50px' }} />
          </Box>
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center', gap: '10px'
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
            <IconButton className='cart-button' sx={{
              padding: '10px',
              color: '#fff',
              textTransform: 'none',
              fontWeight: '400',
            }}>
              <ShoppingCart sx={{ fontSize: '35px', cursor: 'pointer' }} />
              <CartBadge badgeContent={2} color="primary" overlap="circular" />
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
          display: { xs: 'none', md: 'block', top: '100px' }
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
                <Button key={item} className='items items-animation' sx={{
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: '400'
                }}>
                  {item}
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
    </Box>
  );
}

export default DrawerAppBar;