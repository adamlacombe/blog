---
title: How to convert images to AVIF in NodeJS
date: September 7, 2020
url: /blog/how-to-convert-images-to-avif-in-nodejs
author: Adam LaCombe
twitter: adamlacombe
description: AVIF is the latest next-gen image compression format. Learn how to convert images to AVIF using the Sharp library.
tags: AVIF, NodeJS, Sharp
img: /assets/blog/images/how-to-convert-images-to-avif-in-nodejs/main.png
---

## What is AVIF and why should I be using it?
AVIF is the latest next-gen image compression format. It offers significant file size reduction for images compared with JPEG ( ~50% ) or WebP ( ~20% ). Chrome recently shipped support for [AVIF in Chrome 85](https://www.chromestatus.com/feature/4905307790639104#status) and it can be enabled in [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1443863) via the `image.avif.enabled` flag in `about:config`.

Take a look at this [blog post](https://netflixtechblog.com/avif-for-next-generation-image-coding-b1d75675fe4) published by **Netflix** if you're looking for a more in-depth comparison.

## How can I convert my images to AVIF?
[Squoosh](https://squoosh.app/) recently [shipped support](https://github.com/GoogleChromeLabs/squoosh/pull/722) for AVIF if you don't mind manually converting your images.

If you're looking for a more automated method, you could try using [Sharp](https://github.com/lovell/sharp). 
Sharp offers [support for AVIF](https://sharp.pixelplumbing.com/api-output#heif) although it is currently experimental. 

Unfortunately, Sharp's prebuilt binaries do not support AVIF, so you will have to compile `libvips` with support for `libheif` before you can start taking advantage of this "experimental" feature.

To simplify this process I created a [Dockerfile](https://github.com/adamlacombe/sharp-image-proxy/blob/master/Dockerfile) that I'm using in [sharp-image-proxy](https://github.com/adamlacombe/sharp-image-proxy).

<repo-card name="adamlacombe/sharp-image-proxy"></repo-card>

If you aren't familiar with Docker, I suggest you read my post: [Introduction to Docker](/blog/introduction-to-docker).

Once you have `libvips` installed and compiled with support for `libheif` you can start using the Sharp API. 

Here's an example of how you can convert a png to avif:
```typescript
import * as sharp from 'sharp';

sharp('input.png')
  .toFormat('heif', { quality: 30, compression: 'av1' })
  .toFile('output.avif')
  .then(info => console.log(info));
```