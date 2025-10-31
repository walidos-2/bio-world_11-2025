/**
 * CONFIGURATION HAPPYNESS BIO WORLD - Personnalisation facile
 * 
 * Modifiez les valeurs ci-dessous pour personnaliser votre site.
 * Les changements seront appliqués automatiquement partout.
 */

export const siteConfig = {
  // ========== BRANDING ==========
  siteName: 'Happyness Bio World',
  logoUrl: 'https://customer-assets.emergentagent.com/job_farm-to-table-53/artifacts/xy339zwr_Logo%20Societe.jpg',
  
  // ========== DEVISE ==========
  currency: {
    code: 'TND',
    symbol: 'DT',
    position: 'after', // 'before' ou 'after' le montant
  },
  
  // ========== LOCALISATION ==========
  country: {
    name: 'Tunisie',
    nameEn: 'Tunisia',
    phonePrefix: '+216',
    locale: 'fr-TN',
  },
  
  // ========== COULEURS ==========
  colors: {
    // Couleur principale (vert)
    primary: {
      light: '#16a34a',    // green-600
      dark: '#15803d',     // green-700
      lighter: '#22c55e',  // green-500
    },
    // Couleur secondaire (orange)
    secondary: {
      light: '#f97316',    // orange-500
      dark: '#ea580c',     // orange-600
      lighter: '#fb923c',  // orange-400
    },
    // Dégradés
    gradients: {
      primary: 'from-green-600 to-orange-500',
      primaryHover: 'from-green-700 to-orange-600',
      hero: 'from-green-600 to-orange-500',
      background: 'from-green-50 to-orange-50',
    }
  },

  // ========== HEADER ==========
  header: {
    // Afficher le logo ?
    showLogo: true,
    // Taille du logo (en rem)
    logoSize: '3rem',  // h-12
    // Afficher le nom du site à côté du logo ?
    showSiteName: true,
    // Couleur de fond de la barre supérieure
    topBarBg: 'bg-gradient-to-r from-green-600 to-orange-500',
    // Message dans la barre supérieure
    topBarMessage: {
      fr: 'Produits biologiques de qualité',
      en: 'Quality Organic Products'
    },
    // Position des switches (langue + thème)
    switchesPosition: 'right', // 'left' ou 'right'
  },

  // ========== FOOTER ==========
  footer: {
    // Couleur de fond
    bgColor: 'bg-gradient-to-r from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800',
    // Afficher les réseaux sociaux ?
    showSocial: true,
    // Liens des réseaux sociaux
    socialLinks: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
    },
    // Copyright
    copyright: {
      fr: '© 2025 Happyness Bio World. Powered & designed by Eng EWEK, All rights reserved.',
      en: '© 2025 Happyness Bio World. Powered & designed by Eng EWEK, All rights reserved.'
    },
    // Colonnes du footer
    columns: [
      {
        titleFr: 'À propos',
        titleEn: 'About',
        links: [
          { labelFr: 'Notre histoire', labelEn: 'Our Story', url: '/about' },
          { labelFr: 'Contact', labelEn: 'Contact', url: '/contact' },
        ]
      },
      {
        titleFr: 'Produits',
        titleEn: 'Products',
        links: [
          { labelFr: 'Catalogue', labelEn: 'Catalog', url: '/catalog' },
          { labelFr: 'Huiles d\'olive', labelEn: 'Olive Oils', url: '/catalog?category=olive' },
        ]
      },
      {
        titleFr: 'Légal',
        titleEn: 'Legal',
        links: [
          { labelFr: 'Mentions légales', labelEn: 'Legal Notice', url: '/legal' },
          { labelFr: 'CGV', labelEn: 'Terms', url: '/terms' },
        ]
      }
    ]
  },

  // ========== BOUTONS ==========
  buttons: {
    // Style des boutons principaux
    primary: 'bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white',
    secondary: 'bg-white text-green-700 hover:bg-green-50 border border-green-600',
    // Rayon des bordures
    borderRadius: 'rounded-lg', // ou 'rounded-md', 'rounded-full', etc.
  },

  // ========== SLOGAN ==========
  slogan: {
    fr: 'La Joie de se Reconnecter avec la Nature Saine',
    en: 'The Joy of Reconnecting with Healthy Nature'
  },

  // ========== CONTACT ==========
  contact: {
    email: 'Happybioworld@hexabyte.tn',
    phone: '+216 27 092 610',
    address: {
      street: '26 Rue d\'Egypte',
      city: '1002 Tunis',
      country: 'Tunisie'
    },
    manager: {
      name: 'IHEB GHOUILI',
      title: 'Technical Manager',
      titleFr: 'Directeur Technique'
    },
    social: {
      facebook: 'HAPPYNESS Bio WORLD',
      instagram: 'HAPPYNESS Bio WORLD',
      website: 'www.happynessbioworld'
    }
  },

  // ========== SEO ==========
  seo: {
    defaultTitleFr: 'Happyness Bio World - Produits Biologiques de Qualité en Tunisie',
    defaultTitleEn: 'Happyness Bio World - Quality Organic Products in Tunisia',
    defaultDescriptionFr: 'Découvrez notre sélection de produits bio tunisiens : huiles d\'olive, fruits et légumes frais cultivés sans pesticides',
    defaultDescriptionEn: 'Discover our selection of Tunisian organic products: olive oils, fresh fruits and vegetables grown without pesticides',
    keywords: 'bio, biologique, organic, Tunisie, Tunisia, fruits, légumes, huile olive, agriculture'
  }
};

export default siteConfig;
