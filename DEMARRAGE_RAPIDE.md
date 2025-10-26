# 🚀 Démarrage Rapide - RUBBERFLEX

## ⚡ En 3 étapes simples

### 1️⃣ Démarrer le Backend
Ouvrir un terminal et exécuter:
```bash
cd backend
node server.js
```

✅ **Résultat attendu:**
```
🚀 =====================================
✅ Rubberflex SaaS Backend Running!
======================================
📡 Server: http://localhost:3000
🔍 Health: http://localhost:3000/health
🧪 Test: http://localhost:3000/api/test
======================================
```

---

### 2️⃣ Démarrer le Frontend
Ouvrir un **nouveau terminal** et exécuter:
```bash
npm run dev
```

✅ **Résultat attendu:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### 3️⃣ Accéder à l'application

#### 🌐 Site Web Public
```
http://localhost:5173/
```
- Page d'accueil avec animations 3D
- Catalogue de produits
- Formulaire de contact

#### 🔐 Interface Admin
```
http://localhost:5173/admin
```

**Identifiants de connexion:**
- **Email:** `admin@rubberflex.tn`
- **Mot de passe:** `admin123`

---

## 🎯 Que faire ensuite?

### Dans l'interface admin:

1. **Explorer le Dashboard**
   - Voir les statistiques en temps réel
   - Comprendre la vue d'ensemble

2. **Créer un client**
   - Aller dans "Clients"
   - Cliquer sur "Nouveau Client"
   - Remplir les informations

3. **Tester le formulaire de contact**
   - Retourner sur le site public (`http://localhost:5173/`)
   - Descendre jusqu'au formulaire
   - Remplir et envoyer une demande
   - Retourner dans l'admin → "Demandes"
   - Voir votre demande apparaître!

4. **Gérer les demandes**
   - Consulter les détails
   - Changer les statuts
   - Suivre le workflow

---

## 🐛 Problèmes courants

### ❌ "Port 3000 already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Puis relancer
cd backend
node server.js
```

### ❌ "Module not found"
**Solution:**
```bash
# Dans le dossier backend
cd backend
npm install

# Dans le dossier racine
cd ..
npm install
```

### ❌ "Cannot connect to backend"
**Vérifications:**
1. Le backend est bien démarré (terminal 1)
2. L'URL est correcte: `http://localhost:3000`
3. Pas de firewall bloquant le port 3000

---

## 📱 Accès rapide

### URLs importantes
| Service | URL | Description |
|---------|-----|-------------|
| Site Web | `http://localhost:5173/` | Page publique |
| Admin | `http://localhost:5173/admin` | Interface admin |
| API | `http://localhost:3000/api` | Backend API |
| Health | `http://localhost:3000/health` | Status backend |

### Identifiants admin
```
Email: admin@rubberflex.tn
Mot de passe: admin123
```

---

## 🎨 Fonctionnalités disponibles

### Site Web ✅
- ✅ Hero 3D animé
- ✅ Catalogue produits
- ✅ Formulaire de contact (connecté au backend)
- ✅ Section "Made in Tunisia"
- ✅ Design responsive

### Interface Admin ✅
- ✅ Dashboard avec statistiques
- ✅ Gestion clients (CRUD)
- ✅ Gestion demandes (workflow)
- ✅ Gestion devis (PDF)
- ✅ Gestion factures (PDF)
- ✅ Authentification sécurisée

---

## 📚 Documentation complète

Pour plus de détails, consulter:
- `ADMIN_GUIDE.md` - Guide complet de l'interface admin
- `PROJET_COMPLET.md` - Documentation technique complète
- `README.md` - Vue d'ensemble du projet

---

## ✅ Checklist de démarrage

- [ ] Backend démarré (port 3000)
- [ ] Frontend démarré (port 5173)
- [ ] Site web accessible
- [ ] Interface admin accessible
- [ ] Connexion admin réussie
- [ ] Test du formulaire de contact
- [ ] Demande visible dans l'admin

---

## 🎉 C'est parti!

Votre application RUBBERFLEX est maintenant **opérationnelle**!

**Bon développement! 🚀**

---

*Made in Tunisia 🇹🇳 with ❤️*

