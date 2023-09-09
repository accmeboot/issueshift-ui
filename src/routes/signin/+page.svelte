<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from "@sveltejs/kit";
	import { goto } from '$app/navigation';
	import type { ActionData } from "./$types";
	import { toastStore } from '$lib/stores'

	export let form: ActionData

	let loading = false
	let password: string
	let email: string

	$: isValid = password && email

	const onSubmit: SubmitFunction = () => {
		loading = true
		return async ({update, result}) => {
			if (result.type === 'success') {
				return await goto("/")
			}

			if (result.type === 'failure' && result.status === 500) {
				toastStore.show({
					message: result?.data?.errors.info as string,
					type: 'error',
					auto: true,
					duration: 5000,
				})
			}

			await update();
			loading = false
		}
	}
</script>

<div class="min-h-screen bg-neutral flex items-center justify-center">
	<form method='post'
				class="p-6 bg-neutral-content rounded-lg shadow-lg w-96"
				use:enhance={onSubmit}>
		<div class='relative'>
			<h1 class='text-neutral text-xl font-bold'>Sign in</h1>

			<small class="text-error absolute bottom-[-100%] left-0 font-bold {form?.errors?.credentials ? 'opacity-100' : 'opacity-0'}">
				{form?.errors?.credentials ?? 'Invalid credentials'}
			</small>
		</div>

		<div class='space-y-6 mt-6'>
			<div class='relative'>
				<label for="email" class="label text-neutral text-sm font-bold">Email</label>
				<input type="email" id="email" name="email" class="input w-full" bind:value={email}>
				<small class="text-error absolute top-[100%] mt-0.5 left-0 {form?.errors?.email ? 'opacity-100' : 'opacity-0'}">
					{form?.errors?.email}
				</small>
			</div>

			<div class='relative'>
				<label for="password" class="label text-neutral text-sm font-bold">Password</label>
				<input bind:value={password} type="password" id="password" name="password" class="input w-full">
				<small class="text-error absolute top-[100%] mt-0.5 left-0 {form?.errors?.password ? 'opacity-100' : 'opacity-0'}">
					{form?.errors?.password}
				</small>
			</div>

		</div>

		<div class='mt-10'>
			<button type="submit" class="btn btn-primary w-full relative {!isValid && 'btn-disabled'}">
				<span class='relative
				{loading ? "before:block" : "before:hidden"}
				before:loading
				before:absolute
				before:left-[-50%]
				before:top-0
				before:bottom-0
				before:m-auto
				before:pt-1.5
				before:loading-ring
				before:loading-sm'>Submit</span>
			</button>
		</div>


		<span class='block text-center mt-5'>
			Don't have an account? <a href='/signup' class='underline text-primary font-bold'>Sign Up</a>
		</span>
	</form>
</div>
