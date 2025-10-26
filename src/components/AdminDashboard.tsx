import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Stats {
  totalClients: number;
  totalDemandes: number;
  demandesNouvelles: number;
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem('token'));

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/analytics/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#000', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#DC2626', fontSize: '2rem' }}>RUBBERFLEX Admin</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              onLogout();
            }}
            style={{
              padding: '10px 20px',
              background: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid #DC2626',
              borderRadius: '8px',
              color: '#DC2626',
              cursor: 'pointer'
            }}
          >
            Déconnexion
          </button>
        </div>

        {/* Stats */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>Chargement...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'rgba(15, 15, 15, 0.9)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '15px', padding: '24px' }}>
              <h3 style={{ color: '#999', marginBottom: '10px' }}>Total Clients</h3>
              <p style={{ color: '#e5e5e5', fontSize: '2rem', fontWeight: 'bold' }}>{stats?.totalClients || 0}</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'rgba(15, 15, 15, 0.9)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '15px', padding: '24px' }}>
              <h3 style={{ color: '#999', marginBottom: '10px' }}>Total Demandes</h3>
              <p style={{ color: '#e5e5e5', fontSize: '2rem', fontWeight: 'bold' }}>{stats?.totalDemandes || 0}</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} style={{ background: 'rgba(15, 15, 15, 0.9)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '15px', padding: '24px' }}>
              <h3 style={{ color: '#999', marginBottom: '10px' }}>Nouvelles Demandes</h3>
              <p style={{ color: '#DC2626', fontSize: '2rem', fontWeight: 'bold' }}>{stats?.demandesNouvelles || 0}</p>
            </motion.div>
          </div>
        )}

        {/* Backend Link */}
        <div style={{ background: 'rgba(15, 15, 15, 0.9)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '15px', padding: '30px', textAlign: 'center' }}>
          <h2 style={{ color: '#e5e5e5', marginBottom: '20px' }}>Backend API</h2>
          <a href="http://localhost:3000/" target="_blank" style={{ color: '#DC2626', fontSize: '1.2rem', textDecoration: 'none' }}>
            Accéder au Backend →
          </a>
          <p style={{ color: '#999', marginTop: '10px', fontSize: '14px' }}>
            Pour accéder à toutes les fonctionnalités API
          </p>
        </div>
      </div>
    </div>
  );
}
