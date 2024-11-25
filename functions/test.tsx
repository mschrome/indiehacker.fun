export function onRequest(context) {
  return new Response("Hello, world!!!")
}

export function onRequestGet(context) {
  return new Response("GET, world!!!")
}