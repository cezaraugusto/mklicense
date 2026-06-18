[npm-version-image]: https://img.shields.io/npm/v/mklicense.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/mklicense
[npm-downloads-image]: https://img.shields.io/npm/dm/mklicense.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/mklicense
[action-image]: https://github.com/cezaraugusto/mklicense/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/mklicense/actions

> CLI tool for building Licenses files. Easily.

# mklicense [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

<br>
<p align="center"><img src="demo.gif" width="640" height="400"></p>
<br>

## Stay Tuned :star: :star: :star: :star: :star: 

v. `1.0` is coming!

* `mklicense` will behave like an old school text-based game, to drive you to which license suits best for your project (thanks [Jerod Santo](https://github.com/jerodsanto) for the idea). But still keeping its value as-is, behaving like a straight-to-the-point tool.


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

Since its version 0.1.4, `mklicense` needs `Node` version `>=4` to run properly.


## Related projects

* [pintor](https://github.com/cezaraugusto/pintor)
* [log-md](https://github.com/cezaraugusto/log-md)
* [prefers-yarn](https://github.com/cezaraugusto/prefers-yarn)
* [go-git-it](https://github.com/cezaraugusto/go-git-it)
* [git-precision](https://github.com/cezaraugusto/git-precision)
* [isolated-deps](https://github.com/cezaraugusto/isolated-deps)

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

MIT (c) Cezar Augusto.
