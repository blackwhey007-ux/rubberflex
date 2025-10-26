import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Demande {
  id: number;
  clientId: number;
  clientNom: string;
  produit: string;
  quantite: number;
  description: string;
  email?: string;
  telephone?: string;
  statut: 'nouvelle' | 'en_cours' | 'acceptee' | 'refusee';
  createdAt: string;
}

const statutColors = {
  nouvelle: '#FFD700',
  en_cours: '#2196F3',
  acceptee: '#4CAF50',
  refusee: '#FF0000'
};

const statutLabels = {
  nouvelle: 'Nouvelle',
  en_cours: 'En Cours',
  acceptee: 'Acceptée',
  refusee: 'Refusée'
};

export default function DemandesPage() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [editingDemande, setEditingDemande] = useState<Demande | null>(null);
  const [editForm, setEditForm] = useState({
    clientNom: '',
    email: '',
    telephone: '',
    produit: '',
    quantite: '',
    description: ''
  });

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/demandes');
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

  const handleStatusChange = async (id: number, newStatus: Demande['statut']) => {
    try {
      await fetch(`http://localhost:3000/api/demandes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut: newStatus })
      });
      fetchDemandes();
    } catch (error) {
      console.error('Error updating demande:', error);
    }
  };

  const handleEdit = (demande: Demande) => {
    setEditingDemande(demande);
    setEditForm({
      clientNom: demande.clientNom,
      email: demande.email || '',
      telephone: demande.telephone || '',
      produit: demande.produit,
      quantite: demande.quantite.toString(),
      description: demande.description
    });
  };

  const handleUpdate = async () => {
    if (!editingDemande) return;
    
    try {
      await fetch(`http://localhost:3000/api/demandes/${editingDemande.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      fetchDemandes();
      setEditingDemande(null);
    } catch (error) {
      console.error('Error updating demande:', error);
    }
  };

  const filteredDemandes = filter === 'all' 
    ? demandes 
    : demandes.filter(d => d.statut === filter);

  const stats = {
    all: demandes.length,
    nouvelle: demandes.filter(d => d.statut === 'nouvelle').length,
    en_cours: demandes.filter(d => d.statut === 'en_cours').length,
    acceptee: demandes.filter(d => d.statut === 'acceptee').length,
    refusee: demandes.filter(d => d.statut === 'refusee').length
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '2em', margin: 0 }}>Gestion des Demandes</h2>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'Toutes', count: stats.all },
          { key: 'nouvelle', label: 'Nouvelles', count: stats.nouvelle },
          { key: 'en_cours', label: 'En Cours', count: stats.en_cours },
          { key: 'acceptee', label: 'Acceptées', count: stats.acceptee },
          { key: 'refusee', label: 'Refusées', count: stats.refusee }
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
          {filteredDemandes.map((demande) => (
            <motion.div
              key={demande.id}
              whileHover={{ scale: 1.01, boxShadow: '0 10px 40px rgba(220, 38, 38, 0.3)' }}
              style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.95) 100%)',
                border: '2px solid rgba(220, 38, 38, 0.3)',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Header with Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(220, 38, 38, 0.2)' }}>
                <div>
                  <h3 style={{ color: '#DC2626', margin: '0 0 10px 0', fontSize: '1.5em' }}>{demande.clientNom}</h3>
                  <span
                    style={{
                      padding: '8px 18px',
                      background: statutColors[demande.statut],
                      color: '#000',
                      borderRadius: '25px',
                      fontWeight: 'bold',
                      fontSize: '0.9em',
                      display: 'inline-block'
                    }}
                  >
                    {statutLabels[demande.statut]}
                  </span>
                </div>
                <span style={{ color: '#666', fontSize: '0.9em' }}>
                  📅 {new Date(demande.createdAt).toLocaleDateString('fr-FR', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                  })}
                </span>
              </div>

              {/* Contact Info */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '15px',
                marginBottom: '20px',
                padding: '15px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '10px'
              }}>
                {demande.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2em' }}>📧</span>
                    <span style={{ color: '#e5e5e5' }}>{demande.email}</span>
                  </div>
                )}
                {demande.telephone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2em' }}>📞</span>
                    <span style={{ color: '#e5e5e5' }}>{demande.telephone}</span>
                  </div>
                )}
              </div>

              {/* Product & Details */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '1.2em' }}>📦</span>
                  <strong style={{ color: '#DC2626' }}>Produit:</strong>
                  <span style={{ color: '#e5e5e5' }}>{demande.produit}</span>
                </div>
                {demande.quantite > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '1.2em' }}>📊</span>
                    <strong style={{ color: '#DC2626' }}>Surface:</strong>
                    <span style={{ color: '#e5e5e5' }}>{demande.quantite} m²</span>
                  </div>
                )}
                {demande.description && (
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(220, 38, 38, 0.2)' }}>
                    <strong style={{ color: '#DC2626', display: 'block', marginBottom: '8px' }}>📝 Message:</strong>
                    <p style={{ color: '#e5e5e5', margin: 0, lineHeight: '1.6' }}>{demande.description}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {/* Bouton Modifier */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(demande)}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(220, 38, 38, 0.2)',
                    color: '#DC2626',
                    border: '2px solid #DC2626',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.95em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  ✏️ Modifier
                </motion.button>

                {/* Bouton Créer Devis pour demandes en cours */}
                {demande.statut === 'en_cours' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      try {
                        const response = await fetch(`http://localhost:3000/api/devis/from-demande/${demande.id}`, {
                          method: 'POST'
                        });
                        if (response.ok) {
                          const data = await response.json();
                          alert(`✅ Devis ${data.devis.numero} créé avec succès!`);
                          fetchDemandes();
                        } else {
                          const errorData = await response.json();
                          alert(errorData.error || 'Erreur lors de la création du devis');
                        }
                      } catch (error) {
                        console.error('Error creating devis:', error);
                        alert('Erreur lors de la création du devis');
                      }
                    }}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #FF9800 0%, #f57c00 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.95em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)'
                    }}
                  >
                    📋 Créer Devis
                  </motion.button>
                )}

                {/* Boutons de Facture pour demandes acceptées */}
                {demande.statut === 'acceptee' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      try {
                        const response = await fetch(`http://localhost:3000/api/factures/from-demande/${demande.id}`, {
                          method: 'POST'
                        });
                        if (response.ok) {
                          alert('✅ Facture créée avec succès!');
                          fetchDemandes();
                        } else {
                          const errorData = await response.json();
                          alert(errorData.error || 'Erreur lors de la création de la facture');
                        }
                      } catch (error) {
                        console.error('Error creating facture:', error);
                        alert('Erreur lors de la création de la facture');
                      }
                    }}
                    style={{
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #25D366 0%, #20b356 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.95em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    🧾 Créer Facture
                  </motion.button>
                )}

                {/* Boutons de Statut */}
                {demande.statut === 'nouvelle' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(demande.id, 'en_cours')}
                      style={{
                        padding: '12px 24px',
                        background: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      ⚙️ Prendre en charge
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(demande.id, 'refusee')}
                      style={{
                        padding: '12px 24px',
                        background: '#FF0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      ❌ Refuser
                    </motion.button>
                  </>
                )}
                {demande.statut === 'en_cours' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(demande.id, 'acceptee')}
                      style={{
                        padding: '12px 24px',
                        background: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      ✅ Accepter
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStatusChange(demande.id, 'refusee')}
                      style={{
                        padding: '12px 24px',
                        background: '#FF0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.95em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      ❌ Refuser
                    </motion.button>
                  </>
                )}
                {(demande.statut === 'acceptee' || demande.statut === 'refusee') && (
                  <div style={{ 
                    padding: '12px 24px',
                    background: 'rgba(100, 100, 100, 0.2)',
                    color: '#999',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}>
                    ✓ {demande.statut === 'acceptee' ? 'Demande acceptée' : 'Demande refusée'}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal d'édition */}
      {editingDemande && (
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
              border: '2px solid #DC2626',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <h3 style={{ color: '#DC2626', marginBottom: '20px', fontSize: '1.8em' }}>Modifier la Demande</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                placeholder="Nom du client"
                value={editForm.clientNom}
                onChange={(e) => setEditForm({ ...editForm, clientNom: e.target.value })}
                style={{
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1em'
                }}
              />
              <input
                placeholder="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                style={{
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1em'
                }}
              />
              <input
                placeholder="Téléphone"
                value={editForm.telephone}
                onChange={(e) => setEditForm({ ...editForm, telephone: e.target.value })}
                style={{
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1em'
                }}
              />
              <input
                placeholder="Produit"
                value={editForm.produit}
                onChange={(e) => setEditForm({ ...editForm, produit: e.target.value })}
                style={{
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1em'
                }}
              />
              <input
                placeholder="Surface (m²)"
                type="number"
                value={editForm.quantite}
                onChange={(e) => setEditForm({ ...editForm, quantite: e.target.value })}
                style={{
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1em'
                }}
              />
              <textarea
                placeholder="Description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={4}
                style={{
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1em',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUpdate}
                style={{
                  flex: 1,
                  padding: '15px',
                  background: '#DC2626',
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
                onClick={() => setEditingDemande(null)}
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
    </div>
  );
}
