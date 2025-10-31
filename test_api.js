// Test manuel de l'API admin
// Copiez-collez ce code dans la console du navigateur

const testAdminAPI = async () => {
  const token = localStorage.getItem('token');
  console.log('📋 Token présent:', !!token);
  console.log('🔑 Token:', token ? token.substring(0, 20) + '...' : 'Aucun');
  
  if (!token) {
    console.log('❌ Aucun token trouvé');
    return;
  }

  try {
    console.log('🧪 Test /api/admin/users...');
    const response = await fetch('https://bio-world.eu/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📊 Status:', response.status);
    console.log('📊 Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('📦 Réponse:', data);
    
  } catch (error) {
    console.log('💥 Erreur:', error);
  }
};

testAdminAPI();
