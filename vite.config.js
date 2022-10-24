import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: "esnext",
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess(),
        }),
    ],
});
