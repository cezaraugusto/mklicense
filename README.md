# mklicense [![MIT license](https://img.shields.io/badge/mit-license-orange.svg)](https://opensource.org/licenses/MIT) [![Travis](https://img.shields.io/travis/cezaraugusto/mklicense.svg)](http://github.com/cezaraugusto/mklicense)

> CLI tool for generating Licenses. Easily.

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

Please notice that `mklicense` needs `Node` version `>=0.12` to run properly.

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

## License

MIT © [Cezar Augusto](http://cezaraugusto.net)