import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBarCatalog from '../../components/navBar/NavBarCatalog'
import Footer from '../../components/footer/Footer'
import Container from '@mui/material/Container'
import { ShoppingCart } from '@mui/icons-material'
import CartCard from '../../components/cartCard/CartCard'
import TextField from '@mui/material/TextField'
import components from "../../db/component.json";
import "./CartPage.css"
import { sendEmailCart } from '../../services/EmailCartService'
import ReturnButton from '../../components/ReturnButton/ReturnButton'

import CustomDialog from '../../components/CustomDialog/CustomDialog';
import DialogContentMessage from '../../components/CustomDialog/DialogContents/DialogContentMessage';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';





function CartPage() {
    const [componentsList, setComponentsList] = useState(components.slice(0, 3)); // Exibe apenas os primeiros 3 componentes
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [content, setContent] = useState('');

    const [open, setOpen] = useState(false);


    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };


    async function sendEmail() {
        console.log("Entrando função de envio de email");

        const emailData = {
            "toEmail": email,
            "toName": name,
            "subject": "Cotação de Componente",
            "content": content
        }

        // Mostra o modal de sucesso
        setOpen(true);
        console.log("Objeto a ser enviado: ", emailData);

        sendEmailCart(emailData);
    }

    return (
        <>
            <NavBarCatalog
                menuItems={[]}
                redirectButtonName={'Componentes'}
            />
            <Container sx={{
                maxWidth: { lg: '1600px' },
                marginTop: { xs: '120px', md: '200px' },
            }}>
                <ReturnButton
                    title={'Catálogo'}
                    path={'/catalogPage'}
                />
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
                                name={component.title}
                                descricao={component.desc}
                                preco={component.price}
                            />
                        ))}
                    </section>
                    <p
                        onClick={() => handleNavigation('/catalogPage#componentes')}
                        style={{
                            textAlign: 'center',
                            color: '#5F1516',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            cursor: 'pointer'
                        }}>Adicionar mais componentes</p>
                </section>

                <section>
                    <h2>SOLICITAR COTAÇÃO</h2>
                    <div className="quotation-form">
                        <TextField id="outlined-basic" label="name" variant="outlined" onChange={(event) => setName(event.target.value)} />
                        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
                        <TextField id="outlined-basic" label="Telefone (Opcional)" variant="outlined" onChange={(event) => setTelefone(event.target.value)} />
                        <TextField id="outlined-basic" label="Digite sua mensagem" variant="outlined" rows={7} multiline
                            sx={{
                                gridColumn: 'span 3', /* Ocupa toda a largura (3 colunas) */
                                resize: 'none', /* Remove o redimensionamento */
                            }} onChange={(event) => setContent(event.target.value)} />
                        <button type="submit" onClick={sendEmail} >ENVIAR SOLICITAÇÃO</button>
                    </div>
                </section>

            </Container>
            <Footer
                footerItems={['Componentes', 'Mais vendidos', 'Promoções', 'Novidades']}
            />

            <CustomDialog open={open} onClose={() => setOpen(false)}>
                <DialogContentMessage
                    icon={MarkEmailReadIcon}
                    title="Solicitação enviada com sucesso!"
                    description="Recebemos sua solicitação de cotação! Em breve, nossa equipe entrará em contato com você. Agradecemos por escolher a Hardwaretech."
                />
            </CustomDialog>

        </>
    )
}

export default CartPage;