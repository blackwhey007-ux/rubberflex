# 🎯 Guide Interface Admin RUBBERFLEX

## 📋 Vue d'ensemble

L'interface admin de Rubberflex est une application complète de gestion CRM et facturation intégrée au site web principal.

## 🔐 Accès à l'interface admin

### URL d'accès
```
http://localhost:5173/admin
```

### Identifiants par défaut
- **Email**: `admin@rubberflex.tn`
- **Mot de passe**: `admin123`

## 🎨 Fonctionnalités

### 1. Dashboard (Tableau de bord)
- **Vue d'ensemble** des statistiques en temps réel
- **Métriques principales**:
  - Nombre total de clients
  - Nombre de demandes par statut
  - Chiffre d'affaires total et mensuel
  - Nombre de factures émises
- **Actions rapides** pour accéder aux sections principales

### 2. Gestion des Clients
- **CRUD complet** (Créer, Lire, Modifier, Supprimer)
- **Recherche** par nom, email ou téléphone
- **Informations stockées**:
  - Nom, email, téléphone
  - Entreprise (optionnel)
  - Adresse (optionnel)
  - Notes personnalisées
- **Interface moderne** avec cartes interactives

### 3. Gestion des Demandes
- **Visualisation** de toutes les demandes clients
- **Filtrage** par statut:
  - Nouveau
  - En cours
  - Devis envoyé
  - Accepté
  - Refusé
- **Détails complets** de chaque demande:
  - Informations client
  - Produit, couleur, surface demandés
  - Message du client
- **Changement de statut** en un clic
- **Intégration** avec le formulaire de contact du site

### 4. Gestion des Devis
- **Liste** de tous les devis générés
- **Informations affichées**:
  - Numéro de devis
  - Client et produit
  - Montant HT, TVA, TTC
  - Date de validité
- **Téléchargement PDF** de chaque devis
- **Vue détaillée** avec toutes les informations

### 5. Gestion des Factures
- **Liste** de toutes les factures émises
- **Filtrage** par statut de paiement:
  - En attente
  - Payée
  - Annulée
- **Informations affichées**:
  - Numéro de facture
  - Client et produit
  - Montant TTC
  - Date d'émission
  - Date de paiement (si payée)
- **Téléchargement PDF** de chaque facture
- **Indicateurs visuels** selon le statut

## 🚀 Démarrage rapide

### 1. Démarrer le backend
```bash
cd backend
node server.js
```
Le backend sera accessible sur `http://localhost:3000`

### 2. Démarrer le frontend
```bash
npm run dev
```
Le frontend sera accessible sur `http://localhost:5173`

### 3. Accéder à l'admin
1. Ouvrir `http://localhost:5173/admin` dans votre navigateur
2. Se connecter avec les identifiants par défaut
3. Explorer les différentes sections

## 🎨 Design et UX

### Thème
- **Couleurs principales**: Noir, Rouge (#DC2626)
- **Style**: Moderne, minimaliste, professionnel
- **Animations**: Framer Motion pour des transitions fluides
- **Icônes**: Lucide React

### Navigation
- **Sidebar** fixe avec menu principal
- **Header** avec titre de la page active
- **Responsive** (adaptable mobile/tablette/desktop)

### Interactions
- **Hover effects** sur tous les boutons et cartes
- **Modals** pour les formulaires et détails
- **Feedback visuel** pour toutes les actions
- **Loading states** pendant les requêtes API

## 🔧 Architecture technique

### Frontend
- **React 18** avec TypeScript
- **React Router** pour la navigation
- **Framer Motion** pour les animations
- **Lucide React** pour les icônes
- **Context API** pour l'authentification

### Backend API
- **Base URL**: `http://localhost:3000/api`
- **Authentification**: JWT Bearer Token
- **Endpoints principaux**:
  - `/auth/login` - Connexion
  - `/clients` - CRUD clients
  - `/demandes` - Gestion demandes
  - `/devis` - Gestion devis
  - `/factures` - Gestion factures
  - `/analytics/dashboard` - Statistiques

### Sécurité
- **JWT** pour l'authentification
- **Protected Routes** pour les pages admin
- **Token** stocké dans localStorage
- **Auto-logout** si token invalide

## 📱 Workflow typique

### Traitement d'une demande client

1. **Réception** de la demande (via formulaire de contact)
   - La demande apparaît dans "Demandes" avec statut "Nouveau"

2. **Traitement** de la demande
   - Consulter les détails
   - Changer le statut en "En cours"
   - Créer un client si nécessaire

3. **Génération** du devis
   - Créer un devis depuis la demande
   - Le statut passe à "Devis envoyé"
   - Télécharger le PDF pour envoi au client

4. **Suivi** du devis
   - Si accepté: changer statut en "Accepté"
   - Si refusé: changer statut en "Refusé"

5. **Facturation** (si accepté)
   - Générer une facture depuis le devis
   - Télécharger le PDF
   - Marquer comme "Payée" une fois le paiement reçu

## 🎯 Prochaines améliorations possibles

- [ ] Envoi automatique d'emails pour devis/factures
- [ ] Génération de rapports PDF personnalisés
- [ ] Tableau de bord avec graphiques avancés
- [ ] Gestion des stocks de produits
- [ ] Historique des modifications
- [ ] Notifications en temps réel
- [ ] Export Excel des données
- [ ] Multi-utilisateurs avec permissions

## 🐛 Dépannage

### Le backend ne démarre pas
- Vérifier que le port 3000 est libre
- Vérifier que `node_modules` est installé dans `backend/`
- Consulter les logs dans le terminal

### Impossible de se connecter
- Vérifier que le backend est bien démarré
- Utiliser les identifiants par défaut: `admin@rubberflex.tn` / `admin123`
- Vérifier la console du navigateur pour les erreurs

### Les données ne s'affichent pas
- Vérifier que le backend est accessible sur `http://localhost:3000`
- Vérifier le token JWT dans localStorage
- Consulter la console réseau (F12) pour voir les requêtes API

## 📞 Support

Pour toute question ou problème, consulter:
- Les logs du backend dans le terminal
- La console du navigateur (F12)
- Les fichiers de documentation du projet

---

**Développé avec ❤️ pour RUBBERFLEX**

