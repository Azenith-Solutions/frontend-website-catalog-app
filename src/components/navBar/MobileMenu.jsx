import React from 'react'

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import LogoWhite from '../../assets/hardwareTech/WhiteLogo/SIMBOLO.png';
import LogoNomeWhite from '../../assets/hardwareTech/WhiteLogo/NOME.png';

export default function MobileMenu(props) {
    const drawerWidth = 240;
    const { container, menuItems, redirectButtonName, handleDrawerToggle, mobileOpen } = props;

    // Menu lateral
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center', gap: '10px',
                padding: '10px 0 10px 10px',
                backgroundColor: '#5F1516',
            }}>
                <img src={LogoWhite} alt="" style={{ height: '30px' }} />
                <img className='logo-name-hardwareTech' src={LogoNomeWhite} alt="" style={{ height: '10px' }} />
            </div>
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'start' }}>
                        <ListItemText primary={redirectButtonName} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                {menuItems.map((item) => (
                    <>
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'start' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                        <Divider />
                    </>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth
                },
            }}
        >
            {drawer}
        </Drawer>
    )
}
