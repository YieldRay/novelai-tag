import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import sveltePreprocess from "svelte-preprocess";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte({
            preprocess: sveltePreprocess(),
        }),
        VitePWA({
            includeAssets: ["favicon-32x32.png", "favicon-16x16.png", "apple-touch-icon.png", "safari-pinned-tab.svg"],
            manifest: {
                name: pkg.description,
                short_name: pkg.name,
                description: pkg.description,
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
                start_url: "/",
                registerType: "autoUpdate",
            },
        }),
    ],
});
