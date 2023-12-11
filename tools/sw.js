"use strict";

self.addEventListener("install", async (event) => {
    console.log("SW installed");
    self.skipWaiting();
});

self.addEventListener("activate", async (event) => {
    await clients.claim();
    console.log("SW activated");
});

self.addEventListener('message', async (event) => {
    const allClients = await clients.matchAll({ type: "window" });
    allClients.forEach(client => event.source.id != client.id && client.postMessage(event.data));
});