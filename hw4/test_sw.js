// 定义要缓存的文件和资源
//这段代码首先定义了要缓存的文件和资源列表，然后在安装事件中打开缓存并将这些资源添加到其中。
//
//接下来，当 Service Worker 拦截到网络请求时，它会首先检查缓存中是否存在该请求的响应。
//如果缓存中有响应，它会直接返回缓存中的响应，
//否则它会使用 fetch API 发起网络请求，并将响应添加到缓存中以备将来使用。


const cacheName = 'my-site-cache';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

// 安装 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 拦截网络请求并使用缓存响应
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有该请求的响应，直接返回
        if (response) {
          return response;
        }

        // 如果缓存中没有响应，则发起网络请求，并将响应添加到缓存中
        return fetch(event.request)
          .then(response => {
            // 检查响应是否有效，并在有效时将其添加到缓存中
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(cacheName)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});
