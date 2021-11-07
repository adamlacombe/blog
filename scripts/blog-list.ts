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
import { readFile, writeFile, ensureDir, mkdirp } from 'fs-extra';

import { changeCodeCreation } from './markdown-renderer';
import frontMatter from 'front-matter';
import { BlogPostInterface } from '../src/global/definitions';
import { convertHtmlToHypertextData } from './lib/hypertext'

const globAsync = promisify(glob);

const DESTINATION_DIR = './src/assets/blog';
const SOURCE_DIR = './src/blog';
const BLOG_LIST_FILE = './src/assets/blog/list.json';
const BLOG_FEED_FILE = './src/feed.xml';


(async function () {
  try {
    await ensureDir(DESTINATION_DIR);
  } catch (e) { }

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

      if (parsedMarkdown.attributes.tags) {
        parsedMarkdown.attributes.tags = parsedMarkdown.attributes.tags.split(',').map(v => v.trim());
      }

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

      await writeFile(destinationFileName, JSON.stringify(data), {
        encoding: 'utf8'
      });

      allBlogPosts.push({
        ...parsedMarkdown.attributes,
        filePath: path.join('/assets/blog/', path.basename(jsonFileName, '.md') + '.json'),
        ...data
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

  const xmlFeed = `
<rss xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:sy="http://purl.org/rss/1.0/modules/syndication/" xmlns:slash="http://purl.org/rss/1.0/modules/slash/" xmlns:media="http://search.yahoo.com/mrss/" xmlns:webfeeds="http://webfeeds.org/rss/1.0" version="2.0">
  <channel>
    <title>Adam LaCombe's blog</title>
    <webfeeds:analytics id="UA-174664641-1" engine="GoogleAnalytics"/>
    <atom:link href="https://adamlacombe.com/feed/feed.xml" rel="self" type="application/rss+xml"/>
    <link>https://adamlacombe.com</link>
    <updated>2020-09-09T00:00:00-00:00</updated>
    <id>https://adamlacombe.com</id>
    <language>en-US</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    ${allBlogPosts.map(entry => `<item>
      <title>${entry.title}</title>
      <link>https://adamlacombe.com${entry.url}</link>
      <pubDate>${new Date(entry.date).toISOString()}</pubDate>
      <dc:creator>Adam LaCombe</dc:creator>
      <guid isPermaLink="false">https://adamlacombe.com${entry.url}</guid>
      <content:encoded><![CDATA[ <img src="https://adamlacombe.com${entry.img}" />${entry.description} ]]></content:encoded>
    </item>`).join("\n")}
  </channel>
</rss>
`;

  await writeFile(BLOG_FEED_FILE, xmlFeed, {
    encoding: 'utf8'
  });

  console.log(`successfully converted ${filePromises.length} files`);
})();
