// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    image: {
        domains: ["github.com", "codeberg.org", "x.com", "avatars.githubusercontent.com"]
    }
});
