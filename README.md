Configuration cjson
==========

Is a wrapper for configuration with CJSON.

How to use it:

```js
var CJSON = require('configjson');
var myConfig = CJSON([
	'file1.json',
	'file2.json',
], {
	"hello" : ":)"
});
```

Make a call the variables.

```js
myConfig.get(name);
myConfig.set(obj);
myConfig.set(name, val);
myconfig.enable(name);
myconfig.disable(name);
myconfig.enabled(name);
myconfig.disabled(name);
```

Make configurable

```js

myconfig.configure("test", function(){
	// Only run in Test
});

myconfig.configure("production", function(){
	// Only run in Production
});

myconfig.configure(function(){
	// Run in All
});

```