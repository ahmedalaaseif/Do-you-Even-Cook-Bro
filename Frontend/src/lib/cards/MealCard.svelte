<script>
	import { Accordion, AccordionItem, Stepper, Step } from '@skeletonlabs/skeleton';
	export let meal;
	export let description;
</script>

<div class="card p-4 m-10 card-hover overflow-hidden">
	{#if meal}
		<header>
			<img src={meal.image} alt="meal" />
		</header>
		<div class="p-4 space-y-4">
			<h3 class="h3" data-toc-ignore>{meal.name}</h3>
			<article>
				<p>
					{meal.headline}
				</p>
			</article>
			{#if description}
				<hr class="opacity-50" />
				<article>
					<p>
						You were recommended this meal
						{description.substring(0, description.length - 1)}
					</p>
				</article>
			{/if}

			<Accordion>
				<AccordionItem>
					<svelte:fragment slot="summary">Nutrition</svelte:fragment>
					<svelte:fragment slot="content">
						<ul class="list">
							<li>
								<span class="flex-auto"><b>Energy:</b> {meal.nutrition.energy}</span>
							</li>
							<li>
								<span class="flex-auto"><b>Calories:</b> {meal.nutrition.calories}</span>
							</li>
							<li>
								<span class="flex-auto"><b>Carbohydrates:</b> {meal.nutrition.carbohydrate}</span>
							</li>
							<li>
								<span class="flex-auto"><b>Protein:</b> {meal.nutrition.protein}</span>
							</li>
							<li>
								<span class="flex-auto"><b>Fiber:</b> {meal.nutrition.fiber}</span>
							</li>
							<li>
								<span class="flex-auto"><b>Vitamin A:</b> {meal.nutrition.vitaminA}</span>
							</li>
							<li>
								<span class="flex-auto"><b>Vitamin C:</b> {meal.nutrition.vitaminC}</span>
							</li>
							<li>
								<span class="flex-auto"><b>Iron:</b> {meal.nutrition.iron}</span>
							</li>
							<li>
								<span class="flex-auto"><b>Calcium:</b> {meal.nutrition.calcium}</span>
							</li>
						</ul>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary">Ingredients</svelte:fragment>
					<svelte:fragment slot="content">
						<ul class="list">
							{#each meal.ingredients as ingredient}
								<li>
									<span class="flex-auto">{ingredient}</span>
								</li>
							{/each}
						</ul>
					</svelte:fragment>
				</AccordionItem>
				<AccordionItem>
					<svelte:fragment slot="summary">Recipe Instructions</svelte:fragment>
					<svelte:fragment slot="content">
						<Stepper>
							{#each meal.instructions as instruction}
								<Step>
									{instruction}
								</Step>
							{/each}
						</Stepper>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		</div>
		<hr class="opacity-50" />
		<footer class="pt-4 px-0 flex justify-start space-x-4 flex-col">
			<div class="mb-3 span-color" style="font-size:3px;">
				<span class="chip variant-filled">{meal.tags[0].name}</span>
				<span class="chip variant-filled">{meal.tags[1].name}</span>
				<span class="chip variant-filled">{meal.tags[2].name}</span>
			</div>
			<div class="flex-auto flex justify-between items-center" style="margin:0;">
				Preperation time: {meal.prepTime.substring(2)}
			</div>
			<div class="flex-auto flex justify-center mt-5" s>
				<button type="button" class="btn" style="position:relative;">
					<span>Cook with Ratatouille</span>
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

					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 640 512 "
						style="
					position: absolute;
					top: -3px;
					right: -3px;"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
						<style>
							svg {
								fill: #ffffff;
							}
						</style><path
							d="M576 64H64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H184.4c24.2 0 46.4-13.7 57.2-35.4l32-64c8.8-17.5 26.7-28.6 46.3-28.6s37.5 11.1 46.3 28.6l32 64c10.8 21.7 33 35.4 57.2 35.4H576c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64zM96 240a64 64 0 1 1 128 0A64 64 0 1 1 96 240zm384-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
						/></svg
					>
				</button>
			</div>
		</footer>
	{/if}
</div>

<style>
	.btn {
		background-color: rgb(var(--color-surface-500)) !important;
	}
	.span-color span {
		background-color: rgb(var(--color-surface-400)) !important;
		color: white;
		margin: 5px 1px;
	}
</style>
