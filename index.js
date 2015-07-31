// XMLHttpRequest to override.
var xhrPath = '../socket.io-client/node_modules/engine.io-client/node_modules/xmlhttprequest';

//Require it for the first time to store it in the require.cache
require(xhrPath);

//Get the resolved filename which happens to be the key of the module in the cache object
var xhrName = require.resolve(xhrPath);

//Get the cached xhr module
var cachedXhr = require.cache[xhrName].exports;

//Cookies to be applied in the xhr
var cookies;

////Monkey Patch
var newXhr = function () {
    cachedXhr.apply(this, arguments);
    this.setDisableHeaderCheck(true);

    var stdOpen = this.open;
    this.open = function () {
        stdOpen.apply(this, arguments);
        this.setRequestHeader('Cookie', cookies);

    }
};

newXhr.XMLHttpRequest = newXhr;
require.cache[xhrName].exports = newXhr;
module.exports = newXhr;

module.exports.setCookies = function(newCookies) {
    cookies = newCookies;
};


//Monkey patch that allows to add custom functions before calling socket.io constructor

//// Example
//callbacks.test = function () {
//    console.log("In callback.");
//};
//
////Monkey Patch
//var newXhr = function () {
//    cachedXhr.apply(this, arguments);
//    for (var method in callbacks) {
//        if (typeof callbacks[method] == "function") {
//            callbacks[method].apply(this, arguments);
//        }
//    }
//};