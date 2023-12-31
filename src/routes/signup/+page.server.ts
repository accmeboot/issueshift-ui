import type { Actions } from '@sveltejs/kit'
import { type ServerLoad, fail, redirect  } from '@sveltejs/kit'
import { uploadImage } from '$lib/services'
import { Endpoint } from '$lib'
import { exception } from '$lib/exception'


export const load: ServerLoad = ({ cookies }) => {
	if (cookies.get('Bearer')) {
		throw redirect(302, '/')
	}
}

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

			avatarId = res.id
		}

		try {
			const body = JSON.stringify({name, email, password, avatarId}, (_, value) => {
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
			return exception({
				message: 'we are having trouble connecting to the server, please try again',
				type: 'error',
			})
		}
	}
}
