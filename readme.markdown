# Browserifyski

Use Browserify + Watch at ease. It's a breeze!



# Install

With [npm](http://npmjs.org) do:

```
npm install browserifyski
```


# Usage

``` js
var browserifyski = require('browserifyski');
browserifyski(
	[{
		source: './assets/app.js',
		output_dir: './assets/js',
		output: 'app.bundle.js',
		min: true
	}],
	{
		min: false
	}
);
```



browserifyski takes two arguments:
- files array
- general options

min stands for minify
the min option in the files-array overrides the min option in the general options in case you want to override it for single files