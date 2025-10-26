import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

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

export default function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/analytics/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
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

  const StatCard = ({ icon: Icon, label, value, color, trend }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      style={{
        background: 'rgba(15, 15, 15, 0.9)',
        border: `1px solid ${color}40`,
        borderRadius: '15px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        background: `${color}20`,
        borderRadius: '50%',
        filter: 'blur(30px)'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '8px' }}>{label}</p>
            <h3 style={{ color: '#e5e5e5', fontSize: '2rem', fontWeight: 'bold' }}>
              {value}
            </h3>
            {trend && (
              <p style={{ color: color, fontSize: '12px', marginTop: '8px' }}>
                <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} />
                {trend}
              </p>
            )}
          </div>
          <div style={{
            background: `${color}20`,
            padding: '12px',
            borderRadius: '12px'
          }}>
            <Icon size={24} color={color} />
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: '#999'
      }}>
        Chargement des statistiques...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Tableau de bord
        </h2>
        <p style={{ color: '#999' }}>Vue d'ensemble de votre activité</p>
      </div>

      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard
          icon={Users}
          label="Total Clients"
          value={stats?.totalClients || 0}
          color="#DC2626"
        />
        <StatCard
          icon={FileText}
          label="Demandes"
          value={stats?.totalDemandes || 0}
          color="#F59E0B"
        />
        <StatCard
          icon={DollarSign}
          label="CA Total"
          value={`${(stats?.caTotal || 0).toLocaleString()} TND`}
          color="#10B981"
          trend="+12% ce mois"
        />
        <StatCard
          icon={CheckCircle}
          label="Factures"
          value={stats?.totalFactures || 0}
          color="#3B82F6"
        />
      </div>

      {/* Demandes Status Grid */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#e5e5e5', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Statut des demandes
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <Clock size={32} color="#3B82F6" style={{ marginBottom: '12px' }} />
            <p style={{ color: '#999', fontSize: '14px' }}>Nouvelles</p>
            <h4 style={{ color: '#3B82F6', fontSize: '1.8rem', fontWeight: 'bold' }}>
              {stats?.demandesNouvelles || 0}
            </h4>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <TrendingUp size={32} color="#F59E0B" style={{ marginBottom: '12px' }} />
            <p style={{ color: '#999', fontSize: '14px' }}>En cours</p>
            <h4 style={{ color: '#F59E0B', fontSize: '1.8rem', fontWeight: 'bold' }}>
              {stats?.demandesEnCours || 0}
            </h4>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <CheckCircle size={32} color="#10B981" style={{ marginBottom: '12px' }} />
            <p style={{ color: '#999', fontSize: '14px' }}>Acceptées</p>
            <h4 style={{ color: '#10B981', fontSize: '1.8rem', fontWeight: 'bold' }}>
              {stats?.demandesAcceptees || 0}
            </h4>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <XCircle size={32} color="#EF4444" style={{ marginBottom: '12px' }} />
            <p style={{ color: '#999', fontSize: '14px' }}>Refusées</p>
            <h4 style={{ color: '#EF4444', fontSize: '1.8rem', fontWeight: 'bold' }}>
              {stats?.demandesRefusees || 0}
            </h4>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 style={{ color: '#e5e5e5', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Actions rapides
        </h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/admin/clients'}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(45deg, #DC2626, #EF4444)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Nouveau Client
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/admin/demandes'}
            style={{
              padding: '12px 24px',
              background: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid #DC2626',
              borderRadius: '10px',
              color: '#DC2626',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Voir Demandes
          </motion.button>
        </div>
      </div>
    </div>
  );
}

