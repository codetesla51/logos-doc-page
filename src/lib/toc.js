import { writable } from "svelte/store";

// Headings of the current docs page: [{ id, title }]
// Written by DocLayout on mount, read by DocSidebar for sub-links.
export const toc = writable([]);
