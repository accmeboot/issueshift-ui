<script>
	import { toastStore } from '$lib/stores'

	let alertTypeClass = 'alert-info'
	let iconData = 'fa-info-circle'

	$: switch ($toastStore?.type) {
		case 'success':
			alertTypeClass = 'alert-success'
			iconData = 'fa-check-circle'
			break
		case 'error':
			alertTypeClass = 'alert-error'
			iconData = 'fa-minus-circle'
			break
		case 'warning':
			alertTypeClass = 'alert-warning'
			iconData = 'fa-warning'
			break
		case 'info':
			alertTypeClass = 'alert-info'
			iconData = 'fa-info-circle'
			break
	}

</script>

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
	<i class='fa-solid {iconData}'></i>
	<span>{$toastStore?.message ?? 'Something went wrong try again'}</span>
	<div class='ml-2'>
		<button class='btn btn-sm' on:click={() => toastStore.hide()}>ok</button>
	</div>
</div>
