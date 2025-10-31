// components/Catalog.js
import { useState, useEffect } from 'react';

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données simulées basées sur votre screenshot
  const mockCategories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'olives', name: 'Huiles d\'olive' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'legumes', name: 'Légumes' }
  ];

  const mockProducts = [
    {
      id: 1,
      name: 'Pêches bio',
      description: 'Des pêches bio, parfumées et juteuses, issues d\'un verger cultivé sans pesticides de synthèse.',
      price: '9.500',
      category: 'fruits',
      inStock: true,
      image: '/images/peches-bio.jpg'
    },
    {
      id: 2,
      name: 'Oranges Bio (le kg)',
      description: 'Orange bio juteuses, cultivées sans pesticides.',
      price: '3.500',
      category: 'fruits',
      inStock: true,
      image: '/images/oranges-bio.jpg'
    },
    {
      id: 3,
      name: 'Carottes Bio (le kg)',
      description: 'Des carottes bio croquantes et sucrées, cultivées dans un sol sain et exempt de traitements chimiques.',
      price: '2.800',
      category: 'legumes',
      inStock: true,
      image: '/images/carottes-bio.jpg'
    },
    {
      id: 4,
      name: 'Huile d\'Olive Extra Vierge Bio 500ml',
      description: 'Huile d\'olive bio 500ml première pression à froid',
      price: '12.500',
      category: 'olives',
      inStock: true,
      image: '/images/huile-olive-bio.jpg'
    },
    {
      id: 5,
      name: 'Tomates Bio (le kg)',
      description: 'Tomates bio savoureuses cultivées au soleil',
      price: '4.200',
      category: 'legumes',
      inStock: true,
      image: '/images/tomates-bio.jpg'
    },
    {
      id: 6,
      name: 'Pommes Bio (le kg)',
      description: 'Pommes bio croquantes et sucrées de saison',
      price: '5.500',
      category: 'fruits',
      inStock: true,
      image: '/images/pommes-bio.jpg'
    },
    {
      id: 7,
      name: 'Courgettes Bio (le kg)',
      description: 'Courgettes bio fraîches et tendres',
      price: '3.200',
      category: 'legumes',
      inStock: true,
      image: '/images/courgettes-bio.jpg'
    },
    {
      id: 8,
      name: 'Abricots Bio (le kg)',
      description: 'Abricots bio sucrés et parfumés',
      price: '7.800',
      category: 'fruits',
      inStock: true,
      image: '/images/abricots-bio.jpg'
    },
    {
      id: 9,
      name: 'Huile d\'Olive Vierge Bio 1L',
      description: 'Huile d\'olive bio 1L qualité supérieure',
      price: '18.500',
      category: 'olives',
      inStock: true,
      image: '/images/huile-olive-1L.jpg'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  const searchedProducts = filteredProducts.filter(product =>
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
            <button className="search-btn">
              🔍 Rechercher
            </button>
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
                  {mockCategories.map(category => (
                    <li key={category.id}>
                      <button
                        className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Grille des produits - 3 colonnes avec plus d'espace */}
            <main className="products-main">
              <div className="products-grid">
                {searchedProducts.map(product => (
                  <div key={product.id} className="product-card">
                    {/* Image carrée */}
                    <div className="product-image">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGN0U5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0QTdDMkEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkJJTzwvdGV4dD4KPC9zdmc+';
                        }}
                      />
                    </div>
                    
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">
                        {product.description}
                      </p>
                      
                      <div className="product-meta">
                        <div className="product-price">{product.price} DT</div>
                        <div className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                          {product.inStock ? 'En stock' : 'Rupture'}
                        </div>
                      </div>
                      
                      <button className="add-to-cart-btn">
                        Ajouter au panier
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

        /* CONTAINER BEAUCOUP PLUS LARGE */
        .container {
          max-width: 1600px; /* Augmenté de 1200px à 1600px */
          margin: 0 auto;
          padding: 0 40px; /* Plus d'espace sur les côtés */
        }

        /* Barre de recherche */
        .search-section {
          background: linear-gradient(135deg, #4a7c2a, #e67e22);
          padding: 25px 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .search-bar {
          display: flex;
          gap: 15px;
          max-width: 800px; /* Plus large */
          margin: 0 auto;
        }

        .search-input {
          flex: 1;
          padding: 15px 25px;
          border: none;
          border-radius: 30px;
          font-size: 1.1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .search-btn {
          padding: 15px 35px;
          background: #2d5016;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          background: #1f3a0f;
          transform: translateY(-2px);
        }

        /* Layout principal avec plus d'espace */
        .catalog-layout {
          display: grid;
          grid-template-columns: 280px 1fr; /* Sidebar un peu plus large */
          gap: 50px; /* Plus d'espace entre sidebar et produits */
          padding: 50px 0; /* Plus d'espace vertical */
        }

        /* Sidebar */
        .categories-sidebar {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          height: fit-content;
        }

        .sidebar-section h3 {
          margin: 0 0 25px 0;
          color: #2d5016;
          font-size: 1.4rem;
          border-bottom: 3px solid #e67e22;
          padding-bottom: 15px;
        }

        .categories-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .categories-list li {
          margin-bottom: 12px;
        }

        .category-item {
          width: 100%;
          padding: 16px 22px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.3s ease;
          color: #555;
          font-size: 1.05rem;
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
          box-shadow: 0 4px 15px rgba(234, 124, 34, 0.3);
        }

        /* Grille produits - 3 colonnes avec plus d'espace */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 35px; /* Plus d'espace entre les cartes */
        }

        /* Carte produit plus spacieuse */
        .product-card {
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          height: 520px; /* Encore plus haute */
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
        }

        /* Image carrée plus grande */
        .product-image {
          height: 250px; /* Encore plus grand */
          width: 100%;
          background: linear-gradient(135deg, #f0f7e9, #ffe6d5);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .product-info {
          padding: 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-name {
          margin: 0 0 15px 0;
          font-size: 1.4rem;
          color: #2d5016;
          font-weight: 700;
          line-height: 1.3;
        }

        .product-description {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 25px;
          flex: 1;
        }

        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }

        .product-price {
          font-size: 1.6rem;
          font-weight: bold;
          color: #e67e22;
          background: linear-gradient(135deg, #e67e22, #ff8c42);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .product-stock {
          font-size: 0.9rem;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 20px;
        }

        .product-stock.in-stock {
          color: #27ae60;
          background: #e8f6ef;
        }

        .product-stock.out-of-stock {
          color: #e74c3c;
          background: #fde8e6;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #4a7c2a, #e67e22);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 700;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .add-to-cart-btn:hover {
          background: linear-gradient(135deg, #3a641a, #d35400);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(234, 124, 34, 0.4);
        }

        /* Responsive pour très grands écrans */
        @media (min-width: 1800px) {
          .container {
            max-width: 1700px;
          }
          
          .products-grid {
            grid-template-columns: repeat(4, 1fr); /* 4 colonnes sur très grands écrans */
          }
        }

        @media (max-width: 1400px) {
          .container {
            max-width: 1300px;
          }
          
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 1200px) {
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
            gap: 30px;
          }
          
          .categories-sidebar {
            order: 2;
          }
          
          .products-main {
            order: 1;
          }
          
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .container {
            max-width: 100%;
            padding: 0 20px;
          }
          
          .search-bar {
            flex-direction: column;
          }
          
          .products-grid {
            grid-template-columns: 1fr;
          }
          
          .product-card {
            height: auto;
            min-height: 480px;
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
            height: 220px;
          }
        }
      `}</style>
    </div>
  );
}