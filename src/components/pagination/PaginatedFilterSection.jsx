import React, { useState } from 'react';
import PaginationCatalog from './PaginationCatalog';
import { Container, Box, Slider, Dialog, IconButton, Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function PaginatedFilterSection({ filters, CardComponent, priceFilterEnabled, uriEndPoint }) {
  // Estados principais
  const [selectedFilter, setSelectedFilter] = useState(filters[0].value); // Filtro principal
  const [priceRange, setPriceRange] = useState([0, 100]); // Faixa de preço principal

  // Estados temporários para alterações
  const [tempSelectedFilter, setTempSelectedFilter] = useState(selectedFilter);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);

  // Estado para abrir/fechar o Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = (open) => () => {
    setIsDialogOpen(open);
  };

  const handleTempPriceChange = (event, newValue) => {
    setTempPriceRange(newValue); // Atualiza o estado temporário
  };

  const handleTempFilterChange = (filterValue) => {
    setTempSelectedFilter(filterValue); // Atualiza o estado temporário
  };

  const applyFilters = () => {
    setSelectedFilter(tempSelectedFilter); // Aplica o filtro temporário ao principal
    setPriceRange(tempPriceRange); // Aplica a faixa de preço temporária ao principal
    setIsDialogOpen(false); // Fecha o Dialog
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
      {/* Botão para abrir o Dialog em resoluções menores */}
      <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <h3 style={{ fontSize: '20px' }}>Categorias/Filtros</h3>
        <IconButton
          color="inherit"
          aria-label="open filters"
          edge="start"
          onClick={toggleDialog(true)}
          sx={{ display: { md: 'none' } }}
        >
          <FilterAltIcon />
        </IconButton>
      </Box>

      {/* Sidebar de Filtros para resoluções maiores */}
      <Box
        sx={{
          width: '250px',
          padding: '15px',
          borderRight: '1px solid #ccc',
          display: { xs: 'none', md: 'block' }, // Esconde em resoluções menores
        }}
      >
        <h3 style={{ marginBottom: '30px', fontSize: '20px' }}>Categorias/Filtros</h3>

        {/* Filtro de Preço */}
        {priceFilterEnabled && (
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Preço</h4>
            <p style={{ fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
              <span>R$ {tempPriceRange[0]}</span>
              <span>R$ {tempPriceRange[1]}</span>
            </p>
            <Slider
              value={tempPriceRange} // Usa o estado temporário
              onChange={handleTempPriceChange} // Atualiza o estado temporário
              valueLabelDisplay="auto"
              min={0}
              max={100}
              step={10}
              sx={{ color: '#67121B' }}
            />
          </div>
        )}

        {/* Lista de Filtros */}
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '30px', listStyle: 'none' }}>
          {filters.map((filter) => (
            <li
              key={filter.value}
              onClick={() => handleTempFilterChange(filter.value)} // Atualiza o estado temporário
              style={{
                paddingLeft: '10px',
                fontSize: '18px',
                cursor: 'pointer',
                borderLeft: tempSelectedFilter === filter.value ? '5px solid #67121B' : 'none',
              }}
            >
              {filter.label}
            </li>
          ))}
        </ul>

        {/* Botão Aplicar Filtros */}
        <Button
          variant="contained"
          onClick={applyFilters} // Aplica os filtros ao clicar
          sx={{
            marginTop: '30px',
            backgroundColor: '#67121B',
            color: '#fff',
          }}
        >
          Aplicar Filtros
        </Button>
      </Box>

      {/* Dialog para resoluções menores */}
      <Dialog open={isDialogOpen} onClose={toggleDialog(false)} fullWidth>
        <Box
          sx={{
            padding: '20px',
          }}
        >
          <h3 style={{ marginBottom: '30px', fontSize: '20px' }}>Categorias/Filtros</h3>

          {/* Filtro de Preço */}
          {priceFilterEnabled && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Preço</h4>
              <p style={{ fontSize: '14px', display: 'flex', justifyContent: 'space-between' }}>
                <span>R$ {tempPriceRange[0]}</span>
                <span>R$ {tempPriceRange[1]}</span>
              </p>
              <Slider
                value={tempPriceRange}
                onChange={handleTempPriceChange} // Atualiza o estado temporário
                valueLabelDisplay="auto"
                min={0}
                max={100}
                step={10}
                sx={{ color: '#67121B' }}
              />
            </div>
          )}

          {/* Lista de Filtros */}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '30px', listStyle: 'none' }}>
            {filters.map((filter) => (
              <li
                key={filter.value}
                onClick={() => handleTempFilterChange(filter.value)} // Atualiza o estado temporário
                style={{
                  paddingLeft: '10px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  borderLeft: tempSelectedFilter === filter.value ? '5px solid #67121B' : 'none',
                }}
              >
              {filter.label}
              </li>
            ))}
          </ul>

          {/* Botão Aplicar Filtros */}
          <Button
            variant="contained"
            onClick={applyFilters}
            sx={{
              marginTop: '20px',
              backgroundColor: '#67121B',
              color: '#fff',
            }}
          >
            Aplicar Filtros
          </Button>
        </Box>
      </Dialog>

      {/* Componente de Paginação */}
      <PaginationCatalog
        filter={selectedFilter} // Passa o filtro selecionado
        priceRange={priceRange} // Passa a faixa de preço selecionada
        CardComponent={CardComponent} // Passa o componente de cartão
        uriEndPoint={uriEndPoint} // Passa o endpoint da API
      />
    </Container>
  );
}

export default PaginatedFilterSection;