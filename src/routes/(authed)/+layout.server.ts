import type { ServerLoad } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const load: ServerLoad = ({ cookies, url }) => {
	if (!cookies.get('Bearer')) {
		throw redirect(303, `/signin?redirectTo=${url.pathname}`)
	}
}
