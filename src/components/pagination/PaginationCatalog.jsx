import React from 'react'
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { getComponent } from "../../services/componentService.js";

// import axios from "axios";

function PaginationCatalog({ CardComponent, filter, filterUri, priceRange }) {

  const [listaComponentes, setListaComponentes] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [limitePorPagina, setLimitePorPagina] = useState(10);

  //Observa os filtros e pagina atual
  useEffect(() => {
    const currentFiltersUri = `?page=${paginaAtual - 1}&size=${limitePorPagina}&descricao=${filterUri.search ? filterUri.search : ''}`;

    getComponent(currentFiltersUri).then((response) => {
      console.log(response.data)
      setTotalPaginas(response.data.totalPages);
      setListaComponentes(response.data.content);
    }).catch((error) => {
      console.error('Error fetching components:', error);
    });
  }, [paginaAtual, limitePorPagina, filterUri])

  useEffect(() => {
    setPaginaAtual(1)
  }, [filterUri])

  // Altera a quantidade de items por pagina de acordo com a tela
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

    handleResize(); // Chama ao montar
    window.addEventListener('resize', handleResize); // Adiciona o listener
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
        maxWidth: '1400px',
        height: '100%',
        gap: '20px',
        alignSelf: 'flex-start',
      }}>
        {listaComponentes.map((item, index) => (
          <CardComponent
            key={index}
            props={item}
          />
        ))}
      </div>
      <Pagination
        count={totalPaginas}
        page={paginaAtual}
        onChange={(event, value) => setPaginaAtual(value)}
        size="large"
        sx={{
          alignSelf: 'end',
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
    </div>
  )
}

export default PaginationCatalog