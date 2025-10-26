import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../../components/analytics/StatCard';
import LineChart from '../../components/analytics/LineChart';
import BarChart from '../../components/analytics/BarChart';
import PieChart from '../../components/analytics/PieChart';

interface Stats {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  avgDuration: number;
  bounceRate: number;
  topPages: { page: string; views: number }[];
  visitsByDay: { date: string; visits: number }[];
  sources: { source: string; count: number }[];
  devices: { type: string; count: number }[];
}

const formatDuration = (ms: number): string => {
  if (ms === 0) return '0s';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('7'); // 7, 30, custom

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Rafraîchir toutes les minutes
    return () => clearInterval(interval);
  }, [filter]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Calculer les dates selon le filtre
      let startDate: string = '';
      let endDate: string = new Date().toISOString().split('T')[0];
      
      if (filter === '7') {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        startDate = date.toISOString().split('T')[0];
      } else if (filter === '30') {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        startDate = date.toISOString().split('T')[0];
      }
      
      const url = startDate && endDate
        ? `http://localhost:3000/api/analytics/stats?startDate=${startDate}&endDate=${endDate}`
        : 'http://localhost:3000/api/analytics/stats';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return (
      <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
      Chargement des données analytics...
    </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
        Aucune donnée analytics disponible
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '2em', margin: 0 }}>Analytics & Visiteurs</h2>
        
        {/* Filtres */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { key: '7', label: '7 Jours' },
            { key: '30', label: '30 Jours' },
            { key: 'all', label: 'Tout' }
          ].map(({ key, label }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(key)}
              style={{
                padding: '10px 20px',
                background: filter === key ? '#DC2626' : 'rgba(220, 38, 38, 0.2)',
                color: filter === key ? 'white' : '#DC2626',
                border: '1px solid #DC2626',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9em'
              }}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cartes Statistiques */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatCard title="Visiteurs Totaux" value={stats.totalVisits} icon="👥" color="#2196F3" />
        <StatCard title="Visiteurs Uniques" value={stats.uniqueVisitors} icon="🌟" color="#4CAF50" />
        <StatCard title="Pages Vues" value={stats.pageViews} icon="📄" color="#FF9800" />
        <StatCard title="Durée Moyenne" value={formatDuration(stats.avgDuration)} icon="⏱️" color="#9C27B0" />
        <StatCard title="Taux de Rebond" value={`${stats.bounceRate}%`} icon="↩️" color="#DC2626" />
      </div>

      {/* Graphique Visiteurs par Jour */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
          border: '1px solid rgba(220, 38, 38, 0.2)',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '40px'
        }}
      >
        <h3 style={{ color: '#DC2626', fontSize: '1.5em', marginBottom: '20px' }}>
          📈 Visiteurs par Jour
        </h3>
        <LineChart data={stats.visitsByDay} xKey="date" yKey="visits" color="#2196F3" />
      </motion.div>

      {/* Graphiques Côte à Côte */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        {/* Pages Populaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            borderRadius: '15px',
            padding: '30px'
          }}
        >
          <h3 style={{ color: '#DC2626', fontSize: '1.5em', marginBottom: '20px' }}>
            🔥 Pages Populaires
          </h3>
          <BarChart data={stats.topPages} xKey="page" yKey="views" color="#4CAF50" />
        </motion.div>

        {/* Sources de Trafic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            borderRadius: '15px',
            padding: '30px'
          }}
        >
          <h3 style={{ color: '#DC2626', fontSize: '1.5em', marginBottom: '20px' }}>
            🌐 Sources de Trafic
          </h3>
          <PieChart data={stats.sources} labelKey="source" valueKey="count" />
        </motion.div>
      </div>

      {/* Appareils */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
          border: '1px solid rgba(220, 38, 38, 0.2)',
          borderRadius: '15px',
          padding: '30px'
        }}
      >
        <h3 style={{ color: '#DC2626', fontSize: '1.5em', marginBottom: '20px' }}>
          📱 Appareils Utilisés
        </h3>
        <PieChart data={stats.devices} labelKey="type" valueKey="count" />
      </motion.div>
    </div>
  );
}

