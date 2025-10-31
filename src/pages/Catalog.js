// components/Catalog.js
import { useState, useEffect } from 'react';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données simulées basées sur votre screenshot
  const mockCategories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'olives', name: "Huiles d'olive" },
    { id: 'fruits', name: 'Fruits' },
    { id: 'legumes', name: 'Légumes' },
  ];

  const mockProducts = [
    {
      id: 1,
      name: 'Pêches bio',
      description:
        "Des pêches bio, parfumées et juteuses, issues d'un verger cultivé sans pesticides de synthèse.",
      price: '9.500',
      category: 'fruits',
      inStock: true,
      image: '/images/peches-bio.jpg',
    },
    {
      id: 2,
      name: 'Oranges Bio (le kg)',
      description: 'Orange bio juteuses, cultivées sans pesticides.',
      price: '3.500',
      category: 'fruits',
      inStock: true,
      image: '/images/oranges-bio.jpg',
    },
    {
      id: 3,
      name: 'Carottes Bio (le kg)',
      description:
        'Des carottes bio croquantes et sucrées, cultivées dans un sol sain et exempt de traitements chimiques.',
      price: '2.800',
      category: 'legumes',
      inStock: true,
      image: '/images/carottes-bio.jpg',
    },
    {
      id: 4,
      name: "Huile d'Olive Extra Vierge Bio 500ml",
      description: "Huile d'olive bio 500ml première pression à froid",
      price: '12.500',
      category: 'olives',
      inStock: true,
      image: '/images/huile-olive-bio.jpg',
    },
    {
      id: 5,
      name: 'Tomates Bio (le kg)',
      description: 'Tomates bio savoureuses cultivées au soleil',
      price: '4.200',
      category: 'legumes',
      inStock: true,
      image: '/images/tomates-bio.jpg',
    },
    {
      id: 6,
      name: 'Pommes Bio (le kg)',
      description: 'Pommes bio croquantes et sucrées de saison',
      price: '5.500',
      category: 'fruits',
      inStock: true,
      image: '/images/pommes-bio.jpg',
    },
    {
      id: 7,
      name: 'Courgettes Bio (le kg)',
      description: 'Courgettes bio fraîches et tendres',
      price: '3.200',
      category: 'legumes',
      inStock: true,
      image: '/images/courgettes-bio.jpg',
    },
    {
      id: 8,
      name: 'Abricots Bio (le kg)',
      description: 'Abricots bio sucrés et parfumés',
      price: '7.800',
      category: 'fruits',
      inStock: true,
      image: '/images/abricots-bio.jpg',
    },
    {
      id: 9,
      name: "Huile d'Olive Vierge Bio 1L",
      description: "Huile d'olive bio 1L qualité supérieure",
      price: '18.500',
      category: 'olives',
      inStock: true,
      image: '/images/huile-olive-1L.jpg',
    },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? mockProducts
      : mockProducts.filter((product) => product.category === selectedCategory);

  const searchedProducts = filteredProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                  {mockCategories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`category-item ${
                          selectedCategory === category.id ? 'active' : ''
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Grille des produits - 3 COLONNES comme en production */}
            <main className="products-main">
              <div className="products-grid">
                {searchedProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    {/* Image carrée PLUS GRANDE (300px) */}
                    <div className="product-image">
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src =
                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGN0U5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0QTdDMkEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJJTzwvdGV4dD4KPC9zdmc+';
                        }}
                      />
                    </div>

                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">
                        {product.description}
                      </p>

                      <div className="product-footer">
                        <div className="product-price">{product.price} DT</div>
                        <div
                          className={`product-stock ${
                            product.inStock ? 'in-stock' : 'out-of-stock'
                          }`}
                        >
                          {product.inStock ? 'En stock' : 'Rupture'}
                        </div>
                      </div>

                      <button className="add-to-cart-btn">
                        🛒 Ajouter au panier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>

      <style jsx>{`
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

        /* ⭐ GRILLE PRODUITS - 3 COLONNES EXACTEMENT COMME EN PRODUCTION */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* 3 COLONNES FIXES */
          gap: 28px;
        }

        /* ⭐ CARTE PRODUIT - DIMENSIONS IDENTIQUES À LA PRODUCTION */
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 580px; /* Hauteur totale comme en production */
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        /* ⭐ IMAGE CARRÉE 300PX - EXACTEMENT COMME EN PRODUCTION */
        .product-image {
          height: 300px; /* IMAGE PLUS GRANDE */
          width: 100%;
          background: linear-gradient(135deg, #f0f7e9, #ffe6d5);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 16px 16px 0 0; /* Coins arrondis en haut */
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.08);
        }

        /* CONTENU DE LA CARTE */
        .product-info {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-name {
          margin: 0 0 12px 0;
          font-size: 1.25rem;
          color: #2d5016;
          font-weight: 700;
          line-height: 1.3;
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

        .product-footer {
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

        /* ⭐ BOUTON VERT COMME EN PRODUCTION */
        .add-to-cart-btn {
          width: 100%;
          padding: 14px;
          background: #16a34a; /* Vert identique à la production */
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

        /* ⭐ RESPONSIVE - IDENTIQUE À LA PRODUCTION */

        /* Grands écrans - 3 colonnes */
        @media (min-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Tablettes - 2 colonnes */
        @media (max-width: 1199px) {
          .container {
            max-width: 1100px;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Petits écrans - sidebar en haut */
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

        /* Mobile - 1 colonne */
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
