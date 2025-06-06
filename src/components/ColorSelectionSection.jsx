import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import { useModelPreloader } from '../hooks/useModelPreloader'

// Configuration des couleurs disponibles
const colorOptions = [
    {
        id: 'white',
        name: 'Blanc',
        model: '/models/headphones.glb',
        color: '#f5f5f7',
        description: 'Élégance intemporelle'
    },
    {
        id: 'black',
        name: 'Noir',
        model: '/models/headphonesblack.glb',
        color: '#1d1d1f',
        description: 'Sophistication moderne'
    },
    {
        id: 'blue',
        name: 'Bleu',
        model: '/models/headphonesblue.glb',
        color: '#007AFF',
        description: 'Audace créative'
    },
    {
        id: 'gold',
        name: 'Or',
        model: '/models/headphonesgold.glb',
        color: '#EACA9A',
        description: 'Luxe absolu'
    }
]

function ColorHeadphonesModel({ modelPath }) {
    const group = useRef()
    const { scene } = useGLTF(modelPath)

    // Clonage du modèle pour éviter les conflits
    const clonedScene = scene.clone()

    useEffect(() => {
        if (!scene || !scene.children.length) {
            return
        }

        // Optimisation simple des matériaux pour l'affichage
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                if (child.material) {
                    child.material.envMapIntensity = 1.2
                }
            }
        })

    }, [clonedScene, scene])

    return (
        <group
            ref={group}
            rotation={[0, -Math.PI, 0]}
            position={[0, -4.9, 0]}
            scale={[2.8, 2.8, 2.8]}
        >
            <primitive object={clonedScene} dispose={null} />
        </group>
    )
}

function LoadingSpinner() {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#666',
            fontSize: '1.1rem',
            fontWeight: '500',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif'
        }}>
            Chargement...
        </div>
    )
}

