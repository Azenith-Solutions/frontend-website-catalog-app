import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "./CartCard.css";
import { addItemToCart, removeItemFromCart, decreaseItemQuantity } from '../../services/catalogService/catalogService';

export default function CartCard(props) {
    const { descricao, estoque, quantidadeComponent } = props;
    const [quantidade, setQuantidade] = useState(quantidadeComponent);

    const handleAdd = () => {
        addItemToCart(props);
        setQuantidade(quantidade + 1);
    };

    const handleDecrease = () => {
        if (quantidade > 1) {
            decreaseItemQuantity(props);
            setQuantidade(quantidade - 1);
        } else if (quantidade === 1) {
            removeItemFromCart(props);
            setQuantidade(0);
        }
    };

    const handleRemove = () => {
        removeItemFromCart(props);
        setQuantidade(0);
    };

    if(quantidade === 0) return null;

    return (
        <div className="card-container">
            <div className="card-header">
                <DeleteIcon className="delete-icon" sx={{ fontSize: '40px' }} onClick={handleRemove} />
                <div className="product-details">
                    <img
                        src="https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg"
                        alt="Product"
                        className="product-image"
                    />
                    <div className="product-info">
                        <div>
                            <h3 className="product-name">{descricao}</h3>
                        </div>
                        <p className="product-price">Em estoque: {estoque}</p>
                    </div>
                </div>
            </div>

            <div className="quantity-control">
                <p className="quantity-label">Quantidade</p>
                <div className="quantity-buttons">
                    <button
                        className="quantity-button"
                        onClick={handleDecrease}
                        disabled={quantidade === 0}
                    >-</button>
                    <span className="quantity-value">{quantidade}</span>
                    <button
                        className="quantity-button"
                        onClick={handleAdd}
                    >+</button>
                </div>
            </div>
        </div>
    );
}