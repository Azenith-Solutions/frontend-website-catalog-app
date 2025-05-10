import React from 'react'
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

function SearchInputNavBar() {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: '35px',
        backgroundColor: '#fff',
        marginLeft: 0,
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adiciona sombra ao input
        [theme.breakpoints.down('md')]: {
            backgroundColor: '#f2f2f2', // Change to gray on mobile
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        right: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: '#000',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(1)})`,
            paddingRight: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
        },
    }));

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon sx={{ fontSize: '24px' }} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Pesquisar..."
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
}

export default SearchInputNavBar;