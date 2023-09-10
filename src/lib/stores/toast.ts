import { writable } from 'svelte/store'
import type { ExceptionType } from '$lib/types'

type ToastStore = {
	message: string;
	type: ExceptionType;
	open: boolean;
}

type ShowArgs = {
	message: string;
	type: ToastStore['type'];
	auto?: boolean;
	duration?: number;
}

function createToastStore() {
	const { subscribe, set, update } = writable<ToastStore | null>(null);

	return {
		subscribe,
		show: ({ message, type, auto, duration}: ShowArgs) => {
			set({
				open: true,
				message,
				type,
			})

			if (auto) {
				setTimeout(() => set({ open: false, message, type}), duration ?? 3000)
			}
		},
		hide: () => {
			update(toast => ({
				message: toast?.message ?? '',
				type: toast?.type ?? 'error',
				open: false,
			}))
		},
		clear: () => set(null),
	}
}

export const toastStore = createToastStore()
