import { ModelPreloaderProvider, useModelPreloader } from './src/hooks/useModelPreloader'
import ProductPage from './src/components/ProductPage'
import LoaderAppleUI from './src/components/LoaderAppleUI'
import LoadingDiagnostic from './src/components/LoadingDiagnostic'
import { useState, useEffect } from 'react'

// Composant interne qui utilise le contexte
const AppContent = () => {
    const { isMainScenesReady, isConfigured, loadingProgress, modelsStatus, priorityModels } = useModelPreloader();
    const [showSite, setShowSite] = useState(false);
    const [showDiagnostic, setShowDiagnostic] = useState(false);

    // Logs détaillés pour le debug
    useEffect(() => {
        console.log(`📊 App State - Progress: ${loadingProgress}%, Configured: ${isConfigured}, Show: ${showSite}`);

        if (loadingProgress >= 100) {
            const verifiedModels = Object.entries(modelsStatus).filter(([_, status]) => status.verified);
            console.log(`📊 Modèles configurés: ${verifiedModels.length}/${priorityModels.length}`);

            if (verifiedModels.length > 0) {
                verifiedModels.forEach(([url, status]) => {
                    console.log(`✅ ${url}: ${status.meshCount} mesh, ${status.materialCount} matériaux`);
                });
            }
        }
    }, [loadingProgress, isConfigured, showSite, modelsStatus, priorityModels]);

    // Affichage du site UNIQUEMENT quand les modèles sont configurés (pas juste chargés)
    useEffect(() => {
        if (isConfigured) {
            console.log('🎉 Modèles configurés - Affichage du site !');
            setShowSite(true);

            // SOLUTION: Forcer un resize pour actualiser le canvas Three.js
            setTimeout(() => {
                console.log('🔄 Force refresh du canvas Three.js...');
                window.dispatchEvent(new Event('resize'));
            }, 100); // Court délai pour laisser le DOM se mettre à jour
        }
    }, [isConfigured]);

    // Raccourci clavier pour afficher/masquer le diagnostic (Ctrl+D)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'd') {
                event.preventDefault();
                setShowDiagnostic(prev => !prev);
                console.log(`🔍 Diagnostic ${!showDiagnostic ? 'activé' : 'désactivé'}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showDiagnostic]);

    // Message de chargement dynamique
    const getLoadingMessage = () => {
        if (loadingProgress < 30) {
            return "Chargement des modèles 3D...";
        } else if (loadingProgress < 70) {
            return "Configuration des modèles...";
        } else if (loadingProgress < 100) {
            return "Finalisation de la configuration...";
        } else {
            return "Préparation de l'affichage...";
        }
    };

    return (
        <>
            {/* Diagnostic de performance (Ctrl+D pour afficher/masquer) */}
            <LoadingDiagnostic isVisible={showDiagnostic} />

            {/* Écran de chargement */}
            {!showSite && (
                <LoaderAppleUI
                    progress={loadingProgress}
                    isFullscreen={true}
                    message={getLoadingMessage()}
                />
            )}

            {/* Site principal avec transition douce */}
            {showSite && (
                <div style={{
                    opacity: showSite ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out',
                    willChange: 'opacity'
                }}>
                    <ProductPage />
                </div>
            )}
        </>
    );
};

function App() {
    console.log('🚀 Application démarrée - Version optimisée sans délais artificiels');
    console.log('💡 Appuyez sur Ctrl+D pour afficher le diagnostic de performance');

    return (
        <ModelPreloaderProvider>
            <AppContent />
        </ModelPreloaderProvider>
    );
}

export default App 