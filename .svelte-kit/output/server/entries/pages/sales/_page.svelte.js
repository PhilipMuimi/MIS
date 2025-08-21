import { W as ensure_array_like, T as escape_html, Z as attr_class, _ as stringify } from "../../../chunks/index2.js";
import { L as Layout } from "../../../chunks/Layout.js";
import { B as Button, M as MetricCard } from "../../../chunks/Button.js";
function _page($$payload) {
  const campaigns = [
    {
      id: 1,
      name: "Summer Health Campaign",
      status: "Active",
      budget: 25e3,
      spent: 18e3,
      leads: 450,
      conversions: 89
    },
    {
      id: 2,
      name: "Back to School Vitamins",
      status: "Planning",
      budget: 15e3,
      spent: 2e3,
      leads: 120,
      conversions: 15
    },
    {
      id: 3,
      name: "Winter Immunity Boost",
      status: "Completed",
      budget: 2e4,
      spent: 19500,
      leads: 680,
      conversions: 156
    }
  ];
  Layout($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(campaigns);
      $$payload2.out.push(`<div class="p-8"><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold text-brand-dark">Sales &amp; Marketing</h1> <p class="text-gray-600 mt-2">Sales performance and marketing campaigns</p></div> `);
      Button($$payload2, {
        variant: "primary",
        href: "/sales/campaigns",
        children: ($$payload3) => {
          $$payload3.out.push(`<!---->+ New Campaign`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">`);
      MetricCard($$payload2, {
        title: "Monthly Sales",
        value: "$125,000",
        change: "+15% from last month",
        trend: "up",
        color: "success"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Active Leads",
        value: "1,250",
        change: "+8% this week",
        trend: "up",
        color: "primary"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Conversion Rate",
        value: "18.5%",
        change: "+2.3% improvement",
        trend: "up",
        color: "success"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Campaign ROI",
        value: "285%",
        change: "Average return",
        trend: "neutral",
        color: "info"
      });
      $$payload2.out.push(`<!----></div> <div class="bg-white rounded-lg shadow-card"><div class="p-6 border-b border-gray-200"><div class="flex items-center justify-between"><h2 class="text-xl font-semibold text-brand-dark">Marketing Campaigns</h2> `);
      Button($$payload2, {
        variant: "secondary",
        size: "sm",
        href: "/sales/reports",
        children: ($$payload3) => {
          $$payload3.out.push(`<!---->View Reports`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----></div></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-200 bg-gray-50"><th class="text-left py-3 px-6 font-medium text-gray-700">Campaign</th><th class="text-left py-3 px-6 font-medium text-gray-700">Status</th><th class="text-left py-3 px-6 font-medium text-gray-700">Budget</th><th class="text-left py-3 px-6 font-medium text-gray-700">Spent</th><th class="text-left py-3 px-6 font-medium text-gray-700">Leads</th><th class="text-left py-3 px-6 font-medium text-gray-700">Conversions</th><th class="text-left py-3 px-6 font-medium text-gray-700">Actions</th></tr></thead><tbody><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let campaign = each_array[$$index];
        $$payload2.out.push(`<tr class="border-b border-gray-100 hover:bg-gray-50"><td class="py-4 px-6 font-medium text-brand-dark">${escape_html(campaign.name)}</td><td class="py-4 px-6"><span${attr_class(`px-2 py-1 rounded-full text-xs font-medium ${stringify(campaign.status === "Active" ? "bg-green-100 text-green-800" : campaign.status === "Planning" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800")}`)}>${escape_html(campaign.status)}</span></td><td class="py-4 px-6 text-gray-600">$${escape_html(campaign.budget.toLocaleString())}</td><td class="py-4 px-6 text-gray-600">$${escape_html(campaign.spent.toLocaleString())}</td><td class="py-4 px-6 text-gray-600">${escape_html(campaign.leads)}</td><td class="py-4 px-6 text-gray-600">${escape_html(campaign.conversions)}</td><td class="py-4 px-6">`);
        Button($$payload2, {
          variant: "secondary",
          size: "sm",
          children: ($$payload3) => {
            $$payload3.out.push(`<!---->View Details`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!----></td></tr>`);
      }
      $$payload2.out.push(`<!--]--></tbody></table></div></div></div>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
