import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Sun, Moon, Globe, ShoppingCart, User, LogOut, Settings, Menu, X } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-200">{/* ... rest stays the same ... */}
      {/* Top bar with switches */}
      <div className="bg-gradient-to-r from-green-600 to-orange-500 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm font-medium">
            {t('home.hero.subtitle')}
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
              data-testid="language-switch"
              aria-label={t('common.language')}
            >
              <Globe size={16} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            
            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
              data-testid="theme-switch"
              aria-label={t('common.theme')}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span className="text-sm font-medium">
                {theme === 'light' ? t('common.dark') : t('common.light')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <img 
              src="https://customer-assets.emergentagent.com/job_farm-to-table-53/artifacts/xy339zwr_Logo%20Societe.jpg" 
              alt="Happyness Bio World Logo" 
              className="h-14 w-14 object-contain"
            />
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                Happyness
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent leading-tight">
                Bio World
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
              data-testid="nav-home"
            >
              {t('common.home')}
            </Link>
            <Link 
              to="/catalog" 
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
              data-testid="nav-catalog"
            >
              {t('common.catalog')}
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
              data-testid="nav-about"
            >
              {t('common.about')}
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
              data-testid="nav-contact"
            >
              {t('common.contact')}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
            aria-label="Menu"
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              data-testid="cart-button"
            >
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    data-testid="admin-link"
                  >
                    <Settings size={24} />
                  </Link>
                )}
                <Link
                  to="/account"
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  data-testid="account-link"
                >
                  <User size={24} />
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  data-testid="logout-button"
                >
                  <LogOut size={24} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white rounded-md transition-colors font-medium"
                data-testid="login-button"
              >
                {t('common.login')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium py-2"
            >
              {t('common.home')}
            </Link>
            <Link 
              to="/catalog" 
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium py-2"
            >
              {t('common.catalog')}
            </Link>
            <Link 
              to="/about" 
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium py-2"
            >
              {t('common.about')}
            </Link>
            <Link 
              to="/contact" 
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium py-2"
            >
              {t('common.contact')}
            </Link>
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={toggleMobileMenu}
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium py-2"
                  >
                    {t('common.admin')}
                  </Link>
                )}
                <Link
                  to="/account"
                  onClick={toggleMobileMenu}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium py-2"
                >
                  {t('common.account')}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium py-2"
                >
                  {t('common.logout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={toggleMobileMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium py-2"
              >
                {t('common.login')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
