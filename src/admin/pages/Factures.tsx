import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Receipt, Download, Eye, X, CheckCircle, Clock } from 'lucide-react';

interface Facture {
  id: number;
  numero: string;
  devisId: number;
  montantTtc: number;
  statutPaiement: 'en_attente' | 'paye' | 'annule';
  dateEmission: string;
  datePaiement?: string;
  pdfPath?: string;
  createdAt: string;
  Devis?: {
    Demande?: {
      nom: string;
      produit: string;
    };
  };
}

export default function Factures() {
  const { token } = useAuth();
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacture, setSelectedFacture] = useState<Facture | null>(null);
  const [filterStatut, setFilterStatut] = useState<string>('all');

  useEffect(() => {
    fetchFactures();
  }, [filterStatut]);

  const fetchFactures = async () => {
    try {
      const url = filterStatut === 'all'
        ? 'http://localhost:3000/api/factures'
        : `http://localhost:3000/api/factures?statut=${filterStatut}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFactures(data);
      }
    } catch (error) {
      console.error('Error fetching factures:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/factures/${id}/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facture-${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'paye': return '#10B981';
      case 'en_attente': return '#F59E0B';
      case 'annule': return '#EF4444';
      default: return '#999';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'paye': return 'Payée';
      case 'en_attente': return 'En attente';
      case 'annule': return 'Annulée';
      default: return statut;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Gestion des Factures
        </h2>
        <p style={{ color: '#999' }}>{factures.length} factures émises</p>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {['all', 'en_attente', 'paye', 'annule'].map((statut) => (
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
            {statut === 'all' ? 'Toutes' : getStatutLabel(statut)}
          </motion.button>
        ))}
      </div>

      {/* Factures Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          Chargement...
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {factures.map((facture) => {
            const statutColor = getStatutColor(facture.statutPaiement);

            return (
              <motion.div
                key={facture.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'rgba(15, 15, 15, 0.9)',
                  border: `1px solid ${statutColor}40`,
                  borderRadius: '15px',
                  padding: '20px',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    background: `${statutColor}20`,
                    padding: '10px',
                    borderRadius: '10px'
                  }}>
                    {facture.statutPaiement === 'paye' ? (
                      <CheckCircle size={24} color={statutColor} />
                    ) : facture.statutPaiement === 'en_attente' ? (
                      <Clock size={24} color={statutColor} />
                    ) : (
                      <Receipt size={24} color={statutColor} />
                    )}
                  </div>
                  <div>
                    <h3 style={{ color: statutColor, fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {facture.numero}
                    </h3>
                    <p style={{ color: '#999', fontSize: '12px' }}>
                      {new Date(facture.dateEmission).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>

                {facture.Devis?.Demande && (
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ color: '#e5e5e5', fontSize: '14px', marginBottom: '5px' }}>
                      <strong>Client:</strong> {facture.Devis.Demande.nom}
                    </p>
                    <p style={{ color: '#e5e5e5', fontSize: '14px' }}>
                      <strong>Produit:</strong> {facture.Devis.Demande.produit}
                    </p>
                  </div>
                )}

                <div style={{
                  background: `${statutColor}10`,
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '15px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#999', fontSize: '14px', marginBottom: '5px' }}>Montant TTC</p>
                  <p style={{ color: statutColor, fontSize: '1.8rem', fontWeight: 'bold' }}>
                    {facture.montantTtc.toFixed(2)} TND
                  </p>
                </div>

                <div style={{
                  padding: '10px',
                  background: `${statutColor}20`,
                  border: `1px solid ${statutColor}`,
                  borderRadius: '8px',
                  textAlign: 'center',
                  marginBottom: '15px'
                }}>
                  <p style={{ color: statutColor, fontSize: '14px', fontWeight: 'bold' }}>
                    {getStatutLabel(facture.statutPaiement)}
                  </p>
                  {facture.datePaiement && (
                    <p style={{ color: '#999', fontSize: '12px', marginTop: '5px' }}>
                      Payée le {new Date(facture.datePaiement).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFacture(facture)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: `${statutColor}20`,
                      border: `1px solid ${statutColor}`,
                      borderRadius: '8px',
                      color: statutColor,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    <Eye size={16} />
                    Voir
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadPDF(facture.id)}
                    style={{
                      padding: '10px 15px',
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
                    <Download size={16} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedFacture && (
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
              border: `1px solid ${getStatutColor(selectedFacture.statutPaiement)}40`,
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '500px',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: getStatutColor(selectedFacture.statutPaiement), fontSize: '1.5rem', fontWeight: 'bold' }}>
                {selectedFacture.numero}
              </h3>
              <button
                onClick={() => setSelectedFacture(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#999',
                  cursor: 'pointer'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#999', fontSize: '14px', marginBottom: '15px' }}>
                Émise le {new Date(selectedFacture.dateEmission).toLocaleDateString('fr-FR')}
              </p>

              {selectedFacture.Devis?.Demande && (
                <div style={{ 
                  background: `${getStatutColor(selectedFacture.statutPaiement)}10`, 
                  padding: '15px', 
                  borderRadius: '10px',
                  marginBottom: '15px'
                }}>
                  <h4 style={{ color: '#e5e5e5', marginBottom: '10px' }}>Client</h4>
                  <p style={{ color: '#e5e5e5', marginBottom: '5px' }}>
                    <strong>Nom:</strong> {selectedFacture.Devis.Demande.nom}
                  </p>
                  <p style={{ color: '#e5e5e5' }}>
                    <strong>Produit:</strong> {selectedFacture.Devis.Demande.produit}
                  </p>
                </div>
              )}

              <div style={{ 
                background: `${getStatutColor(selectedFacture.statutPaiement)}10`, 
                padding: '15px', 
                borderRadius: '10px',
                textAlign: 'center',
                marginBottom: '15px'
              }}>
                <p style={{ color: '#999', fontSize: '14px', marginBottom: '5px' }}>Montant Total TTC</p>
                <p style={{ color: getStatutColor(selectedFacture.statutPaiement), fontSize: '2rem', fontWeight: 'bold' }}>
                  {selectedFacture.montantTtc.toFixed(2)} TND
                </p>
              </div>

              <div style={{
                padding: '15px',
                background: `${getStatutColor(selectedFacture.statutPaiement)}20`,
                border: `1px solid ${getStatutColor(selectedFacture.statutPaiement)}`,
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <p style={{ color: getStatutColor(selectedFacture.statutPaiement), fontSize: '16px', fontWeight: 'bold' }}>
                  {getStatutLabel(selectedFacture.statutPaiement)}
                </p>
                {selectedFacture.datePaiement && (
                  <p style={{ color: '#999', fontSize: '14px', marginTop: '5px' }}>
                    Payée le {new Date(selectedFacture.datePaiement).toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => downloadPDF(selectedFacture.id)}
              style={{
                width: '100%',
                padding: '12px',
                background: `linear-gradient(45deg, ${getStatutColor(selectedFacture.statutPaiement)}, ${getStatutColor(selectedFacture.statutPaiement)}CC)`,
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Download size={18} />
              Télécharger PDF
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

