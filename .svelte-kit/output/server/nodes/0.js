

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "prerender": true
};
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.D6AgBGDI.js","_app/immutable/chunks/DwsMzhH_.js","_app/immutable/chunks/CzhO23HD.js"];
export const stylesheets = [];
export const fonts = [];
