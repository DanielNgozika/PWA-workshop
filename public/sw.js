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
	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			return cachedResponse || fetch(event.request);
		})
	)
);

const cacheName = "cache-v1";
const toBePrecached = ["/", "index.html", "styles/main.css"];

//Handling push notification
self.addEventListener("push", event => {
	if (event.data.text == "new DM") {
		event.waitUntil(
			caches.open("cache-v1").then(cache => {
				return fetch("/inbox.json").then(res => {
					cache.put("/inbox.json", res.clone());
					return res.json()
				});
			}).then(showDMNotification)
		);
	}
});

const showEmailNotification = DMs => {
	registration.showNotification("New DM", {
		body: `From ${DMs[0].from.name}`,
		tag: "new tweet"
	});
}

self.addEventListener("notificationclick", event => {
	if (event.notification.tag == "new DM") {
		//Assuming that resources needed to render 
		//inbox have already been cached
		// (during install event handling, maybe)

		new WindowClient('/inbox')
	}
})