export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      let apiUrl = url.searchParams.get("apiurl");
      if (!apiUrl) {
        return new Response(JSON.stringify({ error: "Missing apiurl parameter" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }

      const newRequest = new Request(apiUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });

      const response = await fetch(newRequest);
      const newResponse = new Response(response.body, response);
      Object.keys(corsHeaders).forEach((key) => {
        newResponse.headers.set(key, corsHeaders[key]);
      });
      newResponse.headers.set("Vary", "Origin");
      return newResponse;
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  }
};