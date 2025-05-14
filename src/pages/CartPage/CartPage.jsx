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
import { sendEmailCart, createOrderFromCart } from '../../services/emailCartService'
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
    const [customerType, setCustomerType] = useState('pessoaFisica'); // 'pessoaFisica' ou 'pessoaJuridica'
    const [cnpj, setCnpj] = useState('');

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };


    async function sendEmail() {
        console.log("Entrando função de envio de email");

        // Prepare additional information based on customer type
        const customerTypeInfo = customerType === 'pessoaFisica'
            ? 'Tipo: Pessoa Física'
            : `Tipo: Pessoa Jurídica\nCNPJ: ${cnpj}`;

        // Combine the customer information with the original content
        const fullContent = `${customerTypeInfo}\n\n${content}`;

        const emailData = {
            "toEmail": email,
            "toName": name,
            "subject": "Cotação de Componente",
            "content": fullContent
        }

        // Mostra o modal de sucesso
        setOpen(true);
        console.log("Objeto a ser enviado: ", emailData);

        sendEmailCart(emailData);
    }

    async function createOrder() {
        console.log("Entrando função de criar pedido");

        const newOrder = {
            "codigo": "PED-2023-004",
            "fkEmpresa": 1,
            "nomeComprador": name,
            "emailComprador": email,
            "telCelular": telefone,
            "status": "Pendente",
            "tipoPessoa": customerType,
            ...(customerType === 'pessoaJuridica' && { "cnpj": cnpj })
        };

        console.log("Objeto a ser inserido no banco: ", newOrder);

        try {
            const response = await createOrderFromCart(newOrder);
            console.log("Response from creating order: ", response.data);
        } catch (error) {
            console.error('Error creating order from cart:', error);
        }
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
                        <div className="customer-type-selector" style={{
                            gridColumn: 'span 3',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '10px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="pessoaFisica"
                                    name="customerType"
                                    value="pessoaFisica"
                                    checked={customerType === 'pessoaFisica'}
                                    onChange={() => setCustomerType('pessoaFisica')}
                                    style={{ marginRight: '8px' }}
                                />
                                <label htmlFor="pessoaFisica">Pessoa Física</label>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="pessoaJuridica"
                                    name="customerType"
                                    value="pessoaJuridica"
                                    checked={customerType === 'pessoaJuridica'}
                                    onChange={() => setCustomerType('pessoaJuridica')}
                                    style={{ marginRight: '8px' }}
                                />
                                <label htmlFor="pessoaJuridica">Pessoa Jurídica</label>
                            </div>
                        </div>

                        <TextField id="outlined-basic" label="Nome Completo" variant="outlined" onChange={(event) => setName(event.target.value)} />
                        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
                        <TextField id="outlined-basic" label="Telefone (Opcional)" variant="outlined" onChange={(event) => setTelefone(event.target.value)} />

                        {customerType === 'pessoaJuridica' && (
                            <TextField
                                id="outlined-basic"
                                label="CNPJ"
                                variant="outlined"
                                onChange={(event) => setCnpj(event.target.value)}
                                sx={{
                                    gridColumn: customerType === 'pessoaJuridica' ? 'span 3' : 'auto',
                                }}
                            />
                        )}

                        <TextField id="outlined-basic" label="Digite sua mensagem" variant="outlined" rows={7} multiline
                            sx={{
                                gridColumn: 'span 3', /* Ocupa toda a largura (3 colunas) */
                                resize: 'none', /* Remove o redimensionamento */
                            }} onChange={(event) => setContent(event.target.value)} />
                        <button type="submit" onClick={() => { sendEmail(); createOrder(); }}>ENVIAR SOLICITAÇÃO</button>
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