export interface FMTrack {
	name: string;
	url: string;
	artist: {
		name: string;
	};
	image: [
		{ size: "small"; "#text": string },
		{ size: "medium"; "#text": string },
		{ size: "large"; "#text": string },
		{ size: "extralarge"; "#text": string },
	];
}

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
