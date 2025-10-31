import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import API_URL from '../../config';
import { ArrowLeft, Save } from 'lucide-react';

const ProductForm = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { token } = useAuth();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name_fr: '',
    name_en: '',
    slug: '',
    description_fr: '',
    description_en: '',
    short_description_fr: '',
    short_description_en: '',
    price: '',
    category_id: '',
    subcategory_id: '',
    images: '',
    mascot_icon: '',
    in_stock: true,
    available_on_order: true,
    featured: false,
    meta_title_fr: '',
    meta_title_en: '',
    meta_description_fr: '',
    meta_description_en: ''
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      const product = response.data;
      setFormData({
        name_fr: product.name_fr || '',
        name_en: product.name_en || '',
        slug: product.slug || '',
        description_fr: product.description_fr || '',
        description_en: product.description_en || '',
        short_description_fr: product.short_description_fr || '',
        short_description_en: product.short_description_en || '',
        price: product.price ? product.price.toString() : '',
        category_id: product.category_id || '',
        subcategory_id: product.subcategory_id || '',
        images: product.images ? product.images.join('\n') : '',
        mascot_icon: product.mascot_icon || '',
        in_stock: product.in_stock !== undefined ? product.in_stock : true,
        available_on_order: product.available_on_order !== undefined ? product.available_on_order : true,
        featured: product.featured || false,
        meta_title_fr: product.meta_title_fr || '',
        meta_title_en: product.meta_title_en || '',
        meta_description_fr: product.meta_description_fr || '',
        meta_description_en: product.meta_description_en || ''
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Erreur lors du chargement du produit');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      name_fr: value,
      slug: generateSlug(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Préparer les données pour l'API
      const submitData = {
        name_fr: formData.name_fr,
        name_en: formData.name_en,
        slug: formData.slug,
        description_fr: formData.description_fr,
        description_en: formData.description_en,
        short_description_fr: formData.short_description_fr,
        short_description_en: formData.short_description_en,
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        subcategory_id: formData.subcategory_id || null,
        images: formData.images.split('\n').filter(url => url.trim()),
        mascot_icon: formData.mascot_icon || null,
        in_stock: formData.in_stock,
        available_on_order: formData.available_on_order,
        featured: formData.featured,
        meta_title_fr: formData.meta_title_fr || null,
        meta_title_en: formData.meta_title_en || null,
        meta_description_fr: formData.meta_description_fr || null,
        meta_description_en: formData.meta_description_en || null
      };

      console.log('📤 Données envoyées:', submitData);

      if (isEdit) {
        await axios.put(`${API_URL}/products/${id}`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/products`, submitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      navigate('/admin/products');
    } catch (err) {
      console.error('❌ Erreur détaillée:', err);
      setError(err.response?.data?.detail || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  const mainCategories = categories.filter(cat => !cat.parent_id);
  const subcategories = categories.filter(cat => cat.parent_id === formData.category_id);

  return (
    <div className="py-8" data-testid="product-form">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 mb-6"
        >
          <ArrowLeft size={20} />
          {language === 'fr' ? 'Retour aux produits' : 'Back to products'}
        </button>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {isEdit 
            ? (language === 'fr' ? 'Modifier le produit' : 'Edit Product')
            : (language === 'fr' ? 'Ajouter un produit' : 'Add Product')}
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md space-y-6">
          {/* Noms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Nom (Français)' : 'Name (French)'} *
              </label>
              <input
                type="text"
                name="name_fr"
                value={formData.name_fr}
                onChange={handleNameChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Nom (Anglais)' : 'Name (English)'} *
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Prix et Catégories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Prix (DT)' : 'Price (TND)'} *
              </label>
              <input
                type="number"
                step="0.001"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Catégorie' : 'Category'} *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                <option value="">{language === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
                {mainCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'fr' ? cat.name_fr : cat.name_en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Sous-catégorie' : 'Subcategory'}
              </label>
              <select
                name="subcategory_id"
                value={formData.subcategory_id}
                onChange={handleChange}
                disabled={!formData.category_id || subcategories.length === 0}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
              >
                <option value="">{language === 'fr' ? 'Aucune' : 'None'}</option>
                {subcategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'fr' ? cat.name_fr : cat.name_en}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Descriptions courtes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Description courte (FR)' : 'Short Description (FR)'} *
              </label>
              <textarea
                name="short_description_fr"
                value={formData.short_description_fr}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Description courte (EN)' : 'Short Description (EN)'} *
              </label>
              <textarea
                name="short_description_en"
                value={formData.short_description_en}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Descriptions complètes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Description complète (FR)' : 'Full Description (FR)'} *
              </label>
              <textarea
                name="description_fr"
                value={formData.description_fr}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === 'fr' ? 'Description complète (EN)' : 'Full Description (EN)'} *
              </label>
              <textarea
                name="description_en"
                value={formData.description_en}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URLs des images (une par ligne)
            </label>
            <textarea
              name="images"
              value={formData.images}
              onChange={handleChange}
              rows={4}
              placeholder="https://exemple.com/image1.jpg&#10;https://exemple.com/image2.jpg"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Mascotte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL de l'icône mascotte
            </label>
            <input
              type="text"
              name="mascot_icon"
              value={formData.mascot_icon}
              onChange={handleChange}
              placeholder="https://bio-world.eu/images-mas/..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="in_stock"
                checked={formData.in_stock}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 focus:ring-green-600 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'En stock' : 'In Stock'}
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="available_on_order"
                checked={formData.available_on_order}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 focus:ring-green-600 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Disponible sur commande' : 'Available on Order'}
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 focus:ring-green-600 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Produit phare' : 'Featured Product'}
              </span>
            </label>
          </div>

          {/* Boutons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-semibold transition-colors"
            >
              <Save size={20} />
              {loading ? t('common.loading') : (language === 'fr' ? 'Enregistrer' : 'Save')}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
            >
              {t('account.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;