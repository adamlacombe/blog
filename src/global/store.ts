import { createStore } from "@stencil/store";
import { createRouter, Router } from 'stencil-router-v2';

export interface IState {
  router: Router;
  menuIsOpen: boolean;
}

export const store = createStore<IState>({
  router: createRouter({
    parseURL: (url: URL) => {
      return decodeURI(url.pathname);
    }
  }),
  menuIsOpen: true
});

export const state = window['state'] = store.state;