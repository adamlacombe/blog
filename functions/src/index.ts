import * as express from 'express';
import * as functions from 'firebase-functions';

const checkForBots = (userAgent: string): boolean => {
  const botList = 'google|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest|slackbot|vkShare|W3C_Validator|slackbot|facebot|developers\.google\.com\/\+\/web\/snippet\/'.toLowerCase();
  return userAgent.toLowerCase().search(botList) !== -1;
};

const html = `<!DOCTYPE html>
<html dir="ltr" lang="en">

<head>
  <meta charset="utf-8">
  <title>Adam LaCombe</title>
  <meta name="description" content="Web dev blog with focus on StencilJS">

  <meta name="twitter:description" content="Web dev blog with focus on StencilJS">
  <meta property="og:description" content="Web dev blog with focus on StencilJS">

  <meta name="twitter:image"
    content="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80">
  <meta property="og:image"
    content="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80">

  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <meta name="theme-color" content="#000000">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta http-equiv="x-ua-compatible" content="IE=Edge">

  <script type="module" src="/build/app.esm.js"></script>
  <script nomodule src="/build/app.js"></script>
  <link href="/build/app.css" rel="stylesheet">

  <link rel="apple-touch-icon" href="/assets/icon/icon.png">
  <link rel="icon" type="image/png" href="/assets/icon/icon.png">
  <link rel="manifest" href="/manifest.json">

  <script data-ad-client="ca-pub-9817119432389293" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
</head>

<body>

  <app-root></app-root>


  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-174664641-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-174664641-1');
  </script>
</body>

</html>`;

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
}

export const websiteIndex = functions.https.onRequest(express().get('*', async (req, res) => {
  const botResult = checkForBots(req.headers['user-agent']);

  if (botResult) {
    const render = await require('./prerender/index.js').renderToString(html, {
      prettyHtml: false,
      removeScripts: true,
      clientHydrateAnnotations: false,
      url: req.url
    });

    res.send(replaceAll(render.html, "http://mockdoc.stenciljs.com", "https://adamlacombe.com"));
    return;
  }

  const render = await require('./prerender/index.js').renderToString(html, {
    prettyHtml: false,
    removeScripts: false,
    clientHydrateAnnotations: false,
    url: req.url
  });

  res.send(replaceAll(render.html, "http://mockdoc.stenciljs.com", "https://adamlacombe.com"));
}));
