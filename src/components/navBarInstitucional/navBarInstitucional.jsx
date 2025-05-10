import React, {useState} from 'react'
import Logo from "../../assets/hardwareTech/WhiteLogo/SIMBOLO.png";
import Nome from "../../assets/hardwareTech/WhiteLogo/NOME.png";
import './navBarInstitucional.css'

function navBarInstitucional() {
      const [menuOpen, setMenuOpen] = useState(false);
    
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
                <div className="header-option"><a href="#introduction">Sobre nós</a></div>
                <div className="header-option"><a href="#quem-somos">Quem somos</a></div>
                <div className="header-option"><a href="#servicos">Serviços</a></div>
                <div className="header-option-border"><a href="#">Catálogo</a></div>
                <div className="header-option"><a href="#contato">Contato</a></div>
            </div>
        </header>
        </div>
    )
}

export default navBarInstitucional