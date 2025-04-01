const staticPwaADS = "cache_web_app_ads_upf"
const assets = [
 "index.html",
 "Cardapio.html",
 "reserva.html",
 "sobre_nos.html",
 "trabalhe_conosco.html",
 "manifest.json",
 "https://cdn.midjourney.com/8919d838-7531-440f-9d7c-0829970c6dcb/0_2.png",
 "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg",
 "./style/reserva/5a902db97f96951c82922874.png",
 "https://cdn.midjourney.com/9b0b48a3-5856-4d8c-b5f7-8f3a8a1a1f9b/0_1.png",
 "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
 "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
 "icons/icon-512x512.png",
 "icons/icon-384x384.png",
 "icons/icon-256x256.png",
 "icons/icon-192x192.png",
 "icons/icon-152x152.png",
 "icons/icon-144x144.png",
 "icons/icon-96x96.png",
 "icons/icon-72x72.png",
 "icons/icon-48x48.png",
]
self.addEventListener("install", installEvent => {
 installEvent.waitUntil(
 caches.open(staticPwaADS).then(cache => {
 cache.addAll(assets)
 })
 )
})
self.addEventListener("fetch", fetchEvent => {
 fetchEvent.respondWith(
 caches.match(fetchEvent.request).then(res => {
 return res || fetch(fetchEvent.request)
 })
 )
 })