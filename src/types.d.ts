export interface AnilistResponse {
	data?: { Page?: { activities?: AnilistActivity[] } };
}

export interface AnilistActivity {
	status?: string;
	progress?: string;
	createdAt: number;
	media: {
		siteUrl: string;
		coverImage: { large: string };
		title: { native: string };
	};
}

export interface HardcoverResponse {
	data: { me: { user_books: HardcoverActivity[] }[] };
}

export interface HardcoverActivity {
	updated_at: string;
	user_book_reads: { progress_pages: number }[];
	user_book_status: { status: string };
	book: {
		title: string;
		slug: string;
		editions: { image: { url: string } }[];
	};
}

/**
 * shared type for either a hardcover or anilist book/manga/ln/whatever
 */
export interface Activity {
	url: string;
	title: string;
	image?: string;
	status?: string;
	progress?: string;
	updatedAt: number;
}

export interface ListenBrainzResponse {
	payload: { listens: Listen[] };
}

export interface Listen {
	inserted_at: number;
	listened_at: number;
	recording_msid: string;
	track_metadata: {
		additional_info: {
			artist_mbids: string[];
			artist_names: string[];
			duration_ms: number;
			recording_mbid: string;
			recording_msid: string;
			release_group_mbid: string;
			release_mbid: string;
			tracknumber: number;
		};
		artist_name: string;
		mbid_mapping: {
			artist_mbids: string[];
			artists: {
				artist_credit_name: string;
				artist_mbid: string;
				join_phrase: string;
			}[];
			caa_id: number;
			caa_release_mbid: string;
			recording_mbid: string;
			recording_name: string;
			release_group_mbid: string;
			release_mbid: string;
		};
		release_name: string;
		track_name: string;
	};
	user_name: string;
}
