import { type ActionFailure, fail } from '@sveltejs/kit'
import { Endpoint } from '$lib'

type ImageData = {
	id: number;
}

export async function uploadImage(image: File): Promise<ImageData | ActionFailure<App.Errors>> {
	try {
		const response = await fetch(Endpoint.postImage, {
			method: 'POST',
			body: image,
			headers: {
				'Content-Type': image.type,
			},
		})

		if (response.ok && response.status === 201) {
			return await response.json()
		}

		return fail<App.Errors>(response.status, await response.json())
	} catch (e) {
		console.error(e)
		return fail<App.Errors>(500, {
			errors: {
				info: 'we are having trouble uploading your avatar, please try again'
			}
		})
	}
}
