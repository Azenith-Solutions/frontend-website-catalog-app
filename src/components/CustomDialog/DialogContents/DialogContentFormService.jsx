import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './DialogContentFormService.css';
import SendIcon from '@mui/icons-material/Send';

const DialogContentFormService = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
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
            <h2 className="form-title">Solicitação de Serviço</h2>
            
            <div className="service-form-container">
                <h3 className='title-form'>Servilço Solicitado</h3>
                <div className="form-content">
                        <TextField
                            id="nome"
                            label="Serviço 1"
                            name="nome"
                            fullWidth
                            onChange={handleChange}
                            className="form-field"
                            disabled
                        />
                    </div>
                <h3 className='title-form'>Informações para Contato</h3>
                <div className="form-content">
                    {/* Coluna esquerda */}
                    <div className="form-left">
                        <TextField
                            id="nome"
                            label="Nome"
                            name="nome"
                            fullWidth
                            onChange={handleChange}
                            className="form-field"
                        />
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            onChange={handleChange}
                            className="form-field"
                        />
                        <TextField
                            id="telefone"
                            label="Telefone"
                            name="telefone"
                            fullWidth
                            onChange={handleChange}
                            className="form-field"
                        />
                    </div>

                    {/* Coluna direita */}
                    <div className="form-right">
                        <TextField
                            id="observacoes"
                            label="Observações"
                            name="observacoes"
                            multiline
                            rows={7}
                            fullWidth
                            onChange={handleChange}
                            className="form-field"
                        />
                    </div>
                </div>

                {/* Botão de envio */}
                <div className="form-actions">
                    <Button
                        onClick={handleSend}
                        variant="contained"
                        className="submit-button"
                        sx={{ backgroundColor: '#5F1516', padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        SOLICITAR <SendIcon sx={{ fontSize: '18px' }} />
                    </Button>
                </div>
            </div>
        </>

    );
};

export default DialogContentFormService;