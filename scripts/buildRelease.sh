#!/usr/bin/env bash

set -e

# rm -rf ./package
# mkdir ./package
#
# cp -rf ./electron ./package/electron
# cp ./package.json ./package
# cp -rf ./build/web ./package/web
# cp -rf ./common ./package/common
# cp -rf ./node_modules ./package/node_modules

echo '{ \"mode\": \"production\" }' >> ./appConfig.json

rm -rf ./release
mkdir ./release

./node_modules/.bin/electron-packager ./ --out ./release --ignore scripts --ignore src --ignore testdata --ignore build/vendor --ignore .jest --ignore .circleci

rm ./appConfig.json
