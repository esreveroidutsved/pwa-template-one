<script lang="ts">
	import { 
		Card, 
		Button, 
		Badge,
		Timeline,
		TimelineItem,
		Heading,
		P,
		Span
	} from 'flowbite-svelte';
	import { 
		RocketSolid,
		DevicesSolid,
		CloudSolid,
		ShieldSolid,
		SparklesSolid,
		ArrowRightOutline
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	
	let isOnline = $state(true);
	let installPrompt: any = $state(null);
	let isInstallable = $state(false);
	
	onMount(() => {
		// Check online status
		isOnline = navigator.onLine;
		
		const updateOnlineStatus = () => {
			isOnline = navigator.onLine;
		};
		
		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);
		
		// PWA install prompt
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			installPrompt = e;
			isInstallable = true;
		};
		
		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		
		return () => {
			window.removeEventListener('online', updateOnlineStatus);
			window.removeEventListener('offline', updateOnlineStatus);
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	});
	
	const handleInstall = async () => {
		if (!installPrompt) return;
		
		installPrompt.prompt();
		const { outcome } = await installPrompt.userChoice;
		
		if (outcome === 'accepted') {
			isInstallable = false;
			installPrompt = null;
		}
	};
	
	const features = [
		{
			icon: RocketSolid,
			title: 'Lightning Fast',
			description: 'Built with SvelteKit for optimal performance and minimal bundle size'
		},
		{
			icon: DevicesSolid,
			title: 'Cross-Platform',
			description: 'Works seamlessly across all devices and operating systems'
		},
		{
			icon: CloudSolid,
			title: 'Offline Ready',
			description: 'Full offline functionality with intelligent caching strategies'
		},
		{
			icon: ShieldSolid,
			title: 'Secure',
			description: 'HTTPS-first with modern security best practices'
		}
	];
</script>

<svelte:head>
	<title>Modern PWA - Home</title>
	<meta name="description" content="A modern Progressive Web App built with SvelteKit" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Hero Section -->
	<div class="text-center mb-12">
		<div class="flex justify-center mb-6">
			<div class="p-4 bg-primary-100 dark:bg-primary-900 rounded-full">
				<SparklesSolid class="w-12 h-12 text-primary-600 dark:text-primary-400" />
			</div>
		</div>
		
		<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold md:text-5xl lg:text-6xl">
			Welcome to Your
			<Span gradient>Modern PWA</Span>
		</Heading>
		
		<P class="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 max-w-2xl mx-auto">
			Experience the future of web applications with our cutting-edge Progressive Web App built on SvelteKit, featuring offline capabilities, push notifications, and native-like performance.
		</P>
		
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<Button href="/dashboard" size="lg" class="w-full sm:w-auto">
				Get Started
				<ArrowRightOutline class="w-4 h-4 ml-2" />
			</Button>
			
			{#if isInstallable}
				<Button color="alternative" size="lg" on:click={handleInstall} class="w-full sm:w-auto">
					Install App
				</Button>
			{/if}
		</div>
		
		<!-- Status Indicators -->
		<div class="flex justify-center gap-4 mt-6">
			<Badge color={isOnline ? 'green' : 'red'} class="flex items-center gap-2">
				<div class="w-2 h-2 rounded-full bg-current"></div>
				{isOnline ? 'Online' : 'Offline'}
			</Badge>
			
			{#if 'serviceWorker' in navigator}
				<Badge color="blue" class="flex items-center gap-2">
					<div class="w-2 h-2 rounded-full bg-current"></div>
					PWA Ready
				</Badge>
			{/if}
		</div>
	</div>
	
	<!-- Features Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
		{#each features as feature}
			<Card class="text-center hover:shadow-lg transition-shadow duration-300">
				<div class="flex justify-center mb-4">
					<div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
						<svelte:component this={feature.icon} class="w-8 h-8 text-primary-600 dark:text-primary-400" />
					</div>
				</div>
				<Heading tag="h3" class="mb-2">{feature.title}</Heading>
				<P class="text-gray-500 dark:text-gray-400">{feature.description}</P>
			</Card>
		{/each}
	</div>
	
	<!-- Timeline Section -->
	<Card class="mb-8">
		<Heading tag="h2" class="mb-6 text-center">Getting Started</Heading>
		<Timeline>
			<TimelineItem title="Install the App" date="Step 1">
				<P class="text-base font-normal text-gray-500 dark:text-gray-400">
					Click the install button or use your browser's install prompt to add this PWA to your device.
				</P>
			</TimelineItem>
			<TimelineItem title="Explore Features" date="Step 2">
				<P class="text-base font-normal text-gray-500 dark:text-gray-400">
					Navigate through the dashboard and settings to discover all available features and customization options.
				</P>
			</TimelineItem>
			<TimelineItem title="Go Offline" date="Step 3">
				<P class="text-base font-normal text-gray-500 dark:text-gray-400">
					Try disconnecting from the internet - the app will continue to work seamlessly with cached content.
				</P>
			</TimelineItem>
		</Timeline>
	</Card>
	
	<!-- Quick Actions -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		<Card class="hover:shadow-md transition-shadow duration-200">
			<div class="flex items-center justify-between">
				<div>
					<Heading tag="h3" class="text-lg mb-1">Dashboard</Heading>
					<P class="text-sm text-gray-500">View your personal dashboard</P>
				</div>
				<Button href="/dashboard" size="sm" outline>View</Button>
			</div>
		</Card>
		
		<Card class="hover:shadow-md transition-shadow duration-200">
			<div class="flex items-center justify-between">
				<div>
					<Heading tag="h3" class="text-lg mb-1">Settings</Heading>
					<P class="text-sm text-gray-500">Customize your experience</P>
				</div>
				<Button href="/settings" size="sm" outline>Configure</Button>
			</div>
		</Card>
		
		<Card class="hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1">
			<div class="flex items-center justify-between">
				<div>
					<Heading tag="h3" class="text-lg mb-1">About</Heading>
					<P class="text-sm text-gray-500">Learn more about this PWA</P>
				</div>
				<Button href="/about" size="sm" outline>Learn</Button>
			</div>
		</Card>
	</div>
</div>