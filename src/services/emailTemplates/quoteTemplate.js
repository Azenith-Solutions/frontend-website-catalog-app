export const generateQuoteEmailTemplate = (data) => {
    const {
        quoteId,
        currentDate,
        currentTime,
        name,
        email,
        telefone,
        isPJ,
        cnpj,
        content,
        items
    } = data;

    const itemsList = items.map((item, index) =>
        `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${index + 1}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.nomeComponente}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantidadeCarrinho}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.descricao ? item.descricao.substring(0, 60) + '...' : 'Sem descrição'}</td>
    </tr>`
    ).join('');

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitação de Cotação</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: a; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 20px;">
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #5F1516; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Solicitação de Cotação</h1>
                        </td>
                    </tr>
                </table>
                
                <!-- Quote ID and Date -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; background-color: #f9f9f9; border-left: 4px solid #5F1516;">
                    <tr>
                        <td style="padding: 15px;">
                            <p style="margin: 0; font-weight: bold; font-size: 16px;">ID de cotação: ${quoteId}</p>
                            <p style="margin: 5px 0 0 0; color: #666;">Data: ${currentDate} às ${currentTime}</p>
                        </td>
                    </tr>
                </table>
                
                <!-- Customer Information -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                    <tr>
                        <td>
                            <h2 style="color: #5F1516; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px;">Informações do Cliente</h2>
                            ${isPJ ? `<p><strong>Empresa:</strong> ${name}</p>
                                <p><strong>CNPJ:</strong> ${cnpj}</p>` : `<p><strong>Solicitante:</strong> ${name}</p>
                                <p><strong>Tipo:</strong> Pessoa Física</p>`}
                                <p><strong>Email:</strong> ${email}</p>
                            ${telefone ? `<p><strong>Telefone:</strong> ${telefone}</p>` : ''}
                        </td>
                    </tr>
                </table>
                
                <!-- Requested Items -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                    <tr>
                        <td>
                            <h2 style="color: #5F1516; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px;">Itens Solicitados</h2>
                            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                                <thead>
                                    <tr style="background-color: #f2f2f2;">
                                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">#</th>
                                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Qtd</th>
                                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${itemsList}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
                
                <!-- Client Message -->
                ${content ? `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                    <tr>
                        <td>
                            <h2 style="color: #5F1516; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px;">Mensagem do Cliente</h2>
                            <p style="background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${content.replace(/\n/g, '<br>')}</p>
                        </td>
                    </tr>
                </table>` : ''}
                
                <!-- Additional Notes -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; background-color: #f5f5f5; border-radius: 4px;">
                    <tr>
                        <td style="padding: 15px;">
                            <p style="margin: 0; font-size: 14px;"><strong>Nota:</strong> Esta é uma solicitação automática gerada pelo sistema. Analisar os itens e enviar a cotação ao cliente o mais breve possível.</p>
                        </td>
                    </tr>
                </table>
                
                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; border-top: 1px solid #ddd; text-align: center;">
                    <tr>
                        <td style="padding: 20px;">
                            <p style="margin: 0; color: #666; font-size: 12px;">© ${new Date().getFullYear()} HardwareTech. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    const plainTextTemplate = `SOLICITAÇÃO DE COTAÇÃO
ID: ${quoteId}
Data: ${currentDate} às ${currentTime}

INFORMAÇÕES DO CLIENTE
${isPJ ? `Empresa: ${name}\nCNPJ: ${cnpj}` : `Solicitante: ${name}\nTipo: Pessoa Física`}
Email: ${email}
${telefone ? `Telefone: ${telefone}` : ''}

ITENS SOLICITADOS
${items.map((item, index) => `${index + 1}. ${item.title} - Qtd: 1`).join('\n')}

${content ? `MENSAGEM DO CLIENTE\n${content}` : ''}

Nota: Esta é uma solicitação automática gerada pelo sistema. Analisar os itens e enviar a cotação ao cliente o mais breve possível.

© ${new Date().getFullYear()} HardwareTech. Todos os direitos reservados.`;

    return {
        html: htmlTemplate,
        text: plainTextTemplate
    };
};

export const prepareQuoteEmailData = (data) => {
    const { quoteId, name, email, templates } = data;

    return {
        "toEmail": "azenithsolutions@gmail.com",
        "toName": "Azenith Solutions",
        "replyTo": email,
        "subject": `Nova Cotação #${quoteId} - ${name}`,
        "content": templates.html,
        "text": templates.text,
        "html": true
    };
};

