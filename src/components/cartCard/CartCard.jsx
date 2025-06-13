import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Button from '@mui/material/Button';
import { Add, Remove } from '@mui/icons-material'
import "./CartCard.css";
import { addItemToCart, removeItemFromCart, decreaseItemQuantity, updateItemQuantity } from '../../services/catalogService/catalogService';
import CustomDialog from '../CustomDialog/CustomDialog';

const API_IMAGES_URL = "http://localhost:8080/api/uploads/images/";
const defaultImage = "https://www.automataweb.com.br/wp-content/uploads/2019/01/DSCN4860_Rev02-1024x728.jpg";

export default function CartCard(props) {
    const { nomeComponente, descricao, estoque, quantidadeComponent, idComponente, imagem } = props;
    const [quantidade, setQuantidade] = useState(quantidadeComponent);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleAdd = () => {
        addItemToCart(props);
        setQuantidade(q => q + 1);
    };

    const handleDecrease = () => {
        if (quantidade > 1) {
            decreaseItemQuantity(props);
            setQuantidade(q => q - 1);
        } else if (quantidade === 1) {
            setOpenModal(true);
        }
    };

    const handleRemove = () => {
        setOpenModal(true);
    };

    const confirmRemove = () => {
        removeItemFromCart(props);
        setOpenModal(false);
        props.onRemove(); // Notifica o pai para remover visualmente
    };

    const cancelRemove = () => {
        setOpenModal(false);
        // Se o valor atual for 0 ou vazio, retorna para 1
        if (quantidade === "" || parseInt(quantidade, 10) === 0) {
            setQuantidade(1);
            updateItemQuantity(props, 1);
        }
    };

    const handleInputChange = (e) => {
        let value = e.target.value;
        setQuantidade(value === "" ? "" : parseInt(value, 10));
    };

    const handleInputBlur = () => {
        if (quantidade === "" || parseInt(quantidade, 10) === 0) {
            setOpenModal(true); // Mostra o modal se vazio ou 0
        } else {
            let parsed = parseInt(quantidade, 10);
            setQuantidade(parsed);
            updateItemQuantity(props, parsed); // Atualiza a quantidade no carrinho
        }
    };

    // Clique no card leva para detalhes
    const handleCardClick = () => {
        navigate(`/component/details/${idComponente}`);
    };

    // Impede propagação do clique do card nos botões e input
    const stopPropagation = (e) => e.stopPropagation();

    const getImageUrl = (item) => {
        if (item.imagem) {
            return `${API_IMAGES_URL}${item.imagem}`;
        }
        return defaultImage;
    };

    return (
        <>
            <CustomDialog size={'sm'} open={openModal} onClose={cancelRemove}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    <WarningAmberIcon sx={{
                        color: '#b71c1c',
                        fontSize: '5rem',
                        marginBottom: '10px',
                        backgroundColor: '#FFF3E3',
                        borderRadius: '30%',
                        padding: '5px',
                    }} />
                </div>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Deseja remover este item do carrinho?
                </DialogTitle>
                <DialogActions sx={{ justifyContent: 'center', marginBottom: 4 }}>
                    <Button onClick={cancelRemove} color="primary">Cancelar</Button>
                    <Button onClick={confirmRemove} variant='contained' color="error">Remover</Button>
                </DialogActions>
            </CustomDialog>
            <div
                className="card-container"
                onClick={handleCardClick}
                tabIndex={0}
                style={{ cursor: 'pointer' }}
            >

                <div className="card-header">
                    <DeleteIcon
                        className="delete-icon"
                        sx={{ fontSize: '40px' }}
                        onClick={e => { stopPropagation(e); handleRemove(); }}
                    />
                    <div className="product-details">
                        <img
                            src={getImageUrl(props)}
                            alt="Product"
                            className="product-image"
                        />
                        <div className="product-info">
                            <div>
                                <h3 className="product-name">{nomeComponente == null ? descricao : nomeComponente}</h3>
                                <p className="product-description">{descricao}</p>
                            </div>
                            {/* <p className="product-price">Em estoque: {estoque}</p> */}
                        </div>
                    </div>
                </div>

                <div className="quantity-control">
                    <p className="quantity-label">Quantidade</p>
                    <div className="quantity-buttons">
                        <button
                            className="quantity-button left-border-radius"
                            onClick={e => { stopPropagation(e); handleDecrease(); }}
                            disabled={quantidade === 0}
                        >
                            <Remove fontSize='small' />
                        </button>
                        <input
                            type="number"
                            min="0"
                            max={estoque}
                            value={quantidade}
                            onChange={e => { stopPropagation(e); handleInputChange(e); }}
                            onBlur={handleInputBlur}
                            className="quantity-input"
                            style={{ width: "50px", textAlign: "center" }}
                            onClick={stopPropagation}
                        />
                        <button
                            className="quantity-button right-border-radius"
                            onClick={e => { stopPropagation(e); handleAdd(); }}
                        >
                            <Add fontSize='small' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}