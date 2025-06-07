<script lang="ts">
	import { page } from '$app/stores';
	import { 
		Navbar, 
		NavBrand, 
		NavLi, 
		NavUl, 
		NavHamburger,
		DarkMode,
		Button
	} from 'flowbite-svelte';
	import { 
		HomeSolid, 
		UserSolid, 
		CogSolid,
		BellSolid
	} from 'flowbite-svelte-icons';
</script>

<Navbar let:hidden let:toggle class="px-2 sm:px-4 py-2.5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
	<NavBrand href="/" class="flex items-center">
		<img src="/favicon.svg" class="mr-3 h-6 sm:h-9" alt="PWA Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Modern PWA
		</span>
	</NavBrand>
	
	<div class="flex items-center lg:order-2 space-x-2">
		<Button color="light" size="sm" class="p-2">
			<BellSolid class="w-4 h-4" />
		</Button>
		<DarkMode />
		<NavHamburger on:click={toggle} />
	</div>
	
	<NavUl {hidden} class="order-1">
		<NavLi href="/" active={$page.url.pathname === '/'}>
			<HomeSolid class="w-4 h-4 mr-2" />
			Home
		</NavLi>
		<NavLi href="/dashboard" active={$page.url.pathname === '/dashboard'}>
			<UserSolid class="w-4 h-4 mr-2" />
			Dashboard
		</NavLi>
		<NavLi href="/settings" active={$page.url.pathname === '/settings'}>
			<CogSolid class="w-4 h-4 mr-2" />
			Settings
		</NavLi>
	</NavUl>
</Navbar>