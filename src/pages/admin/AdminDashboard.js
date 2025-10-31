import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import API_URL from '../../config';
import { Package, ShoppingBag, Users, ClipboardList } from 'lucide-react';

const AdminDashboard = () => {
  const { t, language } = useLanguage();
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: t('admin.totalOrders'),
      value: stats?.total_orders || 0,
      icon: ShoppingBag,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      link: '/admin/orders'
    },
    {
      title: t('admin.pendingOrders'),
      value: stats?.pending_orders || 0,
      icon: ClipboardList,
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      link: '/admin/orders?status=pending'
    },
    {
      title: t('admin.totalProducts'),
      value: stats?.total_products || 0,
      icon: Package,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      link: '/admin/products'
    },
    {
      title: t('admin.totalUsers'),
      value: stats?.total_users || 0,
      icon: Users,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      link: '/admin/users'
    }
  ];

  return (
    <div className="py-8" data-testid="admin-dashboard">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {t('admin.dashboard')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={index}
                to={card.link}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {card.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Actions rapides' : 'Quick Actions'}
            </h2>
            <div className="space-y-3">
              <Link
                to="/admin/products/new"
                className="block px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors text-center"
              >
                {t('admin.addProduct')}
              </Link>
              <Link
                to="/admin/orders"
                className="block px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors text-center"
              >
                {language === 'fr' ? 'Voir les commandes' : 'View Orders'}
              </Link>
              <Link
                to="/admin/categories"
                className="block px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors text-center"
              >
                {language === 'fr' ? 'Gérer les catégories' : 'Manage Categories'}
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'fr' ? 'Informations' : 'Information'}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                {language === 'fr'
                  ? 'Bienvenue dans le panneau d\'administration Bio-World. Ici vous pouvez gérer vos produits, catégories, commandes et utilisateurs.'
                  : 'Welcome to the Bio-World administration panel. Here you can manage your products, categories, orders and users.'}
              </p>
              <p className="text-sm">
                {language === 'fr'
                  ? 'Utilisez le menu de navigation pour accéder aux différentes sections.'
                  : 'Use the navigation menu to access the different sections.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;