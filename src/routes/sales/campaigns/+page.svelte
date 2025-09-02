<script lang="ts">
import { onMount } from 'svelte';
import { getCampaigns, createCampaign, updateCampaign } from '$lib/api/campaigns';

let campaigns: any[] = [];
let loading = false;

async function loadCampaigns() {
	loading = true;
	try {
		campaigns = await getCampaigns();
	} catch (e) {
		// handle error
	}
	loading = false;
}

onMount(() => {
	loadCampaigns();
});
	let showAddModal = false;
	let showEditModal = false;
	let showViewModal = false;
	let selectedCampaign: any = null;
			let newCampaign = { name: '', start: '', end: '', budget: 0 as number, status: 'Planned', description: '' };

		function openAddModal() {
			showAddModal = true;
			newCampaign = { name: '', start: '', end: '', budget: 0, status: 'Planned', description: '' };
		}
	async function addCampaign() {
		try {
			await createCampaign({
				name: newCampaign.name,
				start_date: newCampaign.start,
				end_date: newCampaign.end,
				budget: Number(newCampaign.budget),
				status: newCampaign.status,
				description: newCampaign.description
			});
			await loadCampaigns();
			showAddModal = false;
		} catch (e) {
			// handle error
		}
	}
	function openEditModal(campaign: any) {
		selectedCampaign = { ...campaign };
		showEditModal = true;
	}
async function saveEdit() {
	try {
		await updateCampaign(selectedCampaign.id, {
			name: selectedCampaign.name,
			start_date: selectedCampaign.start,
			end_date: selectedCampaign.end,
			budget: Number(selectedCampaign.budget),
			status: selectedCampaign.status,
			description: selectedCampaign.description
		});
		await loadCampaigns();
		showEditModal = false;
		selectedCampaign = null;
	} catch (e) {
		// handle error
	}
}
	function openViewModal(campaign: any) {
		selectedCampaign = campaign;
		showViewModal = true;
	}
</script>

