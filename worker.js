export default {
  async fetch(request, env) {
    // Serve static assets automatically
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response("Impex Studios Online", { status: 200 });
  }
};
