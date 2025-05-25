import { useEffect, useState } from 'react';

const LoaderAppleUI = ({
    progress = 0,
    isFullscreen = true,
    message = "Chargement des modèles 3D...",
    className = ""
}) => {
    const [displayProgress, setDisplayProgress] = useState(0);

    // Animation fluide du pourcentage
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayProgress(progress);
        }, 100);
        return () => clearTimeout(timer);
    }, [progress]);

    const baseStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        color: '#1d1d1f',
        background: isFullscreen
            ? 'linear-gradient(135deg, #f5f5f7 0%, #ffffff 50%, #f5f5f7 100%)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: isFullscreen ? '0' : '16px',
        padding: isFullscreen ? '0' : '2rem',
        ...(isFullscreen && {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999
        })
    };

    // Styles pour les animations
    const pulseKeyframes = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.05);
                opacity: 1;
            }
        }
    `;

    const bounceKeyframes = `
        @keyframes bounce {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;

    return (
        <>
            {/* Injection des keyframes CSS */}
            <style dangerouslySetInnerHTML={{ __html: pulseKeyframes + bounceKeyframes }} />

            <div style={baseStyles} className={className}>
                {/* Logo ou icône */}
                <div style={{
                    marginBottom: '2rem',
                    opacity: 0.8
                }}>
                    <div style={{
                        width: isFullscreen ? '80px' : '60px',
                        height: isFullscreen ? '80px' : '60px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 32px rgba(0, 122, 255, 0.3)',
                        animation: 'pulse 2s ease-in-out infinite'
                    }}>
                        <div style={{
                            width: '50%',
                            height: '50%',
                            background: 'white',
                            borderRadius: '50%',
                            opacity: 0.9
                        }} />
                    </div>
                </div>

                {/* Message de chargement */}
                <h2 style={{
                    fontSize: isFullscreen ? '1.5rem' : '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    letterSpacing: '-0.02em',
                    opacity: 0.9
                }}>
                    {message}
                </h2>

                {/* Barre de progression */}
                <div style={{
                    width: isFullscreen ? '280px' : '200px',
                    height: '4px',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    marginBottom: '1rem',
                    position: 'relative'
                }}>
                    <div style={{
                        width: `${displayProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #007AFF 0%, #5856D6 100%)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease-out',
                        boxShadow: '0 0 8px rgba(0, 122, 255, 0.4)'
                    }} />
                </div>

                {/* Pourcentage */}
                <div style={{
                    fontSize: isFullscreen ? '1rem' : '0.875rem',
                    fontWeight: '500',
                    color: '#86868b',
                    marginBottom: isFullscreen ? '2rem' : '1rem'
                }}>
                    {Math.round(displayProgress)}%
                </div>

                {/* Animation de points */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                }}>
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#007AFF',
                                animation: `bounce 1.4s ease-in-out ${index * 0.16}s infinite both`,
                                opacity: 0.7
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default LoaderAppleUI; 