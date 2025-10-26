import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Devis {
  id: number;
  numero: string;
  clientId: number;
  clientNom: string;
  demandeId: number;
  montant: number;
  statut: 'en_attente' | 'accepte' | 'refuse';
  date: string;
  createdAt: string;
}

export default function DevisPage() {
  const [devis, setDevis] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchDevis();
  }, []);

  const fetchDevis = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/devis');
      if (response.ok) {
        const data = await response.json();
        setDevis(data);
      }
    } catch (error) {
      console.error('Error fetching devis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: Devis['statut']) => {
    try {
      // Ici on pourrait ajouter une route PUT pour mettre à jour le statut du devis
      // Pour l'instant, on met juste à jour localement
      setDevis(devis.map(d => d.id === id ? { ...d, statut: newStatus } : d));
    } catch (error) {
      console.error('Error updating devis status:', error);
    }
  };

  const handleDownloadPDF = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/devis/${id}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const devi = devis.find(d => d.id === id);
        a.download = `${devi?.numero}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Erreur lors du téléchargement du PDF');
    }
  };

  const filteredDevis = filter === 'all' 
    ? devis 
    : devis.filter(d => d.statut === filter);

  const stats = {
    all: devis.length,
    en_attente: devis.filter(d => d.statut === 'en_attente').length,
    accepte: devis.filter(d => d.statut === 'accepte').length,
    refuse: devis.filter(d => d.statut === 'refuse').length
  };

  const getStatutColor = (statut: string) => {
    if (statut === 'en_attente') return '#FFD700';
    if (statut === 'accepte') return '#4CAF50';
    return '#FF0000';
  };

  const getStatutLabel = (statut: string) => {
    if (statut === 'en_attente') return 'En Attente';
    if (statut === 'accepte') return 'Accepté';
    return 'Refusé';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '2em', margin: 0 }}>Gestion des Devis</h2>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'Tous', count: stats.all },
          { key: 'en_attente', label: 'En Attente', count: stats.en_attente },
          { key: 'accepte', label: 'Acceptés', count: stats.accepte },
          { key: 'refuse', label: 'Refusés', count: stats.refuse }
        ].map(({ key, label, count }) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(key)}
            style={{
              padding: '10px 20px',
              background: filter === key ? '#FF9800' : 'rgba(255, 152, 0, 0.2)',
              color: filter === key ? 'white' : '#FF9800',
              border: '1px solid #FF9800',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {label} ({count})
          </motion.button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>Chargement...</div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {filteredDevis.map((devi) => (
            <motion.div
              key={devi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01, boxShadow: '0 8px 25px rgba(255, 152, 0, 0.2)' }}
              style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
                border: '2px solid rgba(255, 152, 0, 0.3)',
                borderRadius: '15px',
                padding: '25px',
                color: 'white'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#FF9800', margin: 0, fontSize: '1.8em' }}>{devi.numero}</h3>
                <span
                  style={{
                    padding: '8px 18px',
                    background: getStatutColor(devi.statut),
                    color: devi.statut === 'en_attente' ? '#000' : '#fff',
                    borderRadius: '25px',
                    fontWeight: 'bold',
                    fontSize: '0.9em'
                  }}
                >
                  {getStatutLabel(devi.statut)}
                </span>
              </div>

              {/* Client Info */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#999', margin: '5px 0', fontSize: '0.9em' }}>
                  👤 <strong style={{ color: '#FF9800' }}>Client:</strong> {devi.clientNom}
                </p>
                <p style={{ color: '#999', margin: '5px 0', fontSize: '0.9em' }}>
                  💰 <strong style={{ color: '#FF9800' }}>Montant:</strong> {devi.montant.toFixed(2)} DT
                </p>
                <p style={{ color: '#999', margin: '5px 0', fontSize: '0.9em' }}>
                  📅 <strong style={{ color: '#FF9800' }}>Date:</strong> {new Date(devi.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownloadPDF(devi.id)}
                  style={{
                    padding: '12px 24px',
                    background: '#FF9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  📄 Télécharger PDF
                </motion.button>

                {devi.statut === 'en_attente' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(devi.id, 'accepte')}
                      style={{
                        padding: '12px 24px',
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9em'
                      }}
                    >
                      ✅ Marquer Accepté
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(devi.id, 'refuse')}
                      style={{
                        padding: '12px 24px',
                        background: 'rgba(255, 0, 0, 0.1)',
                        border: '1px solid #FF0000',
                        color: '#FF0000',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9em'
                      }}
                    >
                      ❌ Marquer Refusé
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {devis.length === 0 && !loading && (
        <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          <span style={{ fontSize: '4em', display: 'block', marginBottom: '20px' }}>📋</span>
          <p style={{ fontSize: '1.2em' }}>Aucun devis pour le moment</p>
          <p style={{ fontSize: '0.9em', color: '#666' }}>Les devis créés depuis les demandes apparaîtront ici</p>
        </div>
      )}
    </div>
  );
}

