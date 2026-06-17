import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<'et' | 'en'>} */
export const selectedLang = writable('et');
