import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import './DialogContentFormService.css';
import SendIcon from '@mui/icons-material/Send';
import { generateServiceRequestEmailTemplate, prepareServiceRequestEmailData } from '../../../../services/emailTemplates/quoteTemplate';
import { sendEmailCart } from '../../../../services/cartService/cartService';
import CustomDialog from '../../../CustomDialog/CustomDialog';
import DialogContentMessage from '../../DialogContents/DialogContentMessage';
import { MarkEmailRead as MarkEmailReadIcon, Warning as WarningIcon } from '@mui/icons-material';

const DialogContentFormService = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        observacoes: ''
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validação dos campos obrigatórios
    const validateFields = () => {
        if (!formData.nome.trim() || !formData.email.trim()) {
            setErrorMessage('Preencha nome e email.');
            setErrorDialogOpen(true);
            return false;
        }
        // Validação simples de email
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setErrorMessage('Email inválido.');
            setErrorDialogOpen(true);
            return false;
        }
        return true;
    };

    const handleSend = async () => {
        if (!validateFields()) return;
        setLoading(true);
        try {
            const servico = "Serviço 1";
            const templates = generateServiceRequestEmailTemplate({ ...formData, servico });
            const emailData = prepareServiceRequestEmailData({
                nome: formData.nome,
                email: formData.email,
                templates
            });
            await sendEmailCart(emailData);
            setSuccessDialogOpen(true);
            setFormData({ nome: '', email: '', telefone: '', observacoes: '' });
            // Removido o onSubmit daqui
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao enviar solicitação.');
            setErrorDialogOpen(true);
        } finally {
            setLoading(false);
        }
    };

    // Função para fechar o modal de sucesso e chamar o onSubmit
    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
        if (onSubmit) onSubmit(formData);
    };

    return (
        <>
            <h2 className="form-title">Solicitar Serviço</h2>
            <div className="service-form-container">
                <h3 className='title-form'>Serviço Solicitado</h3>
                <div className="form-content">
                    <TextField
                        id="servico"
                        label="Serviço 1"
                        name="servico"
                        fullWidth
                        value="Serviço 1"
                        className="form-field"
                        disabled
                    />
                </div>
                <h3 className='title-form'>Informações para Contato</h3>
                <div className="form-content">
                    <div className="form-left">
                        <TextField
                            id="nome"
                            label="Nome"
                            name="nome"
                            fullWidth
                            value={formData.nome}
                            onChange={handleChange}
                            className="form-field"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#5F1516',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#5F1516',
                                },
                            }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            className="form-field"
                        />
                        <TextField
                            id="telefone"
                            label="Telefone"
                            name="telefone"
                            fullWidth
                            value={formData.telefone}
                            onChange={handleChange}
                            className="form-field"
                        />
                    </div>
                    <div className="form-right">
                        <TextField
                            id="observacoes"
                            label="Observações"
                            name="observacoes"
                            multiline
                            rows={7}
                            fullWidth
                            value={formData.observacoes}
                            onChange={handleChange}
                            className="form-field"
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <Button
                        onClick={handleSend}
                        variant="contained"
                        className="submit-button"
                        disabled={loading}
                        sx={{ backgroundColor: '#5F1516', padding: '10px 25px', display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        {loading ? 'Enviando...' : <>SOLICITAR <SendIcon sx={{ fontSize: '18px' }} /></>}
                    </Button>
                </div>
            </div>

            {/* Modal de sucesso */}
            <CustomDialog size="sm" open={successDialogOpen} onClose={handleCloseSuccessDialog}>
                <DialogContentMessage
                    icon={MarkEmailReadIcon}
                    title="Solicitação enviada com sucesso!"
                    description="Recebemos sua solicitação de serviço! Em breve, nossa equipe entrará em contato com você. Agradecemos por escolher a Hardwaretech."
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

export default DialogContentFormService;