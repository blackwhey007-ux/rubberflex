# 🔐 Guide Connexion Admin - RUBBERFLEX

## ✅ État Actuel

- ✅ Backend démarré sur http://localhost:3000/
- ✅ Frontend accessible sur http://localhost:5173/
- ✅ Structure admin séparée créée
- ⚠️ L'utilisateur admin doit être créé dans la base de données

---

## 🎯 Accès Admin

### URL
```
http://localhost:5173/admin
```

### Identifiants
- **Email:** `admin@rubberflex.tn`
- **Password:** `admin123`

---

## 🔧 Si la Connexion Échoue

### Problème 1: Utilisateur Admin N'existe Pas

**Solution:** Créer manuellement l'utilisateur admin dans la base de données

#### Option A: Via la base de données SQLite
```bash
cd backend
sqlite3 database.sqlite
```

Puis dans SQLite:
```sql
-- Vérifier si l'utilisateur existe
SELECT * FROM users WHERE email = 'admin@rubberflex.tn';

-- Si aucun résultat, créer l'utilisateur
-- Note: Le password hash sera créé automatiquement par le serveur au premier démarrage
```

#### Option B: Le serveur crée automatiquement l'admin

Le fichier `backend/src/server-simple.js` devrait créer automatiquement un utilisateur admin au démarrage si il n'existe pas. Vérifiez les logs du serveur.

---

## 🚀 Démarrage Correct

### Étape 1: Démarrer le Backend
```bash
cd backend
node src/server-simple.js
```

**Message attendu:**
```
🚀 =====================================
✅ Rubberflex SaaS Backend Running!
======================================
📡 Server: http://localhost:3000
🔍 Health: http://localhost:3000/health
🧪 Test: http://localhost:3000/api/test
======================================
```

### Étape 2: Vérifier que le Backend Répond
```bash
curl http://localhost:3000/health
```

**Réponse attendue:**
```json
{"status":"OK","message":"Rubberflex API is running!","version":"1.0.0"}
```

### Étape 3: Tester la Création d'Admin
```bash
curl http://localhost:3000/api/auth/login -X POST -H "Content-Type: application/json" -d "{\"email\":\"admin@rubberflex.tn\",\"password\":\"admin123\"}"
```

**Si la réponse contient un token:** ✅ L'utilisateur existe et fonctionne  
**Si erreur 401:** ⚠️ L'utilisateur n'existe pas dans la base

---

## 🛠️ Créer l'Utilisateur Admin Manuellement

### Méthode 1: Via SQLite CLI

```bash
cd backend
sqlite3 database.sqlite
```

```sql
-- Voir la structure de la table users
.schema users

-- Voir les utilisateurs existants
SELECT * FROM users;

-- Créer l'utilisateur admin (hash du mot de passe admin123)
-- Note: Le hash bcrypt est complexe, il vaut mieux utiliser l'API
```

**Alternative:** Utiliser curl pour créer l'utilisateur via l'API de registration si elle existe

### Méthode 2: Vérifier le Backend

Ouvrez `backend/src/server-simple.js` et vérifiez qu'il crée l'utilisateur admin au démarrage. Cherchez des lignes comme:

```javascript
// Seed admin user if doesn't exist
const existingAdmin = await User.findOne({ where: { email: 'admin@rubberflex.tn' } });

if (!existingAdmin) {
  console.log('👤 Creating admin user...');
  const passwordHash = await bcrypt.hash('admin123', 10);
  await User.create({
    email: 'admin@rubberflex.tn',
    passwordHash,
    role: 'admin',
  });
  console.log('✅ Admin user created: admin@rubberflex.tn / admin123');
}
```

---

## ✅ Test de Connexion

### Dans le Navigateur
1. Ouvrez http://localhost:5173/admin
2. Entrez l'email: `admin@rubberflex.tn`
3. Entrez le password: `admin123`
4. Cliquez sur "Se connecter"

**Si succès:** Vous serez redirigé vers le dashboard avec les statistiques

**Si erreur "Email ou mot de passe incorrect":**
- ⚠️ Vérifiez que le backend est démarré
- ⚠️ Vérifiez que l'utilisateur existe dans la base de données
- ⚠️ Vérifiez les logs du backend

---

## 📊 Consulter les Logs

### Backend Logs
Le terminal où vous avez lancé `node src/server-simple.js` affiche:
- Les démarrages de base de données
- La création d'utilisateur admin
- Les requêtes API reçues

**Lignes importantes:**
```
✅ Database connection established.
✅ Database tables ready.
👤 Creating admin user...
✅ Admin user created: admin@rubberflex.tn / admin123
```

---

## 🎯 URLs Importantes

| Service | URL | Status |
|---------|-----|--------|
| Backend Health | http://localhost:3000/health | ✅ |
| Backend Test | http://localhost:3000/api/test | ✅ |
| Backend Login | http://localhost:3000/api/auth/login | ✅ |
| Frontend Landing | http://localhost:5173/ | ✅ |
| Frontend Admin | http://localhost:5173/admin | ✅ |

---

## 🐛 Dépannage

### Erreur: "Email ou mot de passe incorrect"

**Vérifications:**
1. ✅ Le backend est démarré (http://localhost:3000)
2. ✅ L'utilisateur admin existe dans la base
3. ✅ Le mot de passe est correct (`admin123`)
4. ✅ Consultez les logs du backend

### Erreur: "Cannot connect to backend"

**Solutions:**
1. Vérifiez que le backend est démarré
2. Testez http://localhost:3000/health
3. Vérifiez qu'il n'y a pas de firewall bloquant le port 3000

### Erreur: "Page non trouvée" sur /admin

**Solutions:**
1. Vérifiez que le frontend est démarré
2. Testez http://localhost:5173/
3. Accédez directement via l'URL complète

---

## ✅ Solution Rapide

**Si rien ne fonctionne:**

1. **Arrêter tous les processus:**
```bash
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
```

2. **Démarrer le backend:**
```bash
cd backend
node src/server-simple.js
```

3. **Dans un nouveau terminal, démarrer le frontend:**
```bash
npm run dev:frontend
```

4. **Tester:**
```
http://localhost:5173/admin
```

---

*Made in Tunisia 🇹🇳*

