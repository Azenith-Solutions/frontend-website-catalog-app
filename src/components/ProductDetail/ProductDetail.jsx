import './ProductDetail.css';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShoppingCart, Add, Remove } from '@mui/icons-material'

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Container from '@mui/material/Container';

import CarouselCard from "../cardCarousel/CarouselCard";
import CardComponent from '../../components/cards/CardComponent';
import ReturnButton from '../../components/ReturnButton/ReturnButton'
import CustomDialog from '../CustomDialog/CustomDialog';
import DialogContentButton from '../CustomDialog/DialogContents/DialogContentButton';

import { getComponentById } from '../../services/componentService'
import { addItemToCart } from '../../services/catalogService/catalogService';

const ProductDetail = ({ productName, price, description, detailsList }) => {
    const [openMoreDetailsList, setOpenMoreDetailsList] = useState(false);
    const [component, setComponent] = useState({});
    const [categoryFilter, setCategoryFilter] = useState()
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { idComponent } = useParams();

    function addItemToLocalCart(component, qty) {
        addItemToCart({ ...component, quantidade: qty });
    }

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
                        <div className='main-image'></div>
                        <div className="images-list">
                            <div className="second-image"></div>
                            <div className="third-image"></div>
                            <div className="fourth-image"></div>
                        </div>
                    </aside>

                    <aside className="details-container">
                        <p className="price">Em estoque: {component.quantidade}</p>
                        <h2>{component.descricao}</h2>
                        <p>
                            <b>Descrição:</b>
                        </p>
                        <p className='description-text'>{description}</p>
                        <button className="more-details-button" onClick={handleOpenMoreDetailsList}>Ver características</button>

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
                                <span className="qty-value-detail">{quantity}</span>
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
                                    setOpen(true)
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
                <DialogContentButton onClose={() => setOpen(false)} />
            </CustomDialog>
        </>
    )
}

export default ProductDetail;