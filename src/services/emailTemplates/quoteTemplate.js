/**
 * Email template service for quote requests
 * This module contains functions for generating email templates for quote requests
 */

/**
 * Generates an HTML email template for quote requests
 * @param {Object} data - The data to use in the template
 * @param {string} data.quoteId - The unique ID for this quote
 * @param {string} data.currentDate - The formatted date
 * @param {string} data.currentTime - The formatted time
 * @param {string} data.name - Customer's name
 * @param {string} data.email - Customer's email
 * @param {string} data.telefone - Customer's phone (optional)
 * @param {boolean} data.isPJ - Whether the customer is a company
 * @param {string} data.cnpj - Customer's CNPJ (if isPJ is true)
 * @param {string} data.content - Additional message from the customer
 * @param {Array} data.items - Array of items in the quote request
 * @returns {Object} HTML and plain text versions of the email template
 */
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

    // Format items from cart with detailed information
    const itemsList = items.map((item, index) =>
        `<tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${index + 1}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.title}</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">1</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.desc ? item.desc.substring(0, 60) + '...' : 'Sem descrição'}</td>
    </tr>`
    ).join('');

    // Create HTML email template
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
                            ${isPJ ?
            `<p><strong>Empresa:</strong> ${name}</p>
                            <p><strong>CNPJ:</strong> ${cnpj}</p>` :
            `<p><strong>Solicitante:</strong> ${name}</p>
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

    // Plain text fallback for email clients that don't support HTML
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

/**
 * Prepares the email data object for sending a quote request
 * @param {Object} data - The data to prepare
 * @param {string} data.quoteId - The unique ID for this quote
 * @param {string} data.name - Customer's name
 * @param {string} data.email - Customer's email
 * @param {string} data.templates - Object containing HTML and text templates
 * @returns {Object} The prepared email data
 */
export const prepareQuoteEmailData = (data) => {
    const { quoteId, name, email, templates } = data;

    return {
        "toEmail": "azenithsolutions@gmail.com", // Company email
        "toName": "Azenith Solutions",
        "replyTo": email, // Allow direct reply to customer
        "subject": `Nova Cotação #${quoteId} - ${name}`,
        "content": templates.html,
        "text": templates.text,
        "html": true
    };
};
