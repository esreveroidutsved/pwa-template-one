<script lang="ts">
	import { 
		Card, 
		Button, 
		Toggle,
		Select,
		Label,
		Input,
		Heading,
		P,
		Hr,
		Badge
	} from 'flowbite-svelte';
	import { 
		CogSolid,
		BellSolid,
		PaletteSolid,
		ShieldSolid,
		GlobeSolid
	} from 'flowbite-svelte-icons';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	
	let settings = $state({
		notifications: true,
		darkMode: false,
		language: 'en',
		autoSync: true,
		offlineMode: true,
		dataUsage: 'normal'
	});
	
	let notificationPermission = $state('default');
	let storageUsage = $state({ used: 0, quota: 0 });
	
	const languages = [
		{ value: 'en', name: 'English' },
		{ value: 'es', name: 'Español' },
		{ value: 'fr', name: 'Français' },
		{ value: 'de', name: 'Deutsch' }
	];
	
	const dataUsageOptions = [
		{ value: 'low', name: 'Low - Minimal data usage' },
		{ value: 'normal', name: 'Normal - Balanced performance' },
		{ value: 'high', name: 'High - Best experience' }
	];
	
	onMount(async () => {
		if (browser) {
			// Check notification permission
			if ('Notification' in window) {
				notificationPermission = Notification.permission;
			}
			
			// Check storage usage
			if ('storage' in navigator && 'estimate' in navigator.storage) {
				const estimate = await navigator.storage.estimate();
				storageUsage = {
					used: Math.round((estimate.usage || 0) / 1024 / 1024 * 100) / 100,
					quota: Math.round((estimate.quota || 0) / 1024 / 1024 / 1024 * 100) / 100
				};
			}
		}
	});
	
	const requestNotificationPermission = async () => {
		if ('Notification' in window) {
			const permission = await Notification.requestPermission();
			notificationPermission = permission;
			if (permission === 'granted') {
				settings.notifications = true;
			}
		}
	};
	
	const clearCache = async () => {
		if ('caches' in window) {
			const cacheNames = await caches.keys();
			await Promise.all(cacheNames.map(name => caches.delete(name)));
			
			// Refresh storage usage
			if ('storage' in navigator && 'estimate' in navigator.storage) {
				const estimate = await navigator.storage.estimate();
				storageUsage = {
					used: Math.round((estimate.usage || 0) / 1024 / 1024 * 100) / 100,
					quota: Math.round((estimate.quota || 0) / 1024 / 1024 / 1024 * 100) / 100
				};
			}
		}
	};
	
	const saveSettings = () => {
		if (browser) {
			localStorage.setItem('pwa-settings', JSON.stringify(settings));
		}
	};
	
	$: if (browser) {
		saveSettings();
	}
</script>

<svelte:head>
	<title>Settings - Modern PWA</title>
	<meta name="description" content="Customize your PWA experience" />
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<div class="mb-8">
		<Heading tag="h1" class="mb-2">Settings</Heading>
		<P class="text-gray-500 dark:text-gray-400">
			Customize your app experience and manage preferences.
		</P>
	</div>
	
	<!-- Notifications Settings -->
	<Card class="mb-6">
		<div class="flex items-center mb-4">
			<BellSolid class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
			<Heading tag="h3">Notifications</Heading>
		</div>
		
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div>
					<Label class="font-medium">Push Notifications</Label>
					<P class="text-sm text-gray-500 dark:text-gray-400">
						Receive notifications even when the app is closed
					</P>
				</div>
				<div class="flex items-center space-x-2">
					{#if notificationPermission === 'denied'}
						<Badge color="red">Blocked</Badge>
					{:else if notificationPermission === 'granted'}
						<Badge color="green">Allowed</Badge>
						<Toggle bind:checked={settings.notifications} />
					{:else}
						<Button size="sm" on:click={requestNotificationPermission}>
							Enable
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</Card>
	
	<!-- Appearance Settings -->
	<Card class="mb-6">
		<div class="flex items-center mb-4">
			<PaletteSolid class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
			<Heading tag="h3">Appearance</Heading>
		</div>
		
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div>
					<Label class="font-medium">Dark Mode</Label>
					<P class="text-sm text-gray-500 dark:text-gray-400">
						Switch between light and dark themes
					</P>
				</div>
				<Toggle bind:checked={settings.darkMode} />
			</div>
			
			<Hr />
			
			<div>
				<Label for="language" class="mb-2 font-medium">Language</Label>
				<Select id="language" bind:value={settings.language} items={languages} />
			</div>
		</div>
	</Card>
	
	<!-- Data & Storage Settings -->
	<Card class="mb-6">
		<div class="flex items-center mb-4">
			<GlobeSolid class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
			<Heading tag="h3">Data & Storage</Heading>
		</div>
		
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div>
					<Label class="font-medium">Auto Sync</Label>
					<P class="text-sm text-gray-500 dark:text-gray-400">
						Automatically sync data when online
					</P>
				</div>
				<Toggle bind:checked={settings.autoSync} />
			</div>
			
			<div class="flex items-center justify-between">
				<div>
					<Label class="font-medium">Offline Mode</Label>
					<P class="text-sm text-gray-500 dark:text-gray-400">
						Cache content for offline access
					</P>
				</div>
				<Toggle bind:checked={settings.offlineMode} />
			</div>
			
			<Hr />
			
			<div>
				<Label for="dataUsage" class="mb-2 font-medium">Data Usage</Label>
				<Select id="dataUsage" bind:value={settings.dataUsage} items={dataUsageOptions} />
			</div>
			
			<Hr />
			
			<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
				<div class="flex justify-between items-center mb-2">
					<Label class="font-medium">Storage Usage</Label>
					<Button size="sm" outline on:click={clearCache}>Clear Cache</Button>
				</div>
				<P class="text-sm text-gray-500 dark:text-gray-400 mb-2">
					Used: {storageUsage.used} MB of {storageUsage.quota} GB available
				</P>
				<div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
					<div 
						class="bg-blue-600 h-2 rounded-full" 
						style="width: {storageUsage.quota > 0 ? (storageUsage.used / (storageUsage.quota * 1024)) * 100 : 0}%"
					></div>
				</div>
			</div>
		</div>
	</Card>
	
	<!-- Privacy & Security -->
	<Card class="mb-6">
		<div class="flex items-center mb-4">
			<ShieldSolid class="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
			<Heading tag="h3">Privacy & Security</Heading>
		</div>
		
		<div class="space-y-4">
			<div>
				<Label for="dataRetention" class="mb-2 font-medium">Data Retention</Label>
				<P class="text-sm text-gray-500 dark:text-gray-400 mb-2">
					How long should we keep your data?
				</P>
				<Select id="dataRetention" items={[
					{ value: '30', name: '30 days' },
					{ value: '90', name: '90 days' },
					{ value: '365', name: '1 year' },
					{ value: 'forever', name: 'Forever' }
				]} />
			</div>
			
			<Hr />
			
			<div class="flex justify-between items-center">
				<div>
					<Label class="font-medium text-red-600 dark:text-red-400">Reset All Settings</Label>
					<P class="text-sm text-gray-500 dark:text-gray-400">
						This will reset all settings to their default values
					</P>
				</div>
				<Button color="red" outline size="sm">Reset</Button>
			</div>
		</div>
	</Card>
	
	<!-- Save Button -->
	<div class="flex justify-end">
		<Button on:click={saveSettings}>
			<CogSolid class="w-4 h-4 mr-2" />
			Save Settings
		</Button>
	</div>
</div>