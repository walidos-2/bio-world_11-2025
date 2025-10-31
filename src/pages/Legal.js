import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Legal = () => {
  const { language } = useLanguage();

  return (
    <div className="py-12" data-testid="legal-page">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {language === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
          </h1>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Éditeur du site' : 'Website Publisher'}
              </h2>
              <p><strong>Happyness Bio World</strong></p>
              <p>26 Rue d'Egypte</p>
              <p>1002 Tunis, Tunisie</p>
              <p>Email : Happybioworld@hexabyte.tn</p>
              <p>Téléphone : +216 27 092 610</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Directeur de la publication' : 'Publication Director'}
              </h2>
              <p>IHEB GHOUILI - Directeur Technique</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Hébergement' : 'Hosting'}
              </h2>
              <p>Emergent.sh</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Propriété intellectuelle' : 'Intellectual Property'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'L\'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de Happyness Bio World. Toute reproduction, même partielle, est interdite sans autorisation préalable.'
                  : 'All content on this site (text, images, logos) is the exclusive property of Happyness Bio World. Any reproduction, even partial, is prohibited without prior authorization.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Protection des données personnelles' : 'Personal Data Protection'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Conformément à la loi, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous à : Happybioworld@hexabyte.tn'
                  : 'In accordance with the law, you have the right to access, rectify and delete your personal data. To exercise this right, contact us at: Happybioworld@hexabyte.tn'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? 'Cookies' : 'Cookies'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Ce site utilise des cookies pour améliorer votre expérience de navigation et mémoriser vos préférences (langue, thème).'
                  : 'This site uses cookies to improve your browsing experience and remember your preferences (language, theme).'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;