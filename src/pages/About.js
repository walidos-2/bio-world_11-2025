import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Leaf, Heart, Users } from 'lucide-react';

const About = () => {
  const { language, t } = useLanguage();

  return (
    <div className="py-12" data-testid="about-page">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-white mb-6">
            {t('footer.about')}
          </h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
            {t('home.hero.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Leaf className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'fr' ? 'Agriculture Biologique' : 'Organic Farming'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'fr'
                  ? 'Nos produits sont cultivés sans pesticides ni engrais chimiques, dans le respect de l\'environnement.'
                  : 'Our products are grown without pesticides or chemical fertilizers, respecting the environment.'}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Heart className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'fr' ? 'Qualité Premium' : 'Premium Quality'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'fr'
                  ? 'Nous sélectionnons rigoureusement nos produits pour vous offrir le meilleur de l\'agriculture biologique.'
                  : 'We carefully select our products to offer you the best of organic agriculture.'}
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Users className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'fr' ? 'Producteurs Locaux' : 'Local Producers'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'fr'
                  ? 'Nous travaillons directement avec des producteurs locaux certifiés bio pour garantir fraîcheur et traçabilité.'
                  : 'We work directly with certified organic local producers to guarantee freshness and traceability.'}
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Notre Histoire' : 'Our Story'}
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                {language === 'fr'
                  ? 'Happyness Bio World est né de la passion de promouvoir une alimentation saine et respectueuse de l\'environnement en Tunisie. Depuis nos débuts, nous nous engageons à fournir des produits biologiques tunisiens de la plus haute qualité.'
                  : 'Happyness Bio World was born from the passion of promoting healthy and environmentally-friendly food in Tunisia. Since our beginnings, we are committed to providing the highest quality Tunisian organic products.'}
              </p>
              <p>
                {language === 'fr'
                  ? 'Nos huiles d\'olive extra vierges, nos fruits juteux et nos légumes fraîs sont cultivés dans des fermes certifiées bio, où la nature est respectée à chaque étape du processus.'
                  : 'Our extra virgin olive oils, juicy fruits and fresh vegetables are grown on certified organic farms, where nature is respected at every step of the process.'}
              </p>
              <p>
                {language === 'fr'
                  ? 'Rejoignez-nous dans cette aventure vers une alimentation plus saine et un monde plus vert !'
                  : 'Join us in this adventure towards healthier eating and a greener world!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
