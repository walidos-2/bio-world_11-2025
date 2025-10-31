import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import API_URL from '../../config';
import { Edit2, Trash2, Plus, FolderTree } from 'lucide-react';

const AdminCategories = () => {
  const { language, t } = useLanguage();
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name_fr: '',
    name_en: '',
    slug: '',
    parent_id: '',
    order: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name_fr: category.name_fr,
        name_en: category.name_en,
        slug: category.slug,
        parent_id: category.parent_id || '',
        order: category.order
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name_fr: '',
        name_en: '',
        slug: '',
        parent_id: '',
        order: 0
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    try {
      if (editingCategory) {
        await axios.put(`${API_URL}/categories/${editingCategory.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/categories`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving category:', error);
      alert(language === 'fr' ? 'Erreur lors de l\'enregistrement' : 'Error saving category');
    }
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm(language === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cette catégorie ?' : 'Are you sure you want to delete this category?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(categories.filter(c => c.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      alert(language === 'fr' ? 'Erreur lors de la suppression' : 'Error deleting category');
    }
  };

  const mainCategories = categories.filter(cat => !cat.parent_id);
  const getSubcategories = (parentId) => categories.filter(cat => cat.parent_id === parentId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-8" data-testid="admin-categories">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t('admin.categories')}
          </h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white rounded-lg font-semibold transition-colors"
            data-testid="add-category-button"
          >
            <Plus size={20} />
            {language === 'fr' ? 'Ajouter une catégorie' : 'Add Category'}
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg p-12 shadow-md text-center">
            <FolderTree size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {language === 'fr' ? 'Aucune catégorie pour le moment' : 'No categories yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {mainCategories.map(category => (
              <div key={category.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {language === 'fr' ? category.name_fr : category.name_en}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Slug: {category.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      data-testid={`edit-category-${category.id}`}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      data-testid={`delete-category-${category.id}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {getSubcategories(category.id).length > 0 && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {language === 'fr' ? 'Sous-catégories' : 'Subcategories'}:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {getSubcategories(category.id).map(subcat => (
                        <div
                          key={subcat.id}
                          className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-md"
                        >
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {language === 'fr' ? subcat.name_fr : subcat.name_en}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenModal(subcat)}
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(subcat.id)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {editingCategory
                    ? (language === 'fr' ? 'Modifier la catégorie' : 'Edit Category')
                    : (language === 'fr' ? 'Ajouter une catégorie' : 'Add Category')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Slug *
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'fr' ? 'Catégorie parente' : 'Parent Category'}
                    </label>
                    <select
                      name="parent_id"
                      value={formData.parent_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    >
                      <option value="">{language === 'fr' ? 'Aucune (catégorie principale)' : 'None (main category)'}</option>
                      {mainCategories
                        .filter(cat => !editingCategory || cat.id !== editingCategory.id)
                        .map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {language === 'fr' ? cat.name_fr : cat.name_en}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {language === 'fr' ? 'Ordre d\'affichage' : 'Display Order'}
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      {language === 'fr' ? 'Enregistrer' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
                    >
                      {t('account.cancel')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;