export default {
  async fetch(request, env, ctx) {
    // URL del flujo HTTP original
    const targetUrl = "http://40.160.24.52/THE_COWBOY_CHANNEL/index.m3u8";

    // Petición al origen HTTP
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": request.headers.get("User-Agent") || "Mozilla/5.0"
      }
    });

    // Retorna la respuesta permitiendo peticiones desde tu web (CORS)
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Access-Control-Allow-Origin", "*");
    newHeaders.set("Content-Type", "application/x-mpegURL");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }
};
                                 
