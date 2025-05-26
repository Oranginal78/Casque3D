import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/',
    plugins: [react()],
    assetsInclude: ['**/*.glb', '**/*.gltf'],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                manualChunks: undefined,
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.')
                    const ext = info[info.length - 1]
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
