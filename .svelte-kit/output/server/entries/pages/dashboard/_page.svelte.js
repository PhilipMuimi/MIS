import "clsx";
import { L as Layout } from "../../../chunks/Layout.js";
function _page($$payload) {
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out.push(`<div class="main-content"><div class="page-header"><h1 class="page-title">Dashboard</h1></div> <div class="dashboard-row"><div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="metric-card"><div class="metric-card-title">Total Income</div> <div class="metric-card-value">$120,000</div></div> <div class="card"><div class="metric-card-title">Net Profit</div> <div class="metric-card-profit">40,000</div></div></div> <div class="card"><div class="card-title">Cash Flow</div> <div class="chart-container bg-gray-50 rounded flex items-center justify-center"><svg viewBox="0 0 400 120" class="w-full h-full"><polyline fill="none" stroke="#3B82F6" stroke-width="2" points="20,80 80,70 140,50 200,65 260,40 320,30 380,35"></polyline></svg></div></div></div> <div class="card"><div class="card-title">Alerts</div> <div class="alert-list"><div class="alert-item"><div class="alert-icon warning"></div> <div class="alert-text">Budget limits exceeded in <span class="alert-link">R&amp;D Department</span></div></div> <div class="alert-item"><div class="alert-icon success"></div> <div class="alert-text">Overdue reports in Sales &amp; Marketing - <span class="alert-link">No Action</span></div></div></div></div></div></div>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
