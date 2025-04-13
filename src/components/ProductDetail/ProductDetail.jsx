import './ProductDetail.css';
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetail = ({ productName, price, description, detailsList }) => {
    const [openMoreDetailsList, setOpenMoreDetailsList] = useState(true);
    
    document.title = `Detalhes do ${productName}`;

    function handleOpenMoreDetailsList() {
        setOpenMoreDetailsList(!openMoreDetailsList);
    }

    return (
        <>
            <div className="container">
                <aside className="images-container">
                    <div className='main-image'></div>

                    <div className="images-list">
                        <div className="second-image"></div>
                        <div className="third-image"></div>
                        <div className="fourth-image"></div>
                    </div>
                </aside>

                <aside className="details-container">
                    <h2>{productName}</h2>

                    <p className="price">R$ {price}</p>

                    <>
                        <p>
                            <b>Descrição:</b>
                        </p>

                        <p className='description-text'>{description}</p>

                        <button className="more-details-button" onClick={handleOpenMoreDetailsList}>Ver características</button>
                    </>

                    <button className='request-quote'><ShoppingCartIcon />Adicionar ao carrinho</button>
                </aside>

            </div>

            {(openMoreDetailsList) && (
                <div className="more-details-list">
                    <h3>Características do {productName}</h3>
                    <ul>
                        {detailsList.map((detail) => (
                            <li>
                                {detail}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="related-products">
                <h3>Produtos Relacionados</h3>
            </div>
        </>
    )
}

export default ProductDetail;