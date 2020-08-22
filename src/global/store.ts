import { createStore } from "@stencil/store";
import { createRouter } from 'stencil-router-v2';

export interface IState {
  menuIsOpen: boolean;
  isLive: boolean;
}

export const store = createStore<IState>({
  menuIsOpen: true,
  isLive: window.location.origin.includes('localhost')
});

export const state = window['state'] = store.state;

export const Router = window['Router'] = createRouter({
  parseURL: (url: URL) => {
    return decodeURI(url.pathname);
  }
});

Router.onChange('url', (url) => {
  // hacky but lets wait 1s before grabbing page title
  setTimeout(() => {
    (window as any).gtag('config', 'UA-44023830-34', {
      'page_path': url.pathname
    });
  }, 1000);
});

export const clickRoutableLink = (e: MouseEvent) => {
  const a: HTMLAnchorElement = e.composedPath().find((el: HTMLElement) => el && el.localName === "a") as any;
  if (a) {
    e.preventDefault();
    Router.push(new URL(a.href).pathname);
  }
}