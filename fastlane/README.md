fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios beta
```
fastlane ios beta
```
Submit a new Beta Build to Apple TestFlight
### ios production
```
fastlane ios production
```
Submit a new Production Build to Apple

----

## Android
### android dev
```
fastlane android dev
```
Do a dev build
### android beta
```
fastlane android beta
```
Submit a new Beta Build to TestFairy
### android production
```
fastlane android production
```
Submit a new Production Build to Google Play

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
