import * as React from 'react';
import SearchInputNavBar from '../navBar/SearchInputNavBar';
import MobileMenu from './MobileMenu';

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';


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


function DrawerAppBar(props) {
  const { window, menuItems, redirectButtonName  } = props;
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center', gap: '10px'
          }}>
            <img src={LogoWhite} alt="" style={{ height: '50px' }} />
            <img className='logo-name-hardwareTech' src={LogoNomeWhite} alt="" style={{ height: '20px' }} />
          </Box>
          <SearchInputNavBar />
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: '10px' }}>
            <img src={LogoWhite} alt="" style={{ height: '50px' }} />
          </Box>
          <Button sx={{
            color: '#fff',
            display: { xs: 'none', md: 'flex' },
            padding: '10px 4rem',
            border: '1px solid #fff',
            borderRadius: '62px',
            textTransform: 'none'
          }}>
            {redirectButtonName}
          </Button>
        </ContainerStyled>
      </AppBar>
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
              <Button key={item} sx={{
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
      <nav>
       <MobileMenu
        container={container}
        menuItems={navItems}
        redirectButtonName={redirectButtonName}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
       />
      </nav>
    </Box>
  );
}

export default DrawerAppBar;