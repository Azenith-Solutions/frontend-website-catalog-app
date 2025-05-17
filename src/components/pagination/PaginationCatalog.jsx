import React from 'react'
import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import components from "../../db/component.json";
import { getComponent } from "../../services/componentService.js";

// import axios from "axios";

function PaginationCatalog({ CardComponent, filter, uriEndPoint, priceRange }) {

  const [listaComponentes, setListaComponentes] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState();
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itemsPaginaAtual, setItemsPaginaAtual] = useState([]);
  const [limitePorPagina, setLimitePorPagina] = useState(10);

  //Observa a lista de componentes e atualiza a paginação
  useEffect(() => {
     getComponent(paginaAtual - 1, limitePorPagina).then((response) => {
      console.log(response.data)
      setTotalPaginas(response.data.totalPages);
      setListaComponentes(response.data.content);
    }).catch((error) => {
      console.error('Error fetching components:', error);
    });
  }, [paginaAtual, limitePorPagina])

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
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
        maxWidth: '1400px',
        gap: '20px',
        alignSelf: 'flex-end',
        justifyContent: 'center'
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
        sx={{
          alignSelf: 'end',
        }}
      />
    </div>
  )
}

export default PaginationCatalog