const ColorSelectionSection = () => {
    const [selectedColor, setSelectedColor] = useState(colorOptions[0])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Détection mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Utilisation du hook de préchargement simplifié
    const { isConfigured } = useModelPreloader()

    const handleColorChange = (colorOption) => {
        if (colorOption.id === selectedColor.id) return

        // Changement instantané de couleur
        setSelectedColor(colorOption)

        // Simple refresh après changement
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 50)
    }

    // Si les modèles principaux ne sont pas configurés, ne pas afficher la section
    if (!isConfigured) {
        return null
    }

    return (
        <section style={{
            background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)',
            padding: isMobile ? '2rem 1rem' : '4rem 2rem',
            position: 'relative',
            overflow: isMobile ? 'hidden' : 'visible', // Réduire débordement sur mobile
            zIndex: 5,
            marginTop: isMobile ? '1rem' : '2rem',
            marginBottom: isMobile ? '1rem' : '2rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                {/* Titre et sous-titre */}
                <h2 style={{
                    fontSize: isMobile ? 'clamp(1.75rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: '600',
                    color: '#1d1d1f',
                    marginBottom: '0.5rem',
                    lineHeight: '1.1',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.03em'
                }}>
                    Choisissez votre couleur
                </h2>

                <p style={{
                    color: '#515154',
                    marginBottom: '1rem',
                    lineHeight: '1.5',
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    fontWeight: '400',
                    maxWidth: '600px',
                    margin: '0 auto 1rem'
                }}>
                    Explorez chaque finition sous tous les angles
                </p>

                {/* Instructions pour l'interaction */}
                <p style={{
                    marginBottom: isMobile ? '2rem' : '3rem',
                    fontSize: '0.875rem',
                    color: '#86868b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                    fontWeight: '400'
                }}>
                    {isMobile ? 'Touchez pour faire pivoter • Touchez une couleur pour changer' : 'Faites glisser pour faire pivoter • Touchez une couleur pour changer'}
                </p>

                {/* Zone 3D avec effet "hors cadre" */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: isMobile ? '400px' : '500px',
                    marginBottom: '2rem',
                    borderRadius: isMobile ? '16px' : '20px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    overflow: isMobile ? 'hidden' : 'visible', // Contrôler débordement mobile
                    boxShadow: isMobile ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                    zIndex: 1
                }}>
                    {/* Canvas 3D débordant */}
                    <div style={{
                        position: 'absolute',
                        top: isMobile ? '0%' : '-15%', // Pas de débordement sur mobile
                        left: isMobile ? '0%' : '-10%',
                        width: isMobile ? '100%' : '120%',
                        height: isMobile ? '100%' : '130%',
                        zIndex: 10,
                        pointerEvents: 'auto'
                    }}>
                        <Canvas
                            camera={{
                                position: [0, 0, 8],
                                fov: 45,
                                near: 0.1,
                                far: 1000
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'transparent'
                            }}
                            onCreated={() => {
                                setIsLoaded(true)
                                // Simple refresh après création du canvas
                                setTimeout(() => {
                                    window.dispatchEvent(new Event('resize'));
                                }, 50);
                            }}
                        >
                            <Suspense fallback={null}>
                                {/* Éclairage optimisé pour l'effet débordant */}
                                <ambientLight intensity={0.6} />
                                <directionalLight
                                    position={[10, 10, 5]}
                                    intensity={1.2}
                                    castShadow
                                    shadow-mapSize-width={2048}
                                    shadow-mapSize-height={2048}
                                />
                                <pointLight position={[-10, -10, -10]} intensity={0.3} />

                                {/* Modèle 3D avec effet immersif */}
                                <ColorHeadphonesModel
                                    modelPath={selectedColor.model}
                                />

                                {/* Contrôles de rotation */}
                                <OrbitControls
                                    enableZoom={false}
                                    enablePan={false}
                                    enableRotate={true}
                                    autoRotate={false}
                                    rotateSpeed={0.8}
                                    minPolarAngle={Math.PI / 3}
                                    maxPolarAngle={Math.PI / 1.5}
                                />

                                {/* Environnement */}
                                <Environment preset="studio" />

                                {/* Ombres avec effet de profondeur */}
                                <ContactShadows
                                    position={[0, -3.5, 0]}
                                    opacity={0.4}
                                    scale={12}
                                    blur={3}
                                    far={6}
                                />
                            </Suspense>
                        </Canvas>
                    </div>

                    {/* Overlay de loading centré dans la section */}
                    {!isLoaded && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 20
                        }}>
                            <LoadingSpinner />
                        </div>
                    )}
                </div>

                {/* Nom de la couleur sélectionnée */}
                <div style={{
                    marginBottom: '2rem',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 15
                }}>
                    <h3 style={{
                        fontSize: isMobile ? '1.25rem' : '1.5rem',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '0.25rem',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
                    }}>
                        {selectedColor.name}
                    </h3>
                    <p style={{
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        color: '#515154',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                        fontWeight: '400'
                    }}>
                        {selectedColor.description}
                    </p>
                </div>

                {/* Sélecteur de couleurs */}
                <div
                    className="color-selector"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: isMobile ? '1rem' : '1.5rem',
                        flexWrap: 'wrap',
                        position: 'relative',
                        zIndex: 15
                    }}
                >
                    {colorOptions.map((colorOption) => (
                        <button
                            key={colorOption.id}
                            onClick={() => handleColorChange(colorOption)}
                            aria-label={`Sélectionner la couleur ${colorOption.name}`}
                            className="color-button"
                            style={{
                                width: isMobile ? '50px' : '60px',
                                height: isMobile ? '50px' : '60px',
                                borderRadius: '50%',
                                border: selectedColor.id === colorOption.id
                                    ? '3px solid #007AFF'
                                    : '2px solid rgba(0, 0, 0, 0.1)',
                                background: colorOption.color,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                boxShadow: selectedColor.id === colorOption.id
                                    ? '0 0 0 4px rgba(0, 122, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)'
                                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                                transform: selectedColor.id === colorOption.id ? 'scale(1.1)' : 'scale(1)',
                                minWidth: '44px',
                                minHeight: '44px'
                            }}
                            onMouseEnter={(e) => {
                                if (selectedColor.id !== colorOption.id && !isMobile) {
                                    e.target.style.transform = 'scale(1.05)'
                                    e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedColor.id !== colorOption.id && !isMobile) {
                                    e.target.style.transform = 'scale(1)'
                                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                                }
                            }}
                        >
                            {/* Indicateur de sélection */}
                            {selectedColor.id === colorOption.id && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: isMobile ? '16px' : '20px',
                                    height: isMobile ? '16px' : '20px',
                                    borderRadius: '50%',
                                    background: colorOption.color === '#f5f5f7' ? '#1d1d1f' : '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: isMobile ? '10px' : '12px',
                                    fontWeight: 'bold'
                                }}>
                                    ✓
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Section Prix intégrée */}
                <div style={{
                    marginTop: isMobile ? '3rem' : '4rem',
                    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: isMobile ? '16px' : '20px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: isMobile ? '0 4px 20px rgba(0, 0, 0, 0.08)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: isMobile ? '1.5rem' : '2rem',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '1rem',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
                    }}>
                        Casque Audio Premium
                    </h3>

                    <div style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontWeight: '700',
                        color: '#1d1d1f',
                        marginBottom: '1rem',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
                    }}>
                        599€
                    </div>

                    <p style={{
                        color: '#515154',
                        marginBottom: '2rem',
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif'
                    }}>
                        Livraison gratuite • Retour sous 14 jours • Garantie 2 ans
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: isMobile ? '1rem' : '1.5rem',
                        justifyContent: 'center',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center'
                    }}>
                        <button style={{
                            background: '#0071e3',
                            color: 'white',
                            padding: isMobile ? '16px 32px' : '18px 36px',
                            borderRadius: '980px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: isMobile ? '16px' : '17px',
                            fontWeight: '500',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                            transition: 'all 0.3s ease',
                            minWidth: isMobile ? '200px' : '160px'
                        }}>
                            Ajouter au panier
                        </button>

                        <button style={{
                            background: 'transparent',
                            color: '#0071e3',
                            border: '1px solid #0071e3',
                            padding: isMobile ? '15px 31px' : '17px 35px',
                            borderRadius: '980px',
                            cursor: 'pointer',
                            fontSize: isMobile ? '16px' : '17px',
                            fontWeight: '500',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                            transition: 'all 0.3s ease',
                            minWidth: isMobile ? '200px' : '160px'
                        }}>
                            En savoir plus
                        </button>
                    </div>
                </div>
            </div>

            {/* Styles CSS intégrés */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @media (max-width: 768px) {
                        .color-selector .color-button {
                            width: 50px !important;
                            height: 50px !important;
                            min-width: 44px !important;
                            min-height: 44px !important;
                        }
                    }
                    
                    @media (hover: none) and (pointer: coarse) {
                        .color-selector .color-button:hover {
                            transform: scale(1) !important;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
                        }
                    }
                `
            }} />
        </section>
    )
}

export default ColorSelectionSection 