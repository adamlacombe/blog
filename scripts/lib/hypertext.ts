/**
 * https://github.com/ionic-team/stencil-site/blob/master/scripts/lib/hypertext.ts
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

import { createDocument } from '@stencil/core/mock-doc';

export function convertHtmlToHypertextData(html: string) {
    const doc = createDocument();
    const div = doc.createElement('div');
    div.innerHTML = html;
    return convertElementToHypertextData(div);
  }
  
  function convertElementToHypertextData(node: Node) {
    const data = [];
  
    if (node.nodeType === 1) {
      const elm = node as HTMLElement;
      let tag = elm.tagName.toLowerCase();
  
      if (tagBlacklist.includes(tag)) {
        tag = 'template';
      }
  
      data.push(tag);
  
      if (elm.attributes.length > 0) {
        const attrs = {};
        for (let j = 0; j < elm.attributes.length; j++) {
          const attr = elm.attributes.item(j);
          attrs[attr.nodeName] = attr.nodeValue;
        }
        data.push(attrs);
  
      } else {
        data.push(null);
      }
  
      for (let i = 0; i < elm.childNodes.length; i++) {
        data.push(convertElementToHypertextData(elm.childNodes[i]));
      }
  
      return data;
  
    } else if (node.nodeType === 3) {
      return (node as Text).textContent;
    }
  
    return '';
  }
  
  const tagBlacklist = ['script', 'link', 'meta', 'object', 'head', 'html', 'body'];
  
  