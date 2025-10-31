import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image,
  type = 'website'
}) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update title
    if (title) {
      document.title = `${title} | Bio-World`;
    }

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
    updateMetaTag('language', language);

    // Open Graph tags
    updateMetaTag('og:title', title ? `${title} | Bio-World` : 'Bio-World', true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', language === 'fr' ? 'fr_FR' : 'en_US', true);
    if (image) {
      updateMetaTag('og:image', image, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title ? `${title} | Bio-World` : 'Bio-World');
    updateMetaTag('twitter:description', description);
    if (image) {
      updateMetaTag('twitter:image', image);
    }

  }, [title, description, keywords, image, language, type]);

  return null;
};

export default SEO;
