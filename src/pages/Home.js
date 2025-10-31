import API_URL from '../config';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Home = () => {
  const { language, t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}/products?featured=true`),
        axios.get(`${API_URL}/categories`)
      ]);
      
      setFeaturedProducts(productsRes.data.slice(0, 4));
      setCategories(categoriesRes.data.filter(cat => !cat.parent_id));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-orange-500 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-testid="hero-title">
              Happyness Bio World
            </h1>
            <p className="text-xl mb-4" data-testid="hero-description">
              {t('home.hero.description')}
            </p>
            <p className="text-lg font-medium italic mb-8">
              {language === 'fr' ? 'La Joie de se Reconnecter avec la Nature Saine' : 'The Joy of Reconnecting with Healthy Nature'}
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 hover:bg-green-50 rounded-lg font-semibold transition-colors text-lg shadow-lg"
              data-testid="hero-cta-button"
            >
              {t('home.hero.cta')}
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.categories.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('home.categories.subtitle')}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map(category => (
                <Link
                  key={category.id}
                  to={`/catalog?category=${category.id}`}
                  className="group bg-gray-50 dark:bg-gray-900 rounded-xl p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-600"
                  data-testid={`category-card-${category.slug}`}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-4">🌿</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {language === 'fr' ? category.name_fr : category.name_en}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.featured.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('home.featured.subtitle')}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  data-testid={`product-card-${product.slug}`}
                >
                  <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={language === 'fr' ? product.name_fr : product.name_en}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={64} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {language === 'fr' ? product.name_fr : product.name_en}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                      {language === 'fr' ? product.short_description_fr : product.short_description_en}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {product.price.toFixed(3)} DT
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {product.in_stock ? t('catalog.inStock') : t('catalog.onOrder')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              {t('catalog.title')}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
