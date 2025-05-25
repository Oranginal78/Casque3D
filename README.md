# Casque 3D - Site Web Interactif

Un site web moderne avec un viewer 3D interactif pour présenter un casque audio innovant.

## 🚀 Fonctionnalités

- **Viewer 3D interactif** avec Three.js et React Three Fiber
- **Design responsive** avec Tailwind CSS
- **Animations fluides** et transitions
- **Interface moderne** avec effets de glassmorphism
- **Navigation intuitive** avec scroll et interactions

## 📁 Structure du projet

```
/public
  /models
    headphones.glb         ← Modèle 3D du casque
/src
  /components
    ProductPage.jsx        ← Composant principal (scène + UI)
    HeroSection.jsx        ← Section d'introduction
    HeadphoneViewer.jsx    ← Composant 3D (Canvas + GLB)
    ProductInfo.jsx        ← Informations produit
  /styles
    global.css             ← Styles globaux et Tailwind
App.jsx                    ← Point d'entrée principal
main.jsx                   ← Setup React/Vite
```

## 🛠️ Installation

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Ajouter votre modèle 3D :**
   - Placez votre fichier `headphones.glb` dans le dossier `/public/models/`

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur :**
   - Aller sur `http://localhost:5173`

## 📦 Technologies utilisées

- **React 18** - Framework JavaScript
- **Vite** - Build tool
- **Three.js** - Bibliothèque 3D
- **React Three Fiber** - React renderer pour Three.js
- **React Three Drei** - Helpers utiles pour R3F
- **Tailwind CSS** - Framework CSS utilitaire

## 🎨 Personnalisation

### Modifier le modèle 3D
Remplacez le fichier `/public/models/headphones.glb` par votre propre modèle.

### Ajuster les couleurs
Modifiez les couleurs dans `tailwind.config.js` :

```javascript
colors: {
  'custom-dark': '#0a0a0a',
  'custom-gray': '#1a1a1a',
}
```

### Personnaliser les informations produit
Éditez le contenu dans `src/components/ProductInfo.jsx`.

## 🚀 Production

Pour construire le projet pour la production :

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`.

## 📝 Notes importantes

- Assurez-vous que votre modèle 3D est optimisé (taille de fichier raisonnable)
- Le modèle doit être au format `.glb` ou `.gltf`
- Les textures doivent être incluses dans le fichier GLB

## 🐛 Dépannage

- **Modèle 3D ne s'affiche pas :** Vérifiez le chemin `/public/models/headphones.glb`
- **Performance lente :** Optimisez votre modèle 3D (réduire les polygones, compresser les textures)
- **Erreurs de build :** Assurez-vous que toutes les dépendances sont installées

## 📄 Licence

Ce projet est libre d'utilisation pour vos projets personnels et commerciaux. 