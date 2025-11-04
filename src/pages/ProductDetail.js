import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';

// Configuration de l'API - Utilisation de la même URL que Catalog.js
const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('catalog.noProducts')}
          </h2>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ArrowLeft size={20} />
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8" data-testid="product-detail-page">
      <div className="container mx-auto px-4">
        {/* Bouton retour amélioré */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-4">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={language === 'fr' ? product.name_fr : product.name_en}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-green-600'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${
                        language === 'fr' ? product.name_fr : product.name_en
                      } ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              data-testid="product-name"
            >
              {language === 'fr' ? product.name_fr : product.name_en}
            </h1>

            {/* Description courte - NOUVEAU */}
            {product.short_description_fr && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                {language === 'fr'
                  ? product.short_description_fr
                  : product.short_description_en}
              </p>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-4xl font-bold text-green-600 dark:text-green-400"
                data-testid="product-price"
              >
                {product.price ? product.price.toFixed(3) : '0.000'} DT
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.in_stock
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                }`}
              >
                {product.in_stock
                  ? t('product.inStock')
                  : t('product.availableOnOrder')}
              </span>
            </div>

            {/* Description longue */}
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {language === 'fr'
                ? product.description_fr
                : product.description_en}
            </p>

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('common.quantity')}
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  data-testid="decrease-quantity"
                >
                  <Minus size={20} />
                </button>
                <span
                  className="text-2xl font-semibold w-12 text-center"
                  data-testid="quantity-display"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  data-testid="increase-quantity"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg transition-colors"
              data-testid="add-to-cart-button"
            >
              <ShoppingCart size={24} />
              {t('common.addToCart')}
            </button>

            {/* Mascot */}
            {product.mascot_icon && (
              <div className="mt-8 flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <img
                  src={product.mascot_icon}
                  alt="Bio-World Mascot"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {language === 'fr'
                      ? 'Produit certifié Bio-World'
                      : 'Bio-World Certified Product'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'fr'
                      ? 'Qualité biologique garantie'
                      : 'Guaranteed organic quality'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
