import { W as ensure_array_like, X as attr, Z as attr_class, T as escape_html, _ as stringify, a3 as slot, P as pop, N as push } from "./index2.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./state.svelte.js";
function Layout($$payload, $$props) {
  push();
  let currentPath = "";
  const navigationItems = [
    { label: "Dashboard", path: "/", icon: "📊" },
    { label: "Finance", path: "/finance", icon: "💰" },
    { label: "HR", path: "/hr", icon: "👥" },
    { label: "R&D", path: "/rnd", icon: "🔬" },
    { label: "Sales & Marketing", path: "/sales", icon: "📈" },
    { label: "Documents", path: "/documents", icon: "📁" },
    { label: "Settings", path: "/settings", icon: "⚙️" }
  ];
  const each_array = ensure_array_like(navigationItems);
  $$payload.out.push(`<div class="min-h-screen bg-gray-50 flex"><aside class="sidebar"><div class="sidebar-logo"><div class="sidebar-brand"><div class="sidebar-brand-icon"><span class="text-white font-bold text-lg">G</span></div> <div><h1 class="sidebar-brand-text">GONEP</h1> <p class="sidebar-brand-subtitle">Pharmaceuticals</p></div></div> <nav class="space-y-1"><!--[-->`);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$payload.out.push(`<a${attr("href", item.path)}${attr_class(`sidebar-link ${stringify(currentPath === item.path || item.path !== "/" && currentPath.startsWith(item.path) ? "active" : "")}`)}><span class="mr-3 text-xl">${escape_html(item.icon)}</span> <span class="font-medium">${escape_html(item.label)}</span></a>`);
  }
  $$payload.out.push(`<!--]--></nav></div> <div class="sidebar-logout"><button class="flex items-center px-4 py-3 text-slate-300 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-200 w-full"><span class="mr-3 text-xl">🚪</span> <span class="font-medium">Logout</span></button></div></aside> <main class="flex-1 overflow-auto bg-gray-50"><!---->`);
  slot($$payload, $$props, "default", {});
  $$payload.out.push(`<!----></main></div>`);
  pop();
}
export {
  Layout as L
};
