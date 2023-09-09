import { writable } from 'svelte/store'

type ToastStore = {
	message: string;
	type: 'error' | 'success' | 'warning' | 'info';
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
	}
}

export const toastStore = createToastStore()
