import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { Loader } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

/**
 * Composant générique pour afficher les pages de contenu
 */
const PageTemplate = ({ slug }) => {
  const { language } = useLanguage();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPage();
  }, [slug]);

  const fetchPage = async () => {
    try {
      const response = await axios.get(`${API_URL}/pages/slug/${slug}`);
      setPage(response.data);
    } catch (error) {
      console.error('Error fetching page:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-green-600" size={48} />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'fr' ? 'Page non trouvée' : 'Page not found'}
        </p>
      </div>
    );
  }

  const title = language === 'fr' ? page.title_fr : page.title_en;
  const content = language === 'fr' ? page.content_fr : page.content_en;

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            {title}
          </h1>

          <div
            className="page-content prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      {/* Styles inline pour éviter l'erreur jsx */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .page-content {
          color: #374151;
        }
        .dark .page-content {
          color: #d1d5db;
        }
        .page-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #1f2937;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #16a34a;
        }
        .dark .page-content h2 {
          color: #f9fafb;
          border-bottom-color: #4ade80;
        }
        .page-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #16a34a;
        }
        .dark .page-content h3 {
          color: #4ade80;
        }
        .page-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .page-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        .dark .page-content strong {
          color: #f9fafb;
        }
        .page-content ul, .page-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        .page-content li {
          margin: 0.5rem 0;
        }
      `,
        }}
      />
    </div>
  );
};

export default PageTemplate;
