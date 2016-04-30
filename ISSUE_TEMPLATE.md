# Issues

## Reporting your issue

While describing an issue, check if:

- [ ] You did the workarounds described under [common possible issues](#common-possible-issues)
- [ ] You described which SO you're using
- [ ] You described which Node version `node -v` you're using
- [ ] At which point of the program you found the issue


## Common possible issues

### Mac users

If you face problems with `contextfy` (used by a `mklicense` dependency), just run an NPM clean install:

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
