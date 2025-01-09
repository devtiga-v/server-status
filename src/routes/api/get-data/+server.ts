export const GET = async () => {
	const apiEndpoints = [
		{ name: 'API', status: 'Operational', responseTime: 'N/A' },
		{ name: 'Data Cache', status: 'Operational', responseTime: 'N/A' },
		{ name: 'DNS', status: 'Operational', responseTime: 'N/A' },
		{ name: 'Middleware', status: 'Operational', responseTime: 'N/A' },
		{ name: 'Remote Caching', status: 'Operational', responseTime: 'N/A' },
		{ name: 'Firewall', status: 'Operational', responseTime: 'N/A' },
		{ name: 'Server', status: 'Operational', responseTime: 'N/A' },
		{ name: 'Network', status: 'Operational', responseTime: 'N/A' },
		{ name: 'Storage', status: 'Operational', responseTime: 'N/A' }
	];

	return new Response(JSON.stringify(apiEndpoints), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
