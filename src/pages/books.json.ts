export const prerender = false;

import type { APIRoute } from "astro";
import { HARDCOVER_TOKEN } from "astro:env/server";
import gql from "graphql-tag";

import { ANILIST_USER } from "~/constants";
import type { AnilistActivity, AnilistResponse, Book, HardcoverActivity, HardcoverResponse } from "~/types";

const CACHE_AGE = 20_000; // 24h / 5000 requests = 17s + 3s to be safe

let cachedBooks: Book[] = [];
let cacheTime = Date.now();

// MARK: - fetchers
async function fetchFromHardcover(): Promise<HardcoverActivity[]> {
	const query = gql`
		query {
			me {
				user_books(
					order_by: { updated_at: desc }
					limit: 5
				) {
					updated_at
					user_book_reads(order_by: { id: desc }, limit: 1) {
						progress_pages
					}
					user_book_status { status }
					book {
						title
						slug
						editions(
							where: {reading_format_id: {_eq: 1}, image: {url: {_is_null: false}}}
							limit: 1
							order_by: {users_count: desc}
						) {
							image { url }
						}
					}
				}
			}
		}
	`.loc!.source.body;
	const response = await fetch("https://api.hardcover.app/v1/graphql", {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${HARDCOVER_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});

	if (!response.ok) {
		throw new Error(`hardcover error: ${response.status}: ${response.statusText}`);
	}

	return response.json().then((json: HardcoverResponse) => json.data.me[0].user_books);
}

async function fetchFromAnilist(): Promise<AnilistActivity[]> {
	const query = gql`
		query ($userId: Int) {
			Page(perPage: 5) {
				activities(
					userId: $userId
					type: MEDIA_LIST
					sort: ID_DESC
				) {
					... on ListActivity {
						media {
							siteUrl
							title { romaji }
							coverImage { extraLarge }
							type
						}
						status
						progress
						createdAt
					}
				}
			}
		}
	`.loc!.source.body;
	const response = await fetch("https://graphql.anilist.co/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query,
			variables: { userId: ANILIST_USER },
		}),
	});

	if (!response.ok) {
		throw new Error(`anilist error: ${response.status}: ${response.statusText}`);
	}

	return response.json().then((json: AnilistResponse) => json.data!.Page!.activities!);
}

// MARK: - converters
function convertHardcoverActivity(original: HardcoverActivity): Book {
	// replace status phrases to make them consistent w anilist phrases
	const status = original.user_book_status.status;
	const statusFormatted = status == "Read"
		? "Completed"
		: status.replace("Currently Reading", "Read Page").replace("Want to Read", "Plans To Read");
	// only include progress for page reads
	const page = original.user_book_reads.at(0)?.progress_pages;
	const progress = statusFormatted == "Read Page" ? `${page}` : undefined;
	return {
		url: `https://hardcover.app/books/${original.book.slug}`,
		title: original.book.title,
		image: original.book.editions.at(0)?.image?.url,
		status: statusFormatted,
		progress,
		updatedAt: Date.parse(original.updated_at),
	};
}

function convertAnilistActivity(original: AnilistActivity): Book {
	return {
		url: original.media.siteUrl,
		title: original.media.title.romaji,
		image: original.media.coverImage.extraLarge,
		status: original.status,
		progress: original.progress,
		updatedAt: original.createdAt * 1000,
	};
}

// MARK: - endpoint
export const GET = (async () => {
	if (cachedBooks.length == 0 || (Date.now() - cacheTime) > CACHE_AGE) {
		console.log("caching response");
		try {
			const [hardcoverActivities, anilistActivities] = await Promise.all([
				fetchFromHardcover(),
				fetchFromAnilist(),
			]);
			const books = [
				...hardcoverActivities.map(convertHardcoverActivity),
				...anilistActivities.map(convertAnilistActivity),
			].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 5);

			cachedBooks = books;
			cacheTime = Date.now();
		} catch (error) {
			console.error(error);
		}
	}

	return new Response(JSON.stringify(cachedBooks), {
		status: 200,
		statusText: "OK",
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "max-age=3600",
		},
	});
}) satisfies APIRoute;
