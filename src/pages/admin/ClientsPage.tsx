import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Demande {
  id: number;
  produit: string;
  quantite: number;
  description: string;
  statut: 'nouvelle' | 'en_cours' | 'acceptee' | 'refusee';
  createdAt: string;
}

interface Client {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  entreprise?: string;
  adresse?: string;
  createdAt: string;
  totalDemandes?: number;
  demandesNouvelles?: number;
  demandesEnCours?: number;
  demandesAcceptees?: number;
  demandesRefusees?: number;
  derniereActivite?: string | null;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientDemandes, setClientDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    entreprise: '',
    adresse: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/clients');
      if (response.ok) {
        const data = await response.json();
        setAllClients(data);
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrage par recherche
  useEffect(() => {
    if (searchTerm === '') {
      setClients(allClients);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const searchNumbers = searchTerm.replace(/\D/g, ''); // Extraire uniquement les chiffres
      
      const filtered = allClients.filter(client => {
        const nomMatch = client.nom?.toLowerCase().includes(searchLower) || false;
        const emailMatch = client.email?.toLowerCase().includes(searchLower) || false;
        
        // Normaliser le téléphone pour la recherche
        const telephoneNormalized = client.telephone?.replace(/\s+|-|\(|\)/g, '') || '';
        const searchNormalized = searchTerm.replace(/\s+|-|\(|\)/g, '');
        const telephoneMatch = telephoneNormalized.includes(searchNormalized) || 
                              (searchNumbers && telephoneNormalized.includes(searchNumbers)) || false;
        
        const entrepriseMatch = client.entreprise?.toLowerCase().includes(searchLower) || false;
        
        return nomMatch || emailMatch || telephoneMatch || entrepriseMatch;
      });
      setClients(filtered);
    }
  }, [searchTerm, allClients]);

  // Fonction pour voir les demandes d'un client
  const handleViewDemandes = async (client: Client) => {
    setSelectedClient(client);
    try {
      const response = await fetch(`http://localhost:3000/api/clients/${client.id}/demandes`);
      if (response.ok) {
        const data = await response.json();
        setClientDemandes(data);
      }
    } catch (error) {
      console.error('Error fetching client demandes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await fetch(`http://localhost:3000/api/clients/${editingClient.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        fetchClients();
        setShowModal(false);
        setEditingClient(null);
      } else {
        await fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        fetchClients();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      nom: client.nom,
      email: client.email,
      telephone: client.telephone,
      entreprise: client.entreprise || '',
      adresse: client.adresse || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        await fetch(`http://localhost:3000/api/clients/${id}`, {
          method: 'DELETE'
        });
        fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const openAddModal = () => {
    setEditingClient(null);
    setFormData({ nom: '', email: '', telephone: '', entreprise: '', adresse: '' });
    setShowModal(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ color: '#e5e5e5', fontSize: '2em', margin: 0 }}>Gestion des Clients</h2>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Rechercher par nom, email, téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 20px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(220, 38, 38, 0.3)',
              borderRadius: '10px',
              color: 'white',
              fontSize: '1em',
              minWidth: '300px'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            style={{
              padding: '12px 24px',
              background: '#DC2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            + Ajouter Client
          </motion.button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>Chargement...</div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {clients.map((client) => (
            <motion.div
              key={client.id}
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
                  <h3 style={{ color: '#DC2626', margin: '0 0 10px 0', fontSize: '1.5em' }}>{client.nom}</h3>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#999' }}>
                      <span>📧</span>
                      <span>{client.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#999' }}>
                      <span>📞</span>
                      <span>{client.telephone}</span>
                    </div>
                  </div>
                  {client.entreprise && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#999', marginTop: '5px' }}>
                      <span>🏢</span>
                      <span>{client.entreprise}</span>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewDemandes(client)}
                    style={{
                      padding: '8px 16px',
                      background: '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9em',
                      fontWeight: 'bold'
                    }}
                  >
                    📋 Voir Demandes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(client)}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(220, 38, 38, 0.2)',
                      border: '1px solid #DC2626',
                      color: '#DC2626',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    ✏️ Modifier
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(client.id)}
                    style={{
                      padding: '8px 16px',
                      background: 'rgba(255, 0, 0, 0.1)',
                      border: '1px solid #FF0000',
                      color: '#FF0000',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    🗑️ Supprimer
                  </motion.button>
                </div>
              </div>

              {/* Statistiques */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <h4 style={{ color: '#DC2626', margin: '0 0 15px 0', fontSize: '1.1em' }}>📊 Statistiques</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#999', margin: '0 0 5px 0', fontSize: '0.85em' }}>Total Demandes</p>
                    <p style={{ color: '#e5e5e5', fontSize: '1.5em', fontWeight: 'bold', margin: 0 }}>
                      {client.totalDemandes || 0}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#999', margin: '0 0 5px 0', fontSize: '0.85em' }}>Nouvelles</p>
                    <p style={{ color: '#FFD700', fontSize: '1.5em', fontWeight: 'bold', margin: 0 }}>
                      {client.demandesNouvelles || 0}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#999', margin: '0 0 5px 0', fontSize: '0.85em' }}>En Cours</p>
                    <p style={{ color: '#2196F3', fontSize: '1.5em', fontWeight: 'bold', margin: 0 }}>
                      {client.demandesEnCours || 0}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ color: '#999', margin: '0 0 5px 0', fontSize: '0.85em' }}>Acceptées</p>
                    <p style={{ color: '#4CAF50', fontSize: '1.5em', fontWeight: 'bold', margin: 0 }}>
                      {client.demandesAcceptees || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dernière Activité */}
              {client.derniereActivite && (
                <div style={{ 
                  background: 'rgba(220, 38, 38, 0.1)',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#999', margin: 0, fontSize: '0.9em' }}>
                    📅 Dernière activité: {new Date(client.derniereActivite).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
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
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%'
            }}
          >
            <h3 style={{ color: '#DC2626', marginBottom: '20px' }}>
              {editingClient ? 'Modifier Client' : 'Ajouter un Client'}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nom complet"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                required
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
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
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
              <input
                type="tel"
                placeholder="Téléphone"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                required
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
              <input
                type="text"
                placeholder="Entreprise"
                value={formData.entreprise}
                onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
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
              <input
                type="text"
                placeholder="Adresse"
                value={formData.adresse}
                onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                  marginBottom: '20px',
                  fontSize: '1em'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#DC2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {editingClient ? 'Modifier' : 'Ajouter'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowModal(false);
                    setEditingClient(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(100, 100, 100, 0.3)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Annuler
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Modal Demandes Client */}
      {selectedClient && (
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
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#DC2626', fontSize: '1.8em', margin: 0 }}>
                📋 Demandes de {selectedClient.nom}
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSelectedClient(null);
                  setClientDemandes([]);
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

            {clientDemandes.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
                Aucune demande pour ce client
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {clientDemandes.map((demande) => (
                  <div
                    key={demande.id}
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(220, 38, 38, 0.3)',
                      borderRadius: '10px',
                      padding: '15px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <div>
                        <strong style={{ color: '#DC2626' }}>📦 {demande.produit}</strong>
                        <p style={{ color: '#999', margin: '5px 0', fontSize: '0.9em' }}>
                          {new Date(demande.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span
                        style={{
                          padding: '5px 12px',
                          background: demande.statut === 'nouvelle' ? '#FFD700' : 
                                     demande.statut === 'en_cours' ? '#2196F3' : 
                                     demande.statut === 'acceptee' ? '#4CAF50' : '#FF0000',
                          color: demande.statut === 'acceptee' || demande.statut === 'en_cours' ? '#fff' : '#000',
                          borderRadius: '15px',
                          fontSize: '0.85em',
                          fontWeight: 'bold'
                        }}
                      >
                        {demande.statut === 'nouvelle' ? '🆕 Nouvelle' : 
                         demande.statut === 'en_cours' ? '⚙️ En Cours' : 
                         demande.statut === 'acceptee' ? '✅ Acceptée' : '❌ Refusée'}
                      </span>
                    </div>
                    {demande.quantite > 0 && (
                      <p style={{ color: '#999', margin: '5px 0' }}>
                        📊 Surface: {demande.quantite} m²
                      </p>
                    )}
                    <p style={{ color: '#e5e5e5', margin: '5px 0', whiteSpace: 'pre-wrap' }}>
                      {demande.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
