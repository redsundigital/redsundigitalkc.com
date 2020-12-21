# redsundigitalkc.com

Public business site for [Red Sun Digital](https://redsundigitalkc.com).

Contents:

- [Getting Started](#getting-started)
  - [Sass & CSS](#sass-&-css)
  - [package.json](#package.json)
- [Hosting](#hosting)
  - [cPanel](#cpanel)

# Getting Started

## Sass & CSS

To change the style of the site, modify the `.sass` files in `/sass`. **No css should be modified manually.**

To compile sass to css on the go, use one of the following commands:

```
# Normal
npm run sass

# Minified (preferred)
npm run sass-c
```

Sass will compile into a single css file located at `/assets/css/base.css/base.css`.

## package.json

The `package.json` file is only used to conveniently run npm scripts from VS Code.

# Hosting

## cPanel

The `.cpanel.yml` file tells cPanel to copy everything from this project to the public_html deploy path.
