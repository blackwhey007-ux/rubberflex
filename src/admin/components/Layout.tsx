import type { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  FileCheck,
  Receipt,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/clients', icon: Users, label: 'Clients' },
    { path: '/admin/demandes', icon: FileText, label: 'Demandes' },
    { path: '/admin/devis', icon: FileCheck, label: 'Devis' },
    { path: '/admin/factures', icon: Receipt, label: 'Factures' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: sidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '250px',
          background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0000 100%)',
          borderRight: '1px solid rgba(220, 38, 38, 0.2)',
          padding: '20px',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          zIndex: 1000
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ 
            color: '#DC2626', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            marginBottom: '5px'
          }}>
            RUBBERFLEX
          </h2>
          <p style={{ color: '#666', fontSize: '12px' }}>Admin Panel</p>
        </div>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(220, 38, 38, 0.2)' : 'transparent',
                  border: `1px solid ${isActive ? '#DC2626' : 'transparent'}`,
                  color: isActive ? '#DC2626' : '#999',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  fontWeight: isActive ? 'bold' : 'normal'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)';
                    e.currentTarget.style.color = '#DC2626';
                  }
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#999';
                  }
                }}
              >
                <Icon size={20} style={{ marginRight: '12px' }} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          left: '20px', 
          right: '20px' 
        }}>
          <div style={{
            padding: '12px',
            background: 'rgba(220, 38, 38, 0.1)',
            borderRadius: '10px',
            marginBottom: '12px'
          }}>
            <p style={{ color: '#e5e5e5', fontSize: '14px', fontWeight: 'bold' }}>
              {user?.email}
            </p>
            <p style={{ color: '#666', fontSize: '12px' }}>
              {user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid #DC2626',
              borderRadius: '10px',
              color: '#DC2626',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: 'bold',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#DC2626';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)';
              e.currentTarget.style.color = '#DC2626';
            }}
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={{ 
        marginLeft: sidebarOpen ? '250px' : '0',
        flex: 1,
        transition: 'margin-left 0.3s'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(15, 15, 15, 0.9)',
          borderBottom: '1px solid rgba(220, 38, 38, 0.2)',
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(10px)'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#DC2626',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 style={{ 
            color: '#e5e5e5', 
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
          </h1>

          <div style={{ width: '32px' }} />
        </div>

        {/* Page Content */}
        <div style={{ padding: '30px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

