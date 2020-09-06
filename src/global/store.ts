import { createStore } from "@stencil/store";
import { createRouter } from 'stencil-router-v2';

export interface IState {
  menuIsOpen: boolean;
  isLive: boolean;

  title: string;
  keywords: string;
  description: string;
  image: string;
}

export const defaults = {
  title: "Adam LaCombe",
  keywords: "typescript, StencilJS, Javascript, PHP, Docker",
  description: "Web dev blog with focus on StencilJS",
  image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80",
  name: "Adam LaCombe",
  jobTitle: "Web Developer",
  email: "adamlacombe@pm.me",
};

export const store = createStore<IState>({
  menuIsOpen: true,
  isLive: window.location.origin.includes('localhost'),

  title: defaults.title,
  keywords: defaults.keywords,
  description: defaults.description,
  image: defaults.image
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