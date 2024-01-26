import path from 'path';

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    root: 'src',
    build: {
        outDir: '../dist',
    },
    server: {
        port: 3001,
        open: true,
    },
    plugins: [react(), svgr()],
    envDir: '../',
    resolve: {
        alias: {
            '@images': path.resolve(__dirname, 'src/images'),
            '@styles': path.resolve(__dirname, 'src/shared/styles'),
            '@api': path.resolve(__dirname, 'src/shared/api'),
            '@components': path.resolve(__dirname, 'src/shared/components'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@models': path.resolve(__dirname, 'src/shared/models'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@store': path.resolve(__dirname, 'src/shared/store'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@src': path.resolve(__dirname, 'src'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
    },
});
