import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Configuration des types MIME
express.static.mime.define({
    'text/css': ['css'],
    'application/javascript': ['js'],
    'application/json': ['json'],
    'model/gltf+json': ['gltf'],
    'model/gltf-binary': ['glb']
});

// Servir les fichiers statiques depuis le dossier dist
app.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css; charset=utf-8');
        } else if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (filePath.endsWith('.gltf')) {
            res.setHeader('Content-Type', 'model/gltf+json');
        } else if (filePath.endsWith('.glb')) {
            res.setHeader('Content-Type', 'model/gltf-binary');
        }
    }
}));

// Fallback pour SPA - toutes les routes renvoient index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur le port ${port}`);
    console.log(`📱 Application disponible sur http://localhost:${port}`);
    console.log(`🎯 Types MIME configurés pour CSS, JS et modèles 3D`);
}); 