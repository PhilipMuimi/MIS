<script lang="ts">
  import Layout from '$lib/components/Layout.svelte';
  import Button from '$lib/components/Button.svelte';
  
  let searchQuery = '';
  let selectedFilter = 'all';
  let sortBy = 'modified';
  let showUpload = false;
  let showSortDropdown = false;
  let uploadFile: File | null = null;
  let showAddDocModal = false;

  interface DocumentItem {
    id: number;
    name: string;
    category: string;
    department: string;
    modified: string;
    size: string;
    type: string;
    owner: string;
    file?: File;
  }

  let documents: DocumentItem[] = [
    {
      id: 1,
      name: 'Contract',
      category: 'Contract',
      department: 'Finance',
      modified: '25 Jan, 1',
      size: '2.5 MB',
      type: 'pdf',
      owner: 'Finance Team'
    },
    {
      id: 2,
      name: 'R&D',
      category: 'Policies',
      department: 'R&D',
      modified: '82, 12',
      size: '1.2 MB',
      type: 'docx',
      owner: 'R&D Team'
    },
    {
      id: 3,
      name: 'HR',
      category: 'Policy',
      department: 'HR',
      modified: '01 15/2',
      size: '890 KB',
      type: 'pdf',
      owner: 'HR Team'
    },
    {
      id: 4,
      name: 'Contract',
      category: 'Confidential',
      department: 'Finance',
      modified: '15 day',
      size: '3.1 MB',
      type: 'pdf',
      owner: 'Finance Team'
    },
    {
      id: 5,
      name: 'Policy',
      category: 'Important',
      department: 'HR',
      modified: '01/15',
      size: '1.8 MB',
      type: 'pdf',
      owner: 'HR Team'
    }
  ];
  
  const categories = ['All', 'Contract', 'Policies', 'Policy', 'Confidential', 'Important'];
  const departments = ['All', 'Finance', 'HR', 'R&D', 'Sales & Marketing'];
  
  let filteredDocuments = documents;
  let sortedDocuments = documents;

  $: filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || doc.category.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  $: sortedDocuments = sortBy === 'modified'
    ? filteredDocuments.slice().sort((a, b) => b.modified.localeCompare(a.modified))
    : sortBy === 'department'
      ? filteredDocuments.slice().sort((a, b) => a.department.localeCompare(b.department))
      : filteredDocuments.slice().sort((a, b) => a.name.localeCompare(b.name));
  
  function handleUploadClick() {
    showUpload = true;
    setTimeout(() => {
      const input = document.getElementById('file-upload') as HTMLInputElement;
      if (input) input.click();
    }, 0);
  }
  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      uploadFile = input.files[0];
      showUpload = false;
      // Show modal to fill in document details
      newDoc = { category: '', name: uploadFile.name, department: '', modified: new Date().toLocaleDateString(), file: uploadFile };
      showAddDocModal = true;
    }
  }
  let newDoc = { category: '', name: '', department: '', modified: '', file: null as File | null };
  function handleAddDocument() {
    if (!newDoc.category || !newDoc.name || !newDoc.department || !newDoc.modified || !newDoc.file) return;
    documents = [
      ...documents,
      {
        id: documents.length + 1,
        name: newDoc.name,
        category: newDoc.category,
        department: newDoc.department,
        modified: newDoc.modified,
        size: `${(newDoc.file.size / 1024 / 1024).toFixed(2)} MB`,
        type: newDoc.file.type.split('/')[1] || 'file',
        owner: 'You',
        file: newDoc.file
      }
    ];
    showAddDocModal = false;
    newDoc = { category: '', name: '', department: '', modified: '', file: null };
  }
  function handleDownload(doc: any) {
    if (doc.file) {
      const url = URL.createObjectURL(doc.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }
  }
  function handleFilter(filter: string) {
    selectedFilter = filter;
  }
  function handleOwnedByMe() {
    selectedFilter = 'all';
    filteredDocuments = documents.filter(doc => doc.owner === 'You');
    sortBy = 'modified';
  }
  function handleSharedWithMe() {
    selectedFilter = 'all';
    filteredDocuments = documents.filter(doc => doc.owner !== 'You');
    sortBy = 'modified';
  }
  function handleFilterDialog() {
    // Placeholder for filter dialog/modal
    alert('Advanced filter coming soon!');
  }
  function handleSort(type?: string) {
    if (type) {
      sortBy = type;
      showSortDropdown = false;
    } else {
      showSortDropdown = !showSortDropdown;
    }
  }
</script>

<Layout>
  <div class="center-content">
    <div class="main-content" style="background: var(--color-background); color: var(--color-text-primary); min-height: 100vh;">
      <!-- Header -->
      <div class="flex items-center justify-between page-header" style="border-bottom: 1px solid var(--color-border);">
        <h1 class="page-title" style="color: var(--color-primary);">Document Manager</h1>
        <button class="btn btn-primary" style="background: var(--color-primary); color: #fff;" on:click={handleUploadClick}>+ Document</button>
        <input id="file-upload" type="file" style="display:none" on:change={handleFileChange} />
      </div>

      <!-- Document Management Interface -->
      <div class="table-container" style="background: var(--color-background); border: 1px solid var(--color-border); border-radius: 1rem; margin-top: 2rem;">
        <!-- Search and Filters Header -->
        <div class="table-header" style="background: var(--color-background); border-bottom: 1px solid var(--color-border); position: relative;">
          <div class="table-search">
            <input
              type="text"
              placeholder="Search documents..."
              bind:value={searchQuery}
              class="search-input"
              style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);"
            />
          </div>
          <div class="table-filters">
            <button class="filter-btn {selectedFilter === 'all' ? 'active' : ''}" style="background: var(--color-primary-bg, #eff6ff); color: var(--color-primary); border: 1px solid var(--color-primary);" on:click={() => handleFilter('all')}>All</button>
            <button class="filter-btn" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);" on:click={handleOwnedByMe}>Owned by me</button>
            <button class="filter-btn" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);" on:click={handleSharedWithMe}>Shared with me</button>
            <div class="sort-dropdown-wrapper" style="display:inline-block; position:relative;">
              <button class="filter-btn" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);" on:click={() => handleSort()}>
                Sort
                <span style="margin-left:0.3em;">▼</span>
              </button>
              {#if showSortDropdown}
                <div class="sort-dropdown" role="menu">
                  <button type="button" class="sort-option" role="menuitem" tabindex="0" on:click={() => handleSort('modified')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('modified'); }}>
                    Date
                  </button>
                  <button type="button" class="sort-option" role="menuitem" tabindex="0" on:click={() => handleSort('name')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('name'); }}>
                    Alphabet
                  </button>
                  <button type="button" class="sort-option" role="menuitem" tabindex="0" on:click={() => handleSort('department')} on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSort('department'); }}>
                    Department
                  </button>
                </div>
              {/if}
            </div>
            <button class="filter-btn" style="background: var(--color-background); color: var(--color-text-primary); border: 1px solid var(--color-border);" on:click={handleFilterDialog}>Filter</button>
          </div>
        </div>

        <!-- Documents Table -->
        <table class="table" style="background: var(--color-background); color: var(--color-text-primary);">
          <thead style="background: var(--color-primary-bg, #eff6ff); color: var(--color-primary);">
            <tr>
              <th>Categories</th>
              <th>Name</th>
              <th>Department</th>
              <th>Modified</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
      {#each sortedDocuments as document}
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td>{document.category}</td>
              <td>{document.name}</td>
              <td>{document.department}</td>
              <td>{document.modified}</td>
              <td>
                {#if document.file}
                  <button class="download-btn" on:click={() => handleDownload(document)} title="Download {document.name}">⬇️</button>
                {/if}
              </td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
      {#if showAddDocModal}
        <div class="add-doc-modal">
          <div class="add-doc-card">
            <h2>Add Document Details</h2>
            <form on:submit|preventDefault={handleAddDocument}>
              <label>
                Category
                <select class="add-doc-input" bind:value={newDoc.category} required>
                  <option value="" disabled selected>Select category</option>
                  {#each categories.filter(c => c !== 'All') as cat}
                    <option value={cat}>{cat}</option>
                  {/each}
                </select>
              </label>
              <input class="add-doc-input" placeholder="Name" bind:value={newDoc.name} required />
              <label>
                Department
                <select class="add-doc-input" bind:value={newDoc.department} required>
                  <option value="" disabled selected>Select department</option>
                  {#each departments.filter(d => d !== 'All') as dept}
                    <option value={dept}>{dept}</option>
                  {/each}
                </select>
              </label>
              <input class="add-doc-input" type="date" bind:value={newDoc.modified} required />
              <div class="add-doc-actions">
                <button type="button" on:click={() => { showAddDocModal = false; }}>Cancel</button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      {/if}
    </div>
  </div>
</Layout>

<footer class="static-footer">
  <div class="footer-content">
    <span>&copy; {new Date().getFullYear()} Gonep IMS. All rights reserved.</span>
    <span class="footer-links">
      <a href="/" class="footer-link">Home</a>
      <a href="/settings" class="footer-link">Settings</a>
      <a href="/documents" class="footer-link">Documents</a>
    </span>
  </div>
</footer>

<style>
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}

.main-content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.sort-dropdown-wrapper {
  position: relative;
}
.sort-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: #fff;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
  z-index: 10;
  min-width: 140px;
  padding: 0.25rem 0;
}
.sort-option {
  width: 100%;
  padding: 0.65rem 1.2rem;
  cursor: pointer;
  color: #222;
  font-size: 1.05rem;
  background: none;
  border: none;
  text-align: left;
  transition: background 0.15s, color 0.15s;
  border-radius: 0;
  outline: none;
  font-family: inherit;
  border-bottom: 1px solid #f1f1f1;
}
.sort-option:last-child {
  border-bottom: none;
}
.sort-option:hover, .sort-option:focus {
  background: var(--color-primary-bg, #eff6ff);
  color: var(--color-primary, #2563eb);
}

.static-footer {
  width: 100vw;
  background: var(--color-background, #f9fafb);
  color: var(--color-text-secondary, #666);
  border-top: 1px solid var(--color-border, #e5e7eb);
  padding: 1.1rem 0;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  font-size: 1rem;
}
.footer-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1.5rem;
}
.footer-links {
  display: flex;
  gap: 1.5rem;
}
.footer-link {
  color: var(--color-primary, #2563eb);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}
.footer-link:hover {
  color: #174ea6;
  text-decoration: underline;
}
.download-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--color-primary, #2563eb);
  transition: color 0.15s;
}
.download-btn:hover {
  color: #174ea6;
}
.add-doc-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.18);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.add-doc-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(16,30,54,0.12);
  width: 100%;
  max-width: 340px;
  padding: 1.25rem 1.5rem;
  position: relative;
  border: 1px solid #e5e7eb;
  color: #222;
}
.add-doc-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  background: #f9fafb;
  margin-bottom: 0.7rem;
}
.add-doc-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 0.5rem;
}
@media (max-width: 600px) {
  .main-content {
    max-width: 100vw;
    padding: 0 0.5rem;
  }
  .footer-content {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    padding: 0 0.75rem;
  }
  .footer-links {
    gap: 1rem;
  }
}
</style>
