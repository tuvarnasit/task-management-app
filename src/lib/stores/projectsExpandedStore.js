import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const ALL_PROJECTS = 'projectsExpanded';
const FAV_PROJECTS = 'favoritesExpanded';
const SHARED_PROJECTS = 'sharedExpanded';

export const projectsExpanded = createStore(ALL_PROJECTS);
export const favoritesExpanded = createStore(FAV_PROJECTS);
export const sharedExpanded = createStore(SHARED_PROJECTS);

projectsExpanded.subscribe((value) => {
  if (!browser) return;
  if (value) {
    localStorage.setItem(ALL_PROJECTS, value);
  } else {
    localStorage.removeItem(ALL_PROJECTS);
  }
});

favoritesExpanded.subscribe((value) => {
  if (!browser) return;
  if (value) {
    localStorage.setItem(FAV_PROJECTS, value);
  } else {
    localStorage.removeItem(FAV_PROJECTS);
  }
});

function createStore(value) {
  let { subscribe, set, update } = writable(browser ? localStorage.getItem(value) || false : false);

  return {
    subscribe,
    hide: () => {
      set(false);
    },
    show: () => {
      set(true);
    },
    set,
    update
  };
}
