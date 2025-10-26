import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Send
} from 'lucide-react';

interface Demande {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  produit: string;
  couleur: string;
  surface: string;
  message: string;
  statut: 'nouveau' | 'en_cours' | 'devis_envoye' | 'accepte' | 'refuse';
  createdAt: string;
}

export default function Demandes() {
  const { token } = useAuth();
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatut, setFilterStatut] = useState<string>('all');
  const [selectedDemande, setSelectedDemande] = useState<Demande | null>(null);

  useEffect(() => {
    fetchDemandes();
  }, [filterStatut]);

  const fetchDemandes = async () => {
    try {
      const url = filterStatut === 'all'
        ? 'http://localhost:3000/api/demandes'
        : `http://localhost:3000/api/demandes?statut=${filterStatut}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDemandes(data);
      }
    } catch (error) {
      console.error('Error fetching demandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatut = async (id: number, newStatut: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/demandes/${id}/statut`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statut: newStatut }),
      });

      if (response.ok) {
        fetchDemandes();
        setSelectedDemande(null);
      }
    } catch (error) {
      console.error('Error updating statut:', error);
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'nouveau': return '#3B82F6';
      case 'en_cours': return '#F59E0B';
      case 'devis_envoye': return '#8B5CF6';
      case 'accepte': return '#10B981';
      case 'refuse': return '#EF4444';
      default: return '#999';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'nouveau': return 'Nouveau';
      case 'en_cours': return 'En cours';
      case 'devis_envoye': return 'Devis envoyé';
      case 'accepte': return 'Accepté';
      case 'refuse': return 'Refusé';
      default: return statut;
    }
  };

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'nouveau': return Clock;
      case 'en_cours': return FileText;
      case 'devis_envoye': return Send;
      case 'accepte': return CheckCircle;
      case 'refuse': return XCircle;
      default: return FileText;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Gestion des Demandes
        </h2>
        <p style={{ color: '#999' }}>{demandes.length} demandes</p>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <Filter size={20} color="#DC2626" />
        {['all', 'nouveau', 'en_cours', 'devis_envoye', 'accepte', 'refuse'].map((statut) => (
          <motion.button
            key={statut}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterStatut(statut)}
            style={{
              padding: '8px 16px',
              background: filterStatut === statut ? 'rgba(220, 38, 38, 0.3)' : 'rgba(15, 15, 15, 0.9)',
              border: `1px solid ${filterStatut === statut ? '#DC2626' : 'rgba(220, 38, 38, 0.3)'}`,
              borderRadius: '8px',
              color: filterStatut === statut ? '#DC2626' : '#999',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: filterStatut === statut ? 'bold' : 'normal'
            }}
          >
            {statut === 'all' ? 'Tous' : getStatutLabel(statut)}
          </motion.button>
        ))}
      </div>

      {/* Demandes List */}
      {loading ? (
        <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          Chargement...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {demandes.map((demande) => {
            const StatutIcon = getStatutIcon(demande.statut);
            const statutColor = getStatutColor(demande.statut);

            return (
              <motion.div
                key={demande.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                style={{
                  background: 'rgba(15, 15, 15, 0.9)',
                  border: `1px solid ${statutColor}40`,
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{
                      background: `${statutColor}20`,
                      padding: '8px',
                      borderRadius: '8px'
                    }}>
                      <StatutIcon size={20} color={statutColor} />
                    </div>
                    <div>
                      <h3 style={{ color: '#DC2626', fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {demande.nom}
                      </h3>
                      <p style={{ color: '#999', fontSize: '12px' }}>
                        {new Date(demande.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    <div>
                      <p style={{ color: '#666', fontSize: '12px' }}>Produit</p>
                      <p style={{ color: '#e5e5e5', fontSize: '14px' }}>{demande.produit}</p>
                    </div>
                    <div>
                      <p style={{ color: '#666', fontSize: '12px' }}>Couleur</p>
                      <p style={{ color: '#e5e5e5', fontSize: '14px' }}>{demande.couleur}</p>
                    </div>
                    <div>
                      <p style={{ color: '#666', fontSize: '12px' }}>Surface</p>
                      <p style={{ color: '#e5e5e5', fontSize: '14px' }}>{demande.surface}</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{
                    padding: '8px 16px',
                    background: `${statutColor}20`,
                    border: `1px solid ${statutColor}`,
                    borderRadius: '8px',
                    color: statutColor,
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {getStatutLabel(demande.statut)}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDemande(demande)}
                    style={{
                      padding: '10px',
                      background: 'rgba(220, 38, 38, 0.2)',
                      border: '1px solid #DC2626',
                      borderRadius: '8px',
                      color: '#DC2626',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Eye size={18} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedDemande && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(15, 15, 15, 0.95)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#DC2626', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
                Détails de la demande
              </h3>
              <p style={{ color: '#999', fontSize: '14px' }}>
                Reçue le {new Date(selectedDemande.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                background: 'rgba(220, 38, 38, 0.1)', 
                padding: '15px', 
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <h4 style={{ color: '#e5e5e5', marginBottom: '10px' }}>Informations client</h4>
                <p style={{ color: '#e5e5e5', marginBottom: '5px' }}>
                  <strong>Nom:</strong> {selectedDemande.nom}
                </p>
                <p style={{ color: '#e5e5e5', marginBottom: '5px' }}>
                  <strong>Email:</strong> {selectedDemande.email}
                </p>
                <p style={{ color: '#e5e5e5' }}>
                  <strong>Téléphone:</strong> {selectedDemande.telephone}
                </p>
              </div>

              <div style={{ 
                background: 'rgba(220, 38, 38, 0.1)', 
                padding: '15px', 
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <h4 style={{ color: '#e5e5e5', marginBottom: '10px' }}>Détails produit</h4>
                <p style={{ color: '#e5e5e5', marginBottom: '5px' }}>
                  <strong>Produit:</strong> {selectedDemande.produit}
                </p>
                <p style={{ color: '#e5e5e5', marginBottom: '5px' }}>
                  <strong>Couleur:</strong> {selectedDemande.couleur}
                </p>
                <p style={{ color: '#e5e5e5' }}>
                  <strong>Surface:</strong> {selectedDemande.surface}
                </p>
              </div>

              {selectedDemande.message && (
                <div style={{ 
                  background: 'rgba(220, 38, 38, 0.1)', 
                  padding: '15px', 
                  borderRadius: '10px'
                }}>
                  <h4 style={{ color: '#e5e5e5', marginBottom: '10px' }}>Message</h4>
                  <p style={{ color: '#e5e5e5', fontStyle: 'italic' }}>
                    {selectedDemande.message}
                  </p>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#e5e5e5', marginBottom: '10px' }}>Changer le statut</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['en_cours', 'devis_envoye', 'accepte', 'refuse'].map((statut) => (
                  <motion.button
                    key={statut}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateStatut(selectedDemande.id, statut)}
                    disabled={selectedDemande.statut === statut}
                    style={{
                      padding: '10px 16px',
                      background: selectedDemande.statut === statut 
                        ? `${getStatutColor(statut)}40` 
                        : 'rgba(220, 38, 38, 0.1)',
                      border: `1px solid ${getStatutColor(statut)}`,
                      borderRadius: '8px',
                      color: getStatutColor(statut),
                      cursor: selectedDemande.statut === statut ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      opacity: selectedDemande.statut === statut ? 0.5 : 1
                    }}
                  >
                    {getStatutLabel(statut)}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedDemande(null)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(220, 38, 38, 0.2)',
                border: '1px solid #DC2626',
                borderRadius: '10px',
                color: '#DC2626',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Fermer
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

