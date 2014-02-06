# ionic-mobile-maxcdn - Mobile monitoring app

This mobile application provides a demonstration of how to use [the MaxCDN API](http://docs.maxcdn.com/) to implement a little monitoring application. Technically it is built upon PhoneGap (Ionic, Angular) and Node.js (Express). It uses 3-legged OAuth (1.0a) for authentication and then fetches various statistics based on that information.

## Development

You should set up Android, iOS, WP if you want to develop on one of those platforms. After that the workflow looks something like this:

1. `npm start` (in another terminal or screen it)
2. `cordova platform add android`
3. `cordova build android`
4. Plug in Android device through USB (remember to enable USB debugging via System settings -> Developer Options Debugging -> USB debugging)
5. `cordova run android`

You can skip step 2. after you have done it once.

## Acknowledgments

* Login based on @wookiehangover's [phonegap-auth-example](https://github.com/wookiehangover/phonegap-oauth-example) - It comes with the same caveats! You should be using `https` in production. In addition you might want to harden the implementation as discussed in that example.
* [ionic-angular-seed](https://github.com/driftyco/ionic-angular-cordova-seed)

