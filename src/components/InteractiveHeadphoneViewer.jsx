import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'

// Préchargement du modèle (réutilise le même modèle)
useGLTF.preload('/models/headphones.glb')

function InteractiveHeadphonesModel() {
    const group = useRef()
    const { scene } = useGLTF('/models/headphones.glb')

    // Clonage du modèle pour éviter les conflits
    const clonedScene = scene.clone()

    useEffect(() => {
        // Optimisation des matériaux
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                // Améliore la qualité visuelle
                if (child.material) {
                    child.material.envMapIntensity = 1.2
                }
            }
        })
    }, [clonedScene])

    return (
        <group
            ref={group}
            rotation={[0, -Math.PI, 0]} // Vue de côté par défaut
            position={[0, -3.1, 0]}
            scale={[2, 2, 2]}
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

// Composant pour afficher les informations détaillées
function InfoPanel({ activeInfo, onClose, triggerIndex }) {
    if (!activeInfo) return null

    // Alternance gauche/droite basée sur l'index du trigger
    // Index 0: gauche, Index 1: gauche, Index 2: droite
    const isLeft = triggerIndex !== 2
    const side = isLeft ? 'left' : 'right'

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            [side]: '30px',
            transform: 'translateY(-50%)',
            maxWidth: '220px',
            zIndex: 100,
            animation: `slideIn${isLeft ? 'Left' : 'Right'} 0.3s ease-out`,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif'
        }}>
            <style>
                {`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateY(-50%) translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(-50%) translateX(0);
                    }
                }
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateY(-50%) translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(-50%) translateX(0);
                    }
                }
                @keyframes fadeInFeature {
                    from {
                        opacity: 0;
                        transform: translateY(5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>

            {/* Titre */}
            <h3 style={{
                fontSize: '17px',
                fontWeight: '600',
                color: '#1d1d1f',
                margin: '0 0 6px 0',
                lineHeight: '1.2',
                textAlign: isLeft ? 'left' : 'right',
                letterSpacing: '-0.01em'
            }}>
                {activeInfo.title}
            </h3>

            {/* Description courte */}
            <p style={{
                fontSize: '13px',
                color: '#86868b',
                lineHeight: '1.3',
                margin: '0 0 12px 0',
                textAlign: isLeft ? 'left' : 'right',
                fontWeight: '400'
            }}>
                {activeInfo.shortDescription}
            </p>

            {/* Liste des caractéristiques principales */}
            <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
            }}>
                {activeInfo.mainFeatures.map((feature, index) => (
                    <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '6px',
                        fontSize: '12px',
                        color: '#1d1d1f',
                        lineHeight: '1.2',
                        flexDirection: 'row',
                        textAlign: isLeft ? 'left' : 'right',
                        justifyContent: isLeft ? 'flex-start' : 'flex-end',
                        animation: `fadeInFeature 0.2s ease-out ${index * 0.05}s both`
                    }}>
                        <div style={{
                            width: '3px',
                            height: '3px',
                            background: '#007AFF',
                            borderRadius: '50%',
                            marginRight: '8px',
                            flexShrink: 0
                        }}></div>
                        <span style={{ fontWeight: '400' }}>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const InteractiveHeadphoneViewer = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentRotation, setCurrentRotation] = useState(0)
    const [activeInfo, setActiveInfo] = useState(null)
    const [activeTriggerIndex, setActiveTriggerIndex] = useState(-1)
    const [rotationSpeed, setRotationSpeed] = useState(0.8)
    const controlsRef = useRef()

    // Définition des points de pivot et leurs informations
    const triggerPoints = [
        {
            angle: Math.PI * 0.25, // 45 degrés
            tolerance: 0.3,
            info: {
                title: "Technologies embarquées",
                shortDescription: "Audio computationnel avancé",
                mainFeatures: [
                    "Réduction de bruit active",
                    "Audio spatial",
                    "Bluetooth haute résolution"
                ]
            }
        },
        {
            angle: Math.PI * 0.75, // 135 degrés
            tolerance: 0.3,
            info: {
                title: "Structure premium",
                shortDescription: "Matériaux haut de gamme",
                mainFeatures: [
                    "Aluminium aérospatial",
                    "Conception ultra-légère",
                    "Réglage précis"
                ]
            }
        },
        {
            angle: Math.PI * 1.25, // 225 degrés
            tolerance: 0.3,
            info: {
                title: "Confort acoustique",
                shortDescription: "Isolation et ergonomie",
                mainFeatures: [
                    "Mousse à mémoire de forme",
                    "Cuir premium",
                    "Isolation passive"
                ]
            }
        }
    ]

    // Fonction pour vérifier si on est près d'un point de pivot
    const checkTriggerPoints = (rotation) => {
        const normalizedRotation = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)

        for (let trigger of triggerPoints) {
            const distance = Math.abs(normalizedRotation - trigger.angle)
            const altDistance = Math.abs(normalizedRotation - (trigger.angle + Math.PI * 2))
            const minDistance = Math.min(distance, altDistance)

            if (minDistance <= trigger.tolerance) {
                return trigger
            }
        }
        return null
    }

    // Surveillance de la rotation
    useEffect(() => {
        const interval = setInterval(() => {
            if (controlsRef.current) {
                const azimuthalAngle = controlsRef.current.getAzimuthalAngle()
                setCurrentRotation(azimuthalAngle)

                const activeTrigger = checkTriggerPoints(azimuthalAngle)

                if (activeTrigger && !activeInfo) {
                    const triggerIndex = triggerPoints.findIndex(tp => tp === activeTrigger)
                    setActiveInfo(activeTrigger.info)
                    setActiveTriggerIndex(triggerIndex)
                    setRotationSpeed(0.2) // Ralentir la rotation
                } else if (!activeTrigger && activeInfo) {
                    setActiveInfo(null)
                    setActiveTriggerIndex(-1)
                    setRotationSpeed(0.8) // Vitesse normale
                }
            }
        }, 100)

        return () => clearInterval(interval)
    }, [activeInfo])

    const handleCloseInfo = () => {
        setActiveInfo(null)
        setActiveTriggerIndex(-1)
        setRotationSpeed(0.8)
    }

    return (
        <div style={{
            width: '100%',
            height: '500px',
            background: 'rgba(248, 248, 248, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden'
        }}>
            {!isLoaded && <LoadingSpinner />}

            {/* Instructions pour l'utilisateur */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                color: '#515154',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                fontWeight: '400',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease'
            }}>
                Faites pivoter pour découvrir les détails
            </div>

            {/* Indicateurs de points d'intérêt */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 10,
                alignItems: 'center',
                height: '10px'
            }}>
                {triggerPoints.map((_, index) => {
                    const isActive = activeTriggerIndex === index
                    return (
                        <div
                            key={index}
                            style={{
                                width: isActive ? '10px' : '6px',
                                height: isActive ? '10px' : '6px',
                                borderRadius: '50%',
                                background: '#86868b',
                                transition: 'all 0.3s ease',
                                opacity: isActive ? 0.8 : 0.5
                            }}
                        />
                    )
                })}
            </div>

            <InfoPanel activeInfo={activeInfo} onClose={handleCloseInfo} triggerIndex={activeTriggerIndex} />

            <Canvas
                camera={{
                    position: [0, 0, 8],
                    fov: 45,
                    near: 0.1,
                    far: 1000
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true
                }}
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'grab'
                }}
                shadows={{
                    enabled: true,
                    type: 'soft'
                }}
                onCreated={() => setIsLoaded(true)}
            >
                {/* Éclairage optimisé pour la vue de côté */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    intensity={1.2}
                    position={[8, 8, 5]}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={30}
                    shadow-camera-left={-8}
                    shadow-camera-right={8}
                    shadow-camera-top={8}
                    shadow-camera-bottom={-8}
                />
                <directionalLight
                    intensity={0.6}
                    position={[-5, 3, -3]}
                    color="#ffffff"
                />

                {/* Environnement pour des reflets réalistes */}
                <Environment preset="studio" />

                {/* Contrôles de la souris - rotation uniquement sur l'axe Y */}
                <OrbitControls
                    ref={controlsRef}
                    enablePan={false}
                    enableZoom={false}
                    enableRotate={true}
                    rotateSpeed={rotationSpeed}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                    autoRotate={false}
                />

                <Suspense fallback={null}>
                    <InteractiveHeadphonesModel />
                    {/* Ombres de contact */}
                    <ContactShadows
                        position={[0, -2, 0]}
                        opacity={0.3}
                        scale={6}
                        blur={2}
                        far={3}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default InteractiveHeadphoneViewer 