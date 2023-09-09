import type { ServerLoad } from '@sveltejs/kit'
import { Endpoint } from '$lib'
import { getAuthHeaders } from '$lib/helpers'
import { fail } from '@sveltejs/kit'

type Task = {
	id: number;
	title: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	status: 'todo' | 'in_progress' | 'done';
}

const getMappedTasks = (tasks: unknown): Task[] => {
	if (Array.isArray(tasks)) {
		return tasks.map((task: Record<string, string>) => ({
				id: Number(task.id),
				title: task.title,
				description: task.description,
				createdAt: new Date(task.created_at),
				updatedAt: new Date(task.updated_at),
				status: task.status as Task['status'],
			})
		)
	}

	return [];
}

export const load: ServerLoad = async ({ fetch, cookies }) => {
	try {
		const tasksPromises = ['todo', 'in_progress', 'done'].map((status) => (
			fetch(`${Endpoint.getTasks}?status=${status}`, { headers: getAuthHeaders(cookies) })
		))

		return Promise.all(tasksPromises)
			.then(([todoResponse, inProgressResponse, doneResponse]) => {
				const responsePromises = []

				if (todoResponse.ok && todoResponse.status === 200) {
					responsePromises.push(todoResponse.json())
				}

				if (inProgressResponse.ok && inProgressResponse.status === 200) {
					responsePromises.push(inProgressResponse.json())
				}

				if (doneResponse.ok && doneResponse.status === 200) {
					responsePromises.push(doneResponse.json())
				}

				return Promise.all(responsePromises).then((res) => {
					return {
						todo: getMappedTasks(res[0]?.tasks ?? []),
						inProgress: getMappedTasks(res[1]?.tasks ?? []),
						done: getMappedTasks(res[2]?.tasks ?? []),
					}
				})
			})
			.catch(err => {
				console.error(err)
				return fail<App.Errors>(500, {
					errors: {
						info: 'failed to load tasks',
					}
				})
			})
	} catch (e) {
		console.error(e)
		return fail<App.Errors>(500, {
			errors: {
				info: 'failed to load tasks',
			}
		})
	}
}
