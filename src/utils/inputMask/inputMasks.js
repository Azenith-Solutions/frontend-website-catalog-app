export const formatPhoneNumber = (value) => {
    if (!value) return '';

    // Remove non-digits
    const phoneNumber = value.replace(/\D/g, '');

    // Apply mask based on length
    if (phoneNumber.length <= 2) {
        return phoneNumber;
    } else if (phoneNumber.length <= 7) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    } else {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    }
};

export const formatCNPJ = (value) => {
    if (!value) return '';

    // Remove non-digits
    const cnpj = value.replace(/\D/g, '');

    // Apply CNPJ format
    return cnpj
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 18);
};