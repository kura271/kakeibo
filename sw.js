// わが家の家計簿：オフラインで開くための仕組み（家計のデータはここを通りません）
const VER = 'kakeibo-v1.11';
const APP = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/icon-180.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // アプリ本体：まずネットから最新を取り、つながらなければ保存しておいた分で開く
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VER).then(x => x.put('./index.html', c)); return r; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // 自分のサイトのファイル：保存分を優先
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(h => h || fetch(req)));
    return;
  }
  // 文字認識の部品（jsdelivr）：一度読んだら保存しておく
  if (url.hostname === 'cdn.jsdelivr.net') {
    e.respondWith(caches.open(VER + '-ocr').then(c => c.match(req).then(h => h || fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }))));
  }
});
