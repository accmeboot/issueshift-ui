import { Endpoint } from '$lib'
import { getAuthHeaders } from '$lib/helpers'
import { exception } from '$lib/exception'

import type { ServerLoad } from '@sveltejs/kit'
import type { Task } from '$lib/types'

type TasksRes = {
	tasks: Task[]
}

export const load: ServerLoad = async ({ fetch, cookies }) => {
	try {
		const taskPromises = ['todo', 'in_progress', 'done'].map((status) => (
			fetch(`${Endpoint.getTasks}?status=${status}`, { headers: getAuthHeaders(cookies) })
		))

		const tasksRes = await Promise.all(taskPromises)
		const tasksData: TasksRes[] = await Promise.all(
			tasksRes.map(res => res.ok && res.status === 200 && res.json())
		)

		return {
			todo: tasksData[0]?.tasks ?? [],
			inProgress: tasksData[1]?.tasks ?? [],
			done: tasksData[2]?.tasks ?? [],
		}
	} catch (e) {
		return exception({
			message: 'failed to load tasks',
			type: 'error',
		})
	}
}
