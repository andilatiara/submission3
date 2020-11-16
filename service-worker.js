importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);}
else {
    console.log(`Workbox gagal dimuat`);}

workbox.precaching.precacheAndRoute([{
    url: "/", revision: "1" },{
    url: "/manifest.json", revision: "1" },{
    url: "/css/materialize.min.css", revision: "1" },{
    url: "/js/materialize.min.js", revision: "1" },{
    url: "/js/api.js", revision: "1" },{
    url: "/js/db.js", revision: "1" },{
    url: "/js/idb.js", revision: "1" },{
    url: "/js/helpers.js", revision: "1" },{
    url: "/js/script.js", revision: "1" },{
    url: "/js/nav.js", revision: "1" },{
    url: "/js/jadwalliga.js", revision: "1" },{
    url: "/js/klasmenliga.js", revision: "1" },{
    url: "/js/grupliga.js", revision: "1" },{
    url: "/nav.html", revision: "1" },{
    url: "/index.html", revision: "1" },{
    url: "/pages/favorites.html", revision: "1" },{
    url: "/pages/home.html", revision: "1" },{
    url: "/pages/matches.html", revision: "1" },{
    url: "/detailjadwalliga.html", revision: "1" },{
    url: "/detailpemainliga.html", revision: "1" },{
    url: "/detailgrupliga.html", revision: "1" },{
    url: "/icon.png", revision: "1" },{
    url: "/notif.jpg", revision: "1" },{
    url: "/icon-512.jpg", revision: "1" },
],{
  // Ignore all URL parameters.
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60,  }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'cache_apifootball',
        plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365, }),
          new workbox.cacheableResponse.Plugin({
              statuses: [200], }),
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "cache_pages"
    })
);
// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    new RegExp('/css/materialize.min.css'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('/css/main.css'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('.*\.png'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    workbox.strategies.cacheFirst()
);


self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text(); }
    else {
        body = 'Push message no payload'; }
    var options = {
        body: body,
        icon: '/notif.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        } };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
