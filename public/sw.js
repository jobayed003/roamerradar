/* global self, clients */
self.addEventListener('push', (event) => {
  let data = { title: 'RoamerRadar', body: 'You have a new notification', href: '/' };
  try {
    data = { ...data, ...event.data.json() };
  } catch {
    // keep defaults
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      data: { href: data.href || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const href = event.notification.data?.href || '/';
  event.waitUntil(clients.openWindow(href));
});
