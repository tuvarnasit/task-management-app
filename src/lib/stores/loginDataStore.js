import { writable } from 'svelte/store';

let initialState = {
  email: '',
  password: ''
};
function createStore() {
  let { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    reset: () => {
      set({ ...initialState });
    },
    update
  };
}

export const loginDataStore = createStore();
