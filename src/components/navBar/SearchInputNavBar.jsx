import React from 'react';

function SearchInputNavBar(props) {
    
    const styles = {
        search: {
            position: 'relative',
            borderRadius: '35px',
            backgroundColor: '#fff',
            marginLeft: 0,
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        },
        searchIconWrapper: {
            padding: '0 16px',
            height: '100%',
            position: 'absolute',
            right: 0,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
        },
        input: {
            color: '#000',
            width: '100%',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '16px',
            padding: '8px 40px 8px 12px',
            borderRadius: '35px',
            boxSizing: 'border-box',
            transition: 'width 0.2s',
        }
    };

    return (
        <div style={styles.search}>
            <input
                type="text"
                placeholder="Pesquisar..."
                aria-label="search"
                value={props.value}
                onChange={e => props.setSearchValue(e.target.value)}
                style={styles.input}
            />
            <div style={styles.searchIconWrapper}>
                {/* SVG de lupa */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>
        </div>
    );
}

export default SearchInputNavBar;