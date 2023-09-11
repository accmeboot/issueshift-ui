<script lang="ts">
	import type { PageData } from './$types'
	import { toastStore } from '$lib/stores'
	import { onMount } from 'svelte'
	import type { Task } from '$lib/types'

	const filters = ['todo', 'in progress', 'done']

	export let data: PageData

	let tasks: Task[] = data?.todo ?? []

	let activeFilter = 'todo'
	let openedAssignee = 0

	let dropDowns: EventTarget[] = Array.from({ length: tasks.length })
	let assigneeInputs: EventTarget[] = Array.from({ length: tasks.length })

	const detect = (event: MouseEvent) => {
		if (event.target && !dropDowns.includes(event.target) && !assigneeInputs.includes(event.target)) {
			openedAssignee = 0
		}
	}

	onMount(() => {
		document.addEventListener('click', detect, { passive: true, capture: true })

		return () => {
			document.removeEventListener('click', detect)
			toastStore.clear()
		}
	})

	$: if (data?.exception) {
		toastStore.show({
			message: data.exception.message,
			type: data.exception.type,
		})
	}

	$: switch (activeFilter) {
		case 'todo':
			tasks = data?.todo ?? []
			break
		case 'in progress':
			tasks = data?.inProgress ?? []
			break
		case 'done':
			tasks = data?.done ?? []
			break
	}

	const onFilterSelect = (filter: string) => {
		activeFilter = filter
	}

	const toggleAssigneeDropdown = (id: number) => {
		openedAssignee = id
	}

	const getTaskStatus = (status: string) => {
		switch (status) {
			case 'todo':
				return 'Todo'
			case 'in_progress':
				return 'In Prigress'
			case 'done':
				return 'Done'
		}
	}
</script>
<section class="lg:w-3/4 m-auto pb-6 min-h-screen">
		<form class="tabs tabs-boxed mt-6 w-full items-center justify-between">
			<div>
				{#each filters as filter}
					<button class="tab {activeFilter === filter ? 'tab-active' : ''}"
									on:click={() => onFilterSelect(filter)}>
						{filter}
					</button>
				{/each}
			</div>
			<div class="join">
				<div class="flex items-center">
					<div>
						<input class="input join-item input-sm focus:-outline-offset-2 focus:outline-accent" placeholder="Search"/>
					</div>
				</div>
				<div class="indicator">
					<button class="btn h-auto min-h-max join-item btn-accent"><i class="fa fa-filter" aria-hidden="true"></i></button>
				</div>
			</div>
		</form>
	<div class="mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each tasks as task, id}
				<div class="card w-full bg-base-100 shadow-xl">
					<div class="p-5">
						<h2 class="card-title line-clamp-1">{task.title}</h2>
						<form class="mt-4 relative">
							<label for="assignee" class="absolute left-2 top-0 bottom-0 m-auto flex items-center">
								<i class="fa-solid fa-user text-sm"></i>
							</label>
							<label for="assignee"
										 class="absolute
										 right-2
										 top-0
										 bottom-0
										 m-auto
										 flex
										 items-center
										{openedAssignee === task.id ? 'rotate-180' : 'rotate-0'}">
								<i class="fa-solid fa-caret-down"></i>
							</label>
							<input id="assignee"
										 on:focus={() => toggleAssigneeDropdown(task.id)}
										 bind:this={assigneeInputs[id]}
										 class="input
													 input-accent
													 input-sm px-6 w-full
													 !outline-none
													{openedAssignee === task.id ? 'rounded-b-none' : 'rounded-b-lg'}"
										 value={task.assignee.email} />
							<div id='assignee-dropdown' class="absolute
													w-full
													h-24
													bg-base-100
													border
													border-accent
													shadow-md
													border-t-0
													rounded-b-lg
													{openedAssignee === task.id ? 'block' : 'hidden'}"
										bind:this={dropDowns[id]}>

							</div>
						</form>
						<p class="line-clamp-2 mt-4">{task.description}</p>
						<div class='mt-6'>
							<div class="badge badge-secondary">{new Date(task.createdAt).toDateString()}</div>
							<div class="badge badge-primary badge-outline">{getTaskStatus(task.status)}</div>
						</div>
					</div>
				</div>
			{/each}
	</div>
</section>
