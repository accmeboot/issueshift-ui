<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>
<section class='bg-neutral flex justify-between'>
	<div>
		<h1 class='text-center'>Todo</h1>
		<div class='space-y-2.5'>
			{#if data?.todo}
				{#each data?.todo as task}
					<div class="card w-96 bg-primary text-primary-content">
						<div class="card-body">
							<h2 class="card-title">{task.title}</h2>
							<p>{task.description}</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<div>
		<h1 class='text-center'>In Progress</h1>
		<div class='space-y-2.5'>
			{#if data?.inProgress}
				{#each data?.inProgress as task}
					<div class="card w-96 bg-primary text-primary-content">
						<div class="card-body">
							<h2 class="card-title">{task.title}</h2>
							<p>{task.description}</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<div>
		<h1 class='text-center'>Done</h1>
		<div class='space-y-2.5'>
			{#if data?.done}
				{#each data?.done as task}
					<div class="card w-96 bg-primary text-primary-content">
						<div class="card-body">
							<h2 class="card-title">{task.title}</h2>
							<p>{task.description}</p>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>
