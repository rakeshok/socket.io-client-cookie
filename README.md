# socket.io-client-cookie

Send cookies from nodejs in the socket.io-client (Monkeypatch)

## What?

SocketIO use a javascript implementation of xmlhttprequest (github.com/driverdan/node-XMLHttpRequest) which does not allow settings cookies due to the specification (http://www.w3.org/TR/XMLHttpRequest/) so this is monkey patch to set cookies in the xmlhttprequest lib used by socket io (./node_modules/socket.io-client/node_modules/engine.io-client/node_modules/xmlhttprequest)

Most of the info was taken from here:
https://gist.github.com/jfromaniello/4087861

Discussion:
https://github.com/socketio/socket.io-client/issues/344
https://github.com/socketio/socket.io-client/pull/587

##Usage

###socket.io-client running on nodejs

```
var newXhr = require('socket.io-client-cookie');
newXhr.setCookies('mycookie=something');
var socketIO = require('socket.io-client')('Somewhere only we now');
```

###socket.io

```
var cookieString = socket.request.headers.cookie;
//You can use https://www.npmjs.com/package/socket.io-cookie to parse the cookies or something
```


