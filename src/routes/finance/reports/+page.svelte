<script lang="ts">
			import Button from '$lib/components/Button.svelte';
				let excelError = '';
				let excelLoading = false;
				async function downloadExcel() {
					excelError = '';
					excelLoading = true;
					try {
						if (!reportData) {
							excelLoading = false;
							return;
						}
						let XLSX;
						try {
							XLSX = await import('xlsx/xlsx.mjs');
						} catch (esmErr) {
							try {
								XLSX = await import('xlsx');
							} catch (cjsErr) {
								excelError = 'Failed to load Excel module (both ESM and CJS).';
								excelLoading = false;
								console.error('Excel module import errors:', esmErr, cjsErr);
								return;
							}
						}
						try {
							const ws = XLSX.utils.json_to_sheet(reportData.map(r => ({ Category: r.category, Amount: r.amount })));
							const wb = XLSX.utils.book_new();
							XLSX.utils.book_append_sheet(wb, ws, 'Report');
							XLSX.writeFile(wb, `financial_report_${startDate}_${endDate}.xlsx`);
						} catch (excelErr) {
							excelError = 'Failed to generate or save Excel file.';
							console.error('Excel file error:', excelErr);
						}
					} catch (err) {
						excelError = 'Unexpected error during Excel export.';
						console.error('Excel export error:', err);
					} finally {
						excelLoading = false;
					}
				}
			// @ts-ignore
			import jsPDF from 'jspdf/dist/jspdf.umd.min.js';
				// @ts-ignore
				import 'jspdf-autotable';
	function downloadPDF() {
		if (!reportData) return;
		const doc = new jsPDF();
		doc.text('Financial Report', 14, 18);
		doc.text(`Type: ${reportType}`, 14, 26);
		doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 34);
		doc.autoTable({
			startY: 40,
			head: [['Category', 'Amount']],
			body: reportData.map(r => [r.category, `$${r.amount.toLocaleString()}`]),
			theme: 'grid',
			styles: { fontSize: 12 },
			headStyles: { fillColor: [37, 99, 235] }
		});
		doc.save(`financial_report_${startDate}_${endDate}.pdf`);
	}
		let reportType = 'Summary';
		let startDate = '';
		let endDate = '';
		let loading = false;
			type ReportRow = { category: string; amount: number };
			let reportData: ReportRow[] | null = null;
		let error = '';
			let reportRef: HTMLDivElement | null = null;

		function generateReport() {
			error = '';
			if (!startDate || !endDate) {
				error = 'Please select a date range.';
				return;
			}
			loading = true;
			setTimeout(() => {
				// Simulate report data
				reportData = [
					{ category: 'Sales', amount: 120000 },
					{ category: 'Expenses', amount: 45000 },
					{ category: 'Profit', amount: 75000 }
				];
				loading = false;
			}, 1200);
		}

		function downloadCSV() {
			if (!reportData) return;
			const header = 'Category,Amount\n';
			const rows = reportData.map(r => `${r.category},${r.amount}`).join('\n');
			const csv = header + rows;
			const blob = new Blob([csv], { type: 'text/csv' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `financial_report_${startDate}_${endDate}.csv`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}

		function printReport() {
			if (!reportRef) return;
			const printContents = reportRef.innerHTML;
				const win = window.open('', '', 'width=800,height=600');
				if (win) {
					win.document.write('<html><head><title>Print Report</title>');
					win.document.write('<link rel="stylesheet" href="/src/app.css">');
					win.document.write('</head><body>');
					win.document.write(printContents);
					win.document.write('</body></html>');
					win.document.close();
					win.focus();
					win.print();
					win.close();
				}
		}
</script>

<div class="rnd-dashboard-bg">
	<div class="rnd-projects-card" style="max-width: 520px; margin: 0 auto;">
		<div class="rnd-projects-header">
			<h2 class="text-lg font-semibold text-brand-dark">Generate Report</h2>
		</div>
		<div style="padding: 2rem;">
			<form on:submit|preventDefault={generateReport}>
				<div class="form-group mb-3">
					<label class="form-label" for="reportType">Report Type</label>
					<select class="form-select" id="reportType" bind:value={reportType}>
						<option>Summary</option>
						<option>Detailed</option>
						<option>Custom</option>
					</select>
				</div>
				<div class="form-group mb-3">
					<label class="form-label" for="startDate">Start Date</label>
					<input class="form-input" type="date" id="startDate" bind:value={startDate} />
				</div>
				<div class="form-group mb-3">
					<label class="form-label" for="endDate">End Date</label>
					<input class="form-input" type="date" id="endDate" bind:value={endDate} />
				</div>
				{#if error}
					<div class="text-error text-sm mb-2">{error}</div>
				{/if}
				<div class="flex items-center justify-end gap-4 mt-6">
					<Button variant="primary" type="submit" disabled={loading}>Generate Report</Button>
				</div>
			</form>
		</div>
	</div>

	{#if loading}
		<div class="text-center mt-8">
			<span class="loading"></span>
			<div class="mt-2 text-gray-500">Generating report...</div>
		</div>
	{/if}

	<div class="rnd-projects-card mt-8" style="max-width: 520px; margin: 0 auto;" bind:this={reportRef}>
		{#if excelError}
			<div class="text-error text-sm mb-2">{excelError}</div>
		{/if}
		<div class="rnd-projects-header">
			<h2 class="text-lg font-semibold text-brand-dark">Report Results</h2>
			<div class="flex items-center gap-2">
				<Button variant="secondary" size="sm" on:click={() => reportData ? downloadCSV() : error = 'Please generate a report first.'}>Download CSV</Button>
				<Button variant="secondary" size="sm" on:click={() => reportData ? downloadExcel() : error = 'Please generate a report first.'} disabled={excelLoading}>
					{#if excelLoading}
						<span class="loading"></span>
						<span>Exporting...</span>
					{:else}
						Export to Excel
					{/if}
				</Button>
				<Button variant="secondary" size="sm" on:click={() => reportData ? downloadPDF() : error = 'Please generate a report first.'}>Download PDF</Button>
				<Button variant="secondary" size="sm" on:click={() => reportData ? printReport() : error = 'Please generate a report first.'}>Print</Button>
			</div>
		</div>
		<div style="padding: 2rem;">
			{#if reportData}
				<table class="table w-full">
					<thead>
						<tr>
							<th>Category</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{#each reportData as row}
							<tr>
								<td>{row.category}</td>
								<td>${row.amount.toLocaleString()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<div class="text-gray-400 text-sm">No report generated yet. Please select a date range and click Generate Report.</div>
			{/if}
		</div>
	</div>
</div>
