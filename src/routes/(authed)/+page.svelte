<script lang="ts">
	import type { PageData } from './$types'
	import { toastStore } from '$lib/stores'
	import { onMount } from 'svelte'

	export let data: PageData

	onMount(() => {
		return () => {
			toastStore.clear()
		}
	})

	$: if (data?.exception) {
		toastStore.show({
			message: data.exception.message,
			type: data.exception.type,
		})
	}
</script>
<section class='bg-neutral min-h-screen flex justify-between'>
	<div>
		<h1 class='text-center text-neutral-content'>Todo</h1>
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
		<h1 class='text-center text-neutral-content'>In Progress</h1>
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
		<h1 class='text-center text-neutral-content'>Done</h1>
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
