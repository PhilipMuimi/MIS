import { $ as maybe_selected } from "../../../../chunks/index2.js";
import { L as Layout } from "../../../../chunks/Layout.js";
function _page($$payload) {
  Layout($$payload, {
    children: ($$payload2) => {
      $$payload2.out.push(`<div class="main-content"><div class="flex items-center justify-between page-header"><h1 class="page-title">Transaction Form</h1> <button class="btn btn-secondary">Cancel</button></div> <div class="form-container max-w-md"><div class="form-group"><label class="label" for="type">Type</label> <select class="select" id="type"><option value="income"${maybe_selected($$payload2, "income")}>Income</option><option value="expense"${maybe_selected($$payload2, "expense")}>Expense</option></select></div> <div class="form-group"><label class="label" for="amount">Amount</label> <input class="input" type="number" id="amount" placeholder="5,5000"/></div> <div class="form-group"><label class="label" for="description">Description</label> <input class="input" type="text" id="description" placeholder="Product sales"/></div> <div class="form-group"><label class="label" for="category">Category</label> <select class="select" id="category"><option value="sales-income"${maybe_selected($$payload2, "sales-income")}>Sales Income</option><option value="other-income"${maybe_selected($$payload2, "other-income")}>Other Income</option></select></div> <div class="form-group"><label class="label" for="document">Supporting Document</label> <div class="file-input-container"><input class="file-input" type="text" placeholder="Choose File" readonly/> <span class="text-sm text-gray-500 ml-2">No file chosen</span></div></div> <div class="mt-6"><button class="btn btn-primary w-full">Submit Transaction</button></div></div></div>`);
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
