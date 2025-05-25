import React, { useEffect, useState } from 'react';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            position: 'relative',
            zIndex: 20,
            padding: '0 2rem'
        }}>
            <div style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    lineHeight: '1.1',
                    color: '#1d1d1f',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.03em'
                }}>
                    Un son d'exception.
                </h1>

                <h2 style={{
                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                    fontWeight: '300',
                    marginBottom: '2rem',
                    lineHeight: '1.2',
                    color: '#424245',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.02em'
                }}>
                    Un design absolu.
                </h2>

                <p style={{
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                    color: '#86868b',
                    marginBottom: '3rem',
                    fontWeight: '400',
                    lineHeight: '1.4',
                    maxWidth: '680px',
                    margin: '0 auto 3rem auto',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif'
                }}>
                    Découvrez le casque audio qui redéfinit l'excellence sonore avec une technologie de pointe.
                </p>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '4rem'
                }}>
                    <button style={{
                        background: '#0071e3',
                        color: 'white',
                        border: 'none',
                        padding: '17px 32px',
                        borderRadius: '980px',
                        fontSize: '17px',
                        fontWeight: '400',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                        minWidth: '140px',
                        letterSpacing: '-0.01em'
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
                        fontSize: '17px',
                        fontWeight: '400',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                        minWidth: '140px',
                        letterSpacing: '-0.01em'
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
                        En savoir plus
                    </button>
                </div>

                <div style={{
                    fontSize: '14px',
                    color: '#86868b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    marginBottom: '2rem'
                }}>
                    À partir de 399 € ou 33,25 €/mois pendant 12 mois*
                </div>
            </div>

            <div
                className="bounce"
                style={{
                    fontSize: '1.5rem',
                    color: '#86868b',
                    position: 'absolute',
                    bottom: '2rem',
                    opacity: isVisible ? 0.6 : 0,
                    transition: 'opacity 1.5s ease-out 2s',
                    fontWeight: '300'
                }}
            >
                ↓
            </div>
        </section>
    );
};

export default HeroSection;
