<div class="min-h-screen bg-neutral flex items-center justify-center">
	<form class="p-6 bg-neutral-content rounded-lg shadow-lg w-96">
		<h1 class='text-neutral text-xl font-bold'>Sign Up</h1>

		<div class='space-y-4 mt-4'>
			<div>
				<label for="email" class="label text-neutral text-sm font-bold">Email</label>
				<input type="email" id="email" name="email" class="input w-full">
			</div>

			<div>
				<label for="name" class="label text-neutral text-sm font-bold">Name</label>
				<input type="text" id="name" name="name" class="input w-full">
			</div>

			<div>
				<label for="password" class="label text-neutral text-sm font-bold">Password</label>
				<input type="password" id="password" name="password" class="input w-full">
			</div>

			<div>
				<label for="confirm" class="label text-neutral text-sm font-bold">Confirm Password</label>
				<input type="password" id="confirm" name="confirm" class="input w-full">
			</div>


			<div>
				<label for="avatar" class="label text-neutral text-sm font-bold">Select Avatar</label>
				<input id='avatar' name='avatar' type='file' class='file-input w-full' >
			</div>
		</div>

		<div class='mt-12'>
			<button type="submit" class="btn btn-primary w-full">Submit</button>
		</div>

		<span class='block text-center mt-5'>
			Already have an account? <a href='/signin' class='underline text-primary font-bold'>Sign In</a>
		</span>
	</form>
</div>
