import type { Actions, ServerLoad } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'
import { Endpoint } from '$lib'

export const load: ServerLoad = ({ url, cookies }) => {
	if (cookies.get('Bearer')) {
		throw redirect(302, '/')
	}

	const redirectTo = url?.searchParams.get('redirectTo') || '/'

	return { redirectTo }
}

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const data = await request.formData()

		const email = data.get('email')
		const password = data.get('password')

		if (email === null || password === null) {
			return fail<App.Errors>(400, {
				errors: {
						email: email === null ? 'is not provided' : '',
						password: password === null ? 'is not provided' : '',
				},
			})
		}

		try {
			const response = await fetch(Endpoint.signIn, {
				method: 'POST',
				body: JSON.stringify({email, password}),
			})

			if (response.ok && response.status === 200) {
				const tokenData: { token: string } = await response.json()

				cookies.set("Bearer", tokenData?.token ?? "")

				return { success: true }
			}

			return fail<App.Errors>(response.status, await response.json())
		} catch (e) {
			return fail<App.Errors>(500, {
				errors: {
					info: 'we are having trouble connecting to the server, please try again'
				}
			})
		}
	}
}
