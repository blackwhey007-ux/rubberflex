import { useState } from 'react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onNavigate: (page: string) => void;
}

export default function AdminLogin({ onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onNavigate('dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
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
        style={{
          background: 'rgba(15, 15, 15, 0.9)',
          padding: '40px',
          borderRadius: '20px',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          maxWidth: '400px',
          width: '100%'
        }}
      >
        <h1 style={{ color: '#DC2626', fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>
          RUBBERFLEX Admin
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '8px' }}>Email</label>
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
                color: 'white'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#e5e5e5', marginBottom: '8px' }}>Mot de passe</label>
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
                color: 'white'
              }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid #DC2626', color: '#DC2626', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
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
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </motion.button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
          <p>Email: admin@rubberflex.tn</p>
          <p>Password: admin123</p>
        </div>
      </motion.div>
    </div>
  );
}
