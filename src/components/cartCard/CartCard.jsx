import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "./CartCard.css"; // Importa o arquivo CSS


export default function CartCard(props) {
    const [quantidade, setQuantidade] = useState(1);
    const { nome, descricao, preco } = props;
    return (
        <div className="card-container">
            <div className="card-header">
                <DeleteIcon className="delete-icon" sx={{ fontSize: '40px' }} />
                <div className="product-details">
                    <img
                        src="https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg"
                        alt="Product"
                        className="product-image"
                    />
                    <div className="product-info">
                        <div>
                            <h3 className="product-name">{nome}</h3>
                            <p className="product-description">{descricao}</p>
                        </div>
                        <p className="product-price">R${preco}</p>
                    </div>
                </div>
            </div>

            <div className="quantity-control">
                <p className="quantity-label">Quantidade</p>
                <div className="quantity-buttons">
                    <button className="quantity-button" onClick={() => {
                        if (quantidade > 0) {
                            setQuantidade(quantidade - 1);
                        }
                    }}>-</button>
                    <span className="quantity-value">{quantidade}</span>
                    <button className="quantity-button" onClick={() => setQuantidade(quantidade + 1)}>+</button>
                </div>
            </div>
        </div>
    );
}
