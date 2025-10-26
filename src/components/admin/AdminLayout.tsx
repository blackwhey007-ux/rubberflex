import { useState } from 'react';
import { motion } from 'framer-motion';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function AdminLayout({ children, currentPage, onNavigate, onLogout }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'demandes', label: 'Demandes', icon: '📋' },
    { id: 'devis', label: 'Devis', icon: '📝', color: '#FF9800' },
    { id: 'factures', label: 'Factures', icon: '🧾' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '250px',
          background: 'rgba(15, 15, 15, 0.95)',
          borderRight: '1px solid rgba(220, 38, 38, 0.2)',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          zIndex: 1000
        }}
      >
        {/* Logo */}
        <div style={{ padding: '30px 20px', borderBottom: '1px solid rgba(220, 38, 38, 0.2)' }}>
          <h2 style={{ color: '#DC2626', fontSize: '1.8em', margin: 0 }}>RUBBERFLEX</h2>
          <p style={{ color: '#999', fontSize: '0.9em', margin: '5px 0 0 0' }}>Admin Panel</p>
        </div>

        {/* Menu Items */}
        <div style={{ padding: '20px 0' }}>
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.id)}
              style={{
                padding: '15px 20px',
                cursor: 'pointer',
                background: currentPage === item.id ? 'rgba(220, 38, 38, 0.15)' : 'transparent',
                borderLeft: currentPage === item.id ? '3px solid #DC2626' : '3px solid transparent',
                color: currentPage === item.id ? '#DC2626' : '#e5e5e5',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.3s'
              }}
            >
              <span style={{ fontSize: '1.5em' }}>{item.icon}</span>
              <span style={{ fontWeight: currentPage === item.id ? 'bold' : 'normal' }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ position: 'absolute', bottom: '20px', width: '100%', padding: '0 20px' }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            style={{
              padding: '15px 20px',
              background: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid #DC2626',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#DC2626',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Déconnexion
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div style={{ marginLeft: sidebarOpen ? '250px' : '0', width: sidebarOpen ? 'calc(100% - 250px)' : '100%', transition: 'all 0.3s' }}>
        {/* Header */}
        <div style={{ padding: '20px 40px', background: 'rgba(15, 15, 15, 0.9)', borderBottom: '1px solid rgba(220, 38, 38, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              color: '#DC2626',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1.2em'
            }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <div style={{ color: '#999' }}>
            {menuItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '40px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

