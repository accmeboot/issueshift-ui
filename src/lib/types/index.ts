export type ExceptionType = 'error' | 'success' | 'warning' | 'info'
export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type Assignee = {
	id: number
	name: string
	email: string
	createdAt: string
	updatedAt: string
	avatarId: number
}

export type Task = {
	id: number
	title: string
	description: string
	createdAt: string
	updatedAt: string
	status: TaskStatus
	assignee: Assignee
}

export type Exception = {
	message: string;
	type: ExceptionType;
}
