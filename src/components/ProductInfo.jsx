import React, { useState, useEffect } from 'react';
import InteractiveHeadphoneViewer from './InteractiveHeadphoneViewer';

const ProductInfo = ({ activeSection = "overview" }) => {
    const [isVisible, setIsVisible] = useState(false);
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

    useEffect(() => {
        setIsVisible(true);
    }, [activeSection]);

    const productDetails = {
        overview: {
            title: "Audio Haute Définition",
            description: "Une expérience sonore inégalée grâce à une technologie de pointe et un design pensé pour l'excellence.",
            features: [
                "Audio spatial avec suivi dynamique de la tête",
                "Réduction de bruit active adaptative",
                "Jusqu'à 30 heures d'écoute",
                "Connexion transparente entre tous vos appareils"
            ]
        },
        specifications: {
            title: "Caractéristiques Techniques",
            description: "Des composants de qualité professionnelle pour une fidélité sonore exceptionnelle.",
            features: [
                "Transducteurs dynamiques de 50 mm",
                "Réponse en fréquence: 20 Hz à 20 000 Hz",
                "Impédance: 32 ohms",
                "Puce Apple H2 pour l'audio computationnel"
            ]
        },
        design: {
            title: "Design & Confort",
            description: "Conçu avec des matériaux premium pour un confort optimal, même lors d'écoutes prolongées.",
            features: [
                "Coussinets en mousse à mémoire de forme",
                "Arceau en acier inoxydable",
                "Finition anodisée de qualité spatiale",
                "Seulement 384 g"
            ]
        }
    };

    const currentInfo = productDetails[activeSection] || productDetails.overview;

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: isMobile ? '16px' : '18px',
            padding: isMobile ? '1.5rem 1rem' : '3rem',
            maxWidth: '720px',
            margin: '0 auto',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: isMobile ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 10px 40px rgba(0, 0, 0, 0.1)'
        }}>
            <h3 style={{
                fontSize: isMobile ? 'clamp(1.5rem, 5vw, 1.75rem)' : 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: '600',
                color: '#1d1d1f',
                marginBottom: isMobile ? '0.75rem' : '1rem',
                lineHeight: '1.2',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-0.02em'
            }}>
                {currentInfo.title}
            </h3>

            <p style={{
                color: '#515154',
                marginBottom: isMobile ? '1.5rem' : '2rem',
                lineHeight: '1.5',
                fontSize: isMobile ? '1rem' : '1.125rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                fontWeight: '400'
            }}>
                {currentInfo.description}
            </p>

            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: isMobile ? '0 0 1.5rem 0' : '0 0 2.5rem 0'
            }}>
                {currentInfo.features.map((feature, index) => (
                    <li key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        color: '#1d1d1f',
                        marginBottom: isMobile ? '0.75rem' : '1rem',
                        fontSize: isMobile ? '15px' : '17px',
                        lineHeight: '1.4',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                        fontWeight: '400'
                    }}>
                        <div style={{
                            width: isMobile ? '5px' : '6px',
                            height: isMobile ? '5px' : '6px',
                            background: '#0071e3',
                            borderRadius: '50%',
                            marginTop: isMobile ? '6px' : '8px',
                            marginRight: isMobile ? '12px' : '16px',
                            flexShrink: 0
                        }}></div>
                        {feature}
                    </li>
                ))}
            </ul>

            <div style={{
                display: 'flex',
                gap: isMobile ? '12px' : '16px',
                flexWrap: 'wrap',
                alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row'
            }}>
                <button style={{
                    background: '#0071e3',
                    color: 'white',
                    padding: isMobile ? '14px 24px' : '17px 32px',
                    borderRadius: '980px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: isMobile ? '16px' : '17px',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.01em',
                    minWidth: isMobile ? '200px' : '120px',
                    width: isMobile ? '100%' : 'auto'
                }}
                    onMouseEnter={(e) => {
                        e.target.style.background = '#0077ed';
                        e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = '#0071e3';
                        e.target.style.transform = 'scale(1)';
                    }}
                    onMouseDown={(e) => {
                        e.target.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                    }}
                >
                    Acheter
                </button>

                <button style={{
                    background: 'transparent',
                    color: '#0071e3',
                    border: '1px solid #0071e3',
                    padding: isMobile ? '13px 23px' : '16px 31px',
                    borderRadius: '980px',
                    cursor: 'pointer',
                    fontSize: isMobile ? '16px' : '17px',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.01em',
                    minWidth: isMobile ? '200px' : '120px',
                    width: isMobile ? '100%' : 'auto'
                }}
                    onMouseEnter={(e) => {
                        e.target.style.background = '#0071e3';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#0071e3';
                        e.target.style.transform = 'scale(1)';
                    }}
                    onMouseDown={(e) => {
                        e.target.style.transform = 'scale(0.98)';
                    }}
                    onMouseUp={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                    }}
                >
                    Comparer
                </button>

                {!isMobile && (
                    <div style={{
                        fontSize: '14px',
                        color: '#86868b',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                        marginLeft: 'auto'
                    }}>
                        Livraison gratuite
                    </div>
                )}
            </div>

            {isMobile && (
                <div style={{
                    fontSize: '14px',
                    color: '#86868b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    textAlign: 'center',
                    marginTop: '1rem'
                }}>
                    Livraison gratuite
                </div>
            )}
        </div>
    );
};

export default ProductInfo; 