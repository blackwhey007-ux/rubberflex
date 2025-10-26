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
  // Utiliser sendBeacon pour les données critiques ou fetch pour le reste
  const data = JSON.stringify({
    page,
    referrer,
    userAgent: navigator.userAgent,
    duration,
    timestamp: new Date().toISOString()
  });
  
  // Utiliser sendBeacon si disponible pour garantir l'envoi
  if ('sendBeacon' in navigator) {
    navigator.sendBeacon('http://localhost:3000/api/analytics/track', 
      new Blob([data], { type: 'application/json' })
    );
  } else {
    // Fallback pour navigateurs anciens
    fetch('http://localhost:3000/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
      keepalive: true // Important pour envoi avant fermeture page
    }).catch(() => {}); // Ignore les erreurs en mode silencieux
  }
};

