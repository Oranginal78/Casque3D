#!/bin/bash

# 🚀 Script d'Optimisation des Modèles 3D - Casque3D
# Usage: ./optimize-models.sh

set -e  # Arrêter en cas d'erreur

echo "🚀 Démarrage de l'optimisation des modèles 3D..."
echo "📊 Analyse des fichiers existants..."

# Vérifier si les outils sont installés
check_tool() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 n'est pas installé. Installation requise:"
        echo "   npm install -g $2"
        exit 1
    fi
}

echo "🔍 Vérification des outils..."
check_tool "gltf-pipeline" "gltf-pipeline"
check_tool "gltf-transform" "@gltf-transform/cli"

# Créer les dossiers de destination
echo "📁 Création des dossiers..."
mkdir -p public/models/optimized
mkdir -p public/models/backup

# Sauvegarder les modèles originaux
echo "💾 Sauvegarde des modèles originaux..."
if [ ! -f "public/models/backup/.backup_done" ]; then
    cp public/models/*.glb public/models/backup/ 2>/dev/null || true
    touch public/models/backup/.backup_done
    echo "✅ Sauvegarde terminée"
else
    echo "ℹ️ Sauvegarde déjà effectuée"
fi

# Fonction d'optimisation d'un modèle
optimize_model() {
    local input_file="$1"
    local filename=$(basename "$input_file" .glb)
    local temp_file="public/models/optimized/${filename}_temp.glb"
    local output_file="public/models/optimized/${filename}_optimized.glb"
    
    echo "📦 Optimisation de $filename..."
    
    # Obtenir la taille originale
    local original_size=$(stat -f%z "$input_file" 2>/dev/null || stat -c%s "$input_file" 2>/dev/null || echo "0")
    local original_mb=$(echo "scale=2; $original_size / 1024 / 1024" | bc -l 2>/dev/null || echo "0")
    
    echo "   📏 Taille originale: ${original_mb}MB"
    
    # Étape 1: Compression Draco avec gltf-pipeline
    echo "   🗜️ Compression Draco..."
    gltf-pipeline -i "$input_file" -o "$temp_file" \
        --draco.compressionLevel=7 \
        --draco.quantizePositionBits=14 \
        --draco.quantizeNormalBits=10 \
        --draco.quantizeTexcoordBits=12 \
        --draco.quantizeColorBits=8 \
        --draco.quantizeGenericBits=12 \
        --draco.unifiedQuantization=true 2>/dev/null || {
        echo "   ⚠️ Erreur avec Draco, copie du fichier original..."
        cp "$input_file" "$temp_file"
    }
    
    # Étape 2: Optimisations supplémentaires avec gltf-transform
    echo "   ⚡ Optimisations avancées..."
    gltf-transform optimize "$temp_file" "$output_file" \
        --texture-compress webp \
        --texture-resize 1024 \
        --simplify \
        --weld 0.0001 \
        --dedupe 2>/dev/null || {
        echo "   ⚠️ Erreur avec gltf-transform, utilisation du fichier Draco..."
        mv "$temp_file" "$output_file"
    }
    
    # Nettoyer le fichier temporaire
    rm -f "$temp_file"
    
    # Calculer la nouvelle taille et le gain
    if [ -f "$output_file" ]; then
        local new_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null || echo "0")
        local new_mb=$(echo "scale=2; $new_size / 1024 / 1024" | bc -l 2>/dev/null || echo "0")
        local reduction=$(echo "scale=1; (1 - $new_size / $original_size) * 100" | bc -l 2>/dev/null || echo "0")
        
        echo "   ✅ Optimisé: ${new_mb}MB (réduction: ${reduction}%)"
        
        # Remplacer le fichier original si l'optimisation est réussie
        if [ "$new_size" -gt 0 ] && [ "$new_size" -lt "$original_size" ]; then
            mv "$output_file" "$input_file"
            echo "   🔄 Fichier original remplacé"
        else
            echo "   ⚠️ Optimisation non bénéfique, conservation de l'original"
            rm -f "$output_file"
        fi
    else
        echo "   ❌ Échec de l'optimisation pour $filename"
    fi
}

# Optimiser tous les modèles GLB
echo ""
echo "🔄 Optimisation des modèles..."
total_original=0
total_optimized=0

for model in public/models/*.glb; do
    if [ -f "$model" ] && [[ ! "$model" =~ optimized ]]; then
        # Calculer la taille avant optimisation
        size_before=$(stat -f%z "$model" 2>/dev/null || stat -c%s "$model" 2>/dev/null || echo "0")
        total_original=$((total_original + size_before))
        
        optimize_model "$model"
        
        # Calculer la taille après optimisation
        size_after=$(stat -f%z "$model" 2>/dev/null || stat -c%s "$model" 2>/dev/null || echo "0")
        total_optimized=$((total_optimized + size_after))
    fi
done

# Nettoyer le dossier optimized s'il est vide
rmdir public/models/optimized 2>/dev/null || true

# Résumé final
echo ""
echo "📊 RÉSUMÉ DE L'OPTIMISATION"
echo "=================================="

if [ "$total_original" -gt 0 ]; then
    original_mb=$(echo "scale=2; $total_original / 1024 / 1024" | bc -l 2>/dev/null || echo "0")
    optimized_mb=$(echo "scale=2; $total_optimized / 1024 / 1024" | bc -l 2>/dev/null || echo "0")
    total_reduction=$(echo "scale=1; (1 - $total_optimized / $total_original) * 100" | bc -l 2>/dev/null || echo "0")
    
    echo "📏 Taille totale avant: ${original_mb}MB"
    echo "📏 Taille totale après: ${optimized_mb}MB"
    echo "📉 Réduction totale: ${total_reduction}%"
    
    # Recommandations basées sur les résultats
    if (( $(echo "$total_reduction > 50" | bc -l 2>/dev/null || echo "0") )); then
        echo "🎉 Excellente optimisation! Gain significatif de performance attendu."
    elif (( $(echo "$total_reduction > 25" | bc -l 2>/dev/null || echo "0") )); then
        echo "✅ Bonne optimisation! Amélioration notable des temps de chargement."
    elif (( $(echo "$total_reduction > 10" | bc -l 2>/dev/null || echo "0") )); then
        echo "👍 Optimisation modérée. Considérez des optimisations manuelles supplémentaires."
    else
        echo "⚠️ Optimisation limitée. Vérifiez la qualité des modèles sources."
    fi
else
    echo "❌ Aucun modèle trouvé ou erreur de calcul"
fi

echo ""
echo "💡 PROCHAINES ÉTAPES:"
echo "1. Testez le chargement avec: npm run dev"
echo "2. Activez le diagnostic avec: Ctrl+D"
echo "3. Vérifiez les temps de chargement < 3s"
echo "4. Si besoin, consultez OPTIMIZATION_GUIDE.md"
echo ""
echo "🔄 Pour restaurer les originaux: cp public/models/backup/*.glb public/models/"
echo ""
echo "✅ Optimisation terminée!" 