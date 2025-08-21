import { P as pop, N as push, W as ensure_array_like, Y as valueless_option, T as escape_html, Z as attr_class, _ as stringify } from "../../../chunks/index2.js";
import { L as Layout } from "../../../chunks/Layout.js";
import { B as Button, M as MetricCard } from "../../../chunks/Button.js";
function _page($$payload, $$props) {
  push();
  ({
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const recentTransactions = [
    {
      id: 1,
      date: "2025-08-01",
      type: "income",
      amount: 15e3,
      description: "Product sales revenue",
      category: "Sales Income",
      department: "Sales & Marketing"
    },
    {
      id: 2,
      date: "2025-08-02",
      type: "expense",
      amount: 3500,
      description: "Office supplies and equipment",
      category: "Supplies",
      department: "Operations"
    },
    {
      id: 3,
      date: "2025-08-03",
      type: "expense",
      amount: 8e3,
      description: "Monthly salaries",
      category: "Salaries",
      department: "HR"
    }
  ];
  Layout($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(recentTransactions);
      $$payload2.out.push(`<div class="p-8"><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold text-brand-dark">Finance</h1> <p class="text-gray-600 mt-2">Financial transactions and reports management</p></div> `);
      Button($$payload2, {
        variant: "primary",
        children: ($$payload3) => {
          $$payload3.out.push(`<!---->+ New Transaction`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">`);
      MetricCard($$payload2, {
        title: "Total Income",
        value: "$120,000",
        change: "+12% from last month",
        trend: "up",
        color: "success"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Total Expenses",
        value: "$80,000",
        change: "+5% from last month",
        trend: "up",
        color: "danger"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Net Profit",
        value: "$40,000",
        change: "+18% from last month",
        trend: "up",
        color: "primary"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Cash Flow",
        value: "Positive",
        change: "Stable trend",
        trend: "neutral",
        color: "info"
      });
      $$payload2.out.push(`<!----></div> <div class="bg-white rounded-lg shadow-card"><div class="p-6 border-b border-gray-200"><div class="flex items-center justify-between"><h2 class="text-xl font-semibold text-brand-dark">Recent Transactions</h2> <div class="flex space-x-2">`);
      Button($$payload2, {
        variant: "secondary",
        size: "sm",
        href: "/finance/reports",
        children: ($$payload3) => {
          $$payload3.out.push(`<!---->View Reports`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----> <select class="border border-gray-300 rounded px-3 py-1 text-sm"><option>`);
      valueless_option($$payload2, () => {
        $$payload2.out.push(`All Transactions`);
      });
      $$payload2.out.push(`</option><option>`);
      valueless_option($$payload2, () => {
        $$payload2.out.push(`Income Only`);
      });
      $$payload2.out.push(`</option><option>`);
      valueless_option($$payload2, () => {
        $$payload2.out.push(`Expenses Only`);
      });
      $$payload2.out.push(`</option></select></div></div></div> <div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-200 bg-gray-50"><th class="text-left py-3 px-6 font-medium text-gray-700">Date</th><th class="text-left py-3 px-6 font-medium text-gray-700">Type</th><th class="text-left py-3 px-6 font-medium text-gray-700">Amount</th><th class="text-left py-3 px-6 font-medium text-gray-700">Description</th><th class="text-left py-3 px-6 font-medium text-gray-700">Category</th><th class="text-left py-3 px-6 font-medium text-gray-700">Department</th><th class="text-left py-3 px-6 font-medium text-gray-700">Actions</th></tr></thead><tbody><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let transaction = each_array[$$index];
        $$payload2.out.push(`<tr class="border-b border-gray-100 hover:bg-gray-50"><td class="py-4 px-6 text-gray-600">${escape_html(transaction.date)}</td><td class="py-4 px-6"><span${attr_class(`px-2 py-1 rounded-full text-xs font-medium ${stringify(transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}`)}>${escape_html(transaction.type.toUpperCase())}</span></td><td${attr_class(`py-4 px-6 font-medium ${stringify(transaction.type === "income" ? "text-green-600" : "text-red-600")}`)}>${escape_html(transaction.type === "income" ? "+" : "-")}$${escape_html(transaction.amount.toLocaleString())}</td><td class="py-4 px-6 text-gray-900">${escape_html(transaction.description)}</td><td class="py-4 px-6 text-gray-600">${escape_html(transaction.category)}</td><td class="py-4 px-6 text-gray-600">${escape_html(transaction.department)}</td><td class="py-4 px-6">`);
        Button($$payload2, {
          variant: "secondary",
          size: "sm",
          children: ($$payload3) => {
            $$payload3.out.push(`<!---->Edit`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!----></td></tr>`);
      }
      $$payload2.out.push(`<!--]--></tbody></table></div></div></div> `);
      {
        $$payload2.out.push("<!--[!-->");
      }
      $$payload2.out.push(`<!--]-->`);
    },
    $$slots: { default: true }
  });
  pop();
}
export {
  _page as default
};
