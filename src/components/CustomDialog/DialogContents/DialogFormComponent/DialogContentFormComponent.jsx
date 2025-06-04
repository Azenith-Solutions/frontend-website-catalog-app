import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './DialogContentFormComponent.css';
import SendIcon from '@mui/icons-material/Send';
import { generateComponentRequestEmailTemplate, prepareComponentRequestEmailData } from '../../../../services/emailTemplates/quoteTemplate';
import { sendEmailComponentWithAttachment } from '../../../../services/catalogService/catalogService'; // NOVA FUNÇÃO
import CustomDialog from '../../../CustomDialog/CustomDialog';
import DialogContentMessage from '../../DialogContents/DialogContentMessage';
import { MarkEmailRead as MarkEmailReadIcon, Warning as WarningIcon } from '@mui/icons-material';

const DialogContentFormComponent = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        componente: '',
        telefone: '',
        quantidade: '',
        observacoes: '',
        imagem: null
    });
    const [loading, setLoading] = useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validação dos campos obrigatórios
    const validateFields = () => {
        if (!formData.nome.trim() || !formData.email.trim() || !formData.componente.trim() || !formData.quantidade.trim()) {
            setErrorMessage('Preencha nome, email, componente e quantidade.');
            setErrorDialogOpen(true);
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErrorMessage('Email inválido.');
            setErrorDialogOpen(true);
            return false;
        }
        if (isNaN(Number(formData.quantidade)) || Number(formData.quantidade) < 1) {
            setErrorMessage('Quantidade deve ser um número maior que zero.');
            setErrorDialogOpen(true);
            return false;
        }
        return true;
    };

    const handleSend = async () => {
        if (!validateFields()) return;
        setLoading(true);
        try {
            // Gera o template do email
            const templates = await generateComponentRequestEmailTemplate(formData);
            const emailData = prepareComponentRequestEmailData({
                nome: formData.nome,
                email: formData.email,
                templates
            });

            // Monta o FormData para envio multipart
            const formPayload = new FormData();
            formPayload.append('email', new Blob([JSON.stringify(emailData)], { type: 'application/json' }));
            if (formData.imagem) {
                formPayload.append('file', formData.imagem);
            }

            // Chama o novo endpoint via cartService
            await sendEmailComponentWithAttachment(formPayload);

            setSuccessDialogOpen(true);
            setFormData({
                nome: '',
                email: '',
                componente: '',
                telefone: '',
                quantidade: '',
                observacoes: '',
                imagem: null
            });
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao enviar solicitação.');
            setErrorDialogOpen(true);
        } finally {
            setLoading(false);
        }
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
                        value={formData.nome}
                        onChange={handleChange}
                        className="form-field-personal"
                    />
                    <TextField
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        className="form-field-personal"
                    />
                    <TextField
                        id="telefone"
                        label="Telefone"
                        name="telefone"
                        fullWidth
                        value={formData.telefone}
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
                            fullWidth="true"
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
                                value={formData.componente}
                                onChange={handleChange}
                                className="form-field-componente"
                            />
                            <TextField
                                id="quantidade"
                                label="Quantidade"
                                name="quantidade"
                                type="number"
                                fullWidth
                                value={formData.quantidade}
                                onChange={handleChange}
                                className="form-field-componente"
                                inputProps={{ min: 1 }}
                            />
                        </div>
                        <TextField
                            id="observacoes"
                            label="Observações"
                            name="observacoes"
                            rows={7}
                            multiline
                            fullWidth
                            value={formData.observacoes}
                            onChange={handleChange}
                            className="form-field-componente"
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <Button
                        sx={{ backgroundColor: '#5F1516', padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '10px' }}
                        onClick={handleSend}
                        variant="contained"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : <>SOLICITAR <SendIcon sx={{ fontSize: '18px' }} /></>}
                    </Button>
                </div>
            </div>

            {/* Modal de sucesso */}
            <CustomDialog
                size="sm"
                open={successDialogOpen}
                onClose={() => {
                    setSuccessDialogOpen(false);
                    if (onSubmit) onSubmit(formData);
                }}
            >
                <DialogContentMessage
                    icon={MarkEmailReadIcon}
                    title="Solicitação enviada com sucesso!"
                    description="Recebemos sua solicitação de cotação! Em breve, nossa equipe entrará em contato com você. Agradecemos por escolher a Hardwaretech."
                    iconColor="#4caf50"
                    iconBgColor="#E3FFE3"
                />
            </CustomDialog>

            {/* Modal de erro */}
            <CustomDialog size="sm" open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogContentMessage
                    icon={WarningIcon}
                    title="Erro ao enviar solicitação"
                    description={errorMessage}
                    iconColor="#b71c1c"
                    iconBgColor="#FFF3E3"
                />
            </CustomDialog>
        </>
    );
};

export default DialogContentFormComponent;