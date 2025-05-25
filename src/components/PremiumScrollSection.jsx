import React, { useEffect, useRef } from 'react';

const PremiumScrollSection = () => {
    const scrollRef = useRef(null);

    // Contenu premium à faire défiler
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
            author: '3D specialist"',
            icon: '★★★★★'
        },
        {
            type: 'feature',
            content: 'Autonomie 40h',
            author: 'Website Review',
            icon: '★★★★★'
        },
        {
            type: 'award',
            content: 'Design Award 2024',
            author: '2025 Award',
            icon: '★★★★★'
        },
        {
            type: 'review',
            content: '"Une expérience audio révolutionnaire"',
            author: 'Best Headphones Review',
            icon: '★★★★★'
        },
        {
            type: 'feature',
            content: 'Audio spatial immersif',
            author: 'Clien Name',
            icon: '★★★★★'
        }
    ];

    // Défilement automatique infini
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId;
        const scrollSpeed = 0.5; // Vitesse de défilement (pixels par frame)

        const animate = () => {
            if (scrollContainer) {
                // Défilement continu vers la droite
                scrollContainer.scrollLeft += scrollSpeed;

                // Calculer la largeur d'un élément + gap
                const firstChild = scrollContainer.children[0];
                if (firstChild) {
                    const itemWidth = firstChild.offsetWidth + 32; // 32px = gap de 2rem
                    const totalOriginalWidth = itemWidth * premiumContent.length;

                    // Si on a défilé la largeur du contenu original, revenir au début
                    if (scrollContainer.scrollLeft >= totalOriginalWidth) {
                        scrollContainer.scrollLeft = 0;
                    }
                }
            }
            animationId = requestAnimationFrame(animate);
        };

        // Démarrer l'animation
        animationId = requestAnimationFrame(animate);

        // Nettoyer l'animation au démontage
        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [premiumContent.length]);

    // Créer un contenu triplé pour l'effet infini parfait
    const infiniteContent = [...premiumContent, ...premiumContent, ...premiumContent];

    return (
        <section
            className="premium-scroll-section"
            style={{
                background: '#f5f5f7',
                padding: '3rem 2rem',
                position: 'relative',
                overflow: 'hidden',
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
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '0.5rem',
                    lineHeight: '1.1',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.03em'
                }}>
                    L'excellence reconnue
                </h2>

                <p style={{
                    color: '#515154',
                    marginBottom: '2.5rem',
                    lineHeight: '1.5',
                    fontSize: '1.25rem',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    fontWeight: '400',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem'
                }}>
                    Découvrez pourquoi notre casque redéfinit les standards de l'audio premium
                </p>

                {/* Container de défilement */}
                <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    margin: '0 -2rem'
                }}>
                    <div
                        ref={scrollRef}
                        className="premium-scroll-container"
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            overflowX: 'hidden', // Masquer la scrollbar
                            padding: '2rem',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                            willChange: 'scroll-position'
                        }}
                    >
                        {infiniteContent.map((item, index) => (
                            <div
                                key={index}
                                className="premium-card"
                                style={{
                                    minWidth: '320px',
                                    maxWidth: '320px',
                                    height: '200px',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '20px',
                                    padding: '2.5rem 2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease',
                                    flexShrink: 0
                                }}
                            >
                                {/* Icône */}
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '0.5rem',
                                    opacity: 0.8,
                                    transition: 'all 0.3s ease'
                                }}>
                                    {item.icon}
                                </div>

                                {/* Contenu principal */}
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    fontWeight: '600',
                                    color: '#1d1d1f',
                                    marginBottom: '0.5rem',
                                    lineHeight: '1.3',
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif'
                                }}>
                                    {item.content}
                                </h3>

                                {/* Auteur/Source */}
                                <p style={{
                                    color: '#86868b',
                                    fontSize: '0.875rem',
                                    fontWeight: '400',
                                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif'
                                }}>
                                    {item.author}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PremiumScrollSection; 