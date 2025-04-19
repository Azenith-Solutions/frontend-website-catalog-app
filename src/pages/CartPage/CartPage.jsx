import React, {useState} from 'react'
import NavBarCatalog from '../../components/navBar/NavBarCatalog'
import Footer from '../../components/footer/Footer'
import Container from '@mui/material/Container'
import { ShoppingCart } from '@mui/icons-material'
import CartCard from '../../components/cartCard/CartCard'
import TextField from '@mui/material/TextField'
import components from "../../db/component.json";
import "./CartPage.css"


function CartPage() {
    const [componentsList, setComponentsList] = useState(components.slice(0, 3)); // Exibe apenas os primeiros 3 componentes

    return (
        <>
            <NavBarCatalog
                menuItems={['Componentes', 'Mais vendidos', 'Promoções', 'Novidades']}
                redirectButtonName={'Componentes'}
            />
            <Container sx={{
                maxWidth: { lg: '1600px' },
                marginTop: { xs: '120px', md: '200px' },
            }}>
                <div className="header-cart">
                    <ShoppingCart sx={{
                        fontSize: '50px',
                        color: '#5F1516',
                    }} />
                    <h1>Carrinho</h1>
                </div>

                <section>
                    <h2>TODOS OS ITEMS</h2>

                    <section className="cart-list">
                        {componentsList.map((component, index) => (
                            <CartCard
                                key={index}
                                nome={component.title}
                                descricao={component.desc}
                                preco={component.price}
                            />
                        ))}
                    </section>
                    <p style={{ 
                        textAlign: 'center', 
                        color: '#5F1516', 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        marginBottom: '20px',
                        cursor: 'pointer'}}>Adicionar mais componentes</p>
                </section>

                <section>
                    <h2>SOLICITAR COTAÇÃO</h2>
                    <div className="quotation-form">
                        <TextField id="outlined-basic" label="Nome" variant="outlined" />
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" label="Telefone (Opcional)" variant="outlined" />
                        <TextField id="outlined-basic" label="Digite sua mensagem" variant="outlined" rows={7} multiline
                        sx={{
                            gridColumn: 'span 3', /* Ocupa toda a largura (3 colunas) */
                            resize: 'none', /* Remove o redimensionamento */
                        }} />
                        <button type="submit">ENVIAR SOLICITAÇÃO</button>
                    </div>
                </section>

            </Container>
            <Footer
                footerItems={['Componentes', 'Mais vendidos', 'Promoções', 'Novidades']}
            />
        </>
    )
}

export default CartPage;