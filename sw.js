/* Offline cache. Bump VERSION on every release so students get fresh files. */
const VERSION="bio20-final-1.5";
const FILES=["./","index.html","diagrams.html","manifest.webmanifest","fonts/Carlito-Regular.woff2","fonts/Carlito-Bold.woff2","fonts/Carlito-Italic.woff2","lib/jspdf.umd.min.js","fonts/Carlito-Regular.ttf","fonts/Carlito-Bold.ttf","fonts/Carlito-Italic.ttf"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(VERSION).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
