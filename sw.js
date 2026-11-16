// 모양 놀이터 오프라인 저장 (한 번 열면 인터넷 없이도 실행)
const VER = "shape-v2";
const FILES = ["./", "index.html", "lines.json", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon.png", "audio/intro.mp3", "audio/find_intro.mp3", "audio/sort_intro.mp3", "audio/wrong1.mp3", "audio/wrong2.mp3", "audio/wrong3.mp3", "audio/good1.mp3", "audio/good2.mp3", "audio/good3.mp3", "audio/good4.mp3", "audio/end.mp3", "audio/feat_box.mp3", "audio/feat_cyl.mp3", "audio/feat_ball.mp3", "audio/name_box.mp3", "audio/find_box.mp3", "audio/q_gift.mp3", "audio/a_gift.mp3", "audio/q_dice.mp3", "audio/a_dice.mp3", "audio/q_parcel.mp3", "audio/a_parcel.mp3", "audio/q_juice.mp3", "audio/a_juice.mp3", "audio/q_brick.mp3", "audio/a_brick.mp3", "audio/q_book.mp3", "audio/a_book.mp3", "audio/q_ice.mp3", "audio/a_ice.mp3", "audio/name_cyl.mp3", "audio/find_cyl.mp3", "audio/q_can.mp3", "audio/a_can.mp3", "audio/q_tissue.mp3", "audio/a_tissue.mp3", "audio/q_drum.mp3", "audio/a_drum.mp3", "audio/q_candle.mp3", "audio/a_candle.mp3", "audio/q_battery.mp3", "audio/a_battery.mp3", "audio/q_log.mp3", "audio/a_log.mp3", "audio/name_ball.mp3", "audio/find_ball.mp3", "audio/q_soccer.mp3", "audio/a_soccer.mp3", "audio/q_basket.mp3", "audio/a_basket.mp3", "audio/q_orange.mp3", "audio/a_orange.mp3", "audio/q_tennis.mp3", "audio/a_tennis.mp3", "audio/q_baseball.mp3", "audio/a_baseball.mp3", "audio/q_marble.mp3", "audio/a_marble.mp3"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const font = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (url.origin !== location.origin && !font) return;
  // 화면(html)은 새 버전을 먼저 시도, 나머지는 저장본 우선
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VER).then(x => x.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(VER).then(x => x.put(e.request, c)); }
    return r;
  })));
});
