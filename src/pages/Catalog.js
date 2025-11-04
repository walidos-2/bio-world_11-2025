// pages/Catalog.js
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

// Configuration de l'API
const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category_id');
  const { language, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || 'all'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mettre à jour selectedCategory quand l'URL change
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategories([
          {
            id: 'all',
            name_fr: 'Toutes les catégories',
            name_en: 'All categories',
          },
          ...response.data,
        ]);
      } catch (error) {
        console.error('Erreur chargement catégories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Charger les produits
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url =
          selectedCategory === 'all'
            ? `${API_URL}/products`
            : `${API_URL}/products?category_id=${selectedCategory}`;

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur chargement produits:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  // Fonction pour générer l'URL du produit
  const getProductUrl = (product) => {
    if (product.slug && product.category_name) {
      const categorySlug = product.category_name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
      return `/product/${categorySlug}/${product.slug}`;
    }
    return `/product/${product.id}`;
  };

  // Fonctions pour obtenir les textes dynamiques
  const getProductName = (product) => {
    return language === 'fr' ? product.name_fr : product.name_en;
  };

  const getProductDescription = (product) => {
    if (language === 'fr') {
      return (
        product.short_description_fr ||
        product.description_fr?.substring(0, 120) + '...'
      );
    } else {
      return (
        product.short_description_en ||
        product.description_en?.substring(0, 120) + '...'
      );
    }
  };

  const getCategoryName = (category) => {
    return language === 'fr' ? category.name_fr : category.name_en;
  };

  // Filtrer par recherche - DYNAMIQUE SELON LA LANGUE
  const searchedProducts = products.filter(
    (product) =>
      getProductName(product)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (language === 'fr'
        ? product.short_description_fr
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        : product.short_description_en
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="catalog-page min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Barre de recherche */}
      <div className="search-section bg-gradient-to-r from-green-600 to-orange-500 py-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="search-bar flex gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={
                language === 'fr'
                  ? 'Rechercher des produits...'
                  : 'Search products...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input flex-1 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border-0 focus:ring-2 focus:ring-green-500 shadow-lg"
            />
            <button className="search-btn px-6 py-3 bg-green-800 hover:bg-green-900 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              {language === 'fr' ? '🔍 Rechercher' : '🔍 Search'}
            </button>
          </div>
        </div>
      </div>

      <div className="catalog-container py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="catalog-layout grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar des catégories */}
            <aside className="lg:col-span-1">
              <div className="categories-sidebar bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-700/20 sticky top-6">
                <div className="sidebar-section">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b-2 border-orange-500">
                    {language === 'fr' ? 'Catégories' : 'Categories'}
                  </h3>
                  <ul className="categories-list space-y-2">
                    {categories
                      .filter((cat) => !cat.parent_id)
                      .map((category) => (
                        <li key={category.id}>
                          <button
                            className={`category-item w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                              selectedCategory === category.id
                                ? 'bg-gradient-to-r from-green-600 to-orange-500 text-white shadow-lg'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 dark:hover:from-gray-700 dark:hover:to-gray-600'
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            {getCategoryName(category)}
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Grille des produits */}
            <main className="lg:col-span-3">
              {loading ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {language === 'fr'
                      ? 'Chargement des produits...'
                      : 'Loading products...'}
                  </p>
                </div>
              ) : searchedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 dark:text-gray-400 text-xl">
                    {language === 'fr'
                      ? 'Aucun produit trouvé'
                      : 'No products found'}
                  </p>
                </div>
              ) : (
                <div className="products-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {searchedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="product-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-700/30 hover:shadow-xl dark:hover:shadow-gray-600/30 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Image - Maintenant cliquable */}
                      <Link
                        to={getProductUrl(product)}
                        className="product-image-link block"
                      >
                        <div className="product-image h-64 bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden">
                          <img
                            src={
                              product.images && product.images.length > 0
                                ? product.images[0]
                                : ''
                            }
                            alt={getProductName(product)}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onError={(e) => {
                              e.target.src =
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGN0U5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0QTdDMkEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJJTzwvdGV4dD4KPC9zdmc+';
                            }}
                          />
                        </div>
                      </Link>

                      <div className="product-info p-6 flex flex-col flex-grow">
                        {/* Titre cliquable */}
                        <Link
                          to={getProductUrl(product)}
                          className="product-name-link no-underline"
                        >
                          <h3 className="product-name text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 line-clamp-2">
                            {getProductName(product)}
                          </h3>
                        </Link>

                        {/* Description */}
                        <p className="product-description text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                          {getProductDescription(product)}
                        </p>

                        <div className="product-meta flex justify-between items-center mb-4">
                          <div className="product-price text-2xl font-bold text-green-600 dark:text-green-400">
                            {product.price ? product.price.toFixed(3) : '0.000'}{' '}
                            DT
                          </div>
                          <div
                            className={`product-stock text-sm font-semibold px-3 py-1 rounded-full ${
                              product.in_stock
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            }`}
                          >
                            {product.in_stock
                              ? language === 'fr'
                                ? 'En stock'
                                : 'In stock'
                              : language === 'fr'
                              ? 'Sur commande'
                              : 'On order'}
                          </div>
                        </div>

                        <button className="add-to-cart-btn w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2">
                          {language === 'fr'
                            ? 'Ajouter au panier'
                            : 'Add to cart'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .search-bar {
            flex-direction: column;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .catalog-layout {
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 1rem;
          }

          .product-card {
            height: auto;
          }

          .product-image {
            height: 12rem;
          }
        }
      `}</style>
    </div>
  );
}
