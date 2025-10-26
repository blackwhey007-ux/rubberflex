import { useEffect, useState } from 'react'
import LandingPage from './pages/LandingPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  const [page, setPage] = useState<string>('landing')

  useEffect(() => {
    // Détecter l'URL et afficher la bonne page
    const path = window.location.pathname
    
    if (path === '/admin') {
      setPage('admin-login')
    } else if (path === '/admin/dashboard') {
      setPage('admin-dashboard')
    } else {
      setPage('landing')
    }
  }, [])

  // Navigation manuelle
  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    const newPath = window.location.pathname
    
    if (newPath === '/admin') {
      setPage('admin-login')
    } else if (newPath === '/admin/dashboard') {
      setPage('admin-dashboard')
    } else {
      setPage('landing')
    }
  }

  // Écouter les changements d'URL
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      
      if (path === '/admin') {
        setPage('admin-login')
      } else if (path === '/admin/dashboard') {
        setPage('admin-dashboard')
      } else {
        setPage('landing')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Gérer la navigation pour les composants admin
  const handleNavigation = (targetPage: string) => {
    if (targetPage === 'dashboard') {
      navigate('/admin/dashboard')
    } else if (targetPage === 'login') {
      navigate('/admin')
    } else {
      navigate('/')
    }
  }

  // Afficher la bonne page
  if (page === 'admin-login') {
    return <AdminLogin onNavigate={handleNavigation} />
  }

  if (page === 'admin-dashboard') {
    return <AdminDashboard onNavigate={handleNavigation} />
  }

  return <LandingPage />
}
