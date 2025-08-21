

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DFyiJUbl.js","_app/immutable/chunks/Bviv_xbs.js","_app/immutable/chunks/aLXkHD-W.js"];
export const stylesheets = [];
export const fonts = [];
