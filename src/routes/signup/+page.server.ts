import type { Actions } from '@sveltejs/kit'
import { fail } from '@sveltejs/kit'
import { uploadImage } from '$lib/services'
import { Endpoint } from '$lib'

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData()

		const name = formData.get('name')
		const email = formData.get('email')
		const password = formData.get('password')

		const image = formData.get('avatar') as File | null
		let avatarId = null

		if (image && image instanceof File && image.size > 0) {
			const res = await uploadImage(image)

			if ('status' in res) {
				return res
			}

			avatarId = res.image_id
		}

		try {
			const body = JSON.stringify({name, email, password, avatar_id: avatarId}, (_, value) => {
				if (value !== null) return value
			})

			const response = await fetch(Endpoint.signUp, {
				method: 'POST',
				body,
			})

			if (response.ok && response.status === 201) {
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
