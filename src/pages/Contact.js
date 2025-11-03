import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

const Contact = () => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_URL}/settings`);
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'envoi (vous pouvez implémenter l'envoi d'email via backend)
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  const t = {
    fr: {
      title: 'Contactez-nous',
      subtitle: "Une question ? N'hésitez pas à nous contacter",
      nameLabel: 'Nom complet',
      namePlaceholder: 'Votre nom',
      emailLabel: 'Email',
      emailPlaceholder: 'votre@email.com',
      subjectLabel: 'Sujet',
      subjectPlaceholder: 'Objet de votre message',
      messageLabel: 'Message',
      messagePlaceholder: 'Votre message...',
      sendButton: 'Envoyer',
      sending: 'Envoi...',
      successMessage:
        'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
      contactInfo: 'Nos coordonnées',
      address: 'Adresse',
      phone: 'Téléphone',
      email: 'Email',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Have a question? Feel free to contact us',
      nameLabel: 'Full Name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'Subject of your message',
      messageLabel: 'Message',
      messagePlaceholder: 'Your message...',
      sendButton: 'Send',
      sending: 'Sending...',
      successMessage:
        'Message sent successfully! We will respond as soon as possible.',
      contactInfo: 'Contact Information',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
    },
  };

  const translations = t[language] || t.fr;

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {translations.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {translations.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
              {success && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg">
                  {translations.successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.nameLabel} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={translations.namePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.emailLabel} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={translations.emailPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                {/* Sujet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.subjectLabel} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={translations.subjectPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {translations.messageLabel} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={translations.messagePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
                  />
                </div>

                {/* Bouton */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-semibold transition-colors"
                >
                  <Send size={20} />
                  {loading ? translations.sending : translations.sendButton}
                </button>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-orange-50 dark:from-green-900/20 dark:to-orange-900/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {translations.contactInfo}
                </h2>

                <div className="space-y-6">
                  {/* Adresse */}
                  {settings.contact_address && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-600 text-white rounded-lg">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {translations.address}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {settings.contact_address}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Téléphone */}
                  {settings.contact_phone && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-500 text-white rounded-lg">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {translations.phone}
                        </h3>
                        <a
                          href={`tel:${settings.contact_phone}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                        >
                          {settings.contact_phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {settings.contact_email && (
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-600 text-white rounded-lg">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {translations.email}
                        </h3>
                        <a
                          href={`mailto:${settings.contact_email}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                        >
                          {settings.contact_email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Image décorative */}
              <div className="hidden lg:block">
                <img
                  src="https://bio-world.eu/images-mas/happyness-bio-world-min.jpg"
                  alt="Contact"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
