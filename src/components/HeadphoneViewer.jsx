import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useModelPreloader } from '../hooks/useModelPreloader'

// Préchargement des modèles prioritaires pour éviter les rechargements
useGLTF.preload('/models/headphones.glb')
useGLTF.preload('/models/headphonesblack.glb')

function HeadphonesModel({ rotationY }) {
    const group = useRef()
    const [modelReady, setModelReady] = useState(false)
    const modelUrl = '/models/headphones.glb'

    // Utiliser useGLTF correctement (sans try-catch autour du hook)
    const { scene } = useGLTF(modelUrl)

    if (!scene) {
        console.log('🎧 HeadphoneViewer: Modèle ou scène non disponible')
        return null
    }

    // Clonage du modèle pour éviter les conflits
    const clonedScene = scene.clone()

    useEffect(() => {
        if (!scene || !scene.children.length) {
            console.log('🎧 HeadphoneViewer: Scène vide, attente...')
            return
        }

        console.log('🎧 HeadphoneViewer: Configuration du modèle pour l\'affichage...')
        let meshCount = 0;

        // Optimisation des matériaux pour l'affichage
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                meshCount++;
                child.castShadow = true
                child.receiveShadow = true
                // Améliore la qualité visuelle
                if (child.material) {
                    child.material.envMapIntensity = 1
                    // S'assurer que le matériau est visible
                    if (child.material.transparent) {
                        child.material.opacity = Math.max(child.material.opacity, 0.9)
                    }
                }
            }
        })

        if (meshCount > 0) {
            console.log(`🎧 HeadphoneViewer: Modèle prêt pour l'affichage - ${meshCount} mesh`)
            setModelReady(true)
        }

    }, [clonedScene, scene])

    if (!modelReady) {
        return null
    }

    return (
        <group ref={group} rotation={[0.1, rotationY, 0]} position={[0, -3, 0]} scale={[2, 2, 2]}>
            <primitive object={clonedScene} dispose={null} />
        </group>
    )
}

// Composant simplifié pour le modèle noir (juste pour le préchargement)
function HeadphonesBlackModel() {
    const modelUrl = '/models/headphonesblack.glb'

    // Charger le modèle correctement (sans try-catch autour du hook)
    const { scene } = useGLTF(modelUrl)

    // Log une seule fois quand le modèle est chargé
    useEffect(() => {
        if (scene) {
            console.log('🎧 HeadphonesBlackModel: Modèle noir préchargé')
        }
    }, [scene])

    // Ne rien rendre visuellement
    return null
}

function LoadingSpinner() {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#666',
            fontSize: '1.2rem',
            fontWeight: 'bold'
        }}>
            Chargement du modèle 3D...
        </div>
    )
}

const HeadphoneViewer = () => {
    // Initialiser avec l'angle de début de scroll (position face)
    const [rotationY, setRotationY] = useState(-Math.PI / 2)
    const [isLoaded, setIsLoaded] = useState(false)
    const { isConfigured } = useModelPreloader()

    // Force refresh du canvas quand les modèles sont configurés
    useEffect(() => {
        if (isConfigured) {
            console.log('🔄 HeadphoneViewer: Force refresh du canvas (modèles configurés)');
            // Refresh immédiat
            window.dispatchEvent(new Event('resize'));

            // Refresh de sécurité après un court délai
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
                console.log('🔄 HeadphoneViewer: Refresh de sécurité effectué');
            }, 200);
        }
    }, [isConfigured]);

    // Force refresh quand le canvas est créé
    useEffect(() => {
        if (isLoaded && isConfigured) {
            console.log('🔄 HeadphoneViewer: Force refresh du canvas (canvas créé)');
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        }
    }, [isLoaded, isConfigured]);

    // Rotation via scroll optimisée
    useEffect(() => {
        let ticking = false

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollRange = 800
                    const scrollPos = Math.min(window.scrollY, scrollRange)
                    const minAngle = -Math.PI / 2  // Position face (début)
                    const maxAngle = Math.PI / 2   // Position profil (fin)
                    const angle = minAngle + (maxAngle - minAngle) * (scrollPos / scrollRange)
                    setRotationY(angle)
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Ne pas afficher le viewer si les modèles ne sont pas configurés
    if (!isConfigured) {
        console.log('🎧 HeadphoneViewer: Modèles pas encore configurés')
        return <LoadingSpinner />
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            {!isLoaded && <LoadingSpinner />}
            <Canvas
                camera={{
                    position: [0, 0, 5],
                    fov: 50,
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
                    display: 'block'
                }}
                shadows={{
                    enabled: true,
                    type: 'soft'
                }}
                onCreated={() => {
                    console.log('🎧 HeadphoneViewer: Canvas créé')
                    setIsLoaded(true)

                    // Force refresh immédiat après création du canvas
                    setTimeout(() => {
                        console.log('🔄 HeadphoneViewer: Force refresh après création canvas');
                        window.dispatchEvent(new Event('resize'));
                    }, 50);
                }}
            >
                {/* Éclairage amélioré */}
                <ambientLight intensity={0.4} />
                <directionalLight
                    intensity={1}
                    position={[10, 10, 5]}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <directionalLight
                    intensity={0.5}
                    position={[-5, 5, -5]}
                    color="#ffffff"
                />

                {/* Environnement pour des reflets réalistes */}
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <HeadphonesModel rotationY={rotationY} />
                    {/* Configuration du modèle noir en arrière-plan */}
                    <HeadphonesBlackModel />
                    {/* Ombres de contact pour un meilleur ancrage visuel */}
                    <ContactShadows
                        position={[0, -1.5, 0]}
                        opacity={0.4}
                        scale={8}
                        blur={2.5}
                        far={4}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default HeadphoneViewer 