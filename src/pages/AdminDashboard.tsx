import { useState } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import DashboardPage from './admin/DashboardPage';
import AnalyticsPage from './admin/AnalyticsPage';
import ClientsPage from './admin/ClientsPage';
import DemandesPage from './admin/DemandesPage';
import DevisPage from './admin/DevisPage';
import FacturesPage from './admin/FacturesPage';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleInternalNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'analytics':
        return <AnalyticsPage />;
      case 'clients':
        return <ClientsPage />;
      case 'demandes':
        return <DemandesPage />;
      case 'devis':
        return <DevisPage />;
      case 'factures':
        return <FacturesPage />;
      default:
        return <DashboardPage onNavigate={handleInternalNavigate} />;
    }
  };

  return (
    <AdminLayout
      currentPage={currentPage}
      onNavigate={handleInternalNavigate}
      onLogout={onLogout}
    >
      {renderPage()}
    </AdminLayout>
  );
}
