import React from 'react';
import ProductPage from './components/ProductPage';
import LoaderAppleUI from './components/LoaderAppleUI';
import { ModelPreloaderProvider, useModelPreloader } from './hooks/useModelPreloader';

// Composant interne qui utilise le contexte
function AppContent() {
    const { isMainScenesReady, loadingProgress } = useModelPreloader();

    // Afficher le loader tant que les modèles ne sont pas prêts
    if (!isMainScenesReady) {
        return (
            <LoaderAppleUI
                progress={loadingProgress}
                isFullscreen={true}
                message="Chargement des modèles 3D..."
            />
        );
    }

    // Afficher l'application une fois les modèles chargés
    return <ProductPage />;
}

function App() {
    return (
        <ModelPreloaderProvider>
            <AppContent />
        </ModelPreloaderProvider>
    );
}

export default App; 