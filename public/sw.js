// import { isMainThread } from "worker_threads";

self.addEventListener("install", event => {
	console.log("Install event");
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll(toBePrecached);
		})
	);
});

self.addEventListener("activate", event => console.log("Activate event"));

//The service worker sits between fetch requests and the server and serves
// the cached resources searched for if available or lets the request
// continue to the server if not.
self.addEventListener("fetch", event =>
	event.respondWIth(
		caches.match(event.request).then(cachedResponse => {
			return cachedResponse || fetch(event.request);
		})
	)
);

const cacheName = "cache-v1";
const toBePrecached = ["/", "index.html", "styles/isMainThread.css"];
