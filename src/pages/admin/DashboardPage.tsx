import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Stats {
  totalClients: number;
  totalDemandes: number;
  demandesNouvelles: number;
  demandesEnCours: number;
  demandesAcceptees: number;
  demandesRefusees: number;
  totalFactures: number;
  caTotal: number;
  caMois: number;
}

export default function DashboardPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // Rafraîchir toutes les 10 secondes
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/analytics/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
        Chargement des statistiques...
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
        Aucune statistique disponible
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '2em', margin: 0 }}>Tableau de Bord</h2>
        {stats && stats.demandesNouvelles > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(255, 215, 0, 0.2)',
              border: '2px solid #FFD700',
              borderRadius: '10px',
              padding: '15px 25px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '1.5em' }}>🆕</span>
            <div>
              <p style={{ margin: 0, color: '#FFD700', fontWeight: 'bold', fontSize: '1.1em' }}>
                {stats.demandesNouvelles} Nouvelle{stats.demandesNouvelles > 1 ? 's' : ''} Demande{stats.demandesNouvelles > 1 ? 's' : ''}
              </p>
              <button
                onClick={() => onNavigate('demandes')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#FFD700',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '0.9em',
                  padding: '5px 0'
                }}
              >
                Voir maintenant →
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <motion.div
          whileHover={{ scale: 1.05, cursor: 'pointer' }}
          onClick={() => onNavigate('clients')}
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '15px',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#999', margin: '0 0 10px 0', fontSize: '0.9em' }}>👥 Total Clients</h3>
          <p style={{ color: '#e5e5e5', fontSize: '2.5em', fontWeight: 'bold', margin: 0 }}>{stats.totalClients}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, cursor: 'pointer' }}
          onClick={() => onNavigate('demandes')}
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '15px',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#999', margin: '0 0 10px 0', fontSize: '0.9em' }}>📋 Total Demandes</h3>
          <p style={{ color: '#e5e5e5', fontSize: '2.5em', fontWeight: 'bold', margin: 0 }}>{stats.totalDemandes}</p>
        </motion.div>

        <motion.div
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '15px',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#999', margin: '0 0 10px 0', fontSize: '0.9em' }}>🧾 Total Factures</h3>
          <p style={{ color: '#e5e5e5', fontSize: '2.5em', fontWeight: 'bold', margin: 0 }}>{stats.totalFactures}</p>
        </motion.div>

        <motion.div
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '15px',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#999', margin: '0 0 10px 0', fontSize: '0.9em' }}>💰 CA Total</h3>
          <p style={{ color: '#25D366', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{stats.caTotal.toFixed(2)} DT</p>
        </motion.div>
      </div>

      {/* Demandes Status */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#e5e5e5', marginBottom: '20px', fontSize: '1.5em' }}>Statut des Demandes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate('demandes')}
            style={{
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid #FFD700',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <h4 style={{ color: '#FFD700', margin: '0 0 10px 0' }}>🆕 Nouvelles</h4>
            <p style={{ color: '#fff', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{stats.demandesNouvelles}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate('demandes')}
            style={{
              background: 'rgba(33, 150, 243, 0.1)',
              border: '1px solid #2196F3',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <h4 style={{ color: '#2196F3', margin: '0 0 10px 0' }}>⚙️ En Cours</h4>
            <p style={{ color: '#fff', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{stats.demandesEnCours}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate('demandes')}
            style={{
              background: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid #4CAF50',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <h4 style={{ color: '#4CAF50', margin: '0 0 10px 0' }}>✅ Acceptées</h4>
            <p style={{ color: '#fff', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{stats.demandesAcceptees}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate('demandes')}
            style={{
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid #FF0000',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <h4 style={{ color: '#FF0000', margin: '0 0 10px 0' }}>❌ Refusées</h4>
            <p style={{ color: '#fff', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{stats.demandesRefusees}</p>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'rgba(15, 15, 15, 0.9)',
        border: '1px solid rgba(220, 38, 38, 0.3)',
        borderRadius: '15px',
        padding: '30px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#e5e5e5', marginBottom: '20px' }}>Actions Rapides</h3>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('clients')}
            style={{
              padding: '15px 30px',
              background: '#DC2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1em'
            }}
          >
            Voir Tous les Clients
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('demandes')}
            style={{
              padding: '15px 30px',
              background: 'rgba(220, 38, 38, 0.2)',
              color: '#DC2626',
              border: '1px solid #DC2626',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1em'
            }}
          >
            Voir Toutes les Demandes
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('factures')}
            style={{
              padding: '15px 30px',
              background: 'rgba(220, 38, 38, 0.2)',
              color: '#DC2626',
              border: '1px solid #DC2626',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1em'
            }}
          >
            Voir Toutes les Factures
          </motion.button>
        </div>
      </div>
    </div>
  );
}

