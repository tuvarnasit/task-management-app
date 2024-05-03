import { writable } from 'svelte/store';

let initialState = {
  name: '',
  lastName: '',
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

export const registerDataStore = createStore();
