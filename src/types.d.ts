export interface AnilistActivity {
	status: string;
	progress: string;
	media: {
		siteUrl: string;
		coverImage: {
			extraLarge: string;
		};
		title: {
			romaji: string;
		};
	};
}
