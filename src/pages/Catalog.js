// pages/Catalog.js
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

// Configuration de l'API
const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category_id');

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
    // Si le produit a un slug et une catégorie, utiliser la nouvelle URL
    if (product.slug && product.category_name) {
      // Créer un slug de catégorie à partir du nom
      const categorySlug = product.category_name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');

      return `/product/${categorySlug}/${product.slug}`;
    }

    // Sinon, utiliser l'ancienne URL avec ID (rétrocompatibilité)
    return `/product/${product.id}`;
  };

  // Filtrer par recherche
  const searchedProducts = products.filter(
    (product) =>
      product.name_fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.short_description_fr
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalog-page">
      {/* Barre de recherche */}
      <div className="search-section">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍 Rechercher</button>
          </div>
        </div>
      </div>

      <div className="catalog-container">
        <div className="container">
          <div className="catalog-layout">
            {/* Sidebar des catégories */}
            <aside className="categories-sidebar">
              <div className="sidebar-section">
                <h3>Catégories</h3>
                <ul className="categories-list">
                  {categories
                    .filter((cat) => !cat.parent_id) // Seulement catégories principales
                    .map((category) => (
                      <li key={category.id}>
                        <button
                          className={`category-item ${
                            selectedCategory === category.id ? 'active' : ''
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {category.name_fr}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </aside>

            {/* Grille des produits */}
            <main className="products-main">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      border: '4px solid #f0f7e9',
                      borderTop: '4px solid #16a249',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto 20px',
                    }}
                  ></div>
                  <p style={{ color: '#666', fontSize: '1.1rem' }}>
                    Chargement des produits...
                  </p>
                </div>
              ) : searchedProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <p style={{ color: '#666', fontSize: '1.2rem' }}>
                    Aucun produit trouvé
                  </p>
                </div>
              ) : (
                <div className="products-grid">
                  {searchedProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      {/* Image - Maintenant cliquable */}
                      <Link
                        to={getProductUrl(product)}
                        className="product-image-link"
                      >
                        <div className="product-image">
                          <img
                            src={
                              product.images && product.images.length > 0
                                ? product.images[0]
                                : ''
                            }
                            alt={product.name_fr}
                            onError={(e) => {
                              e.target.src =
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGN0U5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0QTdDMkEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJJTzwvdGV4dD4KPC9zdmc+';
                            }}
                          />
                        </div>
                      </Link>

                      <div className="product-info">
                        {/* Titre cliquable */}
                        <Link
                          to={getProductUrl(product)}
                          className="product-name-link"
                        >
                          <h3 className="product-name">{product.name_fr}</h3>
                        </Link>

                        {/* Description courte */}
                        {product.short_description_fr && (
                          <p className="product-description">
                            {product.short_description_fr}
                          </p>
                        )}

                        {/* Si pas de description courte, afficher un extrait de la description longue */}
                        {!product.short_description_fr &&
                          product.description_fr && (
                            <p className="product-description">
                              {product.description_fr.substring(0, 120)}...
                            </p>
                          )}

                        <div className="product-meta">
                          <div className="product-price">
                            {product.price ? product.price.toFixed(3) : '0.000'}{' '}
                            DT
                          </div>
                          <div
                            className={`product-stock ${
                              product.in_stock ? 'in-stock' : 'out-of-stock'
                            }`}
                          >
                            {product.in_stock ? 'En stock' : 'Sur commande'}
                          </div>
                        </div>

                        <button className="add-to-cart-btn">
                          Ajouter au panier
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

      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .catalog-page {
          min-height: 100vh;
          background: #f8f9fa;
        }

        /* CONTAINER */
        .container {
          max-width: 1536px;
          margin: 0 auto;
          padding: 0 30px;
        }

        /* Barre de recherche */
        .search-section {
          background: linear-gradient(135deg, #4a7c2a, #e67e22);
          padding: 25px 0;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .search-bar {
          display: flex;
          gap: 15px;
          max-width: 700px;
          margin: 0 auto;
        }

        .search-input {
          flex: 1;
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .search-btn {
          padding: 14px 30px;
          background: #2d5016;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          background: #1f3a0f;
          transform: translateY(-2px);
        }

        /* Layout principal */
        .catalog-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 30px;
          padding: 40px 0;
        }

        /* Sidebar */
        .categories-sidebar {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .sidebar-section h3 {
          margin: 0 0 20px 0;
          color: #2d5016;
          font-size: 1.3rem;
          border-bottom: 2px solid #e67e22;
          padding-bottom: 12px;
        }

        .categories-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .categories-list li {
          margin-bottom: 8px;
        }

        .category-item {
          width: 100%;
          padding: 12px 18px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          color: #555;
          font-size: 1rem;
          font-weight: 500;
        }

        .category-item:hover {
          background: linear-gradient(135deg, #f0f7e9, #ffe6d5);
          color: #e67e22;
          transform: translateX(5px);
        }

        .category-item.active {
          background: linear-gradient(135deg, #4a7c2a, #e67e22);
          color: white;
          box-shadow: 0 3px 12px rgba(234, 124, 34, 0.3);
        }

        /* Grille produits - 3 colonnes */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* Carte produit */
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 580px;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        /* Image 300px */
        .product-image {
          height: 300px;
          width: 100%;
          background: linear-gradient(135deg, #f0f7e9, #ffe6d5);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 16px 16px 0 0;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-image-link {
          display: block;
          text-decoration: none;
          cursor: pointer;
        }

        .product-image-link:hover .product-image img {
          transform: scale(1.08);
        }

        .product-info {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-name-link {
          text-decoration: none;
          color: inherit;
        }

        .product-name {
          margin: 0 0 12px 0;
          font-size: 1.25rem;
          color: #2d5016;
          font-weight: 700;
          line-height: 1.3;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .product-name-link:hover .product-name {
          color: #e67e22;
        }

        .product-description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 20px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #16a34a;
        }

        .product-stock {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .product-stock.in-stock {
          color: #16a34a;
          background: #e8f6ef;
        }

        .product-stock.out-of-stock {
          color: #e74c3c;
          background: #fde8e6;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 14px;
          background: #16a34a;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .add-to-cart-btn:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
        }

        /* Responsive */
        @media (min-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1199px) {
          .container {
            max-width: 1100px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 968px) {
          .catalog-layout {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .categories-sidebar {
            position: static;
            order: 1;
          }

          .products-main {
            order: 2;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 20px;
          }

          .search-bar {
            flex-direction: column;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .product-card {
            height: auto;
            min-height: 500px;
          }

          .product-image {
            height: 280px;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 15px;
          }

          .product-card {
            height: auto;
          }

          .product-image {
            height: 250px;
          }

          .product-info {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
