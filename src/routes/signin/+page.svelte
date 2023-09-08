<script>
	import { enhance } from '$app/forms';

	let loading = false
</script>

<div class="min-h-screen bg-neutral flex items-center justify-center">
	<form method='post'
				class="p-6 bg-neutral-content rounded-lg shadow-lg w-fit min-w-[30%]"
				use:enhance={() => {
					loading = true

					return async ({update}) => {
						await update();
						loading = false
					}
				}}>
		<h1 class='text-neutral text-xl font-bold'>Sign in</h1>

		<div class='space-y-4 mt-4'>
			<div>
				<label for="email" class="label text-neutral text-sm font-bold">Email</label>
				<input type="email" id="email" name="email" class="input w-full">
			</div>

			<div>
				<label for="password" class="label text-neutral text-sm font-bold">Password</label>
				<input type="password" id="password" name="password" class="input w-full">
			</div>

			<div>
				<label for="confirm" class="label text-neutral text-sm font-bold">Confirm Password</label>
				<input type="password" id="confirm" name="confirm" class="input w-full">
			</div>

		</div>

		<div class='mt-12'>
			<button type="submit" class="btn btn-primary w-full relative">
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
	</form>
</div>
