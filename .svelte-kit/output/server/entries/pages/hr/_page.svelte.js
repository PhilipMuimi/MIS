import "clsx";
import { L as Layout } from "../../../chunks/Layout.js";
function _page($$payload) {
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out.push(`<div class="main-content"><div class="page-header"><h1 class="page-title">HR</h1></div> <div class="dashboard-row"><div class="employee-card"><div class="employee-header"><div class="employee-avatar"><span class="text-white">👥</span></div> <div class="employee-info"><h3>Jane Smith</h3> <p>Employee</p></div></div></div> <div class="card"><div class="flex items-center justify-between mb-6"><h2 class="card-title">Employee Profile</h2> <span class="text-sm text-gray-500">Jane Smith - Software Engineer</span></div> <div class="employee-details"><div class="employee-section"><h4>Personal Data</h4> <div class="grid grid-cols-2 gap-4"><div class="employee-field"><dt>Email</dt> <span>jane.smith@gonep.com</span></div> <div class="employee-field"><dt>Phone</dt> <span>+1 (555) 123-4567</span></div></div></div> <div class="employee-section"><h4>Employment Details</h4> <div class="grid grid-cols-2 gap-4"><div class="employee-field"><dt>Department</dt> <span>Finance</span></div> <div class="employee-field"><dt>Hire Date</dt> <span>01/5/2021</span></div></div></div></div></div></div></div>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
