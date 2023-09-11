<script lang="ts">
	export let onHamburgerClick: () => void
</script>
<div class="navbar bg-base-100">
	<div class="flex-none">
		<button class="btn btn-square btn-ghost" on:click={onHamburgerClick}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
		</button>
	</div>
	<div class="flex-1">
		<a href='/' class="btn btn-ghost normal-case text-xl">Issueshift</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			<li>
				<details>
					<summary>
						username + avatar
					</summary>
					<ul class="p-2 bg-base-100">
						<li><a href='/'>Settings</a></li>
						<li><a href='/'>logout</a></li>
					</ul>
				</details>
			</li>
		</ul>
	</div>
</div>
