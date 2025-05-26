# 🔧 Guide de Dépannage - Développement Local

## Problème : HTML brut affiché au lieu de l'application React

### Symptômes
- Le navigateur affiche le code HTML source au lieu de l'application
- Vous voyez les balises `<script type="module">` et le contenu de `index.html`

### Solutions étape par étape

#### 1. Vérifier le serveur Vite
```bash
# Arrêter tous les processus Vite
pkill -f vite

# Redémarrer proprement
npm run dev
```

**Résultat attendu :**
```
VITE v5.4.19  ready in XXX ms
➜  Local:   http://localhost:5173/
```

#### 2. Vérifier le bon port
- ✅ **Correct :** `http://localhost:5173/` (port Vite)
- ❌ **Incorrect :** `http://localhost:3000/` (port Express production)

#### 3. Tester React simple
Si l'application ne se charge pas, testez avec ce code dans `main.jsx` :

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

function SimpleTest() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center' }}>
            <h1>🎉 React fonctionne !</h1>
            <p>Si vous voyez ce message, React se charge correctement.</p>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SimpleTest />
    </React.StrictMode>
);
```

#### 4. Vérifier les erreurs JavaScript
1. Ouvrir DevTools (F12)
2. Aller dans l'onglet **Console**
3. Recharger la page
4. Chercher les erreurs en rouge

**Erreurs communes :**
- `Failed to resolve module` → Problème d'import
- `useGLTF is not defined` → Problème avec @react-three/drei
- `React error #310` → Problème de hooks (normalement résolu)

#### 5. Vérifier les imports
Dans `App.jsx`, les imports doivent être :
```javascript
import { ModelPreloaderProvider, useModelPreloader } from './src/hooks/useModelPreloader'
import ProductPage from './src/components/ProductPage'
// etc...
```

#### 6. Restaurer l'application complète
Une fois que React simple fonctionne, restaurez le `main.jsx` original :
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/styles/globals.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

## Commandes de diagnostic

### Vérifier les processus
```bash
ps aux | grep vite
```

### Tester la connectivité
```bash
curl -I http://localhost:5173
```

### Vérifier les dépendances
```bash
npm list react @react-three/fiber @react-three/drei
```

## Différences Développement vs Production

### Développement (Vite)
- **Port :** 5173
- **Serveur :** Vite dev server
- **Hot reload :** Activé
- **Source maps :** Activées

### Production (Express)
- **Port :** 3000
- **Serveur :** Express
- **Fichiers :** Minifiés dans `dist/`
- **Types MIME :** Configurés manuellement

## Checklist de vérification

- [ ] Serveur Vite démarré sur port 5173
- [ ] Aucun processus Vite en conflit
- [ ] URL correcte : `http://localhost:5173/`
- [ ] Console sans erreurs JavaScript
- [ ] React simple fonctionne
- [ ] Application complète se charge

## Si rien ne fonctionne

1. **Supprimer node_modules et réinstaller :**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

2. **Vérifier les versions :**
```bash
node --version  # Doit être >= 16
npm --version   # Doit être >= 8
```

3. **Tester sur un autre port :**
```bash
npm run dev -- --port 3001
```

## Contact
Si le problème persiste, fournir :
- URL testée
- Contenu de la console (erreurs)
- Sortie de `npm run dev`
- Version de Node.js 