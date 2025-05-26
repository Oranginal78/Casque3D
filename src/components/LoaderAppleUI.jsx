import { useEffect, useState } from 'react';

const LoaderAppleUI = ({
    progress = 0,
    isFullscreen = true,
    message = "Chargement des modèles 3D...",
    className = ""
}) => {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Détection mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Animation fluide du pourcentage
    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayProgress(progress);
        }, 150);
        return () => clearTimeout(timer);
    }, [progress]);

    const baseStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        color: '#000000',
        background: '#ffffff',
        padding: isFullscreen ? (isMobile ? '1rem' : '0') : '2rem',
        // Support pour les appareils avec encoche (iPhone X+)
        paddingTop: isFullscreen && isMobile ? 'max(1rem, env(safe-area-inset-top))' : undefined,
        paddingBottom: isFullscreen && isMobile ? 'max(1rem, env(safe-area-inset-bottom))' : undefined,
        ...(isFullscreen && {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            touchAction: 'manipulation'
        })
    };

    // Animations minimalistes
    const minimalAnimations = `
        @keyframes subtlePulse {
            0%, 100% {
                opacity: 0.3;
            }
            50% {
                opacity: 1;
            }
        }

        @keyframes smoothProgress {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(0%);
            }
        }

        @keyframes fadeIn {
            0% {
                opacity: 0;
                transform: translateY(10px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    return (
        <>
            {/* Animations CSS minimalistes */}
            <style dangerouslySetInnerHTML={{ __html: minimalAnimations }} />

            <div style={baseStyles} className={className}>
                {/* Logo ultra-minimaliste */}
                <div style={{
                    marginBottom: isMobile ? '3rem' : '4rem',
                    animation: 'fadeIn 0.8s ease-out'
                }}>
                    <div style={{
                        width: isMobile ? '4px' : '6px',
                        height: isMobile ? '4px' : '6px',
                        borderRadius: '50%',
                        backgroundColor: '#000000',
                        animation: 'subtlePulse 2s ease-in-out infinite'
                    }} />
                </div>

                {/* Message ultra-simple */}
                <h2 style={{
                    fontSize: isMobile ? '1rem' : '1.125rem',
                    fontWeight: '400',
                    marginBottom: isMobile ? '2rem' : '2.5rem',
                    textAlign: 'center',
                    letterSpacing: '0.01em',
                    opacity: 0.8,
                    lineHeight: '1.4',
                    maxWidth: isMobile ? '280px' : '320px',
                    animation: 'fadeIn 0.8s ease-out 0.2s both'
                }}>
                    {message}
                </h2>

                {/* Barre de progression ultra-fine */}
                <div style={{
                    width: isMobile ? '200px' : '240px',
                    height: '1px',
                    backgroundColor: '#f0f0f0',
                    marginBottom: isMobile ? '1.5rem' : '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.8s ease-out 0.4s both'
                }}>
                    <div style={{
                        width: `${displayProgress}%`,
                        height: '100%',
                        backgroundColor: '#000000',
                        transition: 'width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }} />
                </div>

                {/* Pourcentage minimaliste */}
                <div style={{
                    fontSize: isMobile ? '0.875rem' : '1rem',
                    fontWeight: '300',
                    color: '#666666',
                    fontVariantNumeric: 'tabular-nums',
                    animation: 'fadeIn 0.8s ease-out 0.6s both'
                }}>
                    {Math.round(displayProgress)}%
                </div>
            </div>
        </>
    );
};

export default LoaderAppleUI; 