# ionic-mobile-maxcdn - Mobile monitoring app

This mobile application provides a demonstration of how to use [the MaxCDN API](http://docs.maxcdn.com/) to implement a little monitoring application. Technically it is built upon PhoneGap (Ionic, Angular) and Node.js (Express). It uses 3-legged OAuth (1.0a) for authentication and then fetches various statistics based on that information.

## Development

1. cordova platform add android
2. cordova build android
3. cordova serve android
4. npm start

## Acknowledgments

* Login based on @wookiehangover's [phonegap-auth-example](https://github.com/wookiehangover/phonegap-oauth-example) - It comes with the same caveats! You should be using `https` in production. In addition you might want to harden the implementation as discussed in that example.
* [ionic-angular-seed](https://github.com/driftyco/ionic-angular-cordova-seed)

