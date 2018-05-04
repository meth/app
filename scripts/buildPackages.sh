#!/usr/bin/env bash

set -e

echo '{ "mode": "production" }' >> ./appConfig.json

rm -rf ./packages
mkdir ./packages

./node_modules/.bin/electron-packager ./ --out ./packages --ignore scripts --ignore src --ignore testdata --ignore build/vendor --ignore .jest --ignore .circleci --ignore build/web/js/app*.map

rm ./appConfig.json
