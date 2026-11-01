// PolarBoom used to be a web app installed to the home screen, and its service
// worker still serves that old copy from cache to anyone who installed it: a
// missing sw.js (404) leaves the old worker in place for good. A browser that
// checks for an update gets this one instead, which empties the caches,
// unregisters itself and reloads the page, landing on the App Store redirect.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key)
    await self.registration.unregister()
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url)
  })())
})
