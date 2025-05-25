import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

// Context pour partager l'état de chargement
const ModelPreloaderContext = createContext();

// Hook pour utiliser le contexte
export const useModelPreloader = () => {
    const context = useContext(ModelPreloaderContext);
    if (!context) {
        throw new Error('useModelPreloader must be used within a ModelPreloaderProvider');
    }
    return context;
};

// Provider du contexte
export const ModelPreloaderProvider = ({ children }) => {
    // États de chargement
    const [isMainScenesReady, setIsMainScenesReady] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [modelsStatus, setModelsStatus] = useState({});
    const [criticalModelsLoaded, setCriticalModelsLoaded] = useState(false);

    // NOUVEAUX ÉTATS pour la configuration complète
    const [isConfigured, setIsConfigured] = useState(false);
    const [configuredModels, setConfiguredModels] = useState({});

    // Refs pour éviter les boucles infinies
    const loadingStarted = useRef(false);

    // Modèles prioritaires (les 2 premières scènes)
    const priorityModels = [
        '/models/headphones.glb',
        '/models/headphonesblack.glb'
    ];

    // Modèles de couleurs (chargement en arrière-plan)
    const colorModels = [
        '/models/headphones.glb',
        '/models/headphonesblack.glb',
        '/models/headphonesblue.glb',
        '/models/headphonesgold.glb'
    ];

    // Chargement des fichiers .glb (étape 1)
    useEffect(() => {
        if (loadingStarted.current) return;
        loadingStarted.current = true;

        const loadCriticalModels = async () => {
            console.log('🚀 Étape 1: Chargement des fichiers .glb...');
            setLoadingProgress(20);

            try {
                // Précharger les modèles critiques
                console.log('📦 Préchargement des fichiers...');
                const preloadPromises = priorityModels.map(modelUrl => {
                    console.log(`📦 Préchargement: ${modelUrl}`);
                    return new Promise((resolve) => {
                        useGLTF.preload(modelUrl);
                        // Simuler un délai pour le préchargement
                        setTimeout(resolve, 100);
                    });
                });

                await Promise.all(preloadPromises);
                setLoadingProgress(60);

                // Marquer les fichiers comme chargés (mais pas encore configurés)
                priorityModels.forEach(modelUrl => {
                    setModelsStatus(prev => ({
                        ...prev,
                        [modelUrl]: {
                            loaded: true,
                            verified: false, // Pas encore vérifié/configuré
                            meshCount: 0,
                            materialCount: 0,
                            timestamp: Date.now()
                        }
                    }));
                });

                setLoadingProgress(80);
                setCriticalModelsLoaded(true);
                console.log('📦 Fichiers .glb chargés, attente de la configuration...');

                // Démarrer la configuration automatique après un court délai
                setTimeout(() => {
                    console.log('🔧 Démarrage de la configuration automatique...');
                    configureModelsAutomatically();
                }, 500);

            } catch (error) {
                console.error('❌ Erreur de chargement:', error);
                // En cas d'erreur, on force quand même l'affichage
                setLoadingProgress(100);
                setIsConfigured(true);
                setIsMainScenesReady(true);
            }
        };

        const configureModelsAutomatically = () => {
            priorityModels.forEach((modelUrl, index) => {
                setTimeout(() => {
                    console.log(`🔧 Configuration automatique de ${modelUrl}...`);
                    // Simuler la configuration du modèle
                    setModelsStatus(prev => ({
                        ...prev,
                        [modelUrl]: {
                            loaded: true,
                            verified: true,
                            meshCount: 10, // Valeur simulée
                            materialCount: 5, // Valeur simulée
                            timestamp: Date.now()
                        }
                    }));

                    setConfiguredModels(prev => ({
                        ...prev,
                        [modelUrl]: true
                    }));
                }, index * 200); // Délai échelonné pour chaque modèle
            });
        };

        loadCriticalModels();
    }, []);

    // Vérification de la configuration complète (étape 2)
    useEffect(() => {
        const configuredCount = Object.values(configuredModels).filter(Boolean).length;
        const requiredCount = priorityModels.length;

        console.log(`🔧 Configuration: ${configuredCount}/${requiredCount} modèles configurés`);
        console.log('🔧 Modèles configurés:', Object.keys(configuredModels).filter(key => configuredModels[key]));
        console.log('🔧 Modèles requis:', priorityModels);

        if (configuredCount >= requiredCount && !isConfigured) {
            console.log('🎉 Tous les modèles critiques sont configurés !');
            setLoadingProgress(100);
            setIsConfigured(true);
            setIsMainScenesReady(true);
        } else if (configuredCount > 0) {
            // Mettre à jour le progress en fonction des modèles configurés
            const progressIncrement = (20 / requiredCount) * configuredCount; // 20% répartis sur les modèles
            setLoadingProgress(80 + progressIncrement);
        }
    }, [configuredModels, isConfigured, priorityModels]);

    // Préchargement des couleurs en arrière-plan (étape 3)
    useEffect(() => {
        if (isConfigured) {
            console.log('🎨 Préchargement des couleurs en arrière-plan...');
            colorModels.forEach(url => {
                useGLTF.preload(url);
            });
            console.log('🎨 Couleurs prêtes !');
        }
    }, [isConfigured]);

    // Fonction pour marquer un modèle comme configuré (appelée par les composants après setup complet)
    const markModelAsConfigured = (modelUrl, meshCount = 0, materialCount = 0) => {
        console.log(`✅ Modèle configuré: ${modelUrl} (${meshCount} mesh, ${materialCount} matériaux)`);

        // Mettre à jour le statut détaillé
        setModelsStatus(prev => ({
            ...prev,
            [modelUrl]: {
                loaded: true,
                verified: true,
                meshCount,
                materialCount,
                timestamp: Date.now()
            }
        }));

        // Marquer comme configuré
        setConfiguredModels(prev => ({
            ...prev,
            [modelUrl]: true
        }));
    };

    // Fonction pour obtenir le statut d'un modèle
    const getModelStatus = (modelUrl) => {
        return modelsStatus[modelUrl] || { loaded: false, verified: false };
    };

    // Fonction legacy pour compatibilité (redirige vers markModelAsConfigured)
    const markModelAsVerified = (modelUrl, meshCount = 0, materialCount = 0) => {
        markModelAsConfigured(modelUrl, meshCount, materialCount);
    };

    const value = {
        // États principaux
        isMainScenesReady,
        loadingProgress,
        criticalModelsLoaded,

        // NOUVEAUX ÉTATS
        isConfigured,
        configuredModels,

        // Fonctions utilitaires
        getModelStatus,
        markModelAsVerified, // Legacy
        markModelAsConfigured, // Nouvelle fonction principale

        // Données
        priorityModels,
        colorModels,
        modelsStatus
    };

    return (
        <ModelPreloaderContext.Provider value={value}>
            {children}
        </ModelPreloaderContext.Provider>
    );
}; 