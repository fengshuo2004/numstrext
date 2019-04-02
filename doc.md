# Scratch Number String Extension Documentation
> Please note: This Doc is still updating and have missing parts
## Content
* About
    * Introduction
    * Getting started
    * Versions
* Blocks
    * String Extensions
    * Maths Extensions
    * Browser Extensions
    * File IO Extensions
* Examples
## About
### Introduction
Scratch Number String Extension was developed between 2018 and 2019 by David Feng to extend the capabilities of Scratch with the Javascript Extension API.

This extension improves upon the default string and arithmetic operation blocks, as well as adding new features like browser control integrations and file IO.

This project is on github and is under license of [Creative Commons BY 2.0](https://creativecommons.org/licenses/by/2.0/).
### Getting started
Simply select a version below and press launch to start the extension. If you wish to report a bug please go to the [Github Repository Issue](https://github.com/fengshuo2004/numstrext/issues) page.
### Versions
#### Updates
Version | Updates/Changes
:-: | :--
0.1 | The first build, string and arithmetic operations added
0.2 | Fixed the JS style (starting from 0) index, now it starts at 1 which is what the rest of scratch do <br/> JS popup functions added
0.3 | Clipboard copying function added <br/> Arithmetic functions added
1.0 | Cookie functions added <br/> Fixed invalid input, now return things on error
1.1 | Fix bugs caused by RegExp special character <br/> Chinese translated version added
1.2 | File I/O (text file upload and download) features added
**2.0** | **Control keys detection features added**
2.1α | Play audio from extenal site

The current version pushed on this repository is version 2.0
#### Parallel Versions
*code.js* - 🇬🇧Default version in English, always the first one to update [🚀Launch](http://scratchx.org/?url=https://fengshuo2004.github.io/NumStr-Ext/code.js)

*code_ZH.js* - 🇨🇳Chinese translation [🚀Launch](http://scratchx.org/?url=https://fengshuo2004.github.io/NumStr-Ext/code_ZH.js)

*code_CC.js* - 📎ClipCC Compatible version (exported file can be imported into ClipCC) **Depreciated**, stopped updating since v1.0 [🚀Launch](http://scratchx.org/?url=https://fengshuo2004.github.io/NumStr-Ext/code_CC.js)
## Blocks
### String Extensions
*string* (lower case of [**str**])

&emsp;returns the lower case of `str`

*string* (upper case of [**str**])

&emsp;returns the upper case of `str`

*number* (unicode of [**char**])

&emsp;returns the unicode encoding of character `char`
> parameter `char` must be of length 1, returns `-1` otherwise

*string* (character for unicode (**num**))

&emsp;returns the unicode character corresponding to `num`
> parameter `num` must be a positive integer, returns `""` (empty string) otherwise

*string* (replace all [**findStr**] in [**str**] with [**replaceStr**])

&emsp;finds all occurances of `findStr` in `str` and replace them with `replaceStr`

*bool* <string [**str**] contains [**substr**]>

&emsp;returns whether if `str` contains substring `substr` or not

*number* (number of [**substr**] in [**str**])

&emsp;returns the number of times `substr` occured in `str`

*number* (index of occurance (**num**) of [**substr**] in [**str**])

&emsp;finds the index (position) of the `num`th time `sbustr` occured in `str`
> This block uses Scratch-style indexing (i.e. counts from 1)
<br/> if `substr` is not found in `str`, returns `0`;
<br/> if parameter `num` is more than the number of times `substr` occured (over-indexing), `-1` is returned

*string* (letter (**startIndex**) to (**stopIndex**) of [**str**])

&emsp;slice `str` starting from the `startIndex`th character to the `stopIndex`
