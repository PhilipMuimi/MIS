

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CfH0FGKU.js","_app/immutable/chunks/Bviv_xbs.js","_app/immutable/chunks/aLXkHD-W.js","_app/immutable/chunks/VE9fC3FM.js"];
export const stylesheets = [];
export const fonts = [];
