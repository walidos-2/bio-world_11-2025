import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Terms = () => {
  const { language } = useLanguage();

  return (
    <div className="py-12" data-testid="terms-page">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {language === 'fr' ? 'Conditions Générales de Vente' : 'Terms and Conditions'}
          </h1>

          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '1. Objet' : '1. Purpose'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Happyness Bio World et ses clients.'
                  : 'These general terms and conditions of sale govern the contractual relations between Happyness Bio World and its customers.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '2. Produits' : '2. Products'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Happyness Bio World propose une gamme de produits biologiques : huiles d\'olive, fruits et légumes frais. Tous nos produits sont cultivés sans pesticides et certifiés biologiques.'
                  : 'Happyness Bio World offers a range of organic products: olive oils, fresh fruits and vegetables. All our products are grown without pesticides and certified organic.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '3. Prix' : '3. Prices'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Les prix sont indiqués en Dinars Tunisiens (DT) et incluent toutes taxes. Happyness Bio World se réserve le droit de modifier ses prix à tout moment.'
                  : 'Prices are indicated in Tunisian Dinars (TND) and include all taxes. Happyness Bio World reserves the right to modify its prices at any time.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '4. Commandes' : '4. Orders'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Les commandes se font via notre système de demande en ligne. Aucun paiement en ligne n\'est requis. Nous vous contacterons pour confirmer votre commande et convenir des modalités de paiement et de livraison.'
                  : 'Orders are placed through our online request system. No online payment is required. We will contact you to confirm your order and agree on payment and delivery terms.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '5. Livraison' : '5. Delivery'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'Les délais de livraison sont communiqués à titre indicatif. Happyness Bio World s\'engage à livrer les produits dans les meilleurs délais.'
                  : 'Delivery times are given for information only. Happyness Bio World undertakes to deliver products as quickly as possible.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '6. Retours et remboursements' : '6. Returns and Refunds'}
              </h2>
              <p>
                {language === 'fr'
                  ? 'En cas de produit non conforme ou défectueux, contactez-nous dans les 48h suivant la livraison. Nous procéderons au remplacement ou au remboursement.'
                  : 'In case of non-conforming or defective product, contact us within 48 hours of delivery. We will proceed with replacement or refund.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {language === 'fr' ? '7. Contact' : '7. Contact'}
              </h2>
              <p>Email : Happybioworld@hexabyte.tn</p>
              <p>Téléphone : +216 27 092 610</p>
              <p>Adresse : 26 Rue d'Egypte, 1002 Tunis, Tunisie</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;