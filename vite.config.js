import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.tsx', 'resources/css/app.css'],
            refresh: true,
        }),
        react(),
        tsconfigPaths()
    ],
    build: {
        outDir: 'public/build',
        manifest: true,
        rollupOptions: {
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
        },
    },
    define: {
        global: 'window'
    }
});
