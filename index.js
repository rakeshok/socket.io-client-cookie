var debug = require('debug')('socket.io-client-cookies');

//Cookies to be applied in the xhr
var cookies;

function patchXHR(xhrPath) {
    //Require it for the first time to store it in the require.cache
    require(xhrPath);
    
    //Get the resolved filename which happens to be the key of the module in the cache object
    var xhrName = require.resolve(xhrPath);
    
    //Get the cached xhr module
    var cachedXhr = require.cache[xhrName].exports;
    
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
}

try {
    patchXHR('../socket.io-client/node_modules/engine.io-client/node_modules/xmlhttprequest');
} catch (e) {
    debug('Failed to patch engine.io v1.5.x.  If you are running a later version you can ignore this', e);
}

try {
    patchXHR('../socket.io-client/node_modules/engine.io-client/lib/xmlhttprequest');
} catch (e) {
    debug('Failed to patch engine.io v1.6.x.  If you are running an earlier version you can ignore this', e);
}

try {
    patchXHR('../socket.io-client/node_modules/engine.io-client/node_modules/xmlhttprequest-ssl');
} catch (e) {
    debug('Failed to patch engine.io v1.6.x.  If you are running an earlier version you can ignore this', e);
}

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
