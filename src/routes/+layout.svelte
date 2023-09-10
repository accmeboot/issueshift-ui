<script>
	import { toastStore } from '$lib/stores'
	import Icon from 'svelte-awesome'
	import minusCircle from 'svelte-awesome/icons/minusCircle'
	import warning from 'svelte-awesome/icons/warning';
	import checkCircle from 'svelte-awesome/icons/checkCircle'
	import infoCircle from 'svelte-awesome/icons/infoCircle';
	import "../app.css"

	let alertTypeClass = 'alert-info'
	let iconData = infoCircle

	$: switch ($toastStore?.type) {
		case 'success':
			alertTypeClass = 'alert-success'
			iconData = checkCircle
			break
		case 'error':
			alertTypeClass = 'alert-error'
			iconData = minusCircle
			break
		case 'warning':
			alertTypeClass = 'alert-warning'
			iconData = warning
			break
		case 'info':
			alertTypeClass = 'alert-info'
			iconData = infoCircle
			break
	}

</script>

<slot/>
<div class="alert
						{alertTypeClass}
						fixed
						bottom-0
						left-0
						right-0
						m-auto
						w-fit
						transition-transform
						{$toastStore?.open ? 'translate-y-[-100%]' : 'translate-y-[100%]'}">
	<Icon data='{iconData}' />
	<span>{$toastStore?.message ?? 'Something went wrong try again'}</span>
	<div class='ml-2'>
		<button class='btn btn-sm' on:click={() => toastStore.hide()}>ok</button>
	</div>
</div>
