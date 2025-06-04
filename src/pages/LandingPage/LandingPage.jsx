import './LandingPage.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/hardwareTech/WhiteLogo/SIMBOLO.png";
import Nome from "../../assets/hardwareTech/WhiteLogo/NOME.png";
import Video from "../../assets/hardwareTech/LandingPageImgs/Apresentacao_Hardwaretech.mp4";
import QS from "../../assets/hardwareTech/LandingPageImgs/quemSomos.jpg";
import CardService from '../../components/cards/CardService.jsx';
import WhatsApp from "../../assets/hardwareTech/LandingPageImgs/whatsapp.png";
import Footer from "../../components/footer/Footer.jsx";

import NavBarInstitucional from '../../components/navBarInstitucional/navBarInstitucional.jsx';

function App() {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Restauração de Placas Eletrônicas",
      desc: "Recupere o desempenho original das suas placas eletrônicas com nossa tecnologia de ponta. Nossa equipe especializada utiliza equipamentos de última geração para diagnosticar falhas precisamente e restaurar componentes danificados, devolvendo vida a circuitos complexos. Garantimos reparos de alta qualidade com peças originais e testes rigorosos para assegurar o funcionamento como novo."
    },
    {
      id: 2,
      title: "Recuperação de Inversores",
      desc: "Inversores industriais defeituosos comprometem toda sua produção. Nossa equipe de engenheiros especializados realiza diagnósticos avançados e reparos precisos em inversores de qualquer marca e modelo. Restauramos parâmetros de fábrica, corrigimos falhas elétricas e substituímos componentes danificados, garantindo o retorno rápido à operação com eficiência e confiabilidade maximizadas."
    },
    {
      id: 3,
      title: "Renovação de Fontes",
      desc: "Fontes de alimentação são componentes críticos para o funcionamento seguro do seu sistema. Oferecemos serviços completos de reparo e renovação de fontes industriais, desde a substituição de capacitores até o recondicionamento total. Nossa equipe utiliza componentes certificados e realiza testes sob carga para garantir estabilidade, fornecendo energia contínua e proteção contra surtos para seus equipamentos sensíveis."
    },
    {
      id: 4,
      title: "Revitalização de CLPs",
      desc: "Controladores Lógicos Programáveis requerem manutenção especializada para garantir precisão e longevidade. Nossa equipe possui expertise em revitalização de CLPs de diversas marcas, realizando desde a recuperação de módulos danificados até a atualização de firmware. Implementamos soluções que preservam a programação original, modernizam componentes e otimizam o desempenho, prolongando significativamente a vida útil do seu sistema de automação."
    }
  ];

  return (
    <div className="page">
      <NavBarInstitucional/>

      <div className="container">
        
        <div id="introduction" className="introduction">
          <div className="meia-lua-esquerda"></div> {/* Meia-lua dentro do introduction */}
          <div className="intro-content">
            <h1>Soluções em Hardware para Você!</h1>
            <p>Seja bem-vindo à <span style={{ color: '#5F1516' }}>Hardware</span>Tech seu destino para reparos de hardware confiáveis e componentes de alta qualidade.
              Precisa consertar seu dispositivo ou encontrar a peça perfeita? <br /> Nós temos a solução!
              <br />
              <br />
              <li>Reparos rápidos e eficientes</li>
              <li>Peças originais e de alta performance</li>
              <li>Atendimento especializado para você</li>
            </p>
            <button onClick={() => navigate('/#contato')} className='botao-padrao'>Gostou? <b>Entre em contato</b></button>
          </div>

          <div className="intro-video">
          <video className='video-style' src={Video} controls autoPlay muted loop playsInline />
            <div>
              <b>
                Seu hardware em boas mãos. Vamos resolver seu problema hoje mesmo!
              </b>
            </div>
          </div>
        </div>

        <div className='quemSomos' id='quem-somos'>
          <div className="quemSomos-image">
            <img src={QS} alt="Símbolo da marca" />
            <div>
              <p className='text'>
                Nossa equipe de especialistas está pronta para atender você com excelência!
              </p>
            </div>
          </div >

          <div className='quemSomos-content'>
              <h1 className='titulo'>Quem somos?</h1>
            <p>
              A <span style={{ color: '#5F1516' }}>HardwareTech</span> é especialista em reparo e manutenção de hardware industrial,
              com experiência na recuperação de placas eletrônicas, CLPs, inversores de frequência e fontes industriais.
              <br />
              <br />
              Utiliza componentes de alta qualidade e técnicas avançadas para garantir máxima eficiência dos equipamentos.
              Atende indústrias de diversos segmentos com agilidade, confiabilidade e suporte técnico especializado,
              oferecendo reparos, substituições e manutenção preventiva.
            </p>
            <button onClick={() => navigate('/catalogPage')} className='botao-padrao'><b>Conheça nosso Catálogo</b></button>
          </div>
          <div className="meia-lua-direita"></div> {/* Meia-lua dentro do quem somos */}
        </div>

        <div className="servicos" id='servicos'>
          <h1 className='titulo'>Serviços Fornecidos</h1>
          <p>Oferecemos soluções técnicas avançadas para manter seus equipamentos industriais funcionando com máxima eficiência. Nossa equipe de especialistas está pronta para diagnosticar, reparar e otimizar seu hardware com precisão e qualidade.</p>
          <br />
          <div className="servicos-container">
            {services.map(service => (
              <CardService 
                key={service.id}
                props={{
                  id: service.id,
                  title: service.title,
                  desc: service.desc
                }}
              />
            ))}
          </div>
          <div className="meia-lua-borda"></div> {/* Meia-lua dentro da seção serviços */}
        </div>
        <div className='footer'>
        <Footer footerItems={['Home','Sobre nós', 'Serviços','Contato']}/>
        </div>
      </div>
    </div>
  )
}

export default App
