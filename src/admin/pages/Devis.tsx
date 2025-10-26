import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileCheck, Download, Eye, X } from 'lucide-react';

interface Devis {
  id: number;
  numero: string;
  demandeId: number;
  montantHt: number;
  tva: number;
  montantTtc: number;
  validite: string;
  pdfPath?: string;
  createdAt: string;
  Demande?: {
    nom: string;
    produit: string;
  };
}

export default function Devis() {
  const { token } = useAuth();
  const [devisList, setDevisList] = useState<Devis[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevis, setSelectedDevis] = useState<Devis | null>(null);

  useEffect(() => {
    fetchDevis();
  }, []);

  const fetchDevis = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/devis', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDevisList(data);
      }
    } catch (error) {
      console.error('Error fetching devis:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/devis/${id}/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `devis-${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Gestion des Devis
        </h2>
        <p style={{ color: '#999' }}>{devisList.length} devis générés</p>
      </div>

      {/* Devis Grid */}
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
          {devisList.map((devis) => (
            <motion.div
              key={devis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'rgba(15, 15, 15, 0.9)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
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
                  background: 'rgba(139, 92, 246, 0.2)',
                  padding: '10px',
                  borderRadius: '10px'
                }}>
                  <FileCheck size={24} color="#8B5CF6" />
                </div>
                <div>
                  <h3 style={{ color: '#8B5CF6', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {devis.numero}
                  </h3>
                  <p style={{ color: '#999', fontSize: '12px' }}>
                    {new Date(devis.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              {devis.Demande && (
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ color: '#e5e5e5', fontSize: '14px', marginBottom: '5px' }}>
                    <strong>Client:</strong> {devis.Demande.nom}
                  </p>
                  <p style={{ color: '#e5e5e5', fontSize: '14px' }}>
                    <strong>Produit:</strong> {devis.Demande.produit}
                  </p>
                </div>
              )}

              <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#999', fontSize: '14px' }}>Montant HT</span>
                  <span style={{ color: '#e5e5e5', fontSize: '14px', fontWeight: 'bold' }}>
                    {devis.montantHt.toFixed(2)} TND
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#999', fontSize: '14px' }}>TVA ({devis.tva}%)</span>
                  <span style={{ color: '#e5e5e5', fontSize: '14px' }}>
                    {(devis.montantHt * devis.tva / 100).toFixed(2)} TND
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  <span style={{ color: '#8B5CF6', fontSize: '16px', fontWeight: 'bold' }}>Total TTC</span>
                  <span style={{ color: '#8B5CF6', fontSize: '18px', fontWeight: 'bold' }}>
                    {devis.montantTtc.toFixed(2)} TND
                  </span>
                </div>
              </div>

              <p style={{ color: '#999', fontSize: '13px', marginBottom: '15px' }}>
                Validité: {new Date(devis.validite).toLocaleDateString('fr-FR')}
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDevis(devis)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid #8B5CF6',
                    borderRadius: '8px',
                    color: '#8B5CF6',
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
                  onClick={() => downloadPDF(devis.id)}
                  style={{
                    padding: '10px 15px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid #10B981',
                    borderRadius: '8px',
                    color: '#10B981',
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
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedDevis && (
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
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '500px',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#8B5CF6', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {selectedDevis.numero}
              </h3>
              <button
                onClick={() => setSelectedDevis(null)}
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
                Créé le {new Date(selectedDevis.createdAt).toLocaleDateString('fr-FR')}
              </p>

              {selectedDevis.Demande && (
                <div style={{ 
                  background: 'rgba(139, 92, 246, 0.1)', 
                  padding: '15px', 
                  borderRadius: '10px',
                  marginBottom: '15px'
                }}>
                  <h4 style={{ color: '#e5e5e5', marginBottom: '10px' }}>Client</h4>
                  <p style={{ color: '#e5e5e5', marginBottom: '5px' }}>
                    <strong>Nom:</strong> {selectedDevis.Demande.nom}
                  </p>
                  <p style={{ color: '#e5e5e5' }}>
                    <strong>Produit:</strong> {selectedDevis.Demande.produit}
                  </p>
                </div>
              )}

              <div style={{ 
                background: 'rgba(139, 92, 246, 0.1)', 
                padding: '15px', 
                borderRadius: '10px'
              }}>
                <h4 style={{ color: '#e5e5e5', marginBottom: '10px' }}>Montants</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#999' }}>Montant HT</span>
                  <span style={{ color: '#e5e5e5', fontWeight: 'bold' }}>
                    {selectedDevis.montantHt.toFixed(2)} TND
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#999' }}>TVA ({selectedDevis.tva}%)</span>
                  <span style={{ color: '#e5e5e5' }}>
                    {(selectedDevis.montantHt * selectedDevis.tva / 100).toFixed(2)} TND
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  <span style={{ color: '#8B5CF6', fontSize: '16px', fontWeight: 'bold' }}>Total TTC</span>
                  <span style={{ color: '#8B5CF6', fontSize: '18px', fontWeight: 'bold' }}>
                    {selectedDevis.montantTtc.toFixed(2)} TND
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => downloadPDF(selectedDevis.id)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(45deg, #8B5CF6, #A78BFA)',
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

