import React, { useState, useEffect } from 'react';

const PremiumScrollSection = () => {
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

    // Contenu premium réduit à 4 éléments
    const premiumContent = [
        {
            type: 'review',
            content: '"Un son d\'une pureté exceptionnelle"',
            author: 'Tech Magazine',
            icon: '★★★★★'
        },
        {
            type: 'award',
            content: 'Prix de l\'Innovation 2024',
            author: 'BestReview.com',
            icon: '★★★★★'
        },
        {
            type: 'feature',
            content: 'Réduction de bruit adaptative',
            author: 'Company Review',
            icon: '★★★★★'
        },
        {
            type: 'review',
            content: '"Le futur de l\'audio premium"',
            author: '3D specialist',
            icon: '★★★★★'
        }
    ];

    return (
        <section
            className="premium-scroll-section"
            style={{
                background: '#f5f5f7',
                padding: isMobile ? '2rem 1rem' : '4rem 2rem',
                position: 'relative',
                zIndex: 30
            }}
        >
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                {/* Titre de section */}
                <h2 style={{
                    fontSize: isMobile ? 'clamp(1.75rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: isMobile ? '0.5rem' : '1rem',
                    lineHeight: '1.1',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.03em'
                }}>
                    L'excellence reconnue
                </h2>

                <p style={{
                    color: '#515154',
                    marginBottom: isMobile ? '2rem' : '3rem',
                    lineHeight: '1.5',
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    fontWeight: '400',
                    maxWidth: isMobile ? '100%' : '600px',
                    margin: isMobile ? '0 auto 2rem' : '0 auto 3rem',
                    padding: isMobile ? '0 0.5rem' : '0'
                }}>
                    Découvrez pourquoi notre casque redéfinit les standards de l'audio premium
                </p>

                {/* Grille responsive des cartes - 2 lignes max */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile
                        ? 'repeat(2, 1fr)' // 2 colonnes sur mobile
                        : 'repeat(2, 1fr)', // 2 colonnes sur desktop
                    gridTemplateRows: 'repeat(2, 1fr)', // Maximum 2 lignes
                    gap: isMobile ? '1rem' : '1.5rem',
                    maxWidth: isMobile ? '100%' : '800px',
                    margin: '0 auto'
                }}>
                    {premiumContent.map((item, index) => (
                        <div
                            key={index}
                            className="premium-card"
                            style={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: isMobile ? '16px' : '20px',
                                padding: isMobile ? '1.5rem 1rem' : '2rem 1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: isMobile
                                    ? '0 4px 16px rgba(0, 0, 0, 0.05)'
                                    : '0 8px 20px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.3s ease',
                                minHeight: isMobile ? '160px' : '180px',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => {
                                if (!isMobile) {
                                    e.target.style.transform = 'translateY(-4px)';
                                    e.target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isMobile) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.05)';
                                }
                            }}
                        >
                            {/* Icône */}
                            <div style={{
                                fontSize: isMobile ? '1.5rem' : '2rem',
                                marginBottom: isMobile ? '0.5rem' : '0.75rem',
                                opacity: 0.8,
                                transition: 'all 0.3s ease'
                            }}>
                                {item.icon}
                            </div>

                            {/* Contenu principal */}
                            <h3 style={{
                                fontSize: isMobile ? '0.9rem' : '1.1rem',
                                fontWeight: '600',
                                color: '#1d1d1f',
                                marginBottom: isMobile ? '0.5rem' : '0.75rem',
                                lineHeight: '1.3',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                                textAlign: 'center',
                                maxWidth: '100%'
                            }}>
                                {item.content}
                            </h3>

                            {/* Auteur/Source */}
                            <p style={{
                                color: '#86868b',
                                fontSize: isMobile ? '0.8rem' : '0.9rem',
                                fontWeight: '400',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                                margin: 0,
                                textAlign: 'center'
                            }}>
                                {item.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PremiumScrollSection; 