// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Errors extends Record<string, unknown> {
			errors: Record<string, string>
		}
	}
	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:clickoutside'?: (event: CustomEvent) => void;
		}
	}
}

export {};
