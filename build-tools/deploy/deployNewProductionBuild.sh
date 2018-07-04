#!/usr/bin/env bash
set -e
yarn setup:prod
yarn lint:js
yarn test
yarn bundle exec fastlane ios production
yarn bundle exec fastlane android production
