// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

// Generic declaration for Svelte icon components without shipped d.ts
declare module 'svelte-icons/*/*.svelte' {
	import { SvelteComponentTyped } from 'svelte'
	export default class Icon extends SvelteComponentTyped<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>> {}
}
