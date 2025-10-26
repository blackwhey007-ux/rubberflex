import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
  X
} from 'lucide-react';

interface Client {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  adresse?: string;
  entreprise?: string;
  notes?: string;
  createdAt: string;
}

export default function Clients() {
  const { token } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    entreprise: '',
    notes: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/clients', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingClient
        ? `http://localhost:3000/api/clients/${editingClient.id}`
        : 'http://localhost:3000/api/clients';

      const response = await fetch(url, {
        method: editingClient ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchClients();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      nom: client.nom,
      email: client.email,
      telephone: client.telephone,
      adresse: client.adresse || '',
      entreprise: client.entreprise || '',
      notes: client.notes || ''
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingClient(null);
    setFormData({
      nom: '',
      email: '',
      telephone: '',
      adresse: '',
      entreprise: '',
      notes: ''
    });
  };

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.telephone.includes(searchTerm)
  );

  return (
    <div>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h2 style={{ color: '#e5e5e5', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px' }}>
            Gestion des Clients
          </h2>
          <p style={{ color: '#999' }}>{clients.length} clients enregistrés</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(45deg, #DC2626, #EF4444)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Plus size={20} />
          Nouveau Client
        </motion.button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <Search 
          size={20} 
          style={{ 
            position: 'absolute', 
            left: '15px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#999'
          }} 
        />
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 45px',
            background: 'rgba(15, 15, 15, 0.9)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '10px',
            color: 'white',
            fontSize: '16px',
            outline: 'none'
          }}
        />
      </div>

      {/* Clients Grid */}
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
          {filteredClients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'rgba(15, 15, 15, 0.9)',
                border: '1px solid rgba(220, 38, 38, 0.3)',
                borderRadius: '15px',
                padding: '20px',
                position: 'relative'
              }}
            >
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: '#DC2626', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                  {client.nom}
                </h3>
                {client.entreprise && (
                  <p style={{ color: '#999', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Building size={14} />
                    {client.entreprise}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ color: '#e5e5e5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Mail size={16} color="#DC2626" />
                  {client.email}
                </p>
                <p style={{ color: '#e5e5e5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="#DC2626" />
                  {client.telephone}
                </p>
              </div>

              {client.notes && (
                <p style={{ 
                  color: '#999', 
                  fontSize: '13px', 
                  fontStyle: 'italic',
                  marginBottom: '15px',
                  borderTop: '1px solid rgba(220, 38, 38, 0.2)',
                  paddingTop: '10px'
                }}>
                  {client.notes}
                </p>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(client)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: 'rgba(220, 38, 38, 0.2)',
                    border: '1px solid #DC2626',
                    borderRadius: '8px',
                    color: '#DC2626',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    fontSize: '14px'
                  }}
                >
                  <Edit size={16} />
                  Modifier
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(client.id)}
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #EF4444',
                    borderRadius: '8px',
                    color: '#EF4444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
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
              maxWidth: '500px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#DC2626', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {editingClient ? 'Modifier Client' : 'Nouveau Client'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
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

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '8px', fontSize: '14px' }}>
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '8px', fontSize: '14px' }}>
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '8px', fontSize: '14px' }}>
                  Téléphone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '8px', fontSize: '14px' }}>
                  Entreprise
                </label>
                <input
                  type="text"
                  value={formData.entreprise}
                  onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '8px', fontSize: '14px' }}>
                  Adresse
                </label>
                <input
                  type="text"
                  value={formData.adresse}
                  onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '8px', fontSize: '14px' }}>
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(45deg, #DC2626, #EF4444)',
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {editingClient ? 'Mettre à jour' : 'Créer'}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '10px',
                    color: '#999',
                    fontWeight: 'bold',
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
    </div>
  );
}

