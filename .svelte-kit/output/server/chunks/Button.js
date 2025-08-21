import { a0 as fallback, T as escape_html, Z as attr_class, _ as stringify, a1 as bind_props, X as attr, a2 as clsx, a3 as slot } from "./index2.js";
function MetricCard($$payload, $$props) {
  let title = $$props["title"];
  let value = $$props["value"];
  let change = fallback($$props["change"], "");
  let trend = fallback($$props["trend"], "neutral");
  let color = fallback($$props["color"], "primary");
  const textColorClasses = {
    primary: "text-brand-primary",
    success: "text-green-600",
    danger: "text-red-600",
    info: "text-gray-700"
  };
  $$payload.out.push(`<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"><h3 class="text-sm font-medium text-gray-500 mb-3">${escape_html(title)}</h3> <div class="flex items-end justify-between"><div><p${attr_class(`text-3xl font-bold ${stringify(textColorClasses[color])} mb-1`)}>${escape_html(value)}</p> `);
  if (change) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<p class="text-sm flex items-center">`);
    if (trend === "up") {
      $$payload.out.push("<!--[-->");
      $$payload.out.push(`<span class="text-green-600 mr-1"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg></span>`);
    } else {
      $$payload.out.push("<!--[!-->");
      if (trend === "down") {
        $$payload.out.push("<!--[-->");
        $$payload.out.push(`<span class="text-red-600 mr-1"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></span>`);
      } else {
        $$payload.out.push("<!--[!-->");
        $$payload.out.push(`<span class="text-gray-500 mr-1">→</span>`);
      }
      $$payload.out.push(`<!--]-->`);
    }
    $$payload.out.push(`<!--]--> <span class="text-gray-600">${escape_html(change)}</span></p>`);
  } else {
    $$payload.out.push("<!--[!-->");
  }
  $$payload.out.push(`<!--]--></div></div></div>`);
  bind_props($$props, { title, value, change, trend, color });
}
function Button($$payload, $$props) {
  let baseClasses;
  let variant = fallback($$props["variant"], "primary");
  let size = fallback($$props["size"], "md");
  let disabled = fallback($$props["disabled"], false);
  let type = fallback($$props["type"], "button");
  let href = fallback($$props["href"], void 0);
  const variantClasses = {
    primary: "bg-brand-primary hover:bg-brand-secondary text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
    success: "bg-brand-accent hover:bg-green-600 text-white shadow-lg hover:shadow-xl",
    danger: "bg-brand-danger hover:bg-red-600 text-white shadow-lg hover:shadow-xl"
  };
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  baseClasses = `rounded-xl font-semibold transition-all duration-200 inline-block text-center ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
  if (href) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<a${attr("href", href)}${attr_class(clsx(baseClasses))}${attr("aria-disabled", disabled)}><!---->`);
    slot($$payload, $$props, "default", {});
    $$payload.out.push(`<!----></a>`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<button${attr("type", type)}${attr("disabled", disabled, true)}${attr_class(clsx(baseClasses))}><!---->`);
    slot($$payload, $$props, "default", {});
    $$payload.out.push(`<!----></button>`);
  }
  $$payload.out.push(`<!--]-->`);
  bind_props($$props, { variant, size, disabled, type, href });
}
export {
  Button as B,
  MetricCard as M
};
