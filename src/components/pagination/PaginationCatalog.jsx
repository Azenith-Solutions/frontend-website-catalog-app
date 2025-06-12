import React, { useState, useEffect } from 'react';
import { Pagination, Box } from "@mui/material";
import { getComponent } from "../../services/componentService.js";

function PaginationCatalog({ CardComponent, filter, filterUri, priceRange }) {
  const [listaComponentes, setListaComponentes] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [limitePorPagina, setLimitePorPagina] = useState(10);

  useEffect(() => {
    const currentFiltersUri = `?page=${paginaAtual - 1}&size=${limitePorPagina}&nomeComponente=${filterUri.search ? filterUri.search : ''}&categoria=${filter ? filter : 0}`;
    getComponent(currentFiltersUri).then((response) => {
      setTotalPaginas(response.data.totalPages);
      setListaComponentes(response.data.content);
    }).catch((error) => {
      console.error('Error fetching components:', error);
    });
  }, [paginaAtual, limitePorPagina, filterUri, filter]);

  useEffect(() => {
    setPaginaAtual(1)
  }, [filterUri])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 700) {
        setLimitePorPagina(4);
        setPaginaAtual(1);
      } else if (width < 1200) {
        setLimitePorPagina(6);
        setPaginaAtual(1);
      } else if (width < 1400) {
        setLimitePorPagina(8);
        setPaginaAtual(1);
      } else {
        setLimitePorPagina(10);
        setPaginaAtual(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      position="relative"
    >
      <Box
        className="pagination-catalog-list"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          mb: 2,
          maxWidth: '1400px',
          height: '100%',
          gap: '20px',
          alignSelf: { xs: 'center', md: 'flex-start' },
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {listaComponentes.length === 0 ? (
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              fontSize: '1.2rem',
              py: 4,
            }}
          >
            Nenhum componente encontrado.
          </Box>
        ) : (
          listaComponentes.map((item, index) => (
            <CardComponent
              key={index}
              props={item}
            />
          ))
        )}
      </Box>
      <Pagination
        count={totalPaginas}
        page={paginaAtual}
        onChange={(event, value) => setPaginaAtual(value)}
        size="large"
        sx={{
          alignSelf: { xs: 'center', md: 'end' },
          bgcolor: '#f5f5f5',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          p: 1,
          '& .MuiPaginationItem-root': {
            color: '#5F1516',
            borderColor: '#5F1516',
          },
          '& .Mui-selected': {
            backgroundColor: '#5F1516 !important',
            color: '#fff !important',
          },
        }}
      />
    </Box>
  )
}

export default PaginationCatalog;