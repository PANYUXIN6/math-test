

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.C7UZc2P3.js","_app/immutable/chunks/Cp7w3v0t.js","_app/immutable/chunks/4Lpfm1mz.js"];
export const stylesheets = [];
export const fonts = [];
