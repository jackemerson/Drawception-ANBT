import { scriptVersion,
         gitUser   as user,
         gitRepo   as repository,
         gitBranch as branch,
        } from './versions'

export const banner = `// ==UserScript==
// @name         Drawception ANBT
// @author       Grom PE
// @contributor  B Derouet https://github.com/B-Derouet
// @contributor  J Emerson https://github.com/jackemerson
// @namespace    http://grompe.org.ru/
// @version      ${scriptVersion}
// @description  Enhancement script for Drawception.com - Artists Need Better Tools
// @downloadURL  https://raw.github.com/${user}/${repository}/${branch}/build/drawception-anbt.user.js
// @updateURL    https://raw.github.com/${user}/${repository}/${branch}/build/drawception-anbt.user.js
// @match        http://drawception.com/*
// @match        https://drawception.com/*
// @match        http://stage.drawception.com/*
// @match        https://stage.drawception.com/*
// @grant        none
// @run-at       document-start
// @license      Public domain
// ==/UserScript==`
