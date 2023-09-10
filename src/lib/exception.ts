import type { Exception } from '$lib/types'

export const exception = (details: Exception) => {
	return {
		exception: {
			...details,
		},
	}
}
