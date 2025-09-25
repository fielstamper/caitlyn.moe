import { defineConfig } from 'astro/config';

export default defineConfig({
	trailingSlash: "never",
	image: {
		domains: ["github.com", "codeberg.org", "x.com", "avatars.githubusercontent.com"]
	},

});


