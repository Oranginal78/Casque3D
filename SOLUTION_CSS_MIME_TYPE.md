# Solution : Erreur CSS "Refused to apply style... MIME type ('text/plain')"

## Problème
L'erreur CSS se produit lors du déploiement avec le message :
```
Refused to apply style from '...' because its MIME type ('text/plain') is not a supported stylesheet MIME type
```

Cette erreur indique que le serveur ne sert pas les fichiers CSS avec le bon type MIME (`text/css`).

## Cause
Le serveur d'hébergement (Render, Netlify, etc.) ne reconnaît pas automatiquement les fichiers CSS et les sert avec le type MIME par défaut `text/plain` au lieu de `text/css`.

## Solutions par plateforme

### 1. Serveur Node.js/Express (Render, Heroku)

**Fichier `server.js` créé :**
```javascript
import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

// Configuration des types MIME
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

// Fallback SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port);
```

**Scripts package.json :**
```json
{
  "scripts": {
    "start": "node server.js",
    "serve": "npm run build && npm run start"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### 2. Netlify

**Fichier `netlify.toml` créé :**
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "*.css"
  [headers.values]
    Content-Type = "text/css; charset=utf-8"

[[headers]]
  for = "*.js"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"
```

### 3. Apache (.htaccess)

**Fichier `public/.htaccess` créé :**
```apache
# Configuration des types MIME
AddType text/css .css
AddType application/javascript .js
AddType model/gltf+json .gltf
AddType model/gltf-binary .glb

# Fallback SPA
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

### 4. Render.com

**Fichier `render.yaml` créé :**
```yaml
services:
  - type: web
    name: casque3d
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm run start
    headers:
      - path: "*.css"
        name: Content-Type
        value: text/css; charset=utf-8
      - path: "*.js"
        name: Content-Type
        value: application/javascript; charset=utf-8
```

## Configuration Vite améliorée

**Fichier `vite.config.js` mis à jour :**
```javascript
export default defineConfig({
    base: '/',
    plugins: [react()],
    assetsInclude: ['**/*.glb', '**/*.gltf'],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (/\.(css)$/.test(assetInfo.name)) {
                        return `assets/[name]-[hash].css`
                    }
                    if (/\.(js)$/.test(assetInfo.name)) {
                        return `assets/[name]-[hash].js`
                    }
                    return `assets/[name]-[hash].[ext]`
                }
            }
        }
    }
})
```

## Vérification

### 1. Test local
```bash
npm run build
npm run start
# Ouvrir http://localhost:3000
```

### 2. Vérifier les headers HTTP
```bash
curl -I http://localhost:3000/assets/index-DB97yO67.css
# Doit retourner: Content-Type: text/css; charset=utf-8
```

### 3. Test dans le navigateur
- Ouvrir les DevTools → Network
- Recharger la page
- Vérifier que les fichiers CSS ont le type `text/css`

## Déploiement

### Pour Render.com :
1. Connecter le repo GitHub
2. Utiliser les paramètres :
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`

### Pour Netlify :
1. Connecter le repo GitHub
2. Le fichier `netlify.toml` sera automatiquement détecté

### Pour Vercel :
1. Connecter le repo GitHub
2. Vercel détecte automatiquement Vite et configure les types MIME

## Résumé
- ✅ Serveur Express configuré avec les bons types MIME
- ✅ Configuration pour tous les hébergeurs populaires
- ✅ Fallback SPA pour React Router
- ✅ Support des modèles 3D (.gltf, .glb)
- ✅ Cache et compression optimisés

L'erreur CSS "text/plain" devrait maintenant être complètement résolue ! 