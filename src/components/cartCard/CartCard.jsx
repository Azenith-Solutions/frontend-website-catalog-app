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

export default function CartCard(props) {
    const { descricao, estoque, quantidadeComponent } = props;
    const [quantidade, setQuantidade] = useState(quantidadeComponent);
    const [openModal, setOpenModal] = useState(false);
    const inputRef = useRef();

    const handleAdd = () => {
        addItemToCart(props);
        setQuantidade(quantidade + 1);
        inputRef.current.value = quantidade + 1;
    };

    const handleDecrease = () => {
        if (quantidade > 1) {
            decreaseItemQuantity(props);
            setQuantidade(quantidade - 1);
            inputRef.current.value = quantidade - 1;
        } else if (quantidade === 1) {
            setOpenModal(true);
        }
    };

    const handleRemove = () => {
        setOpenModal(true);
    };

    const confirmRemove = () => {
        removeItemFromCart(props);
        setQuantidade(0);
        setOpenModal(false);
        props.onRemove(); // Notifica o pai para remover visualmente
    };

    const cancelRemove = () => {
        setOpenModal(false);
        // Se o valor atual for 0 ou vazio, retorna para 1
        if (inputRef.current.value === "" || parseInt(inputRef.current.value, 10) === 0) {
            setQuantidade(1);
            inputRef.current.value = 1;
            updateItemQuantity(props, 1);
        }
    };

    const handleInputChange = (e) => {
        // Permite vazio ou 0 no input
        let value = e.target.value;
        setQuantidade(value === "" ? "" : parseInt(value, 10));
        inputRef.current.value = value;
    };

    const handleInputBlur = () => {
        let value = inputRef.current.value;
        if (value === "" || parseInt(value, 10) === 0) {
            setOpenModal(true); // Mostra o modal se vazio ou 0
        } else {
            let parsed = parseInt(value, 10);
            setQuantidade(parsed);
            inputRef.current.value = parsed;
            updateItemQuantity(props, quantidade); // Atualiza a quantidade no carrinho
        }
    };


    return (
        <div className="card-container">
            <CustomDialog size={'sm'} open={openModal} onClose={cancelRemove}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    <WarningAmberIcon sx={{ color: '#b71c1c',
                            fontSize: '5rem',
                            marginBottom: '10px',
                            backgroundColor: '#FFF3E3',
                            borderRadius: '30%',
                            padding: '5px', }} />
                </div>
                <DialogTitle sx={{textAlign: 'center'}}>Deseja remover este item do carrinho?</DialogTitle>
                <DialogActions sx={{ justifyContent: 'center', marginBottom: 4 }}>
                    <Button onClick={cancelRemove} color="primary">Cancelar</Button>
                    <Button onClick={confirmRemove} variant='contained' color="error">Remover</Button>
                </DialogActions>
            </CustomDialog>
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
                        className="quantity-button left-border-radius"
                        onClick={handleDecrease}
                        disabled={quantidade === 0}
                    >
                        <Remove fontSize='small'/>
                    </button>
                    <input
                        type="number"
                        min="0"
                        max={estoque}
                        ref={inputRef}
                        value={quantidade}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="quantity-input"
                        style={{ width: "50px", textAlign: "center" }}
                    />
                    <button
                        className="quantity-button right-border-radius"
                        onClick={handleAdd}
                    >
                        <Add fontSize='small'/>
                    </button>
                </div>
            </div>
        </div>
    );
}