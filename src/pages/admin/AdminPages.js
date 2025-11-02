import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import axios from 'axios';
import { Edit, Save, X, CheckCircle, XCircle, Loader } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

const AdminPages = () => {
  const { language } = useLanguage();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/pages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      setMessage({
        type: 'error',
        text: 'Erreur lors du chargement des pages',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page) => {
    setEditingPage(page.id);
    setFormData(page);
    setMessage({ type: '', text: '' });
  };

  const handleCancel = () => {
    setEditingPage(null);
    setFormData({});
    setMessage({ type: '', text: '' });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/pages/${editingPage}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: 'success', text: 'Page mise à jour avec succès !' });
      fetchPages();
      setEditingPage(null);
      setFormData({});

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error saving page:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  const t = {
    fr: {
      title: 'Gestion des Pages',
      subtitle: 'Modifiez le contenu des pages de votre site',
      slug: 'Slug',
      titleFr: 'Titre (Français)',
      titleEn: 'Titre (Anglais)',
      contentFr: 'Contenu (Français)',
      contentEn: 'Contenu (Anglais)',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler',
      saving: 'Enregistrement...',
      status: 'Statut',
    },
    en: {
      title: 'Page Management',
      subtitle: 'Edit your website pages content',
      slug: 'Slug',
      titleFr: 'Title (French)',
      titleEn: 'Title (English)',
      contentFr: 'Content (French)',
      contentEn: 'Content (English)',
      active: 'Active',
      inactive: 'Inactive',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      saving: 'Saving...',
      status: 'Status',
    },
  };

  const translations = t[language] || t.fr;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-green-600" size={48} />
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {translations.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {translations.subtitle}
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Liste des pages */}
        <div className="space-y-6">
          {pages.map((page) => (
            <div
              key={page.id}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
            >
              {editingPage === page.id ? (
                // Mode Édition
                <div className="space-y-4">
                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {translations.slug}
                    </label>
                    <input
                      type="text"
                      value={formData.slug || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    />
                  </div>

                  {/* Titre FR */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {translations.titleFr}
                    </label>
                    <input
                      type="text"
                      value={formData.title_fr || ''}
                      onChange={(e) => handleChange('title_fr', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  {/* Titre EN */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {translations.titleEn}
                    </label>
                    <input
                      type="text"
                      value={formData.title_en || ''}
                      onChange={(e) => handleChange('title_en', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  {/* Contenu FR */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {translations.contentFr}
                    </label>
                    <textarea
                      value={formData.content_fr || ''}
                      onChange={(e) =>
                        handleChange('content_fr', e.target.value)
                      }
                      rows={10}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 font-mono text-sm"
                    />
                  </div>

                  {/* Contenu EN */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {translations.contentEn}
                    </label>
                    <textarea
                      value={formData.content_en || ''}
                      onChange={(e) =>
                        handleChange('content_en', e.target.value)
                      }
                      rows={10}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 font-mono text-sm"
                    />
                  </div>

                  {/* Statut */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.is_active === 1}
                      onChange={(e) =>
                        handleChange('is_active', e.target.checked ? 1 : 0)
                      }
                      className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-600"
                    />
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {translations.active}
                    </label>
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Save size={20} />
                      {saving ? translations.saving : translations.save}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
                    >
                      <X size={20} />
                      {translations.cancel}
                    </button>
                  </div>
                </div>
              ) : (
                // Mode Lecture
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {language === 'fr' ? page.title_fr : page.title_en}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {translations.slug}: {page.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {page.is_active ? (
                        <span className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                          <CheckCircle size={16} />
                          {translations.active}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 rounded-full text-sm font-semibold">
                          <XCircle size={16} />
                          {translations.inactive}
                        </span>
                      )}
                      <button
                        onClick={() => handleEdit(page)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        <Edit size={20} />
                        {translations.edit}
                      </button>
                    </div>
                  </div>

                  <div className="prose dark:prose-invert max-w-none">
                    <div
                      className="text-gray-600 dark:text-gray-400"
                      dangerouslySetInnerHTML={{
                        __html:
                          (language === 'fr'
                            ? page.content_fr
                            : page.content_en
                          ).substring(0, 200) + '...',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPages;
