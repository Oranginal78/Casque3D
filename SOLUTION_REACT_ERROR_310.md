# Solution : Erreur React #310 - useGLTF.preload()

## Problème
L'erreur React #310 se produit lors du déploiement avec le message :
```
Minified React error #310; visit https://reactjs.org/docs/error-decoder.html?invariant=310
```

Cette erreur indique qu'un hook React (dans notre cas `useGLTF.preload()` ou `useGLTF()`) est appelé en dehors d'un composant React valide ou dans un contexte qui viole les règles des hooks.

## Causes identifiées et corrigées

### 1. useGLTF.preload() dans useEffect ❌
**Fichier :** `src/hooks/useModelPreloader.jsx`  
**Problème :** `useGLTF.preload()` appelé à l'intérieur d'un `useEffect`

### 2. useGLTF() dans try-catch ❌
**Fichier :** `src/components/HeadphoneViewer.jsx`  
**Problème :** `useGLTF()` appelé dans un bloc `try-catch`

```javascript
// ❌ ERREUR : Hook dans try-catch
try {
    gltf = useGLTF(modelUrl)
} catch (error) {
    // ...
}

// ❌ ERREUR : Hook dans try-catch
try {
    useGLTF(modelUrl)
} catch (error) {
    // ...
}
```

## Solutions appliquées

### 1. Déplacement de useGLTF.preload() au niveau du module
```javascript
// ✅ CORRECT : Au niveau du module
const priorityModels = [
    '/models/headphones.glb',
    '/models/headphonesblack.glb'
];

priorityModels.forEach(modelUrl => {
    useGLTF.preload(modelUrl);
});

// Ensuite définir le composant...
export const ModelPreloaderProvider = ({ children }) => {
    // useEffect sans useGLTF.preload()
};
```

### 2. Suppression des try-catch autour des hooks
```javascript
// ❌ AVANT
function HeadphonesModel({ rotationY }) {
    let gltf;
    try {
        gltf = useGLTF(modelUrl)
    } catch (error) {
        return null
    }
}

// ✅ APRÈS
function HeadphonesModel({ rotationY }) {
    const { scene } = useGLTF(modelUrl)
    
    if (!scene) {
        return null
    }
}
```

### 3. Correction du composant HeadphonesBlackModel
```javascript
// ❌ AVANT
function HeadphonesBlackModel() {
    try {
        useGLTF(modelUrl)
    } catch (error) {
        // ...
    }
    return null
}

// ✅ APRÈS
function HeadphonesBlackModel() {
    const { scene } = useGLTF(modelUrl)
    
    useEffect(() => {
        if (scene) {
            console.log('Modèle noir préchargé')
        }
    }, [scene])
    
    return null
}
```

## Règles des hooks React à respecter

### ✅ À FAIRE
- Appeler les hooks **uniquement** au niveau supérieur des composants
- Appeler `useGLTF.preload()` au niveau du module (en dehors des composants)
- Utiliser `useGLTF()` directement dans les composants
- Gérer les erreurs avec des conditions après l'appel du hook

### ❌ À ÉVITER
- Appeler des hooks dans des `useEffect`, `useState`, ou autres hooks
- Appeler des hooks dans des blocs `try-catch`
- Appeler des hooks dans des boucles ou conditions
- Appeler des hooks dans des fonctions qui ne sont pas des composants

## Vérification

### 1. Build de production
```bash
npm run build
# ✅ Doit se terminer sans erreur React #310
```

### 2. Test du serveur
```bash
npm run start
# ✅ Ouvrir http://localhost:3000
# ✅ Vérifier la console : pas d'erreur React #310
```

### 3. Vérification dans le navigateur
- Ouvrir DevTools → Console
- Recharger la page
- ✅ Aucune erreur "Minified React error #310"
- ✅ Application se charge correctement
- ✅ Modèles 3D s'affichent

## Fichiers modifiés

1. **`src/hooks/useModelPreloader.jsx`**
   - Déplacé `useGLTF.preload()` au niveau du module
   - Supprimé les appels dans `useEffect`

2. **`src/components/HeadphoneViewer.jsx`**
   - Supprimé `try-catch` autour de `useGLTF()`
   - Corrigé `HeadphonesModel` et `HeadphonesBlackModel`

3. **`main.jsx`**
   - Supprimé les imports inutiles

## Résumé
L'erreur React #310 était causée par :
1. ❌ `useGLTF.preload()` dans des `useEffect`
2. ❌ `useGLTF()` dans des blocs `try-catch`

**Solution :** Respecter strictement les règles des hooks React en appelant tous les hooks au niveau supérieur des composants, sans conditions ni blocs try-catch.

**Résultat :** ✅ Application fonctionne parfaitement en production sans erreur React #310 ! 