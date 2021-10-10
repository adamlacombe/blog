/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { BlogPostInterface, IGithubOrg, IGithubRepo } from "./global/definitions";
export namespace Components {
    interface AlImg {
        "alt": string;
        "height": string | number;
        "src": string;
        "width": string | number;
    }
    interface AppHome {
    }
    interface AppRoot {
    }
    interface BlogCard {
        "post": BlogPostInterface;
    }
    interface BlogPost {
        "page": string;
    }
    interface HighlightCode {
        "language": string;
    }
    interface OrgCard {
        "org": IGithubOrg;
    }
    interface PageBlog {
    }
    interface RepoCard {
        "name": string;
        "repo": IGithubRepo;
    }
}
declare global {
    interface HTMLAlImgElement extends Components.AlImg, HTMLStencilElement {
    }
    var HTMLAlImgElement: {
        prototype: HTMLAlImgElement;
        new (): HTMLAlImgElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLBlogCardElement extends Components.BlogCard, HTMLStencilElement {
    }
    var HTMLBlogCardElement: {
        prototype: HTMLBlogCardElement;
        new (): HTMLBlogCardElement;
    };
    interface HTMLBlogPostElement extends Components.BlogPost, HTMLStencilElement {
    }
    var HTMLBlogPostElement: {
        prototype: HTMLBlogPostElement;
        new (): HTMLBlogPostElement;
    };
    interface HTMLHighlightCodeElement extends Components.HighlightCode, HTMLStencilElement {
    }
    var HTMLHighlightCodeElement: {
        prototype: HTMLHighlightCodeElement;
        new (): HTMLHighlightCodeElement;
    };
    interface HTMLOrgCardElement extends Components.OrgCard, HTMLStencilElement {
    }
    var HTMLOrgCardElement: {
        prototype: HTMLOrgCardElement;
        new (): HTMLOrgCardElement;
    };
    interface HTMLPageBlogElement extends Components.PageBlog, HTMLStencilElement {
    }
    var HTMLPageBlogElement: {
        prototype: HTMLPageBlogElement;
        new (): HTMLPageBlogElement;
    };
    interface HTMLRepoCardElement extends Components.RepoCard, HTMLStencilElement {
    }
    var HTMLRepoCardElement: {
        prototype: HTMLRepoCardElement;
        new (): HTMLRepoCardElement;
    };
    interface HTMLElementTagNameMap {
        "al-img": HTMLAlImgElement;
        "app-home": HTMLAppHomeElement;
        "app-root": HTMLAppRootElement;
        "blog-card": HTMLBlogCardElement;
        "blog-post": HTMLBlogPostElement;
        "highlight-code": HTMLHighlightCodeElement;
        "org-card": HTMLOrgCardElement;
        "page-blog": HTMLPageBlogElement;
        "repo-card": HTMLRepoCardElement;
    }
}
declare namespace LocalJSX {
    interface AlImg {
        "alt"?: string;
        "height"?: string | number;
        "src"?: string;
        "width"?: string | number;
    }
    interface AppHome {
    }
    interface AppRoot {
    }
    interface BlogCard {
        "post"?: BlogPostInterface;
    }
    interface BlogPost {
        "page"?: string;
    }
    interface HighlightCode {
        "language"?: string;
    }
    interface OrgCard {
        "org"?: IGithubOrg;
    }
    interface PageBlog {
    }
    interface RepoCard {
        "name"?: string;
        "repo"?: IGithubRepo;
    }
    interface IntrinsicElements {
        "al-img": AlImg;
        "app-home": AppHome;
        "app-root": AppRoot;
        "blog-card": BlogCard;
        "blog-post": BlogPost;
        "highlight-code": HighlightCode;
        "org-card": OrgCard;
        "page-blog": PageBlog;
        "repo-card": RepoCard;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "al-img": LocalJSX.AlImg & JSXBase.HTMLAttributes<HTMLAlImgElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "blog-card": LocalJSX.BlogCard & JSXBase.HTMLAttributes<HTMLBlogCardElement>;
            "blog-post": LocalJSX.BlogPost & JSXBase.HTMLAttributes<HTMLBlogPostElement>;
            "highlight-code": LocalJSX.HighlightCode & JSXBase.HTMLAttributes<HTMLHighlightCodeElement>;
            "org-card": LocalJSX.OrgCard & JSXBase.HTMLAttributes<HTMLOrgCardElement>;
            "page-blog": LocalJSX.PageBlog & JSXBase.HTMLAttributes<HTMLPageBlogElement>;
            "repo-card": LocalJSX.RepoCard & JSXBase.HTMLAttributes<HTMLRepoCardElement>;
        }
    }
}
