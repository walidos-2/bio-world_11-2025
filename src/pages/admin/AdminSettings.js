import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import axios from 'axios';
import {
  Save,
  Loader,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

const AdminSettings = () => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    console.log('🔄 Récupération des settings...');
    try {
      const response = await axios.get(`${API_URL}/settings`);
      console.log('✅ Settings reçus:', response.data);
      setSettings(response.data);
    } catch (error) {
      console.error('❌ Erreur récupération settings:', error);
      setMessage({
        type: 'error',
        text: 'Erreur lors du chargement des paramètres',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    console.log(`📝 Modification: ${key} = "${value}"`);
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      console.log('📦 Nouveaux settings:', newSettings);
      return newSettings;
    });
  };

  const handleSave = async () => {
    console.log('💾 ========== DÉBUT SAUVEGARDE ==========');
    console.log('📤 Settings à envoyer:', settings);

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      console.log('🔑 Token:', token ? 'Présent ✅' : 'Absent ❌');

      if (!token) {
        throw new Error('Token manquant - Veuillez vous reconnecter');
      }

      console.log('🚀 Envoi de la requête PUT...');
      const response = await axios.put(`${API_URL}/settings`, settings, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Status:', response.status);
      console.log('✅ Réponse complète:', response.data);

      if (response.data.settings) {
        console.log('🔄 Mise à jour des settings avec la réponse serveur');
        setSettings(response.data.settings);
      }

      setMessage({
        type: 'success',
        text: 'Paramètres enregistrés avec succès !',
      });

      // Vérifier que ça a bien été sauvegardé
      console.log(
        '🔍 Vérification: récupération des settings après sauvegarde...'
      );
      setTimeout(() => {
        fetchSettings();
      }, 500);

      setTimeout(() => setMessage({ type: '', text: '' }), 5000);

      console.log('✅ ========== FIN SAUVEGARDE ==========');
    } catch (error) {
      console.error('❌ ========== ERREUR SAUVEGARDE ==========');
      console.error('❌ Erreur complète:', error);
      console.error('❌ Message:', error.message);

      if (error.response) {
        console.error('❌ Status:', error.response.status);
        console.error('❌ Data:', error.response.data);
        console.error('❌ Headers:', error.response.headers);
      } else if (error.request) {
        console.error('❌ Requête envoyée mais pas de réponse:', error.request);
      }

      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Erreur lors de la sauvegarde';

      setMessage({ type: 'error', text: `Erreur: ${errorMessage}` });
      console.error('❌ ========== FIN ERREUR ==========');
    } finally {
      setSaving(false);
    }
  };

  const t = {
    fr: {
      title: 'Paramètres du Site',
      subtitle: 'Gérez les informations générales de votre site',
      general: 'Informations Générales',
      siteName: 'Nom du site',
      descriptionFr: 'Description (Français)',
      descriptionEn: 'Description (Anglais)',
      contact: 'Informations de Contact',
      email: 'Email',
      phone: 'Téléphone',
      address: 'Adresse',
      social: 'Réseaux Sociaux',
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      youtube: 'YouTube',
      save: 'Enregistrer',
      saving: 'Enregistrement...',
      placeholder: 'Laisser vide pour désactiver',
    },
    en: {
      title: 'Site Settings',
      subtitle: 'Manage your website general information',
      general: 'General Information',
      siteName: 'Site name',
      descriptionFr: 'Description (French)',
      descriptionEn: 'Description (English)',
      contact: 'Contact Information',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      social: 'Social Networks',
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      youtube: 'YouTube',
      save: 'Save',
      saving: 'Saving...',
      placeholder: 'Leave empty to disable',
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
        <div className="max-w-4xl mx-auto">
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

          <div className="space-y-8">
            {/* Informations Générales */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="text-green-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {translations.general}
                </h2>
              </div>

              <div className="space-y-4">
                {/* Nom du site */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.siteName}
                  </label>
                  <input
                    type="text"
                    value={settings.site_name || ''}
                    onChange={(e) => handleChange('site_name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Description FR */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.descriptionFr}
                  </label>
                  <textarea
                    value={settings.site_description_fr || ''}
                    onChange={(e) =>
                      handleChange('site_description_fr', e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Description EN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.descriptionEn}
                  </label>
                  <textarea
                    value={settings.site_description_en || ''}
                    onChange={(e) =>
                      handleChange('site_description_en', e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
            </div>

            {/* Informations de Contact */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="text-green-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {translations.contact}
                </h2>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      {translations.email}
                    </div>
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email || ''}
                    onChange={(e) =>
                      handleChange('contact_email', e.target.value)
                    }
                    placeholder="contact@exemple.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      {translations.phone}
                    </div>
                  </label>
                  <input
                    type="text"
                    value={settings.contact_phone || ''}
                    onChange={(e) =>
                      handleChange('contact_phone', e.target.value)
                    }
                    placeholder="+216 XX XXX XXX"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Adresse */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {translations.address}
                    </div>
                  </label>
                  <input
                    type="text"
                    value={settings.contact_address || ''}
                    onChange={(e) =>
                      handleChange('contact_address', e.target.value)
                    }
                    placeholder="Tunis, Tunisie"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
            </div>

            {/* Réseaux Sociaux */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Facebook className="text-green-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {translations.social}
                </h2>
              </div>

              <div className="space-y-4">
                {/* Facebook */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Facebook size={16} />
                      {translations.facebook}
                    </div>
                  </label>
                  <input
                    type="url"
                    value={settings.social_facebook || ''}
                    onChange={(e) =>
                      handleChange('social_facebook', e.target.value)
                    }
                    placeholder="https://facebook.com/votrepage"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {translations.placeholder}
                  </p>
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Instagram size={16} />
                      {translations.instagram}
                    </div>
                  </label>
                  <input
                    type="url"
                    value={settings.social_instagram || ''}
                    onChange={(e) =>
                      handleChange('social_instagram', e.target.value)
                    }
                    placeholder="https://instagram.com/votrepage"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {translations.placeholder}
                  </p>
                </div>

                {/* Twitter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Twitter size={16} />
                      {translations.twitter}
                    </div>
                  </label>
                  <input
                    type="url"
                    value={settings.social_twitter || ''}
                    onChange={(e) =>
                      handleChange('social_twitter', e.target.value)
                    }
                    placeholder="https://twitter.com/votrepage"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {translations.placeholder}
                  </p>
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Linkedin size={16} />
                      {translations.linkedin}
                    </div>
                  </label>
                  <input
                    type="url"
                    value={settings.social_linkedin || ''}
                    onChange={(e) =>
                      handleChange('social_linkedin', e.target.value)
                    }
                    placeholder="https://linkedin.com/company/votrepage"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {translations.placeholder}
                  </p>
                </div>

                {/* YouTube */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <div className="flex items-center gap-2">
                      <Youtube size={16} />
                      {translations.youtube}
                    </div>
                  </label>
                  <input
                    type="url"
                    value={settings.social_youtube || ''}
                    onChange={(e) =>
                      handleChange('social_youtube', e.target.value)
                    }
                    placeholder="https://youtube.com/c/votrepage"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {translations.placeholder}
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton Enregistrer */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                <Save size={24} />
                {saving ? translations.saving : translations.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
