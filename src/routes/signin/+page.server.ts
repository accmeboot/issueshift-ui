import type { Actions } from "@sveltejs/kit";
import { fail } from '@sveltejs/kit';

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
			const response = await fetch("/v1/signin", {
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
			console.error(e)
			return fail(500, {
				error: "internal server error",
			})
		}
	}
}
