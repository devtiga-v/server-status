<script lang="ts">
	let apiEndpoints = $state<any[]>([]);
	let loading = $state(true);

	let websiteName = import.meta.env.VITE_WEBSITE;
	let websiteUrl = 'https://' + websiteName;

	$effect(() => {
		const fetchData = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response = await fetch('/api/get-data');
				apiEndpoints = await response.json();
			} catch (error) {
				console.error('Failed to fetch API endpoints:', error);
			} finally {
				loading = false;
			}
		};

		fetchData();
	});

	function getStatusColor(status: string): string {
		switch (status) {
			case 'Operational':
				return 'bg-green-500';
			case 'Degraded Performance':
				return 'bg-yellow-500';
			case 'Outage':
				return 'bg-red-500';
			default:
				return 'bg-gray-500';
		}
	}
</script>

<main class="container mx-auto max-w-3xl p-4">
	<h1 class="mb-6 text-center text-3xl font-bold">API Status Dashboard</h1>
	<a href={websiteUrl} target="_blank" class="text-lg font-bold text-slate-600">{websiteName}</a>

	{#if loading}
		<div class="flex h-64 items-center justify-center">
			<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
		</div>
	{:else}
		<div class="overflow-hidden rounded-lg bg-white shadow-md">
			<div class="grid grid-cols-3 bg-gray-100 p-4 font-semibold">
				<div>API Endpoint</div>
				<div>Status</div>
				<div>Monthly Downtime</div>
			</div>
			{#if apiEndpoints.length === 0}
				<p class="text-center text-gray-600">No data available</p>
			{/if}

			{#each apiEndpoints as endpoint}
				<div class="grid grid-cols-3 border-b p-4 last:border-b-0">
					<div>{endpoint.name}</div>
					<div>
						<span
							class={`mr-2 inline-block h-3 w-3 rounded-full ${getStatusColor(endpoint.status)}`}
						></span>
						{endpoint.status}
					</div>
					<div>{endpoint.responseTime}</div>
				</div>
			{/each}
		</div>
	{/if}

	<p class="mt-6 text-center text-gray-600">
		Last updated: {new Date().toLocaleString()}
	</p>
</main>

<style>
	:global(body) {
		background-color: #f3f4f6;
	}
</style>
