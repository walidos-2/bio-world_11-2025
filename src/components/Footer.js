import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

const Footer = () => {
  const { language } = useLanguage();
  const [settings, setSettings] = useState({});

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

  const t = {
    fr: {
      description:
        "Découvrez notre sélection de produits bio : huiles d'olive, fruits et légumes frais cultivés sans pesticides",
      catalog: 'Catalogue',
      catalogLink: 'Catalogue',
      about: 'À propos',
      contact: 'Contact',
      legal: 'Mentions légales',
      legalLinks: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions générales',
      followUs: 'Suivez-nous',
      rights: (
        <>
          Powered & designed by{' '}
          <a
            href="https://ewek.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#FFD700',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            Eng&nbsp;EWEK
          </a>
          , Tous droits réservés.
        </>
      ),
    },
    en: {
      description:
        'Discover our selection of organic products: olive oils, fresh fruits and vegetables grown without pesticides',
      catalog: 'Catalog',
      catalogLink: 'Catalog',
      about: 'About Us',
      contact: 'Contact',
      legal: 'Legal Notice',
      legalLinks: 'Legal Notice',
      privacy: 'Privacy Policy',
      terms: 'Terms and Conditions',
      followUs: 'Follow Us',
      rights: (
        <>
          Powered & designed by{' '}
          <a
            href="https://ewek.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#FFD700',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            Eng&nbsp;EWEK
          </a>
          , All rights reserved.
        </>
      ),
    },
  };

  const translations = t[language] || t.fr;

  // Descriptions depuis les settings ou fallback
  const description =
    language === 'fr'
      ? settings.site_description_fr || translations.description
      : settings.site_description_en || translations.description;

  const siteName = settings.site_name || 'Happyness Bio World';

  // Réseaux sociaux disponibles
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: settings.social_facebook,
      color: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: settings.social_instagram,
      color: 'hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: settings.social_twitter,
      color: 'hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: settings.social_linkedin,
      color: 'hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: settings.social_youtube,
      color: 'hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20',
    },
  ].filter((social) => social.url && social.url.trim() !== ''); // Ne garder que les réseaux configurés

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-orange-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1 : À propos */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{siteName}</h3>
            <p className="text-green-100 leading-relaxed">{description}</p>
          </div>

          {/* Section 2 : Catalogue */}
          <div>
            <h4 className="text-xl font-semibold mb-4">
              {translations.catalog}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/catalog"
                  className="text-green-100 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  {translations.catalogLink}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-green-100 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  {translations.about}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-green-100 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  {translations.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3 : Mentions légales */}
          <div>
            <h4 className="text-xl font-semibold mb-4">
              {translations.legalLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/legal"
                  className="text-green-100 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  {translations.legal}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-green-100 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  {translations.privacy}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-green-100 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                >
                  {translations.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4 : Réseaux sociaux */}
          <div>
            <h4 className="text-xl font-semibold mb-4">
              {translations.followUs}
            </h4>
            {socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/10 rounded-full transition-all hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                    title={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-green-100 text-sm italic">
                {language === 'fr'
                  ? 'Configurez vos réseaux sociaux dans les paramètres admin'
                  : 'Configure your social networks in admin settings'}
              </p>
            )}
          </div>
        </div>

        {/* Bas du footer */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-green-100">
            © {new Date().getFullYear()} {siteName}. {translations.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
