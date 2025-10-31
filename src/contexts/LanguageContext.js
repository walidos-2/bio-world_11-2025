import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  fr: {
    common: {
      home: 'Accueil',
      catalog: 'Catalogue',
      cart: 'Panier',
      account: 'Mon compte',
      login: 'Connexion',
      register: 'Inscription',
      logout: 'Déconnexion',
      admin: 'Administration',
      about: 'À propos',
      contact: 'Contact',
      search: 'Rechercher',
      addToCart: 'Ajouter au panier',
      buyNow: 'Commander',
      price: 'Prix',
      quantity: 'Quantité',
      total: 'Total',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      welcome: 'Bienvenue',
      language: 'Langue',
      theme: 'Thème',
      light: 'Clair',
      dark: 'Sombre'
    },
    home: {
      hero: {
        title: 'Bio-World',
        subtitle: 'Produits biologiques de qualité',
        description: 'Découvrez notre sélection de produits bio : huiles d\'olive, fruits et légumes frais cultivés sans pesticides',
        cta: 'Découvrir nos produits'
      },
      featured: {
        title: 'Produits phares',
        subtitle: 'Nos meilleures ventes'
      },
      categories: {
        title: 'Nos catégories',
        subtitle: 'Explorez notre gamme complète'
      }
    },
    catalog: {
      title: 'Notre catalogue',
      filters: 'Filtres',
      categories: 'Catégories',
      allCategories: 'Toutes les catégories',
      sortBy: 'Trier par',
      priceAsc: 'Prix croissant',
      priceDesc: 'Prix décroissant',
      nameAsc: 'Nom A-Z',
      nameDesc: 'Nom Z-A',
      noProducts: 'Aucun produit trouvé',
      inStock: 'En stock',
      onOrder: 'Sur commande'
    },
    product: {
      description: 'Description',
      details: 'Détails',
      availability: 'Disponibilité',
      inStock: 'En stock',
      availableOnOrder: 'Disponible sur commande',
      relatedProducts: 'Produits similaires'
    },
    cart: {
      title: 'Mon panier',
      empty: 'Votre panier est vide',
      continueShopping: 'Continuer mes achats',
      checkout: 'Commander',
      remove: 'Supprimer',
      subtotal: 'Sous-total',
      shipping: 'Livraison',
      totalAmount: 'Montant total'
    },
    auth: {
      loginTitle: 'Connexion',
      registerTitle: 'Créer un compte',
      email: 'Email',
      password: 'Mot de passe',
      firstName: 'Prénom',
      lastName: 'Nom',
      phone: 'Téléphone',
      confirmPassword: 'Confirmer le mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      noAccount: 'Pas encore de compte ?',
      hasAccount: 'Déjà un compte ?',
      loginButton: 'Se connecter',
      registerButton: 'S\'inscrire'
    },
    account: {
      title: 'Mon compte',
      profile: 'Profil',
      orders: 'Mes commandes',
      orderHistory: 'Historique des commandes',
      editProfile: 'Modifier le profil',
      address: 'Adresse',
      city: 'Ville',
      postalCode: 'Code postal',
      country: 'Pays',
      save: 'Enregistrer',
      cancel: 'Annuler'
    },
    order: {
      title: 'Demande de commande',
      deliveryInfo: 'Informations de livraison',
      address: 'Adresse de livraison',
      comments: 'Commentaires / Remarques',
      submit: 'Envoyer la demande',
      confirmation: 'Votre demande de commande a été envoyée avec succès',
      orderNumber: 'Numéro de commande',
      status: 'Statut',
      pending: 'En attente',
      confirmed: 'Confirmée',
      processing: 'En préparation',
      shipped: 'Expédiée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    },
    admin: {
      dashboard: 'Tableau de bord',
      products: 'Produits',
      categories: 'Catégories',
      orders: 'Commandes',
      users: 'Utilisateurs',
      stats: 'Statistiques',
      addProduct: 'Ajouter un produit',
      editProduct: 'Modifier le produit',
      deleteProduct: 'Supprimer le produit',
      totalOrders: 'Commandes totales',
      pendingOrders: 'Commandes en attente',
      totalProducts: 'Produits totaux',
      totalUsers: 'Utilisateurs totaux'
    },
    footer: {
      about: 'À propos',
      contact: 'Contact',
      legal: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions générales',
      followUs: 'Suivez-nous',
      copyright: '© 2025 Bio-World. Tous droits réservés.'
    }
  },
  en: {
    common: {
      home: 'Home',
      catalog: 'Catalog',
      cart: 'Cart',
      account: 'My Account',
      login: 'Login',
      register: 'Sign Up',
      logout: 'Logout',
      admin: 'Administration',
      about: 'About',
      contact: 'Contact',
      search: 'Search',
      addToCart: 'Add to Cart',
      buyNow: 'Order Now',
      price: 'Price',
      quantity: 'Quantity',
      total: 'Total',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      welcome: 'Welcome',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark'
    },
    home: {
      hero: {
        title: 'Bio-World',
        subtitle: 'Quality Organic Products',
        description: 'Discover our selection of organic products: olive oils, fresh fruits and vegetables grown without pesticides',
        cta: 'Discover our products'
      },
      featured: {
        title: 'Featured Products',
        subtitle: 'Our bestsellers'
      },
      categories: {
        title: 'Our Categories',
        subtitle: 'Explore our complete range'
      }
    },
    catalog: {
      title: 'Our Catalog',
      filters: 'Filters',
      categories: 'Categories',
      allCategories: 'All Categories',
      sortBy: 'Sort by',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      nameAsc: 'Name A-Z',
      nameDesc: 'Name Z-A',
      noProducts: 'No products found',
      inStock: 'In Stock',
      onOrder: 'On Order'
    },
    product: {
      description: 'Description',
      details: 'Details',
      availability: 'Availability',
      inStock: 'In Stock',
      availableOnOrder: 'Available on Order',
      relatedProducts: 'Related Products'
    },
    cart: {
      title: 'My Cart',
      empty: 'Your cart is empty',
      continueShopping: 'Continue Shopping',
      checkout: 'Order',
      remove: 'Remove',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      totalAmount: 'Total Amount'
    },
    auth: {
      loginTitle: 'Login',
      registerTitle: 'Create Account',
      email: 'Email',
      password: 'Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      noAccount: 'No account yet?',
      hasAccount: 'Already have an account?',
      loginButton: 'Sign In',
      registerButton: 'Sign Up'
    },
    account: {
      title: 'My Account',
      profile: 'Profile',
      orders: 'My Orders',
      orderHistory: 'Order History',
      editProfile: 'Edit Profile',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal Code',
      country: 'Country',
      save: 'Save',
      cancel: 'Cancel'
    },
    order: {
      title: 'Order Request',
      deliveryInfo: 'Delivery Information',
      address: 'Delivery Address',
      comments: 'Comments / Remarks',
      submit: 'Submit Request',
      confirmation: 'Your order request has been sent successfully',
      orderNumber: 'Order Number',
      status: 'Status',
      pending: 'Pending',
      confirmed: 'Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    },
    admin: {
      dashboard: 'Dashboard',
      products: 'Products',
      categories: 'Categories',
      orders: 'Orders',
      users: 'Users',
      stats: 'Statistics',
      addProduct: 'Add Product',
      editProduct: 'Edit Product',
      deleteProduct: 'Delete Product',
      totalOrders: 'Total Orders',
      pendingOrders: 'Pending Orders',
      totalProducts: 'Total Products',
      totalUsers: 'Total Users'
    },
    footer: {
      about: 'About',
      contact: 'Contact',
      legal: 'Legal Notice',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      followUs: 'Follow Us',
      copyright: '© 2025 Bio-World. All rights reserved.'
    }
  }
};
