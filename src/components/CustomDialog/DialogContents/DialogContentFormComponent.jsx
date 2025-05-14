import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './DialogContentFormComponent.css';
import SendIcon from '@mui/icons-material/Send';

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
            <h2 style={{ textAlign: 'center', color: '#5F1516', fontWeight: 'bold' }}>Solicitar Cotação</h2>
            <div className="form-container">
                <h3 className='title-form'>Informações para Contato</h3>
                <div className="form-section">
                    <TextField
                        id="nome"
                        label="Nome"
                        name="nome"
                        fullWidth
                        onChange={handleChange}
                        className="form-field-personal"
                    />
                    <TextField
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        onChange={handleChange}
                        className="form-field-personal"
                    />
                    <TextField
                        id="telefone"
                        label="Telefone"
                        name="telefone"
                        fullWidth
                        onChange={handleChange}
                        className="form-field-personal"
                    />
                </div>
                <h3 className='title-form'>Informações do Componente</h3>
                <div className="form-section">
                    <div className="image-preview-container">
                        <p style={{ display: `${formData.imagem ? 'none' : 'block'}` }}>Selecione a imagem do componente</p>
                        {formData.imagem && (
                            <div className="image-preview">
                                <img
                                    src={URL.createObjectURL(formData.imagem)}
                                    alt="Preview"
                                    className="preview-image"
                                />
                            </div>
                        )}
                        <input
                            accept="image/*"
                            id="imagem"
                            type="file"
                            name="imagem"
                            fullWidth
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setFormData((prev) => ({ ...prev, imagem: file }));
                            }}
                            className="form-field form-imagem"
                        />
                    </div>
                    <div className='form-inputs-componente'>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <TextField
                                id="componente"
                                label="Nome do Componente"
                                name="componente"
                                fullWidth
                                onChange={handleChange}
                                className="form-field-componente"
                            />
                            <TextField
                                id="quantidade"
                                label="Quantidade"
                                name="quantidade"
                                type="number"
                                fullWidth
                                onChange={handleChange}
                                className="form-field-componente"
                            />
                        </div>
                        <TextField
                            id="observacoes"
                            label="Observações"
                            name="observacoes"
                            rows={7}
                            multiline
                            fullWidth
                            onChange={handleChange}
                            className="form-field-componente"
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <Button sx={{ backgroundColor: '#5F1516', padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={handleSend} variant="contained" className="submit-button">
                        SOLICITAR <SendIcon sx={{fontSize: '18px'}}/>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default DialogContentFormComponent;