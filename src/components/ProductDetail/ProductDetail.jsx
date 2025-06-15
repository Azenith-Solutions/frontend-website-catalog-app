import './ProductDetail.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingCart, Add, Remove } from '@mui/icons-material'

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Container from '@mui/material/Container';

import CarouselCard from "../cardCarousel/CarouselCard";
import CardComponent from '../../components/cards/CardComponent';
import ReturnButton from '../../components/ReturnButton/ReturnButton'
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContentButton from '../CustomDialog/DialogContents/DialogContentButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

import { getComponentById } from '../../services/componentService'
import { addItemToCart } from '../../services/catalogService/catalogService';

const API_IMAGES_URL = "http://localhost:8080/api/uploads/images/";
const defaultImage = "https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg";

const ProductDetail = ({ productName, price, description, detailsList }) => {
    const [openMoreDetailsList, setOpenMoreDetailsList] = useState(false);
    const [component, setComponent] = useState({});
    const [categoryFilter, setCategoryFilter] = useState()
    const [open, setOpen] = useState(false);
    const [invalidDialog, setInvalidDialog] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const { idComponent } = useParams();
    const navigate = useNavigate();

    function addItemToLocalCart(component, qty) {
        if (isNaN(qty) || qty < 1) {
            setInvalidDialog(true);
        } else {
            setOpen(true)
            addItemToCart({ ...component, quantidadeCarrinho: qty });
        }
    }

    const handleInvalidDialogClose = () => {
        setInvalidDialog(false);
        setQuantity(1);
    };

    useEffect(() => {
        if (idComponent) {
            getComponentById(idComponent).then((response) => {
                setComponent(response.data)
                setCategoryFilter({
                    where: "fkCategoria",
                    whereValue: response.data.categoria.idCategoria,
                    orderBy: "quantidadeVendido",
                    ASC: false,
                    limit: 10
                })
            }).catch((error) => {
                console.error('Error fetching components:', error);
            });
        }
    }, [idComponent]);

    document.title = `Detalhes do ${productName}`;

    function handleOpenMoreDetailsList() {
        setOpenMoreDetailsList(!openMoreDetailsList);
    }

    const handleDecrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const getImageUrl = (item) => {
        if (item.imagem) {
            return `${API_IMAGES_URL}${item.imagem}`;
        }
        return defaultImage;
    };

    return (
        <>
            <Container sx={{
                maxWidth: { lg: '1600px' },
                marginTop: '50px',
            }}>
                <ReturnButton
                    title={'Catálogo'}
                    path={'/catalogPage'}
                />
                <div className="hero-container">
                    <aside className="images-container">
                        <div
                            className='main-image'
                            style={{
                                backgroundImage: `url(${getImageUrl(component)})`,
                            }}
                        ></div>
                        {/* <div className="images-list">
                            <div className="second-image"></div>
                            <div className="third-image"></div>
                            <div className="fourth-image"></div>
                        </div> */}
                    </aside>

                    <aside className="details-container">
                        {/* <p className="price">Em estoque: {component.quantidade}</p> */}
                        <h2>{component.nomeComponente == null ? component.descricao : component.nomeComponente}</h2>
                        <p>
                            <b>Descrição:</b>
                        </p>
                        <p className='description-text'>{component.descricao}</p>
                        {/* <button className="more-details-button" onClick={handleOpenMoreDetailsList}>Ver características</button> */}

                        <div className="add-to-cart-detail-row">

                            <div className="qty-control-detail">
                                <button
                                    type="button"
                                    className="qty-btn-detail left-border-radius"
                                    onClick={handleDecrease}
                                    disabled={quantity === 1}
                                    aria-label="Diminuir quantidade"
                                >
                                    <Remove fontSize="small" />
                                </button>
                                <input
                                    type="number"
                                    className="qty-value-detail"
                                    min={1}
                                    value={quantity}
                                    onChange={e => {
                                        const val = parseInt(e.target.value, 10);
                                        setQuantity(isNaN(val) || val < 1 ? '' : val);
                                    }}
                                    style={{ width: "50px", textAlign: "center" }}
                                    aria-label="Quantidade"
                                />
                                <button
                                    type="button"
                                    className="qty-btn-detail right-border-radius"
                                    onClick={handleIncrease}
                                    aria-label="Aumentar quantidade"
                                >
                                    <Add fontSize="small" />
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    addItemToLocalCart(component, quantity);
                                }}
                                className='request-quote'
                            >
                                <ShoppingCartIcon />Adicionar ao carrinho
                            </button>
                        </div>
                    </aside>
                </div>

                {(openMoreDetailsList) && (
                    <div className="more-details-list">
                        <h3>Características do {productName}</h3>
                        <ul>
                            {detailsList.map((detail, idx) => (
                                <li key={idx}>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="related-products">
                    <h3>Produtos Relacionados</h3>
                    {categoryFilter && (
                        <CarouselCard
                            CardComponent={CardComponent}
                            filter={categoryFilter}
                        />
                    )}
                </div>
            </Container>

            <CustomDialog size={"sm"} open={open} onClose={() => setOpen(false)}>
                <DialogContentButton icon={CheckCircleIcon}
                    iconProps={{
                        sx: {
                            color: '#4caf50',
                            fontSize: '5rem',
                            marginBottom: '10px',
                            backgroundColor: '#E3FFE3',
                            borderRadius: '30%',
                            padding: '5px',
                        }
                    }}
                    text="Componente adicionado ao carrinho"
                    buttonLabel="Ir ao Carrinho"
                    buttonIcon={ShoppingCart}
                    onButtonClick={() => {
                        setOpen(false);
                        navigate('/cart');
                    }} />
            </CustomDialog>

            <CustomDialog size={"xs"} open={invalidDialog} onClose={handleInvalidDialogClose}>
                <DialogContentButton
                    icon={WarningIcon}
                    iconProps={{
                        sx: {
                            color: '#b71c1c',
                            fontSize: '5rem',
                            marginBottom: '10px',
                            backgroundColor: '#FFF3E3',
                            borderRadius: '30%',
                            padding: '5px',
                        }
                    }}
                    text="Insira uma quantidade válida!"
                    buttonLabel="OK"
                    onButtonClick={handleInvalidDialogClose}
                    textStyle={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}
                />
            </CustomDialog>
        </>
    )
}

export default ProductDetail;