import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import API_URL from '../../config';
import { Package } from 'lucide-react';

const AdminOrders = () => {
  const { language, t } = useLanguage();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(searchParams.get('status') || '');

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus) params.append('status', filterStatus);
      
      const response = await axios.get(`${API_URL}/admin/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      alert(language === 'fr' ? 'Erreur lors de la mise à jour' : 'Error updating status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
      processing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
      shipped: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="py-8" data-testid="admin-orders">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {t('admin.orders')}
        </h1>

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'fr' ? 'Filtrer par statut' : 'Filter by status'}
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
            data-testid="status-filter"
          >
            <option value="">{language === 'fr' ? 'Tous' : 'All'}</option>
            <option value="pending">{t('order.pending')}</option>
            <option value="confirmed">{t('order.confirmed')}</option>
            <option value="processing">{t('order.processing')}</option>
            <option value="shipped">{t('order.shipped')}</option>
            <option value="delivered">{t('order.delivered')}</option>
            <option value="cancelled">{t('order.cancelled')}</option>
          </select>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg p-12 shadow-md text-center">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {language === 'fr' ? 'Aucune commande trouvée' : 'No orders found'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md"
                data-testid={`order-${order.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('order.orderNumber')}: <span className="font-semibold">{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.created_at).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'fr' ? 'Client' : 'Customer'}: {order.email}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {t(`order.${order.status}`)}
                    </span>
                    
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      data-testid={`status-select-${order.id}`}
                    >
                      <option value="pending">{t('order.pending')}</option>
                      <option value="confirmed">{t('order.confirmed')}</option>
                      <option value="processing">{t('order.processing')}</option>
                      <option value="shipped">{t('order.shipped')}</option>
                      <option value="delivered">{t('order.delivered')}</option>
                      <option value="cancelled">{t('order.cancelled')}</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {language === 'fr' ? 'Articles' : 'Items'}:
                  </h3>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {language === 'fr' ? 'Produit' : 'Product'} x{item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {(item.price * item.quantity).toFixed(3)} DT
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>{language === 'fr' ? 'Livraison' : 'Delivery'}: {order.delivery_address}</p>
                      <p>{order.delivery_city}, {order.delivery_postal_code}</p>
                      <p>{language === 'fr' ? 'Tél' : 'Phone'}: {order.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900 dark:text-white">{t('common.total')}: </span>
                      <span className="font-bold text-green-600 dark:text-green-400 text-xl">
                        {order.total_amount.toFixed(3)} DT
                      </span>
                    </div>
                  </div>

                  {order.comments && (
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {language === 'fr' ? 'Commentaires' : 'Comments'}:
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.comments}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;