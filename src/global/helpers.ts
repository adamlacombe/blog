import { h } from '@stencil/core';

/**
 * tagBlacklist / toHypertext
 * Copied from: https://github.com/ionic-team/stencil-site/blob/master/src/components/blog-component/blog-component.tsx#L133
 * License: https://github.com/ionic-team/stencil-site/blob/master/LICENSE
 */
const tagBlacklist = ['script', 'link', 'meta', 'object', 'head', 'html', 'body'];
export const toHypertext = (data: any) => {
  if (!Array.isArray(data)) {
    console.error('content error, hypertext is undefined')
    return null;
  }
  const args = [];
  for (let i = 0; i < data.length; i++) {
    let arg = data[i];
    if (i === 0 && typeof arg === 'string' && arg.toLowerCase().trim() === "a") {
      if (data[1] && data[1].href) {
        let u = new URL(data[1].href.startsWith('http') ? data[1].href : `${window.location.origin}${data[1].href}`);
        if (u.origin !== window.location.origin) {
          data[1] = { ...data[1], target: "_blank" };
        }
      }
    }

    if (i === 0 && typeof arg === 'string' && arg.toLowerCase().trim() === "img" && data[1]) {
      data[1] = { ...data[1], loading: "lazy" };
    }

    if (i === 0 && typeof arg === 'string' && tagBlacklist.includes(arg.toLowerCase().trim())) {
      arg = 'template';

    } else if (i === 1 && arg) {
      const attrs: any = {};
      Object.keys(arg).forEach(key => {
        const k = key.toLowerCase();
        if (!k.startsWith('on') && k !== 'innerhtml') {
          attrs[key] = arg[key];
        }
      });
      arg = attrs;

    } else if (i > 1) {
      if (Array.isArray(arg)) {
        arg = toHypertext(arg);
      }
    }
    args.push(arg);
  }
  return (h as any).apply(null, args);
};

export const SHARP_IMAGE_PROXY_URL = (window.location.origin.includes("localhost")) ? "http://localhost:8080" : "https://images.adamlacombe.com";