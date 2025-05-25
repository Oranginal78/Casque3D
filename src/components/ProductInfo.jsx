import React, { useState, useEffect } from 'react';
import InteractiveHeadphoneViewer from './InteractiveHeadphoneViewer';

const ProductInfo = ({ activeSection = "overview" }) => {
    const [isVisible, setIsVisible] = useState(false);

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
            borderRadius: '18px',
            padding: '3rem',
            maxWidth: '720px',
            margin: '0 auto',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
        }}>
            <h3 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                fontWeight: '600',
                color: '#1d1d1f',
                marginBottom: '1rem',
                lineHeight: '1.2',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-0.02em'
            }}>
                {currentInfo.title}
            </h3>

            <p style={{
                color: '#515154',
                marginBottom: '2rem',
                lineHeight: '1.5',
                fontSize: '1.125rem',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                fontWeight: '400'
            }}>
                {currentInfo.description}
            </p>

            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 2.5rem 0'
            }}>
                {currentInfo.features.map((feature, index) => (
                    <li key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        color: '#1d1d1f',
                        marginBottom: '1rem',
                        fontSize: '17px',
                        lineHeight: '1.4',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                        fontWeight: '400'
                    }}>
                        <div style={{
                            width: '6px',
                            height: '6px',
                            background: '#0071e3',
                            borderRadius: '50%',
                            marginTop: '8px',
                            marginRight: '16px',
                            flexShrink: 0
                        }}></div>
                        {feature}
                    </li>
                ))}
            </ul>

            <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                alignItems: 'center'
            }}>
                <button style={{
                    background: '#0071e3',
                    color: 'white',
                    padding: '17px 32px',
                    borderRadius: '980px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '17px',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.01em',
                    minWidth: '120px'
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
                    padding: '16px 31px',
                    borderRadius: '980px',
                    cursor: 'pointer',
                    fontSize: '17px',
                    fontWeight: '400',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.01em',
                    minWidth: '120px'
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

                <div style={{
                    fontSize: '14px',
                    color: '#86868b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    marginLeft: 'auto'
                }}>
                    Livraison gratuite
                </div>
            </div>
        </div>
    );
};

export default ProductInfo; 