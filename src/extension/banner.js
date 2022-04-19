import { scriptVersion } from './versions'

export const banner = `// ==UserScript==
// @name         Drawception ANBT
// @author       Grom PE
// @contributor  B Derouet https://github.com/B-Derouet
// @contributor  J Emerson https://github.com/jackemerson
// @namespace    http://grompe.org.ru/
// @version      ${scriptVersion}
// @description  Enhancement script for Drawception.com - Artists Need Better Tools
// @downloadURL  https://raw.github.com/jackemerson/Drawception-ANBT/master/build/drawception-anbt.user.js
// @match        http://drawception.com/*
// @match        https://drawception.com/*
// @grant        none
// @run-at       document-start
// @license      Public domain
// ==/UserScript==`
