<script lang="ts">
	import { 
		Card, 
		Button, 
		Badge,
		Progressbar,
		Heading,
		P,
		Avatar,
		List,
		Li
	} from 'flowbite-svelte';
	import { 
		UserSolid,
		ChartSolid,
		CalendarSolid,
		BellSolid,
		TrendingUpSolid,
		ClockSolid
	} from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	
	let currentTime = $state(new Date());
	let stats = $state({
		totalTasks: 24,
		completedTasks: 18,
		activeProjects: 5,
		notifications: 3
	});
	
	let recentActivity = [
		{ id: 1, action: 'Completed task "Design Review"', time: '2 hours ago', type: 'success' },
		{ id: 2, action: 'Started new project "Mobile App"', time: '4 hours ago', type: 'info' },
		{ id: 3, action: 'Meeting with team scheduled', time: '1 day ago', type: 'warning' },
		{ id: 4, action: 'Profile updated successfully', time: '2 days ago', type: 'success' }
	];
	
	onMount(() => {
		const timer = setInterval(() => {
			currentTime = new Date();
		}, 1000);
		
		return () => clearInterval(timer);
	});
	
	$: completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100);
</script>

<svelte:head>
	<title>Dashboard - Modern PWA</title>
	<meta name="description" content="Your personal dashboard with real-time updates" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Header -->
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
		<div>
			<Heading tag="h1" class="mb-2">Dashboard</Heading>
			<P class="text-gray-500 dark:text-gray-400">
				Welcome back! Here's what's happening today.
			</P>
		</div>
		<div class="mt-4 sm:mt-0 text-right">
			<P class="text-sm text-gray-500 dark:text-gray-400">Current Time</P>
			<P class="font-mono text-lg font-semibold">
				{currentTime.toLocaleTimeString()}
			</P>
		</div>
	</div>
	
	<!-- Stats Cards -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
		<Card class="text-center">
			<div class="flex justify-center mb-3">
				<div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
					<ChartSolid class="w-6 h-6 text-blue-600 dark:text-blue-400" />
				</div>
			</div>
			<Heading tag="h3" class="text-2xl font-bold mb-1">{stats.totalTasks}</Heading>
			<P class="text-gray-500 dark:text-gray-400">Total Tasks</P>
		</Card>
		
		<Card class="text-center">
			<div class="flex justify-center mb-3">
				<div class="p-3 bg-green-100 dark:bg-green-900 rounded-full">
					<TrendingUpSolid class="w-6 h-6 text-green-600 dark:text-green-400" />
				</div>
			</div>
			<Heading tag="h3" class="text-2xl font-bold mb-1">{stats.completedTasks}</Heading>
			<P class="text-gray-500 dark:text-gray-400">Completed</P>
		</Card>
		
		<Card class="text-center">
			<div class="flex justify-center mb-3">
				<div class="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
					<CalendarSolid class="w-6 h-6 text-purple-600 dark:text-purple-400" />
				</div>
			</div>
			<Heading tag="h3" class="text-2xl font-bold mb-1">{stats.activeProjects}</Heading>
			<P class="text-gray-500 dark:text-gray-400">Active Projects</P>
		</Card>
		
		<Card class="text-center">
			<div class="flex justify-center mb-3">
				<div class="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
					<BellSolid class="w-6 h-6 text-orange-600 dark:text-orange-400" />
				</div>
			</div>
			<Heading tag="h3" class="text-2xl font-bold mb-1">{stats.notifications}</Heading>
			<P class="text-gray-500 dark:text-gray-400">Notifications</P>
		</Card>
	</div>
	
	<!-- Progress Section -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
		<Card>
			<div class="flex items-center justify-between mb-4">
				<Heading tag="h3">Task Completion</Heading>
				<Badge color="green">{completionRate}%</Badge>
			</div>
			<Progressbar progress={completionRate} size="h-3" class="mb-4" />
			<P class="text-sm text-gray-500 dark:text-gray-400">
				You've completed {stats.completedTasks} out of {stats.totalTasks} tasks this week. Great progress!
			</P>
		</Card>
		
		<Card>
			<div class="flex items-center mb-4">
				<Avatar class="mr-3" />
				<div>
					<Heading tag="h3" class="text-lg">John Doe</Heading>
					<P class="text-sm text-gray-500 dark:text-gray-400">Product Manager</P>
				</div>
			</div>
			<div class="space-y-2">
				<div class="flex justify-between text-sm">
					<span>Profile Completion</span>
					<span class="font-semibold">85%</span>
				</div>
				<Progressbar progress={85} size="h-2" />
			</div>
		</Card>
	</div>
	
	<!-- Recent Activity -->
	<Card>
		<div class="flex items-center justify-between mb-6">
			<Heading tag="h3">Recent Activity</Heading>
			<Button size="sm" outline>View All</Button>
		</div>
		
		<List tag="ul" class="space-y-4">
			{#each recentActivity as activity}
				<Li class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
					<div class="flex-shrink-0 mt-1">
						<div class="w-2 h-2 rounded-full bg-{activity.type === 'success' ? 'green' : activity.type === 'info' ? 'blue' : 'yellow'}-500"></div>
					</div>
					<div class="flex-1 min-w-0">
						<P class="font-medium">{activity.action}</P>
						<div class="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
							<ClockSolid class="w-3 h-3 mr-1" />
							{activity.time}
						</div>
					</div>
				</Li>
			{/each}
		</List>
	</Card>
</div>