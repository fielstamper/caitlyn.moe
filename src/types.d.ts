export interface AnilistResponse {
	data?: { Page?: { activities?: AnilistActivity[] } };
}

export interface AnilistActivity {
	status?: string;
	progress?: string;
	createdAt: number;
	media: {
		siteUrl: string;
		coverImage: { extraLarge: string };
		title: { romaji: string };
	};
}

export interface HardcoverResponse {
	data: { me: { user_books: HardcoverBook[] }[] };
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
export interface Book {
	url: string;
	title: string;
	image?: string;
	status?: string;
	progress?: string;
	updatedAt: number;
}