<div class="max-w-3xl mx-auto p-6">
	<div class="flex items-center justify-between mb-6">
		<h1 class="rnd-dashboard-title">Sales Campaigns</h1>
		<button class="btn btn-primary" on:click={openAddModal}>+ New Campaign</button>
	</div>
	<div class="rnd-projects-card">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Start</th>
					<th>End</th>
					<th>Budget</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each campaigns as campaign}
					<tr>
						<td>{campaign.name}</td>
						<td>{campaign.start}</td>
						<td>{campaign.end}</td>
						<td>${campaign.budget.toLocaleString()}</td>
						<td><span class="badge {campaign.status === 'Active' ? 'badge-success' : campaign.status === 'Completed' ? 'badge-info' : 'badge-warning'}">{campaign.status}</span></td>
						<td>
							<button class="btn btn-outline btn-xs mr-1" on:click={() => openViewModal(campaign)}>View</button>
							<button class="btn btn-outline btn-xs" on:click={() => openEditModal(campaign)}>Edit</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if campaigns.length === 0}
			<div class="text-center text-gray-500 py-8">No campaigns found.</div>
		{/if}
	</div>

	<!-- Add Campaign Modal -->
	{#if showAddModal}
		<div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
				<button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl" on:click={() => showAddModal = false} aria-label="Close">&times;</button>
				<h3 class="text-lg font-semibold mb-4">Add Campaign</h3>
				<form on:submit|preventDefault={addCampaign}>
					<div class="mb-3">
						<label class="block text-sm font-medium mb-1" for="name">Name</label>
						<input id="name" type="text" class="form-input w-full" bind:value={newCampaign.name} required />
					</div>
					<div class="mb-3 flex gap-2">
						<div class="w-1/2">
							<label class="block text-sm font-medium mb-1" for="start">Start</label>
							<input id="start" type="date" class="form-input w-full" bind:value={newCampaign.start} required />
						</div>
						<div class="w-1/2">
							<label class="block text-sm font-medium mb-1" for="end">End</label>
							<input id="end" type="date" class="form-input w-full" bind:value={newCampaign.end} required />
						</div>
					</div>
					<div class="mb-3">
						<label class="block text-sm font-medium mb-1" for="budget">Budget</label>
						<input id="budget" type="number" class="form-input w-full" bind:value={newCampaign.budget} required min="0" />
					</div>
					<div class="mb-3">
						<label class="block text-sm font-medium mb-1" for="status">Status</label>
						<select id="status" class="form-select w-full" bind:value={newCampaign.status}>
							<option>Planned</option>
							<option>Active</option>
							<option>Completed</option>
						</select>
					</div>
					<div class="mb-3">
						<label class="block text-sm font-medium mb-1" for="desc">Description</label>
						<textarea id="desc" class="form-input w-full" rows="3" bind:value={newCampaign.description}></textarea>
					</div>
					<div class="flex justify-end gap-2 mt-4">
						<button type="button" class="btn btn-outline" on:click={() => showAddModal = false}>Cancel</button>
						<button type="submit" class="btn btn-primary">Add</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- Edit Campaign Modal -->
	{#if showEditModal && selectedCampaign}
		<div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
				<button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl" on:click={() => showEditModal = false} aria-label="Close">&times;</button>
				<h3 class="text-lg font-semibold mb-4">Edit Campaign</h3>
				<form on:submit|preventDefault={saveEdit}>
					<div class="mb-3">
						<label class="block text-sm font-medium mb-1" for="editName">Name</label>
						<input id="editName" type="text" class="form-input w-full" bind:value={selectedCampaign.name} required />
					</div>
					<div class="mb-3 flex gap-2">
						<div class="w-1/2">
							<label class="block text-sm font-medium mb-1" for="editStart">Start</label>
							<input id="editStart" type="date" class="form-input w-full" bind:value={selectedCampaign.start} required />
						</div>
						<div class="w-1/2">
							<label class="block text-sm font-medium mb-1" for="editEnd">End</label>
							<input id="editEnd" type="date" class="form-input w-full" bind:value={selectedCampaign.end} required />
						</div>
					</div>
					<div class="mb-3">
						<label class="block text-sm font-medium mb-1" for="editBudget">Budget</label>
						<input id="editBudget" type="number" class="form-input w-full" bind:value={selectedCampaign.budget} required min="0" />
					</div>
					<div class="mb-3">
						<label class="block text-sm font-medium mb-1" for="editStatus">Status</label>
						<select id="editStatus" class="form-select w-full" bind:value={selectedCampaign.status}>
							<option>Planned</option>
							<option>Active</option>
							<option>Completed</option>
						</select>
					</div>
					<div class="mb-3">
						<label class="block text-sm font-medium mb-1" for="editDesc">Description</label>
						<textarea id="editDesc" class="form-input w-full" rows="3" bind:value={selectedCampaign.description}></textarea>
					</div>
					<div class="flex justify-end gap-2 mt-4">
						<button type="button" class="btn btn-outline" on:click={() => showEditModal = false}>Cancel</button>
						<button type="submit" class="btn btn-primary">Save</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<!-- View Campaign Modal -->
	{#if showViewModal && selectedCampaign}
		<div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
				<button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl" on:click={() => showViewModal = false} aria-label="Close">&times;</button>
				<h3 class="text-lg font-semibold mb-4">Campaign Details</h3>
				<div class="mb-2"><strong>Name:</strong> {selectedCampaign.name}</div>
				<div class="mb-2"><strong>Start:</strong> {selectedCampaign.start}</div>
				<div class="mb-2"><strong>End:</strong> {selectedCampaign.end}</div>
				<div class="mb-2"><strong>Budget:</strong> ${selectedCampaign.budget.toLocaleString()}</div>
				<div class="mb-2"><strong>Status:</strong> {selectedCampaign.status}</div>
				<div class="mb-2"><strong>Description:</strong> {selectedCampaign.description}</div>
				<div class="flex justify-end mt-4">
					<button type="button" class="btn btn-outline" on:click={() => showViewModal = false}>Close</button>
				</div>
			</div>
		</div>
	{/if}
</div>
