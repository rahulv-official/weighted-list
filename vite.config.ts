import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'WeightedList',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        outDir: './dist',
    },
    test: {
        globals: true,
        environment: 'node',
        exclude: [...configDefaults.exclude, 'dist/**']
    }
});
