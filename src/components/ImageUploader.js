import React, { useState, useRef } from 'react';
import { Upload, X, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

// Import de l'API URL depuis le fichier de configuration
const API_URL = process.env.REACT_APP_API_URL || 'https://bio-world.eu/api';

/**
 * Composant ImageUploader
 * Permet d'uploader plusieurs images avec drag & drop ou via URL
 */
const ImageUploader = ({ images = [], onChange, language = 'fr' }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef(null);

  const t = {
    fr: {
      dragDrop: 'Glissez-déposez vos images ici',
      or: 'ou',
      browse: 'Parcourir',
      addUrl: 'Ajouter une URL',
      urlPlaceholder: 'https://exemple.com/image.jpg',
      addUrlBtn: 'Ajouter',
      cancel: 'Annuler',
      uploading: 'Upload en cours...',
      maxSize: 'Max 5 MB par image',
      formats: 'JPG, PNG, GIF, WEBP, SVG...',
      noImages: 'Aucune image ajoutée',
      remove: 'Supprimer',
    },
    en: {
      dragDrop: 'Drag & drop your images here',
      or: 'or',
      browse: 'Browse',
      addUrl: 'Add URL',
      urlPlaceholder: 'https://example.com/image.jpg',
      addUrlBtn: 'Add',
      cancel: 'Cancel',
      uploading: 'Uploading...',
      maxSize: 'Max 5 MB per image',
      formats: 'JPG, PNG, GIF, WEBP, SVG...',
      noImages: 'No images added',
      remove: 'Remove',
    },
  };

  const translations = t[language] || t.fr;

  // Gérer le drag & drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      uploadFiles(files);
    }
  };

  // Upload des fichiers
  const uploadFiles = async (files) => {
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images[]', file);
      });

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.uploaded) {
        const newUrls = response.data.uploaded.map((item) => item.url);
        onChange([...images, ...newUrls]);
      } else {
        alert(
          "Erreur lors de l'upload : " +
            (response.data.error || 'Erreur inconnue')
        );
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert("Erreur lors de l'upload des images");
    } finally {
      setUploading(false);
    }
  };

  // Gérer le changement de fichier via input
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      uploadFiles(files);
    }
  };

  // Ajouter une URL manuellement
  const handleAddUrl = () => {
    const url = urlInput.trim();

    if (!url) {
      return;
    }

    // Validation basique de l'URL
    try {
      new URL(url);
      onChange([...images, url]);
      setUrlInput('');
      setShowUrlInput(false);
    } catch (error) {
      alert('URL invalide');
    }
  };

  // Supprimer une image
  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Zone de drag & drop */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-green-600 bg-green-50 dark:bg-green-900/10'
            : 'border-gray-300 dark:border-gray-700'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={uploading}
        />

        <Upload
          size={48}
          className={`mx-auto mb-4 ${
            dragActive ? 'text-green-600' : 'text-gray-400 dark:text-gray-600'
          }`}
        />

        {uploading ? (
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {translations.uploading}
            </p>
            <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
              <div
                className="h-full bg-green-600 animate-pulse"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              {translations.dragDrop}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {translations.or}
            </p>
            <button
              type="button"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              {translations.browse}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              {translations.maxSize} • {translations.formats}
            </p>
          </>
        )}
      </div>

      {/* Bouton pour ajouter une URL */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center gap-2 px-4 py-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors"
        >
          <LinkIcon size={18} />
          {translations.addUrl}
        </button>
      </div>

      {/* Input pour URL */}
      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
            placeholder={translations.urlPlaceholder}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
          >
            {translations.addUrlBtn}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowUrlInput(false);
              setUrlInput('');
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-md font-medium transition-colors"
          >
            {translations.cancel}
          </button>
        </div>
      )}

      {/* Liste des images */}
      <div className="space-y-2">
        {images.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <ImageIcon size={48} className="mx-auto mb-2 opacity-30" />
            <p>{translations.noImages}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGN0U5Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0QTdDMkEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkVSUk9SPC90ZXh0Pgo8L3N2Zz4=';
                  }}
                />

                {/* Badge numéro */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                  {index + 1}
                </div>

                {/* Bouton supprimer */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  title={translations.remove}
                >
                  <X size={16} />
                </button>

                {/* URL en survol */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {url}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
