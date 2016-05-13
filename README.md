[![Build Status](https://travis-ci.org/AOEpeople/deferred-event-callback.svg?branch=master)](https://travis-ci.org/AOEpeople/deferred-event-callback)

# deferred-event-callback

Calling event callbacks with a delay. Supports jQuery.

## How
```javascript
deferredEventCallback(options, deferredCallback);
```

### options (object)
| option        | mandatory            | type     | defaultValue     | description                                         |
| ------------- |:--------------------:| --------:|-----------------:|----------------------------------------------------:|
| eventNames    | :white_check_mark:   | Array    | -                | The event names to which the node(s) should listen  |
| nodes         | :white_check_mark:   | Array    | -                | The nodes to which the listeners should be bound    |
| timeoutValue  | :x:                  | Number   | 300              | How long to wait before calling the  callback       |
| jquery        | :x:                  | function | -                | Pass in jQuery instance to use jQuery event binding |

### deferredCallback (function)
The callback is called after the specified timeoutValue. The timeout gets the node passed in on that the event has been triggered. The passed in node is not selected with jquery, even if options.jquery is a jquery instance.

## Example
```javascript
deferredEventCallback({timeoutValue: 200, eventNames: ['resize'], nodes: [window], jquery: jQuery}, function() {
  // executed with 200ms delay when resize event triggered on window and only once (if no other 
  // resize event triggered on window for 200 ms)
});
```
## Stopping callback triggering
Sometimes it might be useful to stop the triggering of the deferred callback. This can be done by passing in a returnObject and afterwards calling `abort`, passing in the returnObject:

```javascript
    var returnObj;
    lib({eventNames: ['keypress', 'keyup'], nodes: [node, node, node], jquery: $, timeoutValue: 50}, callback, returnObj);

    // later do
    lib.abort(returnObj);
```

## Why
When using events like 'resize' you don't want to call your callback function everytime the browser triggers the resize event (it's quite often). Instead you want to wait some milliseconds and see if the resize is still in progress.

When using events like 'input' and 'propertychange' for stuff like livesuggestions you don't want to trigger a xhr everytime input / propertychange triggers. Instead you want to wait some milliseconds and see if the user is typing another letter.
