# 🐛 Debug du Formulaire de Contact

## ✅ Changements Apportés

### Logs de Debug Ajoutés
- ✅ Log quand le formulaire est soumis
- ✅ Log des données du formulaire
- ✅ Log de l'envoi au backend
- ✅ Log de la réponse du backend
- ✅ Message d'erreur plus clair

### Améliorations
- ✅ Réinitialisation automatique du formulaire après succès (3 secondes)
- ✅ Message d'erreur si backend non démarré
- ✅ Logs détaillés dans la console

---

## 🧪 Comment Tester

### 1. Ouvrir la Console du Navigateur
- F12 ou Clic droit → Inspecter
- Onglet "Console"

### 2. Ouvrir le Site
```
http://localhost:5173/
```

### 3. Remplir le Formulaire
- Nom: "Test User"
- Email: "test@example.com"
- Téléphone: "+216 XX XXX XXX"
- Produit: Sélectionner
- Couleur: Sélectionner
- Surface: 100
- Message: "Test"

### 4. Cliquer sur "Envoyer la Demande"

### 5. Observer les Logs dans la Console
```
📍 Formulaire soumis!
📋 Données du formulaire: {...}
📡 Envoi de la demande au backend...
📥 Réponse du backend: 201
✅ Demande envoyée avec succès! {...}
```

---

## 🔍 Problèmes Possibles et Solutions

### Problème 1: Bouton ne répond pas
**Cause:** Backend non démarré

**Solution:**
```bash
cd backend
node src/server-simple.js
```

### Problème 2: Erreur CORS
**Cause:** Backend ne permet pas les requêtes du frontend

**Solution:** Vérifier que CORS est activé dans le backend (déjà fait dans `server-simple.js`)

### Problème 3: Formulaire ne se soumet pas
**Cause:** Bug JavaScript

**Solution:** Vérifier les logs dans la console du navigateur

### Problème 4: Données vides
**Cause:** Attribut `name` manquant sur les inputs

**Solution:** Vérifier que tous les inputs ont un `name` correct

---

## 📊 Vérifier dans l'Admin

### 1. Ouvrir l'Admin
```
http://localhost:5173/admin
```

### 2. Se Connecter
- Email: admin@rubberflex.tn
- Password: admin123

### 3. Aller dans "Demandes"
- Voir toutes les demandes
- La nouvelle demande devrait apparaître avec badge "Nouvelle"

---

## ✅ Résultat Attendu

Après avoir rempli le formulaire:
1. ✅ Logs apparaissent dans la console
2. ✅ Bouton devient vert avec "✓ Demande envoyée avec succès!"
3. ✅ Formulaire se réinitialise après 3 secondes
4. ✅ La demande apparaît dans l'admin

Made in Tunisia 🇹🇳

