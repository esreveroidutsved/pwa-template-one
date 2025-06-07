<script lang="ts">
	import { 
		Card, 
		Button, 
		Badge,
		Heading,
		P,
		List,
		Li,
		Hr
	} from 'flowbite-svelte';
	import { 
		InfoCircleSolid,
		CodeBranchSolid,
		GithubSolid,
		ExternalLinkOutline
	} from 'flowbite-svelte-icons';
	
	const technologies = [
		{ name: 'SvelteKit', version: '2.16.0', description: 'Full-stack web framework' },
		{ name: 'Vite PWA', version: '0.21.1', description: 'Progressive Web App capabilities' },
		{ name: 'Flowbite Svelte', version: '1.5.6', description: 'UI component library' },
		{ name: 'Tailwind CSS', version: '4.0.0', description: 'Utility-first CSS framework' },
		{ name: 'TypeScript', version: '5.0.0', description: 'Type-safe JavaScript' }
	];
	
	const features = [
		'🚀 Lightning-fast performance with SvelteKit',
		'📱 Progressive Web App with offline support',
		'🎨 Modern UI with Flowbite components',
		'🌙 Dark mode support',
		'📊 Real-time dashboard updates',
		'🔔 Push notification support',
		'💾 Intelligent caching strategies',
		'🔒 Secure HTTPS-first approach',
		'📱 Responsive design for all devices',
		'⚡ Service Worker for offline functionality'
	];
</script>

<svelte:head>
	<title>About - Modern PWA</title>
	<meta name="description" content="Learn about this modern Progressive Web App" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<div class="text-center mb-8">
		<div class="flex justify-center mb-4">
			<div class="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
				<InfoCircleSolid class="w-12 h-12 text-blue-600 dark:text-blue-400" />
			</div>
		</div>
		<Heading tag="h1" class="mb-4">About This PWA</Heading>
		<P class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
			A modern Progressive Web App showcasing the latest web technologies and best practices for creating native-like experiences on the web.
		</P>
	</div>
	
	<!-- Features -->
	<Card class="mb-8">
		<Heading tag="h2" class="mb-4">Features</Heading>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
			{#each features as feature}
				<div class="flex items-center space-x-2">
					<span class="text-lg">{feature.split(' ')[0]}</span>
					<span class="text-gray-700 dark:text-gray-300">{feature.substring(feature.indexOf(' ') + 1)}</span>
				</div>
			{/each}
		</div>
	</Card>
	
	<!-- Technology Stack -->
	<Card class="mb-8">
		<div class="flex items-center mb-4">
			<CodeBranchSolid class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
			<Heading tag="h2">Technology Stack</Heading>
		</div>
		
		<div class="space-y-4">
			{#each technologies as tech}
				<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<div>
						<div class="flex items-center space-x-2">
							<span class="font-semibold">{tech.name}</span>
							<Badge color="blue">v{tech.version}</Badge>
						</div>
						<P class="text-sm text-gray-500 dark:text-gray-400 mt-1">
							{tech.description}
						</P>
					</div>
				</div>
			{/each}
		</div>
	</Card>
	
	<!-- PWA Capabilities -->
	<Card class="mb-8">
		<Heading tag="h2" class="mb-4">PWA Capabilities</Heading>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<Heading tag="h3" class="text-lg mb-2">Offline Support</Heading>
				<P class="text-gray-500 dark:text-gray-400 mb-4">
					The app works seamlessly offline with intelligent caching of resources and data.
				</P>
				
				<Heading tag="h3" class="text-lg mb-2">Installable</Heading>
				<P class="text-gray-500 dark:text-gray-400">
					Can be installed on any device and launched like a native app.
				</P>
			</div>
			
			<div>
				<Heading tag="h3" class="text-lg mb-2">Push Notifications</Heading>
				<P class="text-gray-500 dark:text-gray-400 mb-4">
					Receive notifications even when the app is not actively running.
				</P>
				
				<Heading tag="h3" class="text-lg mb-2">Responsive Design</Heading>
				<P class="text-gray-500 dark:text-gray-400">
					Optimized for all screen sizes from mobile to desktop.
				</P>
			</div>
		</div>
	</Card>
	
	<!-- Performance -->
	<Card class="mb-8">
		<Heading tag="h2" class="mb-4">Performance Metrics</Heading>
		
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
			<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
				<div class="text-2xl font-bold text-green-600 dark:text-green-400">95+</div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Lighthouse Score</div>
			</div>
			<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
				<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">&lt;1s</div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Load Time</div>
			</div>
			<div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
				<div class="text-2xl font-bold text-purple-600 dark:text-purple-400">&lt;100kb</div>
				<div class="text-sm text-gray-500 dark:text-gray-400">Bundle Size</div>
			</div>
			<div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
				<div class="text-2xl font-bold text-orange-600 dark:text-orange-400">100%</div>
				<div class="text-sm text-gray-500 dark:text-gray-400">PWA Ready</div>
			</div>
		</div>
	</Card>
	
	<!-- Links -->
	<Card>
		<Heading tag="h2" class="mb-4">Learn More</Heading>
		
		<div class="space-y-3">
			<Button href="https://kit.svelte.dev" target="_blank" outline class="w-full justify-between">
				<span>SvelteKit Documentation</span>
				<ExternalLinkOutline class="w-4 h-4" />
			</Button>
			
			<Button href="https://vite-pwa-org.netlify.app" target="_blank" outline class="w-full justify-between">
				<span>Vite PWA Guide</span>
				<ExternalLinkOutline class="w-4 h-4" />
			</Button>
			
			<Button href="https://flowbite-svelte.com" target="_blank" outline class="w-full justify-between">
				<span>Flowbite Svelte Components</span>
				<ExternalLinkOutline class="w-4 h-4" />
			</Button>
		</div>
	</Card>
</div>