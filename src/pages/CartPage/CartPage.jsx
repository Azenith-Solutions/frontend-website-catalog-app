import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, CircularProgress } from '@mui/material'; // Adicione CircularProgress aqui
import { ShoppingCart, MarkEmailRead as MarkEmailReadIcon, Warning as WarningIcon } from '@mui/icons-material';
import NavBarCatalog from '../../components/navBar/NavBarCatalog';
import Footer from '../../components/footer/Footer';
import CartCard from '../../components/cartCard/CartCard';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import DialogContentMessage from '../../components/CustomDialog/DialogContents/DialogContentMessage';
import { sendEmailCart, createOrder, insertItems, clearLocalStorage } from '../../services/cartService/cartService';
import { generateQuoteEmailTemplate, prepareQuoteEmailData } from '../../services/emailTemplates/quoteTemplate';
import { ORDER_STATUS } from '../../enums/orderStatus';
import { formatPhoneNumber, formatCNPJ } from '../../utils/inputMask/inputMasks';
import { getListOfItemsFromLocalStorage } from '../../utils/storage/storage';
import './CartPage.css';


function CartPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [isPJ, setIsPJ] = useState(false); // 'pessoaFisica' ou 'pessoaJuridica'
    const [formattedPhone, setFormattedPhone] = useState(''); // Valor formatado para exibição
    const [formattedCNPJ, setFormattedCNPJ] = useState('');
    const [open, setOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // Estado para loading
    const navigate = useNavigate();
    const [componentsList, setComponentList] = useState(getListOfItemsFromLocalStorage());


    const handlePhoneChange = (event) => {
        // Gerar e armazenar valor formatado para exibição
        const formattedValue = formatPhoneNumber(event.target.value);
        setFormattedPhone(formattedValue);
    };

    const handleCNPJChange = (event) => {
        // Gerar e armazenar valor formatado para exibição
        const formattedValue = formatCNPJ(event.target.value);
        setFormattedCNPJ(formattedValue);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    async function sendEmail() {
        console.log("Entrando função de envio de email");

        // Generate a unique quote ID
        const quoteId = `AZT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`; // TO-DO 🙌: ID atualmente mockado, questionar sobre como será feito.

        // Format current date in Brazilian format
        const currentDate = new Date().toLocaleDateString('pt-BR');
        const currentTime = new Date().toLocaleTimeString('pt-BR');
        const currentItems = getListOfItemsFromLocalStorage();       // Prepare template data
        const templateData = {
            quoteId,
            currentDate,
            currentTime,
            name,
            email,
            telefone: formattedPhone,
            isPJ,
            cnpj: formattedCNPJ,
            content,
            items: currentItems
        };

        // Generate email templates (HTML and plain text)
        const templates = generateQuoteEmailTemplate(templateData);

        // Prepare email data for sending
        const emailData = prepareQuoteEmailData({
            quoteId,
            name,
            email,
            templates
        });

        // Mostra o modal de sucesso
        console.log("Objeto a ser enviado: ", emailData);

        // Send the email
        await sendEmailCart(emailData);
    }

    async function createOrderFromCart() {
        console.log("Entrando função de criar pedido");

        // Insere o valor bruto sem formatação
        const unformattedCNPJ = formattedCNPJ.replace(/\D/g, '');
        const unformattedPhone = formattedPhone.replace(/\D/g, '');
        const phoneNumber = unformattedPhone.slice(2);

        console.log("CNPJ (sem formatação): ", unformattedCNPJ);
        console.log("é PJ? ", isPJ);

        const newOrder = {
            "codigo": "PED-2023-004",
            "nomeComprador": name,
            "emailComprador": email,
            "cnpj": isPJ ? unformattedCNPJ : null,
            "status": ORDER_STATUS.UNDER_REVIEW,
            "telCelular": phoneNumber
        };

        console.log("Objeto a ser inserido no banco: ", newOrder);

        try {
            const response = await createOrder(newOrder);
            console.log("Response from creating order: ", response.data);

            insertItems(response.data.data.idPedido);
        } catch (error) {
            console.error('Error creating order from cart:', error);
        }
    }

    function isFormEmpty() {
        if (componentsList.length === 0) {
            setErrorMessage('Seu carrinho está vazio!');
            return true;
        }
        if (!name.trim() || !email.trim()) {
            setErrorMessage('Por favor, preencha nome e email para solicitar a cotação.');
            return true;
        }
        if (isPJ && !formattedCNPJ.trim()) {
            setErrorMessage('Por favor, preencha o CNPJ para Pessoa Jurídica.');
            return true;
        }
        return false;
    }

    return (
        <>
            <NavBarCatalog
                menuItems={[]}
                redirectButtonName={'Componentes'}
            />
            <Container sx={{
                maxWidth: { lg: '1600px' },
                marginTop: '50px'
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
                    <h2 className='cart-title'>TODOS OS ITEMS</h2>

                    <section className="cart-list">
                        {componentsList.length > 0 ? (
                            <> {componentsList.map((component, index) => (
                                <CartCard
                                    key={component.fkComponente}
                                    idComponente={component.fkComponente}
                                    descricao={component.descricao}
                                    estoque={component.emEstoque}
                                    quantidadeComponent={component.quantidadeCarrinho}
                                    nomeComponente={component.nomeComponente}
                                    imagem={component.imagem}
                                    onRemove={() => setComponentList(prev => prev.filter(i => i.fkComponente !== component.fkComponente))}
                                />))
                            }
                            </>
                        ) : (<h2 style={{ textAlign: 'center' }}>Seu carrinho está vazio!</h2>)}
                    </section>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
                        <p onClick={() => handleNavigation('/catalogPage#componentes')}
                            style={{
                                textAlign: 'center',
                                color: '#5F1516',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}>Adicionar mais componentes</p>
                    </div>
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
                                    name="isPJ"
                                    value="false"
                                    checked={isPJ === false}
                                    onChange={() => setIsPJ(false)}
                                    style={{ marginRight: '8px', cursor: 'pointer' }}
                                />
                                <label htmlFor="pessoaFisica">Pessoa Física</label>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    id="pessoaJuridica"
                                    name="isPJ"
                                    value="true"
                                    checked={isPJ === true}
                                    onChange={() => setIsPJ(true)}
                                    style={{ marginRight: '8px', cursor: 'pointer' }}
                                />
                                <label htmlFor="pessoaJuridica">Pessoa Jurídica</label>
                            </div>
                        </div>

                        <TextField
                            id="outlined-basic"
                            label="Nome Completo"
                            variant="outlined"
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            id="outlined-telefone"
                            label="Telefone Celular (Opcional)"
                            variant="outlined"
                            sx={{ flex: 1 }}
                            value={formattedPhone}
                            onChange={handlePhoneChange}
                        />                        {isPJ && (
                            <TextField
                                id="outlined-basic"
                                label="CNPJ"
                                variant="outlined"
                                value={formattedCNPJ}
                                onChange={handleCNPJChange}
                                sx={{
                                    gridColumn: isPJ ? 'span 3' : 'auto',
                                }}
                            />
                        )}

                        <TextField id="outlined-basic" label="Observações (Opcional)" variant="outlined" rows={7} multiline
                            sx={{
                                gridColumn: 'span 3', /* Ocupa toda a largura (3 colunas) */
                                resize: 'none', /* Remove o redimensionamento */
                            }} onChange={(event) => setContent(event.target.value)} />
                        <button
                            type="submit"
                            onClick={async () => {
                                if (isFormEmpty()) {
                                    setErrorDialogOpen(true);
                                    return;
                                }
                                setLoading(true);
                                try {
                                    await sendEmail();
                                    await createOrderFromCart();
                                    setOpen(true); // Modal de sucesso
                                    clearLocalStorage();
                                } catch (error) {
                                    setErrorMessage(
                                        error?.message ||
                                        'Ocorreu um erro ao enviar a solicitação. Tente novamente.'
                                    );
                                    setErrorDialogOpen(true); // Modal de erro
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            disabled={loading}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={22} color="inherit" />
                                    Enviando...
                                </>
                            ) : (
                                'ENVIAR SOLICITAÇÃO'
                            )}
                        </button>
                    </div>
                </section>

            </Container>
            <Footer
                footerItems={['Componentes', 'Mais vendidos', 'Promoções', 'Novidades']}
            />

            <CustomDialog size={"sm"} open={open} onClose={() => {setOpen(false); window.location.reload();}}>
                <DialogContentMessage
                    icon={MarkEmailReadIcon}
                    title="Solicitação enviada com sucesso!"
                    description="Recebemos sua solicitação de cotação! Em breve, nossa equipe entrará em contato com você. Agradecemos por escolher a Hardwaretech."
                    iconColor = '#4caf50'
                    iconBgColor = '#E3FFE3'
                />
            </CustomDialog>

            <CustomDialog size={"sm"} open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogContentMessage
                    icon={WarningIcon}
                    title="Erro ao enviar solicitação"
                    description={errorMessage}
                    iconColor = '#b71c1c'
                    iconBgColor = '#FFF3E3'
                />
            </CustomDialog>

        </>
    )
}

export default CartPage;