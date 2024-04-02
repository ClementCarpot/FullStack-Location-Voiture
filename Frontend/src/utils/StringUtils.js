const formatString = string => {
    if (string === null || string === undefined) {
        return '';
    }

    if (string === 'RESERVE') {
        return 'Réservée';
    }

    if (string === 'VALIDE') {
        return 'Validée';
    }

    return string
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b(\w)/g, s => s.toUpperCase());
};

export { formatString };
