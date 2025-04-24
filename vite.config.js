import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import EnvironmentPlugin from 'vite-plugin-environment'; // Here we import the plugin that expose env variable when vite bundle up the app

export default defineConfig({
    build: {
        target: 'modules',
        outDir: 'dist',
        assetsDir: '.',
        minify: true,
        sourcemap:  'source-map',
        rollupOptions: {
            input: './src/widget.js',
            output: {
                entryFileNames: 'app.js',
                format: 'amd',
            },
        },
    },
    plugins: [
        vue(),
        EnvironmentPlugin('all', ''),
    ],
});
