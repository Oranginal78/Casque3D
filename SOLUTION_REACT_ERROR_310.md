# Solution : Erreur React #310 - useGLTF.preload()

## Problème
L'erreur React #310 se produit lors du déploiement avec le message :
```
Minified React error #310; visit https://reactjs.org/docs/error-decoder.html?invariant=310
```

Cette erreur indique qu'un hook React (dans notre cas `useGLTF.preload()`) est appelé en dehors d'un composant React valide.

## Cause
Dans le fichier `src/hooks/useModelPreloader.jsx`, `useGLTF.preload()` était appelé à l'intérieur d'un `useEffect`, ce qui viole les règles des hooks React.

### Code problématique (AVANT) :
```javascript
useEffect(() => {
    const preloadPromises = priorityModels.map(modelUrl => {
        return new Promise((resolve) => {
            useGLTF.preload(modelUrl); // ❌ ERREUR : Hook appelé dans useEffect
            setTimeout(resolve, 100);
        });
    });
}, []);
```

## Solution
Déplacer tous les appels à `useGLTF.preload()` **en dehors** des composants React, au niveau du module.

### Code corrigé (APRÈS) :
```javascript
// Modèles prioritaires
const priorityModels = [
    '/models/headphones.glb',
    '/models/headphonesblack.glb'
];

// Modèles de couleurs
const colorModels = [
    '/models/headphones.glb',
    '/models/headphonesblack.glb',
    '/models/headphonesblue.glb',
    '/models/headphonesgold.glb'
];

// ✅ SOLUTION: Précharger EN DEHORS du composant
priorityModels.forEach(modelUrl => {
    useGLTF.preload(modelUrl);
});

colorModels.forEach(modelUrl => {
    useGLTF.preload(modelUrl);
});

// Ensuite définir le composant...
export const ModelPreloaderProvider = ({ children }) => {
    // Le composant peut maintenant utiliser les modèles préchargés
};
```

## Autres corrections apportées

### 1. Nettoyage de main.jsx
Suppression des imports inutiles qui pouvaient causer des conflits :
```javascript
// ❌ AVANT
import '@react-three/fiber'
import '@react-three/drei'

// ✅ APRÈS
// Ces imports sont supprimés car ils ne sont pas nécessaires
```

### 2. Bonnes pratiques pour useGLTF.preload()
- ✅ Appeler `useGLTF.preload()` au niveau du module (en dehors des composants)
- ✅ Placer les appels après les déclarations de constantes
- ❌ Ne jamais appeler dans un `useEffect`, `useState`, ou autre hook
- ❌ Ne jamais appeler dans une fonction asynchrone à l'intérieur d'un composant

## Vérification
1. Le build de production se termine sans erreur React #310
2. L'application fonctionne correctement en développement
3. Les modèles 3D se chargent sans problème

## Références
- [Documentation React Three Fiber - Loading Models](https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models)
- [Issue GitHub - useGLTF.preload conflicts](https://github.com/pmndrs/drei/issues/1985)
- [React Error Decoder #310](https://reactjs.org/docs/error-decoder.html?invariant=310)

## Résumé
L'erreur React #310 était causée par l'utilisation incorrecte de `useGLTF.preload()` à l'intérieur de hooks React. La solution consiste à déplacer tous ces appels au niveau du module, en dehors des composants React. 