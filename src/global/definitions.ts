/**
 * https://github.com/ionic-team/stencil-site/blob/master/src/global/definitions.ts
 * 
 * MIT License
 * 
 * Copyright (c) 2017 Ionic
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export interface MarkdownContent {
  title?: string;
  description?: string;
  url?: string;
  contributors?: string[];
  headings?: MarkdownHeading[];
  srcPath?: string;
  hypertext?: any[];
}

export interface MarkdownHeading {
  id: string;
  level: number;
  text: string;
}

export interface SiteStructureItem {
  text: string,
  url?: string;
  filePath?: string;
  children?: SiteStructureItem[];
}

export interface BlogPostInterface {
  title: string;
  date: string;
  url: string;
  author: string;
  twitter: string;
  description: string;
  img: string;
  filePath?: string;
}