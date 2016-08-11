6.0.0
- callback is now property of options {callback: function() {}}, passing a callback as second argument won't work any longer
- the returnObj has been removed, thus aborting a callback now works as follows: 
```
var instance = deferredEventCallback({configuration});
instance.abort();
```