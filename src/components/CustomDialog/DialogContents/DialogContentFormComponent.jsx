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
            <h2 style={{ textAlign: 'center' }}>Solicitação de Orçamento</h2>
            <div className="form-container">
                <div className="form-section">
                <h3 className='title-form'>Informações para contato</h3>
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
                <div className="form-section">
                <h3 className='title-form'>Informações do Componente</h3>
                    <div className="image-preview-container">
                        <p style={{display: `${formData.imagem ? 'none' : 'block'}`}}>Selecione a imagem do componente</p>
                        {formData.imagem && (
                            <div className="image-preview">
                                <img 
                                    src={URL.createObjectURL(formData.imagem)} 
                                    alt="Preview" 
                                    className="preview-image" 
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
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
                    <TextField
                        id="componente"
                        label="Nome do Componente"
                        name="componente"
                        fullWidth
                        onChange={handleChange}
                        className="form-field form-componente"
                    />
                    <TextField
                        id="quantidade"
                        label="Quantidade"
                        name="quantidade"
                        type="number"
                        fullWidth
                        onChange={handleChange}
                        className="form-field"
                    />
                    <TextField
                        id="observacoes"
                        label="Observações"
                        name="observacoes"
                        rows={5}
                        multiline
                        fullWidth
                        onChange={handleChange}
                        className="form-field form-observacoes"
                    />
                </div>
                <div className="form-actions">
                    <Button sx={{backgroundColor: '#5F1516'}} onClick={handleSend} variant="contained" className="submit-button">
                        Enviar
                    </Button>
                </div>
            </div>
        </>
    );
};

export default DialogContentFormComponent;