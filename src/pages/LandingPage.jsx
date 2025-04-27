import '../styles/LandingPage.css'
import React from 'react';
import { useState } from 'react';
import Logo from "../assets/hardwareTech/WhiteLogo/SIMBOLO.png";
import Nome from "../assets/hardwareTech/WhiteLogo/NOME.png";
import Video from "../assets/hardwareTech/LandingPageImgs/Apresentacao_Hardwaretech.mp4";
import QS from "../assets/hardwareTech/LandingPageImgs/quemSomos.jpg";
import CardComponent from '../components/cards/CardComponent';
import WhatsApp from "../assets/hardwareTech/LandingPageImgs/whatsapp.png";
import Footer from "../components/Footer.jsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page">
      <header>

        <div className="logo-container">
          <div className="logo">
            <img src={Logo} alt="Símbolo da marca" />
          </div>
          <div className="logo-nome">
            <img src={Nome} alt="Nome marca" />
          </div>
        </div>

        <div className="hamburguer" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div className={`header-option-wrapper ${menuOpen ? 'active' : ''}`}>
          <div className="header-option"><a href="#introduction">Sobre nós</a></div>
          <div className="header-option"><a href="#quem-somos">Quem somos</a></div>
          <div className="header-option-border"><a href="#servicos">Serviços</a></div>
          <div className="header-option"><a href="#contato">Contato</a></div>
        </div>
      </header>

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
            <button className='botao-padrao'>Gostou? <b>Entre em contato</b></button>
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
            <p>
              <h1 className='titulo'>Quem somos?</h1>
              A <span style={{ color: '#5F1516' }}>HardwareTech</span> é especialista em reparo e manutenção de hardware industrial,
              com experiência na recuperação de placas eletrônicas, CLPs, inversores de frequência e fontes industriais.
              <br />
              <br />
              Utiliza componentes de alta qualidade e técnicas avançadas para garantir máxima eficiência dos equipamentos.
              Atende indústrias de diversos segmentos com agilidade, confiabilidade e suporte técnico especializado,
              oferecendo reparos, substituições e manutenção preventiva.
            </p>
            <button className='botao-padrao'><b>Conheça nosso Catálogo</b></button>
          </div>
          <div className="meia-lua-direita"></div> {/* Meia-lua dentro do quem somos */}
        </div>

        <div className="servicos" id='servicos'>
          <h1 className='titulo'>Serviços Fornecidos</h1>
          <p>Esses são apenas alguns dos incríveis serviços que oferecemos. Conte com a nossa expertise para muito mais!</p>
          <br />
          <div className="servicos-container">
            <CardComponent title="Reparo de Placas" price="R$ 150,00" desc="Reparo de placas eletrônicas com garantia de qualidade." />
            <CardComponent title="Reparo de Inversores" price="R$ 250,00" desc="Reparo de inversores de frequência com garantia de qualidade." />
            <CardComponent title="Reparo de Fontes" price="R$ 100,00" desc="Reparo de fontes industriais com garantia de qualidade." />
            <CardComponent title="Reparo de CLPs" price="R$ 200,00" desc="Reparo de CLPs com garantia de qualidade." />
          </div>
          <div className="meia-lua-borda"></div> {/* Meia-lua dentro da seção serviços */}
        </div>

        <div className='contato' id='contato'>
          <h1 className='titulo'>Entre em contato!</h1>
          <p>Tem alguma dúvida ou quer saber mais detalhes sobre nossos serviços?
            Nossa equipe de especialistas está pronta para te atender e esclarecer qualquer questão!
            Entre em contato agora mesmo e descubra todas as
            soluções que oferecemos para garantir o melhor desempenho do seu hardware.
          </p>
          <div className='box-contato'>
            <div className='esquerda'>
              
              <div className="input-container">
              Nome
              <br />
                <input type="text" placeholder='Seu nome' />
              </div>
              
              <div className="input-container">
              E-mail
              <br />
                <input type="text" placeholder='Seu e-mail' />
              </div>
              
              <div className="input-container">
              Telefone
              <br />
                <input type="text" placeholder='Seu telefone' />
              </div>
            </div>
            <div className='direita'>
              
              <div className="input-container">
              Sua mensagem
              <br />
                <input type="text" placeholder='Digite sua mensagem aqui...' />
              </div>
              <button className='botao-padrao'>Enviar</button>
            </div> 
          </div>
          <p>
          Ou entre em contato pelo nosso <span style={{ color: '#1083FF' }}>Whatsapp <img src={WhatsApp} alt="" /></span>
          </p> 
        </div> 
        <div className='footer'>
        <Footer footerItems={['Home','Sobre nós', 'Serviços','Contato']}/>
        </div>
      </div>
    </div>
  )
}

export default App
