import React, { useState } from 'react';
import PaginationCatalog from './PaginationCatalog';
import { Container, Box, Slider, Dialog, IconButton, Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInputNavBar from '../navBar/SearchInputNavBar';
import './PaginatedFilterSection.css';

function PaginatedFilterSection({ filters, CardComponent, priceFilterEnabled }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filterState, setFilterState] = useState({
    selectedFilter: filters[0].value,
    priceRange: [0, 100],
    searchValue: '',
    filterUri: {},
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const updateFilterState = (key, value) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilterState((prev) => ({
      ...prev,
      filterUri: {
        search: prev.searchValue,
        filter: prev.selectedFilter,
      },
    }));
    console.log('Filters applied:', filterState);
    setIsSidebarOpen(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '20px',
        maxWidth: { lg: '1600px' },
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <h3 className="pfs-title">Categorias/Filtros</h3>
        <IconButton onClick={toggleSidebar}>
          <FilterAltIcon />
        </IconButton>
      </Box>

      <Box
        className={`pfs-sidebar ${isSidebarOpen ? 'pfs-sidebar--open' : ''}`}
        sx={{
          width: { xs: '60%', md: '250px' },
          position: { xs: 'fixed', md: 'static' },
          top: 0,
          left: 0,
          height: '100%',
          backgroundColor: '#fff',
          zIndex: 1,
          transform: { xs: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', md: 'none' },
          transition: 'transform 0.3s ease-in-out',
          padding: '20px',
          borderRight: { md: '1px solid #ccc' },
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        {isSidebarOpen && (
          <IconButton onClick={toggleSidebar} sx={{ alignSelf: 'flex-end', display: { md: 'none' } }}>
            X
          </IconButton>
        )}

        <h3 className="pfs-title pfs-sidebar-title">Categorias/Filtros</h3>

        {priceFilterEnabled && (
          <div>
            <h4 className="pfs-price-title">Preço</h4>
            <p className="pfs-price-range">
              <span>R$ {filterState.priceRange[0]}</span>
              <span>R$ {filterState.priceRange[1]}</span>
            </p>
            <Slider
              value={filterState.priceRange}
              onChange={(e, value) => updateFilterState('priceRange', value)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              step={10}
              sx={{ color: '#67121B' }}
            />
          </div>
        )}

        <SearchInputNavBar
          value={filterState.searchValue}
          setSearchValue={(value) => updateFilterState('searchValue', value)}
        />

        <ul className="pfs-filter-list">
          {filters.map((filter) => (
            <li
              key={filter.value}
              onClick={() => updateFilterState('selectedFilter', filter.value)}
              className={`pfs-filter-item${filterState.selectedFilter === filter.value ? ' pfs-filter-item--active' : ''}`}
            >
              {filter.label}
            </li>
          ))}
        </ul>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={applyFilters}
            sx={{ marginTop: '20px', backgroundColor: '#67121B', color: '#fff' }}
          >
            Aplicar Filtros
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setFilterState({
              selectedFilter: filters[0].value,
              priceRange: [0, 100],
              searchValue: '',
              filterUri: {},
            })}
            sx={{ borderColor: '#67121B', color: '#67121B' }}
          >
            Limpar Filtros
          </Button>
        </Box>
      </Box>

      <PaginationCatalog
        filter={filterState.selectedFilter}
        priceRange={filterState.priceRange}
        CardComponent={CardComponent}
        filterUri={filterState.filterUri}
      />
    </Container>
  );
}

export default PaginatedFilterSection;
