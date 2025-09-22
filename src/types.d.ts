export interface AudioscrobblerTrack {
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
