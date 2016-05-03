# mklicense [![MIT license](https://img.shields.io/badge/mit-license-orange.svg)](https://opensource.org/licenses/MIT) [![Travis](https://img.shields.io/travis/cezaraugusto/mklicense.svg)](http://github.com/cezaraugusto/mklicense) [![npm](https://img.shields.io/npm/dt/express.svg?maxAge=2592000)](https://www.npmjs.com/package/mklicense)

> CLI tool for generating Licenses. Easily.

<br>
<p align="center"><img src="demo.gif" width="640" height="400"></p>
<br>

## Why should I use this?

* Licenses are boring;
* Copy/paste stuff is so 1999;
* The GitHub `LICENSE` generator doesn't necessarily includes your information inside the file;
* It's busy people/beginner's friendly. It doesn't have all those flags to just install a license;
* You shouldn't trust other people to store your `LICENSE` sources. `LICENSE`s are sensible.

## Install

```
$ npm install -g mklicense
```


## Usage

```
$ mklicense
```

Please notice that `mklicense` needs `Node` version `>=0.12.13` to run properly.


## Licenses included

* Unlicense
* MIT
* Apache 2.0
* MPL 2.0
* GNU LGPL 3.0
* GNU GPL 3.0
* GNU AGPL 3.0


## You talk about trust. So, where are all the licenses located?

`mklicense` extracts licenses from http://choosealicense.com/ (which is [curated by GitHub](http://choosealicense.com/about/)), and creates a `.txt` file for your desired project. I have no control over any license, which is a good thing for you and me.


## Common possible issues


If you face problems with `contextfy` (used by a `mklicense` dependency), just run an NPM clean install:


### Mac users

```
rm -rf node_modules
npm install
```


### Windows users

if you face the same above problem, Windows won't delete the `node_modules` folder as its name is too long. To overcome it, install and run `RimRaf` module to reproduce the clean install, and everything should be fine.

```
npm install -g rimraf
rimraf node_modules
npm install
```


## License

MIT © [Cezar Augusto](http://cezaraugusto.net)
