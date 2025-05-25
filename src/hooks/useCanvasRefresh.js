import { useEffect, useCallback } from 'react';

/**
 * Hook pour forcer le refresh des canvas Three.js
 * Résout le problème classique où les modèles ne s'affichent pas
 * tant qu'un événement resize n'est pas déclenché
 */
export const useCanvasRefresh = () => {
    const forceRefresh = useCallback((delay = 0, reason = 'Manual refresh') => {
        if (delay > 0) {
            setTimeout(() => {
                console.log(`🔄 Canvas refresh: ${reason}`);
                window.dispatchEvent(new Event('resize'));
            }, delay);
        } else {
            console.log(`🔄 Canvas refresh: ${reason}`);
            window.dispatchEvent(new Event('resize'));
        }
    }, []);

    const forceMultipleRefresh = useCallback((reason = 'Multiple refresh') => {
        console.log(`🔄 Canvas multiple refresh: ${reason}`);
        // Refresh immédiat
        window.dispatchEvent(new Event('resize'));

        // Refresh de sécurité
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);

        // Refresh final
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }, []);

    return {
        forceRefresh,
        forceMultipleRefresh
    };
};

/**
 * Hook pour refresh automatique basé sur des conditions
 */
export const useAutoCanvasRefresh = (condition, reason = 'Auto refresh') => {
    const { forceMultipleRefresh } = useCanvasRefresh();

    useEffect(() => {
        if (condition) {
            forceMultipleRefresh(reason);
        }
    }, [condition, reason, forceMultipleRefresh]);
}; 