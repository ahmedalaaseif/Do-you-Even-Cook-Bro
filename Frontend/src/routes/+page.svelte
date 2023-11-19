<script>
	import { axiosHelper } from '$lib/axiosHelper.js';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { fade } from 'svelte/transition';
	import { TabGroup, Tab, InputChip } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let currentUser;
	let tabSet = 0;
	let cols = [[1100, 2]];
	let items;
	let formattedDate = '';
	let greeting = '';
	const options = { weekday: 'long', month: 'long', day: 'numeric' };
	const currentDate = new Date();
	formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

	// Determine whether it's morning, afternoon, or evening
	const currentHour = currentDate.getHours();
	if (currentHour >= 0 && currentHour < 12) {
		greeting = 'Good Morning';
	} else if (currentHour >= 12 && currentHour < 18) {
		greeting = 'Good Afternoon';
	} else {
		greeting = 'Good Evening';
	}
	function camelCaseToReadable(camelCaseString) {
		// Insert a space before all capital letters
		const spacedString = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');

		// Capitalize the first letter
		return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
	}

	onMount(async () => {
		await getUserData();
	});

	const getUserData = async () => {
		const res = await axiosHelper('get', 'users/Alaa', {});

		currentUser = res.data;
		const id = () => '_' + Math.random().toString(36).substr(2, 9);
		let layoutArray = [];
		let keyIndex = 0;
		for (const key in currentUser) {
			if (currentUser[key]?.value) {
				layoutArray.push({
					2: gridHelp.item({
						x: keyIndex % 2,
						y: Math.floor(keyIndex / 2),
						w: 1,
						h: 1,
						resizable: false,
						name: camelCaseToReadable(key),
						id: key,
						value: currentUser[key].value,
						unit: currentUser[key].unit,
						level: currentUser[key].level
					}),
					id: id()
				});
				keyIndex++;
			}
		}
		let layoutOriginal = layoutArray;

		let layout = layoutOriginal;

		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('layout')) {
				localStorage.setItem('layout', JSON.stringify(layoutOriginal));
			} else {
				layout = JSON.parse(localStorage.getItem('layout'));
			}
		}

		items = layout;
	};
	const onChange = () => {
		localStorage.setItem('layout', JSON.stringify(items));
	};
	function toggle(group, flavor) {
		currentUser[group][flavor] = !currentUser[group][flavor];
	}
	const updateUserData = async () => {
		await axiosHelper('put', 'users/Alaa', currentUser);
	};
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="space-y-10 mt-10 flex flex-col w-full mb-5">
		{#if currentUser}
			<h2 in:fade={{ delay: 0 }} class="h2 text-center">{greeting} {currentUser.name}</h2>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<TabGroup class="mx-5">
				<Tab bind:group={tabSet} name="tab1" value={0}>Body Metrics</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}>Preferences</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						<div class="size mb-5">
							<Grid
								fillSpace={false}
								bind:items
								rowHeight={120}
								let:item
								{cols}
								let:index
								on:change={onChange}
							>
								<div class="demo-widget">
									<div class="card grid-card p-4">
										<h6 class="text-center">{item.name}</h6>
										<p
											class="text-center"
											class:red={item.level === 1}
											class:orange={item.level === 2}
											class:green={item.level === 3}
										>
											{item.value}
											{item.unit}
										</p>
									</div>
								</div>
							</Grid>
						</div>
						<div class="flex justify-center">
							<button on:click={() => getUserData()} type="button" class="btn">
								<span>Sync metrics</span>
								<span
									><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
										<style>
											svg {
												fill: #ffffff;
											}
										</style><path
											d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
										/></svg
									></span
								>
							</button>
						</div>
					{:else if tabSet === 1}
						<h1 class="mb-3 mt-5">Dietary Preferences</h1>
						{#each Object.keys(currentUser.dietaryPreferences) as f}
							<span
								class="chip {currentUser.dietaryPreferences[f] ? 'variant-filled' : 'variant-soft'}"
								on:click={() => {
									toggle('dietaryPreferences', f);
								}}
								on:keypress
							>
								<span>{camelCaseToReadable(f)}</span>
							</span>
						{/each}
						<h1 class="mb-3 mt-5">Allergen Filters</h1>
						{#each Object.keys(currentUser.allergenFilters) as f}
							<span
								class="chip {currentUser.allergenFilters[f] ? 'variant-filled' : 'variant-soft'}"
								on:click={() => {
									toggle('allergenFilters', f);
								}}
								on:keypress
							>
								<span>{camelCaseToReadable(f)}</span>
							</span>
						{/each}
						<h1 class="mb-3 mt-5">Cuisine Type</h1>
						{#each Object.keys(currentUser.cuisineType) as f}
							<span
								class="chip {currentUser.cuisineType[f] ? 'variant-filled' : 'variant-soft'}"
								on:click={() => {
									toggle('cuisineType', f);
								}}
								on:keypress
							>
								<span>{camelCaseToReadable(f)}</span>
							</span>
						{/each}
						<h1 class="mb-3 mt-5">Difficulty Level</h1>
						{#each Object.keys(currentUser.difficultyLevel) as f}
							<span
								class="chip {currentUser.difficultyLevel[f] ? 'variant-filled' : 'variant-soft'}"
								on:click={() => {
									toggle('difficultyLevel', f);
								}}
								on:keypress
							>
								<span>{camelCaseToReadable(f)}</span>
							</span>
						{/each}
						<h1 class="mb-3 mt-5">Cooking Time</h1>
						{#each Object.keys(currentUser.cookingTime) as f}
							<span
								class="chip {currentUser.cookingTime[f] ? 'variant-filled' : 'variant-soft'}"
								on:click={() => {
									toggle('cookingTime', f);
								}}
								on:keypress
							>
								<span>{camelCaseToReadable(f)}</span>
							</span>
						{/each}
						<h1 class="mt-5">Specific Ingredients</h1>

						<InputChip
							bind:value={currentUser.specificIngredients}
							name="ingredients"
							class="mt-3 mb-10"
							placeholder="Enter any ingredient..."
						/>
						<div class="flex justify-center">
							<button on:click={() => updateUserData()} type="button" class="btn">
								<span>Update preferences</span>
								<span
									><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
										<style>
											svg {
												fill: #ffffff;
											}
										</style><path
											d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
										/></svg
									></span
								>
							</button>
						</div>
					{/if}
				</svelte:fragment>
			</TabGroup>
		{/if}
	</div>
</div>

<style lang="postcss">
	.green {
		color: green;
	}
	.orange {
		color: orange;
	}
	.red {
		color: red;
	}
	.btn {
		background-color: rgb(var(--color-surface-500)) !important;
	}
	.chip {
		margin: 5px 3px;
	}
	:global(.svlt-grid-shadow) {
		/* Back shadow */
		background: rgb(var(--color-surface-500)) !important;
		border-radius: var(--theme-rounded-container);
	}
	.grid-card {
		height: 100px;
		/* background: rgb(var(--color-surface-300)) !important; */
	}
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation:
			pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
