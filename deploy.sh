#!/bin/bash

npm run build

rm ./www/index.html
rm ./www/index-org.html
rm -r ./www/blog

rm -r ./functions/src/prerender
cp -R ./dist/prerender ./functions/src/prerender

firebase deploy