import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/hardwareTech/WhiteLogo/SIMBOLO.png";
import Nome from "../../assets/hardwareTech/WhiteLogo/NOME.png";
import './navBarInstitucional.css';

function navBarInstitucional() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        setMenuOpen(false);

        // Verifica se o caminho contém um hash (#)
        const [route, hash] = path.split('#');
        navigate(route, { replace: true }); // Navega para a rota base

        if (hash) {
            // Aguarda a navegação e rola para a seção correspondente
            setTimeout(() => {
                const section = document.getElementById(hash);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // Pequeno atraso para garantir que a página seja carregada
        }
    };

    return (
        <div className="nav-bar-institucional-container">
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
                    <div className="header-option" >
                        <a >Sobre nós</a>
                    </div>
                    <div className="header-option" onClick={() => handleNavigation('/#quem-somos')}>
                        <a >Quem somos</a>
                    </div>
                    <div className="header-option" onClick={() => handleNavigation('/#servicos')}>
                        <a >Serviços</a>
                    </div>
                    <div className="header-option-border" onClick={() => handleNavigation('/catalogPage')}>
                        <a >Catálogo</a>
                    </div>
                    <div className="header-option" onClick={() => handleNavigation('/#contato')}>
                        <a >Contato</a>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default navBarInstitucional;