import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
	trailingSlash: "never",
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
});
