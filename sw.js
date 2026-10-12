// Çevrimdışı çalışma: uygulama dosyalarını önbelleğe alır.
// Yeni sürüm yüklediğinde VERSION'ı artır; uygulama bir sonraki açılışta güncellenir.
const VERSION='koc-1.1.0';
const FILES=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','fonts/barlow-condensed-latin-600-normal.woff2','fonts/barlow-condensed-latin-700-normal.woff2','fonts/barlow-condensed-latin-ext-600-normal.woff2','fonts/barlow-condensed-latin-ext-700-normal.woff2','fonts/source-sans-3-latin-400-normal.woff2','fonts/source-sans-3-latin-600-normal.woff2','fonts/source-sans-3-latin-ext-400-normal.woff2','fonts/source-sans-3-latin-ext-600-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 // Sayfa: önce internetten dene (güncelleme gelsin), yoksa önbellekten aç
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put('index.html',c));return res;}).catch(()=>caches.match('index.html')));return;}
 e.respondWith(caches.match(r).then(m=>m||fetch(r)));});
