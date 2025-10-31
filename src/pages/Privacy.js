import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy = () => {
  const { language } = useLanguage();

  return (
    <div className="py-12" data-testid="privacy-page">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
          </h1>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '1. Collecte des données' : '1. Data Collection'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Happyness Bio World collecte les données personnelles suivantes : nom, prénom, email, téléphone, adresse de livraison. Ces données sont nécessaires pour le traitement de vos commandes.'
                  : 'Happyness Bio World collects the following personal data: first name, last name, email, phone, delivery address. This data is necessary for processing your orders.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '2. Utilisation des données' : '2. Data Usage'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Vos données personnelles sont utilisées uniquement pour : gérer vos commandes, vous contacter concernant votre commande, améliorer nos services.'
                  : 'Your personal data is used only to: manage your orders, contact you regarding your order, improve our services.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '3. Protection des données' : '3. Data Protection'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte ou destruction.'
                  : 'We implement all appropriate technical and organizational measures to protect your personal data against unauthorized access, loss or destruction.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '4. Vos droits' : '4. Your Rights'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Vous disposez d\'un droit d\'accès, de rectification, de suppression et d\'opposition au traitement de vos données personnelles. Pour exercer ces droits, contactez-nous à : Happybioworld@hexabyte.tn'
                  : 'You have the right to access, rectify, delete and object to the processing of your personal data. To exercise these rights, contact us at: Happybioworld@hexabyte.tn'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '5. Cookies' : '5. Cookies'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies stockent vos préférences de langue et de thème. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.'
                  : 'Our site uses cookies to improve your browsing experience. Cookies store your language and theme preferences. You can disable cookies in your browser settings.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '6. Conservation des données' : '6. Data Retention'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Vos données personnelles sont conservées pendant la durée nécessaire à la réalisation des finalités mentionnées ci-dessus et conformément à la réglementation en vigueur.'
                  : 'Your personal data is kept for the time necessary to achieve the purposes mentioned above and in accordance with applicable regulations.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '7. Contact' : '7. Contact'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Pour toute question concernant cette politique de confidentialité :'
                  : 'For any questions regarding this privacy policy:'}
              </p>
              <p>Email : Happybioworld@hexabyte.tn</p>
              <p>Téléphone : +216 27 092 610</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;