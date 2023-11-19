<script>
	import MealCard from '$lib/cards/MealCard.svelte';
	import { axiosHelper } from '$lib/axiosHelper.js';
	import { RadioGroup, RadioItem, ConicGradient } from '@skeletonlabs/skeleton';
	import GIF from '$lib/giphy.webp';
	import { onMount } from 'svelte';
	let loading = true;
	let meals;
	let mealsDictionary;
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
		const res = await axiosHelper('get', 'recommendMeals/Alaa', {});
		// const res = {
		// 	data: {
		// 		meals: {
		// 			'Green Smoothie Bowl with Chia Seeds':
		// 				'because it provides a healthy dose of fiber, omega-3 fatty acids, and antioxidants which are beneficial for overall health;',
		// 			'Vegetarian Chickpea Stir-Fry':
		// 				"as it's high in plant-based protein and fiber, ideal for supporting muscle health and digestion for someone following a vegetarian diet;",
		// 			'Quinoa and Black Bean Bowl with Avocado':
		// 				'because it contains a good balance of complete proteins and healthy fats, essential for a vegetarian diet;',
		// 			'Lemon Garlic Grilled Shrimp Skewers':
		// 				'as shrimp is an excellent source of lean protein and the dish is rich in omega-3 fatty acids, which are crucial for a pescatarian diet and good for heart health;',
		// 			'Mediterranean Quinoa Salad with Grilled Chicken':
		// 				'High in protein and providing a light, refreshing meal with a variety of nutrients;',
		// 			'Quinoa and Vegetable Stir-Fry':
		// 				'because the dish is full of fiber and a variety of vitamins from the mixed vegetables, and quinoa adds a gluten-free grain that is a complete protein;',
		// 			'Ratatouille with Herbed Quinoa':
		// 				'as it offers a rich source of dietary fiber from the vegetables and the quinoa provides a gluten-free source of complete protein and complex carbohydrates;',
		// 			'Mediterranean Chickpea and Spinach Stew':
		// 				'because it provides a nutritious mix of plant-based protein, iron from the chickpeas, and calcium from the spinach, making it especially beneficial for bone health.'
		// 		},
		// 		information:
		// 			"Below is the suggested user meals and the reasons for them based on the user's dietary preferences and nutritional needs. The meals focus on including ingredients such as quinoa, chickpeas, and a variety of vegetables which are important for a vegetarian and pescatarian diet. The meals chosen also aim to utilize similar components to reduce waste and are aligned with the user's gluten-free preference."
		// 	}
		// };
		meals = res.data.meals;

		return meals;
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

			<div style="min-height: -webkit-fill-available;" class="mb-20">
				{#if mealsDictionary && meals}
					{#each Object.entries(meals) as [meal, description]}
						<MealCard meal={mealsDictionary[meal]} {description}></MealCard>
					{/each}
				{/if}
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
