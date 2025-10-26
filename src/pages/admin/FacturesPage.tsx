import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Facture {
  id: number;
  numero: string;
  clientId: number;
  clientNom: string;
  demandeId: number;
  montant: number;
  avance?: number;
  resteAPayer?: number;
  statutPaiement?: 'non_paye' | 'partiel' | 'paye';
  date: string;
  statut?: string;
}

interface Paiement {
  id: number;
  factureId: number;
  montant: number;
  date: string;
  type: 'cash' | 'traite' | 'cheque';
  createdAt: string;
}

export default function FacturesPage() {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedFacture, setSelectedFacture] = useState<Facture | null>(null);
  const [paiementMontant, setPaiementMontant] = useState('');
  const [paiementDate, setPaiementDate] = useState('');
  const [paiementType, setPaiementType] = useState<'cash' | 'traite' | 'cheque'>('cash');
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const [showHistoriqueModal, setShowHistoriqueModal] = useState(false);
  const [historiquePaiements, setHistoriquePaiements] = useState<Paiement[]>([]);

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/factures');
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

  const handleDownloadPDF = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/factures/${id}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const facture = factures.find(f => f.id === id);
        a.download = `${facture?.numero}.pdf`;
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

  const handleOpenPaiementModal = (facture: Facture) => {
    setSelectedFacture(facture);
    setPaiementMontant('');
    setPaiementDate(new Date().toISOString().split('T')[0]);
    setPaiementType('cash');
    setShowPaiementModal(true);
  };

  const handleOpenHistorique = async (facture: Facture) => {
    setSelectedFacture(facture);
    try {
      const response = await fetch(`http://localhost:3000/api/factures/${facture.id}/paiements`);
      if (response.ok) {
        const data = await response.json();
        setHistoriquePaiements(data);
        setShowHistoriqueModal(true);
      }
    } catch (error) {
      console.error('Error fetching historique:', error);
      alert('Erreur lors du chargement de l\'historique');
    }
  };

  const handleSubmitPaiement = async () => {
    if (!selectedFacture || !paiementMontant) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/factures/${selectedFacture.id}/paiement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          montantPaye: parseFloat(paiementMontant),
          date: paiementDate,
          type: paiementType
        })
      });
      
      if (response.ok) {
        fetchFactures();
        setShowPaiementModal(false);
        alert('✅ Paiement enregistré avec succès!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erreur lors de l\'enregistrement du paiement');
      }
    } catch (error) {
      console.error('Error submitting paiement:', error);
      alert('Erreur lors de l\'enregistrement du paiement');
    }
  };

  const filteredFactures = filter === 'all' 
    ? factures 
    : factures.filter(f => f.statutPaiement === filter);

  const stats = {
    all: factures.length,
    non_paye: factures.filter(f => f.statutPaiement === 'non_paye').length,
    partiel: factures.filter(f => f.statutPaiement === 'partiel').length,
    paye: factures.filter(f => f.statutPaiement === 'paye').length
  };

  const totalCA = factures.reduce((sum, f) => sum + f.montant, 0);
  const caMois = factures
    .filter(f => new Date(f.date).getMonth() === new Date().getMonth())
    .reduce((sum, f) => sum + f.montant, 0);
  const totalEnCours = factures
    .filter(f => f.statutPaiement === 'non_paye' || f.statutPaiement === 'partiel')
    .reduce((sum, f) => sum + (f.resteAPayer || f.montant), 0);

  const getPaiementColor = (statut?: string) => {
    if (statut === 'paye') return '#4CAF50';
    if (statut === 'partiel') return '#FFD700';
    return '#FF0000';
  };

  const getPaiementLabel = (statut?: string) => {
    if (statut === 'paye') return '✓ Payée';
    if (statut === 'partiel') return '⏳ Partielle';
    return '❌ Non payée';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '2em', margin: 0 }}>Gestion des Factures</h2>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#999', margin: '0 0 10px 0', fontSize: '0.9em' }}>Total Factures</h3>
          <p style={{ color: '#DC2626', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{factures.length}</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#999', margin: '0 0 10px 0', fontSize: '0.9em' }}>CA Total</h3>
          <p style={{ color: '#25D366', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{totalCA.toFixed(2)} DT</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#999', margin: '0 0 10px 0', fontSize: '0.9em' }}>CA du Mois</h3>
          <p style={{ color: '#25D366', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{caMois.toFixed(2)} DT</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <h3 style={{ color: '#999', margin: '0 0 10px 0', fontSize: '0.9em' }}>En Cours</h3>
          <p style={{ color: '#FFD700', fontSize: '2em', fontWeight: 'bold', margin: 0 }}>{totalEnCours.toFixed(2)} DT</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'Toutes', count: stats.all },
          { key: 'non_paye', label: 'Non Payées', count: stats.non_paye },
          { key: 'partiel', label: 'Partielles', count: stats.partiel },
          { key: 'paye', label: 'Payées', count: stats.paye }
        ].map(({ key, label, count }) => (
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
          {filteredFactures.map((facture) => (
            <motion.div
              key={facture.id}
              whileHover={{ scale: 1.01, boxShadow: '0 10px 40px rgba(220, 38, 38, 0.3)' }}
              style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.95) 100%)',
                border: '2px solid rgba(220, 38, 38, 0.3)',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(220, 38, 38, 0.2)' }}>
                <div>
                  <h3 style={{ color: '#DC2626', margin: '0 0 10px 0', fontSize: '1.5em' }}>{facture.numero}</h3>
                  <span
                    style={{
                      padding: '8px 18px',
                      background: getPaiementColor(facture.statutPaiement),
                      color: facture.statutPaiement === 'paye' ? '#fff' : '#000',
                      borderRadius: '25px',
                      fontWeight: 'bold',
                      fontSize: '0.9em',
                      display: 'inline-block'
                    }}
                  >
                    {getPaiementLabel(facture.statutPaiement)}
                  </span>
                </div>
                <span style={{ color: '#666', fontSize: '0.9em' }}>
                  📅 {new Date(facture.date).toLocaleDateString('fr-FR', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                  })}
                </span>
              </div>

              {/* Client Info */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.2em' }}>👤</span>
                  <strong style={{ color: '#DC2626' }}>Client:</strong>
                  <span style={{ color: '#e5e5e5' }}>{facture.clientNom}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2em' }}>💰</span>
                  <strong style={{ color: '#DC2626' }}>Montant:</strong>
                  <span style={{ color: '#e5e5e5', fontSize: '1.2em', fontWeight: 'bold' }}>
                    {facture.montant.toFixed(2)} DT
                  </span>
                </div>
              </div>

              {/* Payment Info */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <h4 style={{ color: '#DC2626', margin: '0 0 15px 0', fontSize: '1.1em' }}>💳 Détails Paiement</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#999', margin: '0 0 5px 0', fontSize: '0.85em' }}>Total</p>
                    <p style={{ color: '#e5e5e5', fontSize: '1.2em', fontWeight: 'bold', margin: 0 }}>
                      {facture.montant.toFixed(2)} DT
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#999', margin: '0 0 5px 0', fontSize: '0.85em' }}>Avance</p>
                    <p style={{ color: '#4CAF50', fontSize: '1.2em', fontWeight: 'bold', margin: 0 }}>
                      {facture.avance?.toFixed(2) || 0} DT
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#999', margin: '0 0 5px 0', fontSize: '0.85em' }}>Reste</p>
                    <p style={{ color: facture.resteAPayer && facture.resteAPayer > 0 ? '#FFD700' : '#4CAF50', fontSize: '1.2em', fontWeight: 'bold', margin: 0 }}>
                      {facture.resteAPayer?.toFixed(2) || facture.montant.toFixed(2)} DT
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {(facture.statutPaiement === 'non_paye' || facture.statutPaiement === 'partiel') && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenPaiementModal(facture)}
                    style={{
                      padding: '12px 24px',
                      background: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    💳 Enregistrer Paiement
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenHistorique(facture)}
                  style={{
                    padding: '12px 24px',
                    background: '#9C27B0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                    📜 Historique Paiements
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownloadPDF(facture.id)}
                  style={{
                    padding: '12px 24px',
                    background: '#DC2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  📄 Télécharger PDF
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal Paiement */}
      {showPaiementModal && selectedFacture && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#1a1a1a',
              border: '2px solid #DC2626',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%'
            }}
          >
            <h3 style={{ color: '#DC2626', marginBottom: '20px' }}>Enregistrer un Paiement</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#999', marginBottom: '10px' }}>Facture: {selectedFacture.numero}</p>
              <p style={{ color: '#999', marginBottom: '10px' }}>Montant total: {selectedFacture.montant.toFixed(2)} DT</p>
              <p style={{ color: '#999', marginBottom: '10px' }}>Avance: {selectedFacture.avance?.toFixed(2) || 0} DT</p>
              <p style={{ color: '#999', marginBottom: '20px' }}>
                Reste à payer: {selectedFacture.resteAPayer?.toFixed(2) || selectedFacture.montant.toFixed(2)} DT
              </p>
            </div>

            <input
              type="number"
              placeholder="Montant du paiement"
              value={paiementMontant}
              onChange={(e) => setPaiementMontant(e.target.value)}
              min={0}
              max={selectedFacture.resteAPayer || selectedFacture.montant}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                borderRadius: '8px',
                color: 'white',
                marginBottom: '15px',
                fontSize: '1em'
              }}
            />

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '5px', fontWeight: 'bold' }}>
                📅 Date du paiement
              </label>
              <input
                type="date"
                value={paiementDate}
                onChange={(e) => setPaiementDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1em'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '5px', fontWeight: 'bold' }}>
                💳 Méthode de paiement
              </label>
              <select
                value={paiementType}
                onChange={(e) => setPaiementType(e.target.value as 'cash' | 'traite' | 'cheque')}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1em',
                  cursor: 'pointer'
                }}
              >
                <option value="cash">💰 Espèces (Cash)</option>
                <option value="traite">📄 Traite</option>
                <option value="cheque">💳 Chèque</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmitPaiement}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1em'
                }}
              >
                Enregistrer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPaiementModal(false)}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: 'rgba(100, 100, 100, 0.3)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1em'
                }}
              >
                Annuler
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Historique des Paiements */}
      {showHistoriqueModal && selectedFacture && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: '#1a1a1a',
              border: '2px solid #9C27B0',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#9C27B0', fontSize: '1.8em', margin: 0 }}>
                📜 Historique des Paiements
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHistoriqueModal(false);
                  setHistoriquePaiements([]);
                }}
                style={{
                  padding: '8px 16px',
                  background: 'rgba(255, 0, 0, 0.2)',
                  border: '1px solid #FF0000',
                  color: '#FF0000',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ✕ Fermer
              </motion.button>
            </div>

            <div style={{ 
              background: 'rgba(220, 38, 38, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#e5e5e5', margin: '5px 0' }}>Facture: <strong style={{ color: '#DC2626' }}>{selectedFacture.numero}</strong></p>
              <p style={{ color: '#e5e5e5', margin: '5px 0' }}>Client: <strong style={{ color: '#DC2626' }}>{selectedFacture.clientNom}</strong></p>
              <p style={{ color: '#e5e5e5', margin: '5px 0' }}>Montant Total: <strong style={{ color: '#DC2626' }}>{selectedFacture.montant.toFixed(2)} DT</strong></p>
              <p style={{ color: '#e5e5e5', margin: '5px 0' }}>
                Payé: <strong style={{ color: '#4CAF50' }}>{selectedFacture.avance?.toFixed(2) || 0} DT</strong> | 
                Reste: <strong style={{ color: '#FFD700' }}>{selectedFacture.resteAPayer?.toFixed(2) || selectedFacture.montant.toFixed(2)} DT</strong>
              </p>
            </div>

            {historiquePaiements.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                color: '#999', 
                padding: '40px',
                border: '2px dashed rgba(156, 39, 176, 0.3)',
                borderRadius: '10px'
              }}>
                <span style={{ fontSize: '3em', display: 'block', marginBottom: '10px' }}>📭</span>
                <p>Aucun paiement enregistré</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {historiquePaiements.map((paiement, index) => (
                  <motion.div
                    key={paiement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      background: 'rgba(156, 39, 176, 0.1)',
                      border: '1px solid rgba(156, 39, 176, 0.3)',
                      borderRadius: '10px',
                      padding: '15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#9C27B0', margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '1.1em' }}>
                        #{index + 1}
                      </p>
                      <p style={{ color: '#e5e5e5', margin: '5px 0', fontSize: '0.9em' }}>
                        📅 {new Date(paiement.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <p style={{ 
                        color: paiement.type === 'cash' ? '#4CAF50' : paiement.type === 'traite' ? '#2196F3' : '#FFD700',
                        margin: '5px 0',
                        fontSize: '0.85em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        {paiement.type === 'cash' && '💰 Espèces'}
                        {paiement.type === 'traite' && '📄 Traite'}
                        {paiement.type === 'cheque' && '💳 Chèque'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#4CAF50', margin: 0, fontSize: '1.3em', fontWeight: 'bold' }}>
                        {paiement.montant.toFixed(2)} DT
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Résumé */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid #9C27B0',
                  borderRadius: '10px',
                  padding: '15px',
                  marginTop: '10px'
                }}>
                  <p style={{ color: '#9C27B0', margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '1.1em' }}>
                    📊 Résumé
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#999' }}>Total Payé:</span>
                    <strong style={{ color: '#4CAF50' }}>
                      {historiquePaiements.reduce((sum, p) => sum + p.montant, 0).toFixed(2)} DT
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <span style={{ color: '#999' }}>Nombre de paiements:</span>
                    <strong style={{ color: '#9C27B0' }}>{historiquePaiements.length}</strong>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
