/**
 * https://github.com/ionic-team/stencil-site/blob/master/scripts/blog-list.ts
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
import marked from 'marked';
import glob from 'glob';
import { promisify } from 'util';
import path from 'path';
import {readFile, writeFile, ensureDir, mkdirp } from 'fs-extra';

import { changeCodeCreation } from './markdown-renderer';
import frontMatter from 'front-matter';
import { BlogPostInterface } from '../src/global/definitions';
import { convertHtmlToHypertextData } from './lib/hypertext'

const globAsync = promisify(glob);

const DESTINATION_DIR = './src/assets/blog';
const SOURCE_DIR = './src/blog';
const BLOG_LIST_FILE = './src/assets/blog/list.json';


(async function() {
  try {
    await ensureDir(DESTINATION_DIR);
  } catch (e) {}

  console.log(`running glob: ${SOURCE_DIR}/**/*.md`);
  const files = await globAsync(`${SOURCE_DIR}/**/*.md`, {});
  const allBlogPosts: BlogPostInterface[] = [];

  const filePromises = files.map(async (filePath) => {
    let htmlContents = '';
    const jsonFileName = path.relative(SOURCE_DIR, filePath);
    const destinationFileName = path.join(
      DESTINATION_DIR,
      path.dirname(jsonFileName),
      path.basename(jsonFileName, '.md') + '.json'
    );

    const markdownContents = await readFile(filePath, { encoding: 'utf8' });

    try {
      let parsedMarkdown = frontMatter<any>(markdownContents);

      const renderer = new marked.Renderer();

      changeCodeCreation(renderer);

      allBlogPosts.push({
        ...parsedMarkdown.attributes,
        filePath: path.join('/assets/blog/', path.basename(jsonFileName, '.md') + '.json')
      });

      htmlContents = marked(parsedMarkdown.body, {
        renderer,
        headerIds: true
      }).trim();

      await mkdirp(path.join(
        DESTINATION_DIR,
        path.dirname(jsonFileName)
      ));

      const data = {
        ...parsedMarkdown.attributes,
        srcPath: filePath,
        hypertext: convertHtmlToHypertextData(htmlContents)
      };

      data.title = `Stencil Blog - ${data.title.trim()}`;

      await writeFile(destinationFileName, JSON.stringify(data), {
        encoding: 'utf8'
      });

    } catch (e) {
      console.error(filePath);
      throw e;
    }
  });
  filePromises;

  await Promise.all(filePromises);

  allBlogPosts.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  await writeFile(BLOG_LIST_FILE, JSON.stringify(allBlogPosts, null, 2), {
    encoding: 'utf8'
  });

  console.log(`successfully converted ${filePromises.length} files`);
})();
