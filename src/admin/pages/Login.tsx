import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a0000 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(15, 15, 15, 0.9)',
          padding: '40px',
          borderRadius: '20px',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          backdropFilter: 'blur(20px)',
          maxWidth: '400px',
          width: '100%'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            color: '#DC2626', 
            marginBottom: '10px',
            fontWeight: 'bold'
          }}>
            RUBBERFLEX Admin
          </h1>
          <p style={{ color: '#999' }}>Connectez-vous à votre espace</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              color: '#e5e5e5', 
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(220, 38, 38, 0.3)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#DC2626'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(220, 38, 38, 0.3)'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              color: '#e5e5e5', 
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              <Lock size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '2px solid rgba(220, 38, 38, 0.3)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#DC2626'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(220, 38, 38, 0.3)'}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(220, 38, 38, 0.1)',
              border: '1px solid #DC2626',
              color: '#DC2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(45deg, #DC2626, #EF4444)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1
            }}
          >
            <LogIn size={20} />
            {loading ? 'Connexion...' : 'Se connecter'}
          </motion.button>
        </form>

        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          fontSize: '12px', 
          color: '#666' 
        }}>
          <p>Compte par défaut:</p>
          <p style={{ color: '#999' }}>admin@rubberflex.tn / admin123</p>
        </div>
      </motion.div>
    </div>
  );
}

