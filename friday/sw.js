/* FRIDAY service worker.
 *
 * Two jobs: make the app open instantly and survive a bad connection, and
 * never serve a stale answer. So the page itself is network-first (a cached
 * dashboard showing yesterday's numbers would be worse than a slow one),
 * while the shell — icons, her recorded voice — is cache-first, since those
 * bytes never change without a new version below.
 *
 * Nothing under /api/ is cached here. Those are live answers and a cached
 * reply would be a lie; the Worker does its own caching for the voice.
 */
const VERSION = 'friday-v4';
const SHELL = [
  './',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './voice/greeting.mp3',
  './voice/listening.mp3',
  './voice/approved.mp3',
  './voice/denied.mp3',
  './voice/voicecheck.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    /* One bad URL must not fail the whole install, so they go in one at a
       time and a miss is tolerated. */
    await Promise.all(SHELL.map(u => cache.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;     // connectors, CDNs: untouched
  if (url.pathname.startsWith('/api/')) return;        // live answers, never cached

  /* The page: fresh if possible, cached if the network is gone. */
  if (req.mode === 'navigate'){
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(VERSION);
        cache.put('./', fresh.clone());
        return fresh;
      } catch (_){
        return (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  /* Everything else: cached first, refreshed in the background. */
  e.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const fresh = await fetch(req);
      if (fresh.ok){
        const cache = await caches.open(VERSION);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (_){
      return hit || Response.error();
    }
  })());
});
