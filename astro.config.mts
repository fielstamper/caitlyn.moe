import cloudflare from "@astrojs/cloudflare";
import { defineConfig, envField, fontProviders } from "astro/config";

export default defineConfig({
	trailingSlash: "never",
	output: "server",
	image: {
		domains: ["github.com", "codeberg.org", "x.com", "avatars.githubusercontent.com"],
	},
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: "DM Sans",
			cssVariable: "--font-dm-sans",
		},
		{
			provider: fontProviders.fontsource(),
			name: "Nunito",
			cssVariable: "--font-nunito",
		},
	],
	env: {
		schema: {
			HARDCOVER_TOKEN: envField.string({ context: "server", access: "secret" }),
		},
	},
	site: "https://caitlyn.moe/",
	adapter: cloudflare({ imageService: "compile" }),
});
