/**
 * Utilitaire pour formater les prix en Dinars Tunisiens (TND)
 */

export const formatPrice = (price, language = 'fr') => {
  const formattedPrice = price.toFixed(3); // TND utilise 3 décimales
  
  if (language === 'fr') {
    return `${formattedPrice} DT`; // Dinar Tunisien
  } else {
    return `${formattedPrice} TND`;
  }
};

export const formatPhoneNumber = (phone) => {
  // Format pour Tunisie: +216 XX XXX XXX
  if (!phone) return '';
  
  // Si le numéro commence par +216, le retourner tel quel
  if (phone.startsWith('+216')) {
    return phone;
  }
  
  // Sinon, ajouter +216 si ce n'est pas présent
  const cleaned = phone.replace(/\D/g, ''); // Enlever tous les non-chiffres
  if (cleaned.length === 8) {
    // Format tunisien standard (8 chiffres)
    return `+216 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5)}`;
  }
  
  return phone;
};

export const getCurrency = () => {
  return {
    code: 'TND',
    symbol: 'DT',
    decimals: 3
  };
};

export default { formatPrice, formatPhoneNumber, getCurrency };
