<script>
	import MealCard from '$lib/cards/MealCard.svelte';
	import selectedDay from '$lib/selectedDay';
	import { axiosHelper } from '$lib/axiosHelper.js';
	import { RadioGroup, RadioItem, ConicGradient } from '@skeletonlabs/skeleton';
	import GIF from '$lib/giphy.webp';
	import { onMount } from 'svelte';
	let loading = true;

	let mealsDictionary;
	// Get the current date
	let currentDate = new Date();
	let mealPrepDays = 3;

	// Array to store the next dates
	let nextDaysArray = [];

	// Calculate the next dates and push them to the array
	for (let i = 0; i < mealPrepDays; i++) {
		let nextDate = new Date();
		nextDate.setDate(currentDate.getDate() + i + 1);

		// Extract month and day from the date
		let month = nextDate.toLocaleString('en-US', { month: 'long' });
		let day = nextDate.getDate();

		// Push an object with month and day to the array
		nextDaysArray.push({
			day: day,
			month: month,
			indexOfDay: i,
			numberOfDays: mealPrepDays,
			meals: []
		});
	}
	let dots = '';
	onMount(async () => {
		// Call the update function at regular intervals (e.g., every 500 milliseconds)
		const interval = setInterval(updateLoadingDots, 300);
		await getMealPrep();
		const res = await getMealDetails();
		if (res.status === 200) {
			mealsDictionary = res.data;
			loading = false;
		}

		// Cleanup interval on component destruction
		return () => clearInterval(interval);
	});

	function updateLoadingDots() {
		if (dots.length < 4) {
			dots += '.';
		} else {
			dots = '';
		}
	}
	const getMealPrep = async () => {
		const res = await axiosHelper('get', 'recommend/Alaa', {});
		// const res = {
		// 	data: {
		// 		information:
		// 			"Below is a 3-day dietary plan based on the given user data and meal options. The plan considers the dietary preferences and nutritional information provided; as well as the efforts to use meals with similar components to reduce waste. The breakfast 'Green Smoothie Bowl with Chia Seeds' is repeated each day to provide a consistent and nutritious start to the day. Quinoa is a recurring ingredient in many of the selected meals, which aligns with the goal of reducing waste. A variety of vegetables and protein sources are included to ensure a balanced diet. Since the user has a preference for Asian cuisine and an advanced difficulty level; meals were chosen to cater to those preferences without directly reflecting them in each day's plan.",
		// 		meals: {
		// 			'Day1;': {
		// 				'  Breakfast': 'Green Smoothie Bowl with Chia Seeds',
		// 				'  Lunch': 'Quinoa and Black Bean Bowl with Avocado',
		// 				'  Dinner': 'Lemon Garlic Grilled Shrimp Skewers'
		// 			},
		// 			'Day2;': {
		// 				'  Breakfast': 'Green Smoothie Bowl with Chia Seeds',
		// 				'  Lunch': 'Mediterranean Chickpea and Spinach Stew',
		// 				'  Dinner': 'Ratatouille with Herbed Quinoa'
		// 			},
		// 			'Day3;': {
		// 				'  Breakfast': 'Green Smoothie Bowl with Chia Seeds',
		// 				'  Lunch': 'Quinoa and Vegetable Stir-Fry',
		// 				'  Dinner': 'Stuffed Portobello Mushrooms with Spinach and Feta'
		// 			}
		// 		}
		// 	}
		// };
		let meals = res.data.meals;
		let day = 0;
		for (const key in meals) {
			for (const mealKey in meals[key]) {
				console.log(meals[key][mealKey]);
				nextDaysArray[day].meals.push(meals[key][mealKey]);
			}
			day++;
		}
		console.log(nextDaysArray);
		$selectedDay = nextDaysArray[0];
		return res;
	};
	const getMealDetails = async () => {
		const res = await axiosHelper('get', 'recipes', {});
		return res;
	};
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="mt-10 flex flex-col" class:justify-center={loading}>
		{#if loading}
			<div class="flex justify-center" style="margin-top:-200px;">
				<img style="width: 200px;" src={GIF} alt="load" />
			</div>

			<h3 id="loadingText">Ratatouille AI is cooking{dots}</h3>
		{:else}
			<h4 class="h2 text-center">AI suggested meals</h4>
			<div class="mx-10 mt-5">
				<RadioGroup class="p-0" active="variant-filled-primary" hover="hover:variant-soft-primary">
					{#each nextDaysArray as day}
						<RadioItem bind:group={$selectedDay} value={day}>
							<p>{day.month}</p>
							<p>{day.day}</p>
						</RadioItem>
					{/each}
				</RadioGroup>
			</div>

			<div style="min-height: -webkit-fill-available;" class="mb-20">
				{#if mealsDictionary}
					{#key $selectedDay}
						{#each $selectedDay.meals as meal}
							<MealCard meal={mealsDictionary[meal]}></MealCard>
						{/each}
					{/key}
				{/if}
			</div>

			<div class="py-5 order-footer justify-center flex">
				<button type="button" class="btn">
					<span>Order now</span>
					<span
						><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
							<style>
								svg {
									fill: #ffffff;
								}
							</style><path
								d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
							/></svg
						></span
					>
				</button>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	:global(.variant-filled-primary) {
		background-color: rgb(var(--color-surface-300)) !important;
		font-weight: 600;
	}
	.btn {
		background-color: rgb(var(--color-surface-500)) !important;
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
