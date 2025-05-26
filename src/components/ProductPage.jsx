import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import HeadphoneViewer from './HeadphoneViewer';
import ProductInfo from './ProductInfo';
import InteractiveHeadphoneViewer from './InteractiveHeadphoneViewer';
import PremiumScrollSection from './PremiumScrollSection';
import ColorSelectionSection from './ColorSelectionSection';

const ProductPage = () => {
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

    return (
        <main style={{
            background: 'linear-gradient(135deg, #e5e5e5 0%, #cccccc 25%, #b8b8b8 50%, #a8a8a8 75%, #999999 100%)',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden' // Évite les scroll bars indésirables
        }}>
            {/* Section Hero avec contenu textuel */}
            <div style={{
                position: 'relative',
                zIndex: 20,
                pointerEvents: 'auto'
            }}>
                <HeroSection />
            </div>

            {/* Viewer 3D en arrière-plan mais visible */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1,
                pointerEvents: 'none' // Permet aux éléments au-dessus d'être cliquables
            }}>
                <HeadphoneViewer />
            </div>

            {/* Section d'informations produit */}
            <div style={{
                position: 'relative',
                zIndex: 20,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                marginTop: isMobile ? '25vh' : '50vh', // Réduire encore plus l'espace sur mobile
                borderRadius: '20px 20px 0 0',
                padding: isMobile ? '1.5rem 1rem' : '2rem', // Réduire le padding mobile
                minHeight: isMobile ? '30vh' : '50vh' // Réduire aussi la hauteur minimale
            }}>
                <ProductInfo />
            </div>

            {/* Nouvelle section 3D interactive */}
            <div style={{
                position: 'relative',
                zIndex: 20,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: isMobile ? '2rem 1rem' : '3rem 2rem', // Réduire le padding mobile
                borderTop: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{
                    maxWidth: '720px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2rem)' : 'clamp(1.75rem, 3vw, 2.25rem)',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: isMobile ? '0.75rem' : '1rem',
                        lineHeight: '1.2',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                        letterSpacing: '-0.02em'
                    }}>
                        Explorez tous les détails
                    </h2>

                    <p style={{
                        color: '#515154',
                        marginBottom: isMobile ? '1.5rem' : '2.5rem',
                        lineHeight: '1.5',
                        fontSize: isMobile ? '1rem' : '1.125rem',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                        fontWeight: '400'
                    }}>
                        Découvrez chaque détail de conception dans cette vue interactive. Cliquez et faites glisser pour faire pivoter le casque.
                    </p>

                    <InteractiveHeadphoneViewer />
                </div>
            </div>

            {/* Section de défilement premium */}
            <div style={{
                position: 'relative',
                zIndex: 30
            }}>
                <PremiumScrollSection />
            </div>

            {/* Section de sélection de couleur interactive */}
            <div style={{
                position: 'relative',
                zIndex: 30
            }}>
                <ColorSelectionSection />
            </div>
        </main>
    );
};

export default ProductPage; 