#!/usr/bin/env bash
set -e
#yarn setup:qa
#yarn lint:js
#yarn test
#yarn bundle exec fastlane ios beta
#yarn bundle exec fastlane android beta
yarn gh-release --minor --preRelease=beta
