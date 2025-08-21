import "clsx";
import { L as Layout } from "../../chunks/Layout.js";
function _page($$payload) {
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out.push(`<div class="p-8 bg-red-500 text-white"><h1 class="text-4xl font-bold mb-4">TEST - Dashboard</h1> <div class="bg-blue-500 p-4 rounded-lg"><p class="text-xl">If you can see this styled (red background, white text, blue box), Tailwind is working!</p></div> <div class="mt-6 grid grid-cols-2 gap-4"><div class="bg-green-500 p-4 rounded-lg"><h2 class="text-lg font-semibold">Total Income</h2> <p class="text-2xl">$120,000</p></div> <div class="bg-yellow-500 p-4 rounded-lg text-black"><h2 class="text-lg font-semibold">Net Profit</h2> <p class="text-2xl">40,000</p></div></div></div>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
