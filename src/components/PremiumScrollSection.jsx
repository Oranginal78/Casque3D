import React, { useEffect, useRef, useState } from 'react';

const PremiumScrollSection = () => {
    const scrollRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Détection mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Intersection Observer pour démarrer l'animation quand visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (scrollRef.current) {
            observer.observe(scrollRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
            author: '3D specialist',
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
            author: 'Client Name',
            icon: '★★★★★'
        }
    ];

    // Créer un contenu triplé pour l'effet infini parfait
    const infiniteContent = [...premiumContent, ...premiumContent, ...premiumContent];

    // Styles pour l'animation CSS
    const animationDuration = isMobile ? '40s' : '30s'; // Plus lent sur mobile
    const cardWidth = isMobile ? '280px' : '320px';
    const cardHeight = isMobile ? '180px' : '200px';
    const gap = isMobile ? '1.5rem' : '2rem';

    const scrollAnimation = `
        @keyframes infiniteScroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-${(parseFloat(cardWidth) + parseFloat(gap) * 16) * premiumContent.length}px);
            }
        }
    `;

    return (
        <>
            {/* Injection de l'animation CSS */}
            <style dangerouslySetInnerHTML={{ __html: scrollAnimation }} />

            <section
                className="premium-scroll-section"
                style={{
                    background: '#f5f5f7',
                    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
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
                        fontSize: isMobile ? 'clamp(1.75rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
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
                        marginBottom: isMobile ? '2rem' : '2.5rem',
                        lineHeight: '1.5',
                        fontSize: isMobile ? '1rem' : '1.25rem',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                        fontWeight: '400',
                        maxWidth: isMobile ? '100%' : '600px',
                        margin: isMobile ? '0 auto 2rem' : '0 auto 2.5rem',
                        padding: isMobile ? '0 1rem' : '0'
                    }}>
                        Découvrez pourquoi notre casque redéfinit les standards de l'audio premium
                    </p>

                    {/* Container de défilement */}
                    <div style={{
                        position: 'relative',
                        overflow: 'hidden',
                        margin: isMobile ? '0 -1rem' : '0 -2rem'
                    }}>
                        <div
                            ref={scrollRef}
                            className="premium-scroll-container"
                            style={{
                                display: 'flex',
                                gap: gap,
                                overflowX: 'hidden',
                                padding: isMobile ? '1.5rem 1rem' : '2rem',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch',
                                willChange: 'transform',
                                // Séparer les propriétés d'animation pour éviter les conflits
                                animationName: isVisible ? 'infiniteScroll' : 'none',
                                animationDuration: animationDuration,
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                                animationPlayState: 'running'
                            }}
                            onMouseEnter={() => {
                                if (!isMobile && scrollRef.current) {
                                    scrollRef.current.style.animationPlayState = 'paused';
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isMobile && scrollRef.current) {
                                    scrollRef.current.style.animationPlayState = 'running';
                                }
                            }}
                        >
                            {infiniteContent.map((item, index) => (
                                <div
                                    key={index}
                                    className="premium-card"
                                    style={{
                                        minWidth: cardWidth,
                                        maxWidth: cardWidth,
                                        height: cardHeight,
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: isMobile ? '16px' : '20px',
                                        padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem',
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
                                        flexShrink: 0,
                                        // Optimisations mobile
                                        transform: 'translateZ(0)',
                                        backfaceVisibility: 'hidden'
                                    }}
                                >
                                    {/* Icône */}
                                    <div style={{
                                        fontSize: isMobile ? '1.5rem' : '2rem',
                                        marginBottom: '0.5rem',
                                        opacity: 0.8,
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {item.icon}
                                    </div>

                                    {/* Contenu principal */}
                                    <h3 style={{
                                        fontSize: isMobile ? '1rem' : '1.125rem',
                                        fontWeight: '600',
                                        color: '#1d1d1f',
                                        marginBottom: '0.5rem',
                                        lineHeight: '1.3',
                                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                                        // Limiter le texte sur mobile
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: isMobile ? 2 : 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {item.content}
                                    </h3>

                                    {/* Auteur/Source */}
                                    <p style={{
                                        color: '#86868b',
                                        fontSize: isMobile ? '0.8rem' : '0.875rem',
                                        fontWeight: '400',
                                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '100%'
                                    }}>
                                        {item.author}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicateur mobile */}
                    {isMobile && (
                        <div style={{
                            marginTop: '1rem',
                            fontSize: '0.8rem',
                            color: '#86868b',
                            opacity: 0.7
                        }}>
                            ← Défilement automatique →
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default PremiumScrollSection; 