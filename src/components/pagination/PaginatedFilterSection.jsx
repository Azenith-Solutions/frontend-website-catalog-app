import React, { useState, useMemo } from 'react';
import PaginationCatalog from './PaginationCatalog';
import { Container, Box, Slider, Dialog, IconButton, Button, Chip, InputAdornment, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './PaginatedFilterSection.css';

function PaginatedFilterSection({ filters, CardComponent, priceFilterEnabled }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Estado para edição (UI)
  const [editState, setEditState] = useState({
    selectedFilter: filters[0]?.id ?? 0,
    priceRange: [0, 100],
    searchValue: '',
  });

  // Estado para filtros aplicados
  const [filterState, setFilterState] = useState({
    selectedFilter: filters[0]?.id ?? 0,
    priceRange: [0, 100],
    searchValue: '',
    filterUri: {},
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Atualiza apenas o estado de edição
  const updateEditState = (key, value) => {
    setEditState((prev) => ({ ...prev, [key]: value }));
  };

  // Aplica os filtros do estado de edição
  const applyFilters = () => {
    setFilterState((prev) => ({
      ...prev,
      selectedFilter: editState.selectedFilter,
      priceRange: editState.priceRange,
      searchValue: editState.searchValue,
      filterUri: {
        search: editState.searchValue,
        filter: editState.selectedFilter,
      },
    }));
    setIsSidebarOpen(false);
  };

  // Limpa os filtros
  const clearFilters = () => {
    setEditState({
      selectedFilter: filters[0]?.id ?? 0,
      priceRange: [0, 100],
      searchValue: '',
    });
    setFilterState({
      selectedFilter: filters[0]?.id ?? 0,
      priceRange: [0, 100],
      searchValue: '',
      filterUri: {},
    });
  };

  // Função para contar filtros aplicados
  const countAppliedFilters = () => {
    let count = 0;
    if (editState.selectedFilter !== filters[0]?.id) count++;
    if (filterState.searchValue && filterState.searchValue.trim() !== '') count++;
    if (filterState.priceRange[0] !== 0 || filterState.priceRange[1] !== 100) count++;
    return count;
  };

  // Função para remover filtros individualmente
  const handleRemoveFilter = (filterType) => {
    if (filterType === 'categoria') {
      setEditState((prev) => ({ ...prev, selectedFilter: filters[0]?.id ?? 0 }));
      setFilterState((prev) => ({
        ...prev,
        selectedFilter: filters[0]?.id ?? 0,
        filterUri: { ...prev.filterUri, filter: filters[0]?.id ?? 0 },
      }));
    }
    if (filterType === 'search') {
      setEditState((prev) => ({ ...prev, searchValue: '' }));
      setFilterState((prev) => ({
        ...prev,
        searchValue: '',
        filterUri: { ...prev.filterUri, search: '' },
      }));
    }
    if (filterType === 'price') {
      setFilterState((prev) => ({
        ...prev,
        priceRange: [0, 100],
      }));
    }
  };

  // Verifica se editState é diferente de filterState (ou seja, houve alteração)
  const isDirty = useMemo(() => {
    return (
      editState.selectedFilter !== filterState.selectedFilter ||
      editState.searchValue !== filterState.searchValue ||
      editState.priceRange[0] !== filterState.priceRange[0] ||
      editState.priceRange[1] !== filterState.priceRange[1]
    );
  }, [editState, filterState]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '20px',
        maxWidth: { lg: '1600px' },
      }}
    >
      {/* Sidebar */}
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
              <span>R$ {editState.priceRange[0]}</span>
              <span>R$ {editState.priceRange[1]}</span>
            </p>
            <Slider
              value={editState.priceRange}
              onChange={(e, value) => updateEditState('priceRange', value)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              step={10}
              sx={{ color: '#67121B' }}
            />
          </div>
        )}

        <TextField
          fullWidth
          placeholder="Buscar..."
          value={editState.searchValue}
          onChange={e => {
            const value = e.target.value;
            updateEditState('searchValue', value);
            // Se limpar, limpa também o filtro aplicado
            if (value === '') {
              setFilterState((prev) => ({
                ...prev,
                searchValue: '',
                filterUri: { ...prev.filterUri, search: '' },
              }));
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {editState.searchValue ? (
                  <IconButton
                    aria-label="Limpar busca"
                    onClick={() => {
                      updateEditState('searchValue', '');
                      setFilterState((prev) => ({
                        ...prev,
                        searchValue: '',
                        filterUri: { ...prev.filterUri, search: '' },
                      }));
                    }}
                    edge="end"
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                ) : (
                  <SearchIcon color="action" />
                )}
              </InputAdornment>
            ),
          }}
          size="small"
          sx={{ mb: 2 }}
        />

        <ul className="pfs-filter-list">
          {filters.map((filter) => (
            <li
              key={filter.id}
              onClick={() => updateEditState('selectedFilter', filter.id)}
              className={`pfs-filter-item${editState.selectedFilter === filter.id ? ' pfs-filter-item--active' : ''}`}
            >
              {filter.categoria}
            </li>
          ))}
        </ul>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            fullWidth
            variant="contained"
            onClick={applyFilters}
            disabled={!isDirty}
            sx={{ marginTop: '20px', backgroundColor: '#67121B', color: '#fff' }}
          >
            Aplicar Filtros
          </Button>
        </Box>
      </Box>

      {/* Main content in column */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {filterState.selectedFilter !== filters[0]?.id && (
            <Chip
              label={
                filters.find(f => f.id === filterState.selectedFilter)?.categoria || 'Categoria'
              }
              onDelete={() => handleRemoveFilter('categoria')}
              color="primary"
              variant="outlined"
            />
          )}
          {filterState.searchValue && filterState.searchValue.trim() !== '' && (
            <Chip
              label={`Busca: "${filterState.searchValue}"`}
              onDelete={() => handleRemoveFilter('search')}
              color="primary"
              variant="outlined"
            />
          )}
          {(filterState.priceRange[0] !== 0 || filterState.priceRange[1] !== 100) && (
            <Chip
              label={`Preço: R$${filterState.priceRange[0]} - R$${filterState.priceRange[1]}`}
              onDelete={() => handleRemoveFilter('price')}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        <PaginationCatalog
          filter={filterState.selectedFilter}
          priceRange={filterState.priceRange}
          CardComponent={CardComponent}
          filterUri={filterState.filterUri}
        />
      </Box>
    </Container>
  );
}

export default PaginatedFilterSection;
