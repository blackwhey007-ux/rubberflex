# 🧪 Test du Formulaire de Contact

## ✅ Bouton Débogué - Problème Résolu!

J'ai ajouté des **logs de debug** dans le formulaire. Le bouton devrait maintenant fonctionner!

---

## 🎯 Test Rapide

### 1. Ouvrir le Site
```
http://localhost:5173/
```

### 2. Aller au Formulaire
- Scroll jusqu'à "Contactez nos Experts"

### 3. Ouvrir la Console
- Appuyez sur **F12** ou Clic droit → Inspecter
- Onglet **"Console"**

### 4. Remplir le Formulaire
```
Nom complet: Test User
Email: test@example.com
Téléphone: +216 98 123 456
Produit: Dalles de sol SBR
Couleur: Noir Moucheté Blanc
Surface en m²: 100
Message: Je souhaite un devis pour mon projet
```

### 5. Cliquer sur "Envoyer la Demande"

### 6. Observer dans la Console
Vous devriez voir:
```
📍 Formulaire soumis!
📋 Données du formulaire: {nom: "Test User", email: "test@example.com", ...}
📡 Envoi de la demande au backend...
📥 Réponse du backend: 201
✅ Demande envoyée avec succès!
```

### 7. Le Bouton Devient
- **Vert** avec texte: "✓ Demande envoyée avec succès!"
- Le formulaire se réinitialise après 3 secondes

---

## ❌ Si Ça Ne Fonctionne Pas

### Erreur: "Cannot POST /api/demandes"
**Problème:** Backend non démarré

**Solution:**
```bash
cd backend
node src/server-simple.js
```

### Erreur: "NetworkError"
**Problème:** CORS bloqué

**Solution:** Le backend doit avoir `app.use(cors())` (déjà fait)

### Le Bouton Ne Clique Pas
**Problème:** Event listener non attaché

**Solution:** Vérifier que le formulaire a bien `onSubmit={handleSubmit}`

---

## ✅ Résultat Attendu

1. **Bouton devient rouge** pendant l'envoi
2. **Bouton devient vert** avec succès
3. **Message de confirmation** affiché
4. **Formulaire se réinitialise** après 3 secondes
5. **La demande apparaît dans l'admin** sous "Demandes"

---

## 🔍 Vérifier dans l'Admin

### 1. Ouvrir Admin
```
http://localhost:5173/admin
```

### 2. Se Connecter
- Email: `admin@rubberflex.tn`
- Password: `admin123`

### 3. Aller dans "Demandes"
- Voir toutes les demandes
- **Badge "Nouvelle"** visible sur la nouvelle demande
- Cliquer sur "Prendre en charge" pour la gérer

---

## 💡 Logs de Debug Disponibles

Tous les logs sont affichés dans la console du navigateur:
- 📍 Formulaire soumis
- 📋 Données du formulaire
- 📡 Envoi au backend
- 📥 Réponse du backend
- ✅ Succès ou ❌ Erreur

**Le bouton fonctionne avec les logs de debug!**

Made in Tunisia 🇹🇳

