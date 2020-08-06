import { createStore } from "@stencil/store";
import { createRouter, Router } from 'stencil-router-v2';

export interface IState {
  router: Router;
}

export const store = createStore({
  router: createRouter({
    parseURL: (url: URL) => {
      return decodeURI(url.pathname);
    }
  })
});

export const state = store.state;