# LaTeX Renderer
This is a [BetterDiscord](https://betterdiscord.app/) plugin using [MathJax](https://www.mathjax.org/) to natively render LaTeX math equations inside Discord.

## Usage
You need to use simple or double dollars inside a Discord inline or mutiline code block (this is to prevent markdown interpretation of special characters).
You can also use `\( \)` and `\[ \]`.

Examples (just copy-paste)
- Inline: `` I want to say `$\forall x\in\mathbb{N}, x\ge 0$` ! ``
- Inline: `` I want to say `\(\forall x\in\mathbb{N}, x\ge 0\)` ! ``
- Inline: `` I want to say ```$\forall x\in\mathbb{N}, x\ge 0$``` ! ``
- Inline: `` I want to say ```\(\forall x\in\mathbb{N}, x\ge 0\)``` ! ``
- Block: `` Voilà: `$$\int_0^\infty e^{-x^2}dx=\frac{\sqrt{\pi}}{2}$$` ``
- Block: `` Voilà: `\[\int_0^\infty e^{-x^2}dx=\frac{\sqrt{\pi}}{2}\]` ``
- Block: `` Voilà: ```$$\int_0^\infty e^{-x^2}dx=\frac{\sqrt{\pi}}{2}$$``` ``
- Block: `` Voilà: ```\[\int_0^\infty e^{-x^2}dx=\frac{\sqrt{\pi}}{2}\]``` ``

## Installation
Download the plugin on [BetterDiscord's website](https://betterdiscord.app/plugin/LaTeX%20Renderer).

You can also download latest here [dist/LaTeX.plugin.js](dist/LaTeX.plugin.js)

Simply put it in BetterDiscord's plugin folder

## Building the plugin
Simply clone the repo then run `npm install` and `npm run build`

Then put `dist/LaTeX.plugin.js` in BetterDiscord's plugin folder.