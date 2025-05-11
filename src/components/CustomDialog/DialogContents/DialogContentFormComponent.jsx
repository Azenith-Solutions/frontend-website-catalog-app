import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './DialogContentFormComponent.css';

const DialogContentFormComponent = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        componente: '',
        telefone: '',
        quantidade: '',
        observacoes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSend = () => {
        onSubmit(formData);
    };

    return (
        <>
            <h2 style={{textAlign: 'center'}}>Solicitação de Orçamento</h2>
            <div className="form-container">
                <TextField
                    label="Nome"
                    name="nome"
                    fullWidth
                    onChange={handleChange}
                    className="form-field"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    className="form-field"
                />
                <TextField
                    label="Nome do Componente"
                    name="componente"
                    fullWidth
                    onChange={handleChange}
                    className="form-field"
                />
                <TextField
                    label="Telefone"
                    name="telefone"
                    fullWidth
                    onChange={handleChange}
                    className="form-field"
                />
                <TextField
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    fullWidth
                    onChange={handleChange}
                    className="form-field"
                />
                <TextField
                    id="observer-input"
                    label="Observações"
                    name="observacoes"
                    multiline
                    fullWidth
                    rows={5}
                    onChange={handleChange}
                    className="form-field"
                />
                <div className="form-actions">
                    <button onClick={handleSend} className="submit-button">
                        Enviar
                    </button>
                </div>
            </div>
        </>
    );
};

export default DialogContentFormComponent;