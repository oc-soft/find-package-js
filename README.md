# Find npm package 

This is very simple npm. It finds node module directory in where npm is.

## Usage

You can use this tool like following.

``` javascript
// require this module
const FindPackage = require('@oc-soft/find-package')

const pathLib = require('path')

const fp = new FindPackage()

// find fontawsome package infomation
// you got a package information
const pkgInfo = fp.find('@fortawesome/fontawesome-free');



const submodules = [
  'css/fontawesome.css',
  'css/solid.css',
  'js/fontawesome.js',
  'js/solid.js',
];

const prefix = '@fortawesome/fontawesome-free';

submodules.forEach(submodule=> {
  console.log(pathLib.join(pkgInfo.pathInfo.dir, submodule));
});
 
```

Then you got outputs like followings.
```
/home/your-login/projects/a-project/node_modules/@fortawesome/fontawesome-free/css/fontawesome.css
/home/your-login/projects/a-project/node_modules/@fortawesome/fontawesome-free/css/solid.css
/home/your-login/projects/a-project/node_modules/@fortawesome/fontawesome-free/css/fontawesome.js
/home/your-login/projects/a-project/node_modules/@fortawesome/fontawesome-free/css/solid.js
```


