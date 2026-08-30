export const prerender = false;

import type { APIRoute } from "astro";

import { LISTENBRAINZ_USER } from "~/constants.ts";
import type { Listen, ListenBrainzResponse } from "~/types";

const CACHE_AGE = 20_000;

let cachedListens: Listen[] = [];
let cacheTime = Date.now();
let isCaching = false;

async function refreshListens() {
	if (isCaching) return;
	isCaching = true;
	try {
		const response = await fetch(`https://api.listenbrainz.org/1/user/${LISTENBRAINZ_USER}/listens`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});
		const json: ListenBrainzResponse = await response.json();
		cachedListens = json.payload.listens;
		cacheTime = Date.now();
	} catch (error) {
		console.error(error);
	}
	isCaching = false;
}

export const GET = (async () => {
	if (!isCaching) {
		if (cachedListens.length == 0) {
			console.log("caching listens");
			await refreshListens();
		} else if ((Date.now() - cacheTime) > CACHE_AGE) {
			console.log("caching listens in background");
			refreshListens();
		}
	}
	return new Response(JSON.stringify(cachedListens), {
		status: 200,
		statusText: "OK",
		headers: { "Content-Type": "application/json" },
	});
}) satisfies APIRoute;
