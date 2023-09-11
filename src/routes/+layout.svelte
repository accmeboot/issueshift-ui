<script>
	import { Nav, Toast } from '$lib/components'

	import '@fortawesome/fontawesome-free/css/all.min.css'
	import "../app.css"

	let isDrawerOpen = false

	const onHamburgerClick = () => {
		isDrawerOpen = !isDrawerOpen
	}

</script>

<main class='bg-base-100'>
	<nav class='sticky top-0 left-0 z-10 w-full border-b'>
		<Nav {onHamburgerClick}/>
	</nav>
	<slot/>
</main>
<Toast/>
