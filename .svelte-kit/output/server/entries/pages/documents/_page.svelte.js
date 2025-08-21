import { P as pop, N as push, W as ensure_array_like, X as attr, T as escape_html } from "../../../chunks/index2.js";
import { L as Layout } from "../../../chunks/Layout.js";
function _page($$payload, $$props) {
  push();
  let searchQuery = "";
  let selectedFilter = "all";
  const documents = [
    {
      id: 1,
      name: "Contract",
      category: "Contract",
      department: "Finance",
      modified: "25 Jan, 1",
      size: "2.5 MB",
      type: "pdf",
      owner: "Finance Team"
    },
    {
      id: 2,
      name: "R&D",
      category: "Policies",
      department: "R&D",
      modified: "82, 12",
      size: "1.2 MB",
      type: "docx",
      owner: "R&D Team"
    },
    {
      id: 3,
      name: "HR",
      category: "Policy",
      department: "HR",
      modified: "01 15/2",
      size: "890 KB",
      type: "pdf",
      owner: "HR Team"
    },
    {
      id: 4,
      name: "Contract",
      category: "Confidential",
      department: "Finance",
      modified: "15 day",
      size: "3.1 MB",
      type: "pdf",
      owner: "Finance Team"
    },
    {
      id: 5,
      name: "Policy",
      category: "Important",
      department: "HR",
      modified: "01/15",
      size: "1.8 MB",
      type: "pdf",
      owner: "HR Team"
    }
  ];
  let filteredDocuments = documents;
  {
    filteredDocuments = documents.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === "all";
      return matchesSearch && matchesFilter;
    });
  }
  Layout($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(filteredDocuments);
      $$payload2.out.push(`<div class="main-content"><div class="flex items-center justify-between page-header"><h1 class="page-title">Document Manager</h1> <button class="btn btn-primary">+ Document</button></div> <div class="table-container"><div class="table-header"><div class="table-search"><input type="text" placeholder="Search documents..."${attr("value", searchQuery)} class="search-input"/></div> <div class="table-filters"><button class="filter-btn active">All</button> <button class="filter-btn">Owned by me</button> <button class="filter-btn">Shared with me</button> <button class="filter-btn">Sort</button> <button class="filter-btn">Filter</button></div></div> <table class="table"><thead><tr><th>Categories</th><th>Name</th><th>Department</th><th>Modified</th></tr></thead><tbody><!--[-->`);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let document = each_array[$$index];
        $$payload2.out.push(`<tr><td>${escape_html(document.category)}</td><td>${escape_html(document.name)}</td><td>${escape_html(document.department)}</td><td>${escape_html(document.modified)}</td></tr>`);
      }
      $$payload2.out.push(`<!--]--></tbody></table></div></div>`);
    },
    $$slots: { default: true }
  });
  pop();
}
export {
  _page as default
};
