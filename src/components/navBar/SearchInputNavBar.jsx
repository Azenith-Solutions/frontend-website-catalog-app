import React from 'react'
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

function SearchInputNavBar() {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: '35px',
        backgroundColor: '#fff',
        '&:focus-within': {
            outline: '2px solid #fff',
            outlineOffset: '5px',
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        flex: 1,
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(3),
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
            transition: theme.transitions.create('width')
        },
    }));

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon sx={{ fontSize: '24px' }} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}

export default SearchInputNavBar