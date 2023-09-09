import type { Cookies } from '@sveltejs/kit'

export function getAuthHeaders(cookies: Cookies): Record<string, string> {
	const token = cookies.get('Bearer') || ''

	return {
		'Authorization': `Bearer ${token}`,
	}
}