export const generateServiceRequestEmailTemplate = (data) => {
    const { nome, email, telefone, observacoes, servico } = data;

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitação de Serviço</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 20px;">
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #5F1516; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Solicitação de Serviço</h1>
                        </td>
                    </tr>
                </table>
                
                <!-- Serviço Solicitado -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; background-color: #f9f9f9; border-left: 4px solid #5F1516;">
                    <tr>
                        <td style="padding: 15px;">
                            <p style="margin: 0; font-weight: bold; font-size: 16px;">Serviço: ${servico}</p>
                        </td>
                    </tr>
                </table>
                
                <!-- Customer Information -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                    <tr>
                        <td>
                            <h2 style="color: #5F1516; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px;">Informações do Cliente</h2>
                            <p><strong>Nome:</strong> ${nome}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Telefone:</strong> ${telefone ? telefone : 'Não informado'}</p>
                        </td>
                    </tr>
                </table>
                
                <!-- Observações -->
                ${observacoes ? `
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                    <tr>
                        <td>
                            <h2 style="color: #5F1516; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px;">Observações</h2>
                            <p style="background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${observacoes.replace(/\n/g, '<br>')}</p>
                        </td>
                    </tr>
                </table>` : ''}
                
                <!-- Additional Notes -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; background-color: #f5f5f5; border-radius: 4px;">
                    <tr>
                        <td style="padding: 15px;">
                            <p style="margin: 0; font-size: 14px;"><strong>Nota:</strong> Esta é uma solicitação automática gerada pelo sistema. Analise a solicitação e entre em contato com o cliente o mais breve possível.</p>
                        </td>
                    </tr>
                </table>
                
                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; border-top: 1px solid #ddd; text-align: center;">
                    <tr>
                        <td style="padding: 20px;">
                            <p style="margin: 0; color: #666; font-size: 12px;">© ${new Date().getFullYear()} HardwareTech. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    const plainTextTemplate = `SOLICITAÇÃO DE SERVIÇO

Serviço: ${servico}

INFORMAÇÕES DO CLIENTE
Nome: ${nome}
Email: ${email}
Telefone: ${telefone ? telefone : 'Não informado'}

${observacoes ? `OBSERVAÇÕES\n${observacoes}\n` : ''}

Nota: Esta é uma solicitação automática gerada pelo sistema. Analise a solicitação e entre em contato com o cliente o mais breve possível.

© ${new Date().getFullYear()} HardwareTech. Todos os direitos reservados.`;

    return {
        html: htmlTemplate,
        text: plainTextTemplate
    };
};

export const prepareServiceRequestEmailData = (data) => {
    const { nome, email, templates } = data;
    return {
        toEmail: "azenithsolutions@gmail.com",
        toName: "Azenith Solutions",
        replyTo: email,
        subject: `Nova Solicitação de Serviço - ${nome}`,
        content: templates.html,
        text: templates.text,
        html: true
    };
};

export const generateComponentRequestEmailTemplate = async (data) => {
    const { nome, email, telefone, componente, quantidade, observacoes, imagem } = data;

    let imagemHtml = '';
    if (imagem) {
        imagemHtml = `
            <p><strong>Imagem enviada:</strong> ${imagem.name}</p>
            <p style="color:#b71c1c;font-size:12px;">A imagem será enviada como anexo no email.</p>
        `;
    }

    const requesterInfoHtml = `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
            <tr>
                <td>
                    <h2 style="color: #5F1516; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px;">Informações do Solicitante</h2>
                    <p><strong>Nome:</strong> ${nome}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Telefone:</strong> ${telefone ? telefone : 'Não informado'}</p>
                </td>
            </tr>
        </table>
    `;

    const componentInfoHtml = `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px; background-color: #f9f9f9; border-left: 4px solid #5F1516;">
            <tr>
                <td style="padding: 15px;">
                    <h2 style="color: #5F1516; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px;">Componente Solicitado</h2>
                    <p style="margin: 0; font-weight: bold; font-size: 16px;">Componente: ${componente}</p>
                    <p style="margin: 0; font-weight: bold; font-size: 16px;">Quantidade: ${quantidade}</p>
                    ${imagemHtml}
                </td>
            </tr>
        </table>
    `;

    const observationsHtml = observacoes ? `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
            <tr>
                <td>
                    <h2 style="color: #5F1516; border-bottom: 1px solid #ddd; padding-bottom: 8px; font-size: 18px;">Observações</h2>
                    <p style="background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${observacoes.replace(/\n/g, '<br>')}</p>
                </td>
            </tr>
        </table>
    ` : '';

    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitação de Cotação de Componente</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 20px;">
                <!-- Header -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="background-color: #5F1516; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Solicitação de Cotação de Componente</h1>
                        </td>
                    </tr>
                </table>
                
                <!-- Informações do Solicitante -->
                ${requesterInfoHtml}
                
                <!-- Componente Solicitado -->
                ${componentInfoHtml}
                
                <!-- Observações -->
                ${observationsHtml}
                
                <!-- Additional Notes -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; background-color: #f5f5f5; border-radius: 4px;">
                    <tr>
                        <td style="padding: 15px;">
                            <p style="margin: 0; font-size: 14px;"><strong>Nota:</strong> Esta é uma solicitação automática gerada pelo sistema. Analise a solicitação e entre em contato com o cliente o mais breve possível.</p>
                        </td>
                    </tr>
                </table>
                
                <!-- Footer -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; border-top: 1px solid #ddd; text-align: center;">
                    <tr>
                        <td style="padding: 20px;">
                            <p style="margin: 0; color: #666; font-size: 12px;">© ${new Date().getFullYear()} HardwareTech. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

    const plainTextTemplate = `SOLICITAÇÃO DE COTAÇÃO DE COMPONENTE

INFORMAÇÕES DO SOLICITANTE
Nome: ${nome}
Email: ${email}
Telefone: ${telefone ? telefone : 'Não informado'}

COMPONENTE SOLICITADO
Componente: ${componente}
Quantidade: ${quantidade}
${imagem ? `Imagem enviada: ${imagem.name}` : ''}

${observacoes ? `OBSERVAÇÕES\n${observacoes}\n` : ''}

Nota: Esta é uma solicitação automática gerada pelo sistema. Analise a solicitação e entre em contato com o cliente o mais breve possível.

© ${new Date().getFullYear()} HardwareTech. Todos os direitos reservados.`;

    return {
        html: htmlTemplate,
        text: plainTextTemplate
    };
};

export const prepareComponentRequestEmailData = (data) => {
    const { nome, email, templates } = data;
    return {
        toEmail: "azenithsolutions@gmail.com",
        toName: "Azenith Solutions",
        replyTo: email,
        subject: `Nova Solicitação de Cotação de Componente - ${nome}`,
        content: templates.html,
        text: templates.text,
        html: true
    };
};
