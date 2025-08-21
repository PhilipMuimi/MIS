import { W as ensure_array_like, T as escape_html, X as attr, Z as attr_class, _ as stringify } from "../../../chunks/index2.js";
import { L as Layout } from "../../../chunks/Layout.js";
import { B as Button, M as MetricCard } from "../../../chunks/Button.js";
function _page($$payload) {
  const projects = [
    {
      id: 1,
      name: "New Antibiotic Research",
      status: "In Progress",
      completion: 65,
      lead: "Dr. Sarah Johnson",
      deadline: "2025-12-15"
    },
    {
      id: 2,
      name: "Vaccine Development Phase II",
      status: "Testing",
      completion: 40,
      lead: "Dr. Mike Chen",
      deadline: "2026-03-20"
    },
    {
      id: 3,
      name: "Pain Relief Formula",
      status: "Completed",
      completion: 100,
      lead: "Dr. Lisa Wong",
      deadline: "2025-07-30"
    }
  ];
  Layout($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(projects);
      $$payload2.out.push(`<div class="p-8"><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-bold text-brand-dark">R&amp;D Dashboard</h1> <p class="text-gray-600 mt-2">Research &amp; Development projects and milestones</p></div> `);
      Button($$payload2, {
        variant: "primary",
        href: "/rnd/projects",
        children: ($$payload3) => {
          $$payload3.out.push(`<!---->+ New Project`);
        },
        $$slots: { default: true }
      });
      $$payload2.out.push(`<!----></div> <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">`);
      MetricCard($$payload2, {
        title: "Active Projects",
        value: "12",
        change: "+2 this quarter",
        trend: "up",
        color: "primary"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Completed Projects",
        value: "8",
        change: "This year",
        trend: "neutral",
        color: "success"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Budget Utilization",
        value: "78%",
        change: "Of allocated budget",
        trend: "neutral",
        color: "info"
      });
      $$payload2.out.push(`<!----> `);
      MetricCard($$payload2, {
        title: "Team Members",
        value: "25",
        change: "Researchers & Scientists",
        trend: "neutral",
        color: "info"
      });
      $$payload2.out.push(`<!----></div> <div class="bg-white rounded-lg shadow-card"><div class="p-6 border-b border-gray-200"><h2 class="text-xl font-semibold text-brand-dark">Current Projects</h2></div> <div class="divide-y divide-gray-100"><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let project = each_array[$$index];
        $$payload2.out.push(`<div class="p-6 hover:bg-gray-50"><div class="flex items-center justify-between"><div class="flex-1"><h3 class="font-medium text-brand-dark">${escape_html(project.name)}</h3> <p class="text-sm text-gray-600 mt-1">Lead: ${escape_html(project.lead)}</p> <p class="text-sm text-gray-500">Deadline: ${escape_html(project.deadline)}</p></div> <div class="flex items-center space-x-4"><div class="text-center"><div class="w-16 h-16 relative"><svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-gray-200"></circle><circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="8" fill="transparent"${attr("stroke-dasharray", 2 * Math.PI * 40)}${attr("stroke-dashoffset", 2 * Math.PI * 40 * (1 - project.completion / 100))} class="text-brand-primary" stroke-linecap="round"></circle></svg> <div class="absolute inset-0 flex items-center justify-center"><span class="text-sm font-medium">${escape_html(project.completion)}%</span></div></div></div> <span${attr_class(`px-3 py-1 rounded-full text-sm font-medium ${stringify(project.status === "Completed" ? "bg-green-100 text-green-800" : project.status === "In Progress" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800")}`)}>${escape_html(project.status)}</span> `);
        Button($$payload2, {
          variant: "secondary",
          size: "sm",
          children: ($$payload3) => {
            $$payload3.out.push(`<!---->View Details`);
          },
          $$slots: { default: true }
        });
        $$payload2.out.push(`<!----></div></div></div>`);
      }
      $$payload2.out.push(`<!--]--></div></div></div>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
