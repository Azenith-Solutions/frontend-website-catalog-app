import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, CircularProgress } from '@mui/material';
import { ShoppingCart, MarkEmailRead as MarkEmailReadIcon, Warning as WarningIcon } from '@mui/icons-material';
import NavBarCatalog from '../../components/navBar/NavBarCatalog';
import Footer from '../../components/footer/Footer';
import CartCard from '../../components/cartCard/CartCard';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import DialogContentMessage from '../../components/CustomDialog/DialogContents/DialogContentMessage';
import { clearLocalStorage, publishOrderWithQuote } from '../../services/cartService/cartService';
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
    const [componentsList, setComponentList] = useState(getListOfItemsFromLocalStorage() || []);

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

    async function publishCreateOrderCommand() {
        console.log("=== Iniciando publicação de pedido com cache de email ===");

        const currentItems = componentsList;
        const unformattedCNPJ = formattedCNPJ.replace(/\D/g, '');
        const unformattedPhone = formattedPhone.replace(/\D/g, '');
        const phoneNumber = unformattedPhone.slice(2);

        const orderData = {
            codigo: "", 
            nomeComprador: name,
            emailComprador: email,
            cnpj: isPJ ? unformattedCNPJ : null,
            status: ORDER_STATUS.UNDER_REVIEW,
            telCelular: phoneNumber,
            items: currentItems.map(item => ({
                fkComponente: item.fkComponente,
                quantidadeCarrinho: item.quantidadeCarrinho
            }))
        };

        const emailData = {
            name: name,
            email: email,
            telefone: formattedPhone,
            isPJ: isPJ,
            cnpj: isPJ ? formattedCNPJ : null,
            content: content,
            items: currentItems.map(item => ({
                nomeComponente: item.nomeComponente ? item.nomeComponente : item.descricao,
                quantidadeCarrinho: item.quantidadeCarrinho,
                descricao: item.descricao
            }))
        };

        console.log("Order Data:", orderData);
        console.log("Email Data:", emailData);

        try {
            const response = await publishOrderWithQuote(orderData, emailData);
            console.log("✅ Pedido publicado com sucesso:", response.data);            
        } catch (error) {
            console.error('❌ Erro ao publicar pedido:', error);
            throw error;
        }
    }

    // Make sure isFormEmpty uses the updated componentsList from state
    function isFormEmpty() {
        if (!componentsList || componentsList.length === 0) {
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
                                    imagem={component.imagem}
                                    idComponente={component.fkComponente}
                                    nomeComponente={component.nomeComponente}
                                    descricao={component.descricao}
                                    estoque={component.emEstoque}
                                    quantidadeComponent={component.quantidadeCarrinho}
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
                                    await publishCreateOrderCommand();
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
                            disabled={loading || !componentsList || componentsList.length === 0}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                opacity: (!componentsList || componentsList.length === 0) ? 0.6 : 1,
                                cursor: (!componentsList || componentsList.length === 0) ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={22} color="inherit" />
                                    Enviando...
                                </>
                            ) : (
                                (!componentsList || componentsList.length === 0) ? 'CARRINHO VAZIO' : 'ENVIAR SOLICITAÇÃO'
                            )}
                        </button>
                    </div>
                </section>

            </Container>
            <Footer
                footerItems={['Componentes', 'Mais vendidos', 'Promoções', 'Novidades']}
            />

            <CustomDialog size={"sm"} open={open} onClose={() => { setOpen(false); window.location.reload(); }}>
                <DialogContentMessage
                    icon={MarkEmailReadIcon}
                    title="Solicitação enviada com sucesso!"
                    description="Recebemos sua solicitação de cotação! Em breve, nossa equipe entrará em contato com você. Agradecemos por escolher a Hardwaretech."
                    iconColor='#4caf50'
                    iconBgColor='#E3FFE3'
                />
            </CustomDialog>

            <CustomDialog size={"sm"} open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogContentMessage
                    icon={WarningIcon}
                    title="Erro ao enviar solicitação"
                    description={errorMessage}
                    iconColor='#b71c1c'
                    iconBgColor='#FFF3E3'
                />
            </CustomDialog>

        </>
    )
}

export default CartPage;