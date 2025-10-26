import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    const startTime = Date.now();
    const page = window.location.pathname;
    const referrer = document.referrer;
    
    // Envoyer beacon au chargement
    sendBeacon(page, referrer, 0);
    
    // Envoyer beacon à la sortie avec durée
    return () => {
      const duration = Date.now() - startTime;
      sendBeacon(page, referrer, duration);
    };
  }, []);
};

const sendBeacon = (page: string, referrer: string, duration: number) => {
  // Use API_URL from config or localhost
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  // Utiliser sendBeacon pour les données critiques ou fetch pour le reste
  const data = JSON.stringify({
    page,
    referrer,
    userAgent: navigator.userAgent,
    duration,
    timestamp: new Date().toISOString()
  });
  
  // Only track if backend is available (not on localhost in production)
  if (window.location.hostname !== 'localhost') {
    // In production, skip analytics if backend not deployed yet
    return;
  }
  
  // Utiliser sendBeacon si disponible pour garantir l'envoi
  if ('sendBeacon' in navigator) {
    navigator.sendBeacon(`${API_URL}/api/analytics/track`, 
      new Blob([data], { type: 'application/json' })
    );
  } else {
    // Fallback pour navigateurs anciens
    fetch(`${API_URL}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
      keepalive: true // Important pour envoi avant fermeture page
    }).catch(() => {}); // Ignore les erreurs en mode silencieux
  }
};

