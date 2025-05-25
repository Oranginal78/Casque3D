import { useEffect, useState } from 'react';
import { useModelPreloader } from '../hooks/useModelPreloader';

const LoadingDiagnostic = ({ isVisible = false }) => {
    const {
        isMainScenesReady,
        loadingProgress,
        modelsStatus,
        priorityModels,
        criticalModelsLoaded,
        isPreloadingColors,
        colorModelsReady
    } = useModelPreloader();

    const [startTime] = useState(Date.now());
    const [loadingTime, setLoadingTime] = useState(0);
    const [performanceMetrics, setPerformanceMetrics] = useState({
        memoryUsage: 0,
        loadingSpeed: 0,
        modelsPerSecond: 0
    });

    // Calculer le temps de chargement
    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingTime(Date.now() - startTime);
        }, 100);

        if (isMainScenesReady) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isMainScenesReady, startTime]);

    // Calculer les métriques de performance
    useEffect(() => {
        if (typeof window !== 'undefined' && window.performance) {
            const updateMetrics = () => {
                // Mémoire utilisée (si disponible)
                const memory = window.performance.memory;
                const memoryUsage = memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0;

                // Vitesse de chargement
                const loadedModels = Object.values(modelsStatus).filter(status => status.verified).length;
                const timeInSeconds = loadingTime / 1000;
                const modelsPerSecond = timeInSeconds > 0 ? (loadedModels / timeInSeconds).toFixed(2) : 0;

                setPerformanceMetrics({
                    memoryUsage,
                    loadingSpeed: Math.round(loadingProgress / timeInSeconds * 1000) || 0,
                    modelsPerSecond: parseFloat(modelsPerSecond)
                });
            };

            const interval = setInterval(updateMetrics, 500);
            return () => clearInterval(interval);
        }
    }, [loadingTime, loadingProgress, modelsStatus]);

    if (!isVisible) return null;

    const formatTime = (ms) => {
        return `${(ms / 1000).toFixed(1)}s`;
    };

    const getStatusIcon = (status) => {
        if (status.verified) return '✅';
        if (status.loaded) return '⏳';
        return '❌';
    };

    const colorModelsCount = Object.values(colorModelsReady).filter(Boolean).length;

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            fontFamily: 'monospace',
            fontSize: '12px',
            zIndex: 10000,
            minWidth: '300px',
            maxHeight: '80vh',
            overflow: 'auto'
        }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#00ff00' }}>
                🔍 Diagnostic de Chargement
            </h3>

            {/* Métriques principales */}
            <div style={{ marginBottom: '15px' }}>
                <div>⏱️ Temps: {formatTime(loadingTime)}</div>
                <div>📊 Progrès: {loadingProgress}%</div>
                <div>🧠 Mémoire: {performanceMetrics.memoryUsage}MB</div>
                <div>⚡ Vitesse: {performanceMetrics.modelsPerSecond} modèles/s</div>
            </div>

            {/* État global */}
            <div style={{ marginBottom: '15px' }}>
                <div style={{ color: criticalModelsLoaded ? '#00ff00' : '#ffaa00' }}>
                    🎯 Modèles critiques: {criticalModelsLoaded ? 'PRÊTS' : 'EN COURS'}
                </div>
                <div style={{ color: isMainScenesReady ? '#00ff00' : '#ffaa00' }}>
                    🚀 Site: {isMainScenesReady ? 'AFFICHÉ' : 'EN ATTENTE'}
                </div>
                <div style={{ color: isPreloadingColors ? '#ffaa00' : '#888' }}>
                    🎨 Couleurs: {isPreloadingColors ? 'CHARGEMENT' : `${colorModelsCount}/4 PRÊTES`}
                </div>
            </div>

            {/* Détail des modèles */}
            <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#00aaff' }}>Modèles Prioritaires:</h4>
                {priorityModels.map(modelUrl => {
                    const status = modelsStatus[modelUrl] || { loaded: false, verified: false };
                    const fileName = modelUrl.split('/').pop();
                    return (
                        <div key={modelUrl} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '2px'
                        }}>
                            <span>{getStatusIcon(status)} {fileName}</span>
                            <span style={{ color: '#888' }}>
                                {status.meshCount ? `${status.meshCount}m` : ''}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Recommandations */}
            {loadingTime > 5000 && !isMainScenesReady && (
                <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: '#ff4444',
                    borderRadius: '5px'
                }}>
                    ⚠️ Chargement lent détecté!<br />
                    Vérifiez votre connexion ou la taille des modèles.
                </div>
            )}

            {isMainScenesReady && loadingTime < 3000 && (
                <div style={{
                    marginTop: '15px',
                    padding: '10px',
                    background: '#00aa00',
                    borderRadius: '5px'
                }}>
                    🎉 Chargement optimal!<br />
                    Temps: {formatTime(loadingTime)}
                </div>
            )}
        </div>
    );
};

export default LoadingDiagnostic; 