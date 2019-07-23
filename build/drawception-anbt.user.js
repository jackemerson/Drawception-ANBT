// ==UserScript==
// @name         Drawception ANBT
// @author       Grom PE
// @namespace    http://grompe.org.ru/
// @version      2.0.2019.07
// @description  Enhancement script for Drawception.com - Artists Need Better Tools
// @downloadURL  https://raw.github.com/EnderDragonneau/Drawception-ANBT/master/build/drawception-anbt.user.js
// @match        http://drawception.com/*
// @match        https://drawception.com/*
// @grant        none
// @run-at       document-start
// @license      Public domain
// ==/UserScript==
;(function() {
  'use strict'

  const addDarkCSS = () =>
    localStorage.setItem(
      'gpe_darkCSS',
      (
        'a{color:#77c0ff$}.wrapper{~#444$}#nav-drag{~#353535$}.btn-default{~#7f7f7f$;border-bottom-color:#666$;border-left-color:#666$;border-right-color:#666$;border-top-color:#666$;color:#CCC$}' +
        '.btn-default:hover,.btn-default:focus,.btn-default:active,.btn-default.active,.open .dropdown-toggle.btn-default{~#757575$;border-bottom-color:#565656$;border-left-color:#565656$;border-right-color:#565656$;border-top-color:#565656$;color:#DDD$}' +
        '.btn-success{~#2e2e2e$;border-bottom-color:#262626$;border-left-color:#262626$;border-right-color:#262626$;border-top-color:#262626$;color:#CCC$}' +
        '.btn-success:hover,.btn-success:focus,.btn-success:active,.btn-success.active,.open .dropdown-toggle.btn-success{~#232323$;border-bottom-color:#1c1c1c$;border-left-color:#1c1c1c$;border-right-color:#1c1c1c$;border-top-color:#1c1c1c$;color:#DDD$}' +
        '.btn-primary{~#213184$;border-bottom-color:#1a1a68$;border-left-color:#1a1a68$;border-right-color:#1a1a68$;border-top-color:#1a1a68$;color:#CCC$}' +
        '.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary.active,.open .dropdown-toggle.btn-primary{~#191964$;border-bottom-color:#141450$;border-left-color:#141450$;border-right-color:#141450$;border-top-color:#141450$;color:#DDD$}' +
        '.btn-info{~#2d7787$;border-bottom-color:#236969$;border-left-color:#236969$;border-right-color:#236969$;border-top-color:#236969$;color:#CCC$}' +
        '.btn-info:hover,.btn-info:focus,.btn-info:active,.btn-info.active,.open .dropdown-toggle.btn-info{~#1c5454$;border-bottom-color:#133939$;border-left-color:#133939$;border-right-color:#133939$;border-top-color:#133939$;color:#DDD$}' +
        '.navbar-default .navbar-toggle:hover,.navbar-default .navbar-toggle:focus{~#3b3b3b$}.navbar-toggle{~#393939$}.navbar{border-bottom:1px solid #000$}.forum-thread-starter,.breadcrumb,.regForm{~#555$}' +
        '.form-control{~#666$;border:1px solid #333$;color:#EEE$}code,pre{~#656$;color:#FCC$}body{color:#EEE$}footer{~#333$;border-top:1px solid #000$}' +
        '.pagination>li:not(.disabled):not(.active),.pagination>li:not(.disabled):not(.active)>a:hover,.pagination>li:not(.disabled):not(.active)>span:hover,.pagination>li:not(.disabled):not(.active)>a:focus,.pagination>li:not(.disabled):not(.active)>span:focus{~#444$}.pagination>li>a,.pagination>li>span{~#555$;border:1px solid #000$}' +
        '.pagination>.active>a,.pagination>.active>span,.pagination>.active>a:hover,.pagination>.active>span:hover,.pagination>.active>a:focus,.pagination>.active>span:focus{~#666$;border-top:1px solid #444$;border-bottom:1px solid #444$}' +
        '.drawingForm{~#555$}.well{~#666$;border:1px solid #333$}#timeleft{color:#AAA$}legend{border-bottom:1px solid #000$}.thumbpanel{color:#EEE;~#555$}.thumbpanel img{~#fffdc9$}.panel-number,.modal-content,.profile-user-header{~#555$}' +
        '#commentForm{~#555$;border:1px solid #000$}.modal-header,.nav-tabs{border-bottom:1px solid #000$}hr,.modal-footer{border-top:1px solid #000$}' +
        '.store-item{background:#666$;~-moz-linear-gradient(top,#666 0,#333 100%)$;~-webkit-gradient(linear,left top,left bottom,color-stop(0,#666),color-stop(100%,#333))$;~-webkit-linear-gradient(top,#666 0,#333 100%)$;~-o-linear-gradient(top,#666 0,#333 100%)$;~-ms-linear-gradient(top,#666 0,#333 100%)$;~linear-gradient(to bottom,#666 0,#333 100%)$;border:1px solid #222$}' +
        '.store-item:hover{border:1px solid #000$}.store-item-title{~#222$;color:#DDD$}.store-title-link{color:#DDD$}.profile-award{~#222$}.profile-award-unlocked{~#888$}.progress-bar{color:#CCC$;~#214565$}.progress{~#333$}' +
        '.progress-striped .progress-bar{background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(.25,rgba(0,0,0,0.15)),color-stop(.25,transparent),color-stop(.5,transparent),color-stop(.5,rgba(0,0,0,0.15)),color-stop(.75,rgba(0,0,0,0.15)),color-stop(.75,transparent),to(transparent))$;background-image:-webkit-linear-gradient(45deg,rgba(0,0,0,0.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.15) 75%,transparent 75%,transparent)$;background-image:-moz-linear-gradient(45deg,rgba(0,0,0,0.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.15) 75%,transparent 75%,transparent)$;background-image:linear-gradient(45deg,rgba(0,0,0,0.15) 25%,transparent 25%,transparent 50%,rgba(0,0,0,0.15) 50%,rgba(0,0,0,0.15) 75%,transparent 75%,transparent)$}' +
        '.progress-bar-success{~#363$}.progress-bar-info{~#367$}.progress-bar-warning{~#863$}.progress-bar-danger{~#733$}' +
        '.nav-tabs>li.active>a,.nav-tabs>li.active>a:hover,.nav-tabs>li.active>a:focus{color:#DDD$;~#555$;border:1px solid #222$}.nav>li>a:hover,.nav>li>a:focus{~#333$;border-bottom-color:#222$;border-left-color:#111$;border-right-color:#111$;border-top-color:#111$}' +
        '.nav>li.disabled>a,.nav>li.disabled>a:hover,.nav>li.disabled>a:focus{color:#555$}.table-striped>tbody>tr:nth-child(2n+1)>td,.table-striped>tbody>tr:nth-child(2n+1)>th{~#333$}' +
        '.table-hover>tbody>tr:hover>td,.table-hover>tbody>tr:hover>th{~#555$}.table thead>tr>th,.table tbody>tr>th,.table tfoot>tr>th,.table thead>tr>td,.table tbody>tr>td,.table tfoot>tr>td{border-top:1px solid #333$}.news-alert{~#555$;border:2px solid #444$}' +
        '.btn-menu{~#2e2e2e$}.btn-menu:hover{~#232323$}.btn-yellow{~#8a874e$}.btn-yellow:hover{~#747034$}' +
        'a.label{color:#fff$}.text-muted,a.text-muted{color:#999$}a.wrong-order{color:#F99$}div.comment-holder:target{~#454$}' +
        '.popover{~#777$}.popover-title{~#666$;border-bottom:1px solid #444$}.popover.top .arrow:after{border-top-color:#777$}.popover.right .arrow:after{border-right-color:#777$}.popover.bottom .arrow:after{border-bottom-color:#777$}.popover.left .arrow:after{border-left-color:#777$}' +
        '.label-fancy{~#444$;border-color:#333$;color:#FFF$}' +
        '.avatar,.profile-avatar{~#444$;border:1px solid #777$;}' +
        '.bg-lifesupport{~#444$}body{~#555$}.snap-content{~#333$}' +
        'select,textarea{color:#000$}.help-block{color:#ddd$}.jumbotron{~#444$}' +
        '.navbar-dropdown{~#444$}a.list-group-item{~#444$;color:#fff$;border:1px solid #222$}a.list-group-item:hover,a.list-group-item:focus{~#222$}' +
        '.likebutton.btn-success{color:#050$;~#5A5$}.likebutton.btn-success:hover{~#494$}' +
        ".thumbnail[style*='background-color: rgb(255, 255, 255)']{~#555$}" +
        '.popup,.v--modal{~#666$;border:1px solid #222$}.btn-reaction{~#666$;border:none$;color:#AAA$}@media(min-width:625px){.create-game-wrapper{~#555$}}' +
        '.profile-header{~#555$}.profile-nav > li > a{~#333$}.profile-nav>li.active>a,.profile-nav>li>a:hover{~#555$}' +
        '.gsc-control-cse{~#444$;border-color:#333$}.gsc-above-wrapper-area,.gsc-result{border:none$}.gs-snippet{color:#AAA$}.gs-visibleUrl{color:#8A8$}a.gs-title b,.gs-visibleUrl b{color:#EEE$}.gsc-adBlock{display:none$}.gsc-input{~#444$;border-color:#333$;color:#EEE$}' +
        '.comment-highlight{border:none$;background:#454$}#header-emotes{~#555$}#header-bar-container{border:none$}.paypal-button-tag-content{color:#EEE$}.numlikes{color:#EEE$}.gsc-input-box{~#444$;border-color:#333$}.gsc-completion-container{~#333$;border-color:#000$}.gsc-completion-selected{~#222$}.gsc-completion-container b{color:#AAA$}.alert-nice{~#4a4a4a$}.store-buy-coins{~#777$}.store-buy-coins:hover{~#666$}.store-buy-coins>h2,.store-buy-coins>h2>small{color:#EEE$}.store-package-selector{~#888$}.store-package-selector>label{color:#EEE$}.label-stat{~#444$;color:#EEE$;border:1px solid #555$}.label-stat.disabled{~#333$}.option{padding:4px 8px$;~#666$;color:#EEE$;border-color:#333$}.option.selected{border-color:#EEE$}.sleek-select{~#666$;border-color:#333$}select{color:#EEE$}.modal-note{color:#EEE$}.vue-dialog-button{~#555$;border:none$}.vue-dialog-button:hover{~#5a5a5a$}.vue-dialog-buttons{border-top:1px solid #222$}.dashboard-item{~#333$}legend{color:#EEE$}.list-group-item{~#444$;color:#EEE$;border:1px solid #222$}.alert-warning{color:#EEE$;~#555$;border-color:#555$}.btn-reaction.active{border:1px solid #EEE$}.bg-shadow-box{~#333$}.btn-gray{~#222$;border:none$}.btn-gray:hover{color:#EEE$;~#1a1a1a$}.btn-bright{~#333$;color:#EEE$}' +
        '.player-name-new{color:#33b73f$}.gsc-tabsArea>div{overflow:hidden$}.gs-image-popup-box{~#333$;border-color:#222$}.gs-size{color:#6f6f6f$}.gsc-result-info{color:#EEE$}.gsc-refinementsArea{border:none$}.gsc-tabsArea{border-bottom-color:#333$}.gsc-cursor-page{color:#EEE$}.gsc-cursor-current-page{color:#AAA$}.profile-nav>.disabled>a{color:#555$;~#3a3a3a$}.profile-nav>.disabled>a:hover{~#3a3a3a$}.sleek-select:hover{border-color:#EEE$}' +
        '.btn-menu{border-color:#1e1e1e$;text-shadow:0px 0px 3px #777$}.btn-menu:hover{border-color:#1e1e1e$}.pagination>.active>span{color:#EEE$}#btn-notifications{color:#EEE$}.btn-warning{color:#EEE$}.alert-nice{color:#EEE$}.emotes-popup{~#2e2e2e$}.navbar-toggle{~#2e2e2e$;border-color:#1e1e1e$}.navbar-toggle .icon-bar{~#EEE$}' +
        '.gamepanel-highlight{box-shadow:0 0 20px #111$;~#222$}' +
        'a.anbt_replaypanel:hover{color:#8af$}' +
        '.anbt_favedpanel{color:#d9534f$}' +
        ''
      )
        .replace(/~/g, 'background-color:')
        .replace(/\$/g, ' !important')
    )

  const getLocalStorageItem = (name, empty) => {
    const item = localStorage.getItem(name)
    try {
      return item ? JSON.parse(item) : empty || ''
    } catch (e) {
      return item ? item : empty || ''
    }
  }

  const setDarkMode = () => {
    const settings = getLocalStorageItem('gpe_anbtSettings', {})
    if (settings.anbtDarkMode || typeof settings.anbtDarkMode === 'undefined') {
      if (getLocalStorageItem('gpe_inDark', 0)) {
        const css = document.createElement('style')
        css.id = 'darkgraycss'
        css.type = 'text/css'
        css.appendChild(
          document.createTextNode(getLocalStorageItem('gpe_darkCSS'))
        )
        if (document.head) document.head.appendChild(css)
        else {
          const darkLoad = setInterval(() => {
            if (!document.head) return
            document.head.appendChild(css)
            clearInterval(darkLoad)
          }, 100)
        }
      }
    }
  }

  const options = {
    enableWacom: 0,
    fixTabletPluginGoingAWOL: 1,
    hideCross: 0,
    enterToCaption: 0,
    pressureExponent: 0.5,
    backup: 1,
    timeoutSound: 0,
    timeoutSoundBlitz: 0,
    timeoutSoundVolume: 100,
    newCanvas: 1,
    proxyImgur: 0,
    ajaxRetry: 1,
    localeTimestamp: 0,
    autoplay: 1,
    submitConfirm: 1,
    smoothening: 1,
    autoBypassNSFW: 0,
    colorNumberShortcuts: 1,
    colorUnderCursorHint: 1,
    bookmarkOwnCaptions: 0,
    colorDoublePress: 0,
    newCanvasCSS: '',
    forumHiddenUsers: '',
    maxCommentHeight: 1000,
    useOldFont: true,
    useOldFontSize: true,
    markdownTools: 1,
    anbtDarkMode: 1
  }

  const $ = (selector, array = false) => {
    const elements = selector.startsWith('<')
      ? [
          ...new DOMParser().parseFromString(selector, 'text/html').body
            .children
        ]
      : [...document.querySelectorAll(selector)]
    return elements.length > 1 || array ? elements : elements[0]
  }

  const betterCreate = () => {
    if (!options.enterToCaption) {
      if ($('#prompt'))
        $('#prompt').addEventListener('keydown', event => {
          if (event.keyCode === 13) event.preventDefault()
        })
    }
  }

  const addStyle = css => {
    const parent =
      document.getElementsByTagName('head')[0] || document.documentElement
    const style = document.createElement('style')
    style.type = 'text/css'
    style.appendChild(document.createTextNode(css))
    parent.appendChild(style)
  }

  const globals = {
    userId: getLocalStorageItem(
      'gpe_lastSeenId',
      $('.player-dropdown a[href^="/player/"]') &&
        $('.player-dropdown a[href^="/player/"]').href.match(
          /\/player\/(\d+)\//
        )[1]
    ),
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    alphabet: '36QtfkmuFds0UjlvCGIXZ125bEMhz48JSYgipwKn7OVHRBPoy9DLWaceqxANTr',
    greetings: [
      'Oruvaq lbh!',
      "Ubcr vg'f abg envavat gbqnl.",
      'Jurer vf lbhe tbq abj?',
      'Lbh fubhyq srry 5% zber cbjreshy abj.',
      'Fhqqrayl, abguvat unccrarq!',
      '^_^',
      'Guvf gnxrf fb ybat gb svavfu...',
      "Jungrire lbh qb, qba'g ernq guvf grkg.",
      'Pyvpx urer sbe 1 serr KC',
      'Or cngvrag.',
      "Whfg qba'g fgneg nal qenzn nobhg vg.",
      '47726S6Q2069732074686520677265617465737421',
      'Cynl fzneg.',
      'Cynl avpr.',
      'Fzvyr!',
      "Qba'g sbetrg gb rng.",
      "V xabj jung lbh'ir qbar.",
      'Fpvrapr!',
      'Gbqnl vf n tbbq qnl.'
    ]
  }

  const decimalToBase62 = number => {
    let result = ''
    while (number !== 0) {
      const quotient = number % 62
      result = globals.alphabet[quotient] + result
      number = (number - quotient) / 62
    }
    return result
  }

  const scrambleID = number => {
    if (isNaN(number)) throw new Error('Invalid panel ID')
    return [...decimalToBase62(parseInt(number, 10) + 3521614606208)]
      .reverse()
      .join('')
  }

  const linkifyDrawingPanels = img => {
    if (img.parentNode.nodeName !== 'A') {
      if (
        img.src.match(/\/images\/panels\//) ||
        img.src.match(/\/pub\/panels\//)
      )
        img.outerHTML = `<a href="/game/${
          img.src.match(/\/([^-]+)-\d+.png/)[1]
        }/-/">${img.outerHTML}</a>`
      if (img.src.match(/\/drawings\//))
        img.outerHTML = `<a href="/panel/drawing/${
          img.src.match(/(\w+).png$/)[1]
        }/-/">${img.outerHTML}</a>`
      if (img.src.match(/\/panel\//))
        img.outerHTML = `<a href="${img.src}-/">${img.outerHTML}</a>`
      if (img.src.match(/\/images\/games\//) || img.src.match(/\/pub\/games\//))
        img.outerHTML = `<a href="/game/${
          img.src.match(/\/([^/]+)\.png/)[1]
        }/-/">${img.outerHTML}</a>`
      if (img.src.match(/\/display-panel.php?/)) {
        const newsrc = `/panel/drawing/${scrambleID(
          img.src.match(/x=(\d+)/)[1]
        )}/`
        img.setAttribute('src', newsrc)
        img.outerHTML = `<a href="${newsrc}-/">${img.outerHTML}</a>`
      }
    }
  }

  const linkifyNodeText = node => {
    if (node.textContent.includes('://'))
      node.innerHTML = node.innerHTML.replace(
        /([^"]|^)(https?:\/\/(?:(?:(?:[^\s<()]*\([^\s<()]*\))+)|(?:[^\s<()]+)))/g,
        '$1<a href="$2">$2</a>'
      )
  }

  const versions = {
    scriptVersion: '2.0.2019.07',
    newCanvasVersion: 54,
    siteVersion: 'dbc605ce',
    runtimeVersion: '1ba6bf05'
  }

  const setupNewCanvas = (insandbox, url) => {
    const canvasHTML = localStorage.getItem('anbt_canvasHTML')
    const canvasHTMLver = localStorage.getItem('anbt_canvasHTMLver')
    if (
      !canvasHTML ||
      canvasHTMLver < versions.newCanvasVersion ||
      canvasHTML.length < 10000
    ) {
      const request = new XMLHttpRequest()
      request.open(
        'GET',
        'https://api.github.com/repos/EnderDragonneau/Drawception-ANBT/contents/build/index.html'
      )
      request.setRequestHeader('Accept', 'application/vnd.github.3.raw')
      request.onload = () => {
        if (request.responseText.length < 10000) {
          alert(
            `Error: instead of new canvas code, got this response from GitHub:\n${request.responseText}`
          )
          location.pathname = '/'
        } else {
          localStorage.setItem('anbt_canvasHTML', request.responseText)
          localStorage.setItem('anbt_canvasHTMLver', versions.newCanvasVersion)
          setupNewCanvas(insandbox, url)
        }
      }
      request.onerror = () => {
        alert('Error loading the new canvas code. Please try again.')
        location.pathname = '/'
      }
      request.send()
      return
    }
    const inforum = url.match(/forums\//)
    const friendgameid = url.match(/play\/(.+)\//)
    const panelid = url.match(/sandbox\/#?([^/]+)/)
    const incontest =
      url.match(/contests\/play\//) && document.getElementById('canvas-holder')
    const vertitle = `ANBT v${versions.scriptVersion}`
    if (incontest) window.onbeforeunload = () => {}
    const normalurl =
      insandbox && !inforum
        ? `/sandbox/${panelid ? `#${panelid[1]}` : ''}`
        : incontest
        ? '/contests/play/'
        : inforum
        ? url.match(/\/forums\/?.+/)
        : `/play/${friendgameid ? `${friendgameid[1]}/` : ''}`
    try {
      if (location.pathname + location.hash !== normalurl)
        history.pushState({}, document.title, normalurl)
    } catch (e) {}
    const alarmSoundOgg =
      'data:audio/ogg;base64,T2dnUwACAAAAAAAAAABnHAAAAAAAAHQUSFoBHgF2b3JiaXMAAAAAAUSsAAAAAAAAYG0AAAAAAADJAU9nZ1MAAAAAAAAAAAAAZxwAAAEAAABq35G0DxD/////////////////NQN2b3JiaXMAAAAAAAAAAAEFdm9yYmlzH0JDVgEAAAEAFGNWKWaZUpJbihlzmDFnGWPUWoolhBRCKKVzVlurKbWaWsq5xZxzzpViUilFmVJQW4oZY1IpBhlTEltpIYQUQgehcxJbaa2l2FpqObacc62VUk4ppBhTiEromFJMKaQYU4pK6Jxz0DnmnFOMSgg1lVpTyTGFlFtLKXROQgephM5SS7F0kEoHJXRQOms5lRJTKZ1jVkJquaUcU8qtpphzjIHQkFUAAAEAwEAQGrIKAFAAABCGoSiKAoSGrAIAMgAABOAojuIokiI5kmM5FhAasgoAAAIAEAAAwHAUSZEUy9EcTdIszdI8U5ZlWZZlWZZlWZZd13VdIDRkFQAAAQBAKAcZxRgQhJSyEggNWQUAIAAAAIIowxADQkNWAQAAAQAIUR4h5qGj3nvvEXIeIeYdg9577yG0XjnqoaTee++99x5777n33nvvkWFeIeehk9577xFiHBnFmXLee+8hpJwx6J2D3nvvvfeec+451957752j3kHpqdTee++Vk14x6Z2jXnvvJdUeQuqlpN5777333nvvvffee++9955777333nvvrefeau+9995777333nvvvffee++9995777333nvvgdCQVQAAEAAAYRg2iHHHpPfae2GYJ4Zp56T3nnvlqGcMegqx9557773X3nvvvffeeyA0ZBUAAAgAACGEEFJIIYUUUkghhhhiyCGHHIIIKqmkoooqqqiiiiqqLKOMMsook4wyyiyjjjrqqMPOQgoppNJKC620VFtvLdUehBBCCCGEEEIIIYQQvvceCA1ZBQCAAAAwxhhjjEEIIYQQQkgppZRiiimmmAJCQ1YBAIAAAAIAAAAsSZM0R3M8x3M8x1M8R3RER3RER5RESbRETfREUTRFVbRF3dRN3dRNXdVN27VVW7ZlXdddXddlXdZlXdd1Xdd1Xdd1Xdd1XbeB0JBVAAAIAABhkEEGGYQQQkghhZRSijHGGHPOOSA0ZBUAAAgAIAAAAEBxFEdxHMmRJMmyLM3yLM8SNVMzNVNzNVdzRVd1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'
    if (inforum) {
      if (document.querySelector('.v--modal-overlay'))
        document.querySelector('.v--modal-overlay').outerHTML = ''
      const div = document.querySelector('.wrapper').children[1]
      const iframe = document.createElement('iframe')
      const modalOverlay = document.createElement('div')
      modalOverlay.setAttribute('class', 'v--modal-overlay')
      iframe.id = 'iframe'
      iframe.setAttribute('class', 'v--modal-background-click')
      modalOverlay.appendChild(iframe)
      div.appendChild(modalOverlay)
      iframe.contentWindow.document.open()
      iframe.contentWindow.anbtReady = () => {
        iframe.contentWindow.inforum = inforum
        iframe.contentWindow.insandbox = insandbox
        iframe.contentWindow.incontest = incontest
        iframe.contentWindow.options = options
        iframe.contentWindow.alarmSoundOgg = alarmSoundOgg
        iframe.contentWindow.vertitle = vertitle
        iframe.contentWindow.getLocalStorageItem = getLocalStorageItem
        iframe.contentWindow.needToGoDeeper()
      }
      iframe.contentWindow.document.write(canvasHTML)
      iframe.contentWindow.document.close()
      return
    }
    document.open()
    window.anbtReady = () => {
      if (friendgameid) window.friendgameid = friendgameid[1]
      if (panelid) window.panelid = panelid[1]
      window.inforum = inforum
      window.insandbox = insandbox
      window.incontest = incontest
      window.options = options
      window.alarmSoundOgg = alarmSoundOgg
      window.vertitle = vertitle
      window.getLocalStorageItem = getLocalStorageItem
      window.needToGoDeeper()
    }
    document.write(canvasHTML)
    document.close()
  }

  const formatTimestamp = date => {
    if (typeof date === 'number') date = new Date(date)
    if (options.localeTimestamp) return date.toLocaleString()
    return `${('0' + date.getDate()).slice(-2)} ${
      globals.months[date.getMonth()]
    } ${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${(
      '0' + date.getMinutes()
    ).slice(-2)}`
  }

  const betterForums = () => {
    $('.comment-body *', true).forEach(comment => linkifyNodeText(comment))
    $('img', true).forEach(img => linkifyDrawingPanels(img))
    if (document.location.pathname.match(/\/forums\/(\w+|-)\/.+/)) {
      const hideUserIds = options.forumHiddenUsers
        ? options.forumHiddenUsers.split(',')
        : ''
      if (hideUserIds)
        addStyle(
          '.anbt_hideUserPost:not(:target) {opacity: 0.4; margin-bottom: 10px}' +
            '.anbt_hideUserPost:not(:target) .comment-body, .anbt_hideUserPost:not(:target) .avatar {display: none}' +
            ''
        )
      let lastid = 0
      $('.comment-avatar', true).forEach(({ parentNode }) => {
        const commentHolder = parentNode.parentNode.parentNode
        const anch = commentHolder.id || ''
        commentHolder.classList.add('comment-holder')
        const textMuted = commentHolder.querySelector('a.text-muted')
        const vue = commentHolder.childNodes[0].__vue__
        if (vue) {
          textMuted.textContent = `${textMuted.textContent.trim()}, ${formatTimestamp(
            vue.comment_date * 1000
          )}`
          if (vue.edit_date > 0) {
            const el = textMuted.parentNode.querySelector('span[rel="tooltip"]')
            const text = `${el.title}, ${formatTimestamp(
              vue.edit_date * 1000
            ).replace(/ /g, '\u00A0')}`
            el.setAttribute('title', text)
          }
        }
        if (anch) {
          const id = parseInt(anch.substring(1), 10)
          const text = textMuted.textContent.trim()
          textMuted.textContent = `${text} #${id}`
          textMuted.setAttribute('title', 'Link to post')
          if (id < lastid) textMuted.classList.add('wrong-order')
          try {
            const { href } = commentHolder.querySelector('a[href^="/player/"]')
            if (href) {
              const userId = href.match(/\d+/)[0]
              if (hideUserIds.includes(userId))
                commentHolder.classList.add('anbt_hideUserPost')
            }
          } catch (e) {}
          lastid = id
        }
      })
      if (
        $('.comment-holder') &&
        $('.comment-holder').length === 20 &&
        $('#comment-form .btn-primary')
      )
        $('#comment-form .btn-primary').insertAdjacentHTML(
          'afterend',
          '<div>Note: posting to another page</div>'
        )
    }
    if (options.proxyImgur)
      $('img[src*="imgur.com/"]', true).forEach(img =>
        img.setAttribute(
          'src',
          img.src.replace('imgur.com', 'filmot.com').replace('https', 'http')
        )
      )
    const pagination = $('.pagination', true)
    if (pagination.length)
      $('.breadcrumb').insertAdjacentHTML(
        'afterend',
        `<div class="text-center">${pagination[0].outerHTML}</div>`
      )
    if (document.location.pathname.match(/\/forums\/(\w+)\/$/)) {
      const hiddenTopics = getLocalStorageItem('gpe_forumHiddenTopics', [])
      let hidden = 0
      const tempUnhideLink = $('<a class="text-muted anbt_unhidet">')
      $('.forum-thread', true).forEach(thread => {
        const href = thread
          .querySelector('a:first-child')
          .href.match(/\/forums\/\w+\/(\d+)\//)
        if (!href || !href[1] || href[1] === 11830) return
        const id = href[1]
        if (hiddenTopics.includes(id)) {
          thread.classList.add('anbt_hidden')
          hidden++
        }
        const hideLink = $('<a class="text-muted anbt_hft">')
        hideLink.addEventListener('click', () => {
          const hiddenTopics = getLocalStorageItem('gpe_forumHiddenTopics', [])
          if (hiddenTopics.includes(id)) {
            if (hiddenTopics.includes(id))
              hiddenTopics.splice(hiddenTopics.indexOf(id), 1)
            hiddenTopics.splice(hiddenTopics.indexOf(id), 1)
            thread.classList.remove('anbt_hidden')
            hidden--
          } else {
            if (!hiddenTopics.includes(id)) hiddenTopics.push(id)
            hiddenTopics.push(id)
            thread.classList.add('anbt_hidden')
            hidden++
            tempUnhideLink.style.display = ''
          }
          tempUnhideLink.textContent = hidden
          localStorage.setItem(
            'gpe_forumHiddenTopics',
            JSON.stringify(hiddenTopics)
          )
        })
        thread.querySelector('p:nth-child(2)').appendChild(hideLink)
      })
      tempUnhideLink.textContent = hidden
      tempUnhideLink.addEventListener('click', () => {
        $('#main').classList.toggle('anbt_showt')
      })
      if (!hidden) tempUnhideLink.style.display = 'none'
      if ($('#js-btn-toggle-thread'))
        $('#js-btn-toggle-thread').parentNode.appendChild(tempUnhideLink)
    }
    $('.btn.btn-default', true).forEach(button =>
      button.addEventListener('click', () => {
        if (button.textContent === 'Draw')
          setupNewCanvas(true, document.location.href)
      })
    )
  }

  const betterComments = () => {
    const comments = [...$('#comments').nextElementSibling.children].slice(1)
    comments.forEach(x => {
      x.parentNode.parentNode.classList.add('comment-holder')
    })
    const gamePlayers = []
    const playerdata = {}
    $('.gamepanel-holder', true).forEach((gamePanel, index) => {
      const detail = gamePanel.querySelector('.panel-details')
      const gamepanel = gamePanel.querySelector('.gamepanel')
      const playerLink = detail.querySelector('.panel-user a')
      if (!playerLink) return
      const id = playerLink.href.match(/\/player\/(\d+)\//)[1]
      playerdata[id] = {
        panel_number: index + 1,
        player_anchor: playerLink,
        panel_id: gamepanel.id,
        drew: gamepanel.querySelector('img') !== null,
        comments: 0
      }
      gamePlayers.push(id)
    })
    const seenComments = getLocalStorageItem('gpe_seenComments', {})
    const gameid = document.location.href.match(/game\/([^/]+)\//)[1]
    if (comments) {
      const hour = Math.floor(Date.now() / (1000 * 60 * 60))
      for (const tempgame in seenComments)
        if (seenComments[tempgame].h + 24 * 7 < hour)
          delete seenComments[tempgame]
      let maxseenid = 0
      comments.forEach(holder => {
        const dateElement = holder.querySelector('a.text-muted')
        const vue = holder.__vue__
        if (vue) {
          const text = dateElement.textContent.trim()
          dateElement.textContent = `${text}, ${formatTimestamp(
            vue.comment_date * 1000
          )}`
          if (vue.edit_date > 0) {
            const element = dateElement.parentNode.querySelector(
              'span[rel="tooltip"]'
            )
            const title = `${element.title}, ${formatTimestamp(
              vue.edit_date * 1000
            ).replace(/ /g, '\u00A0')}`
            element.setAttribute('title', title)
          }
        }
        const ago = dateElement.textContent
        const commentid = parseInt(holder.id.slice(1), 10)
        dateElement.setAttribute('title', 'Link to comment')
        dateElement.textContent = `${dateElement.textContent.trim()} #${commentid}`
        if (ago.match(/just now|min|hour|a day| [1-7] day/)) {
          if (!(seenComments[gameid] && seenComments[gameid].id >= commentid)) {
            holder.classList.add('comment-new')
            if (maxseenid < commentid) maxseenid = commentid
          }
        }
        const link = holder.querySelector('.text-bold a')
          ? holder.querySelector('.text-bold a').href.match(/\/player\/(\d+)\//)
          : ''
        if (link) {
          const id = link[1]
          if (gamePlayers.includes(id)) {
            const drew = playerdata[id].drew ? 'drew' : 'wrote'
            dateElement.insertAdjacentHTML(
              'beforebegin',
              `<a href="#panel-${playerdata[id].panel_id}">(${drew} #${playerdata[id].panel_number})</a> `
            )
            playerdata[id].comments++
          }
        }
      })
      if (maxseenid)
        seenComments[gameid] = {
          h: hour,
          id: maxseenid
        }
      localStorage.setItem('gpe_seenComments', JSON.stringify(seenComments))
    }
    for (const playerId in gamePlayers) {
      const data = playerdata[playerId]
      if (data && data.comments) {
        const cmt2 = `Player left ${data.comments} comment${
          data.comments > 1 ? 's' : ''
        }`
        data.player_anchor.title = cmt2
        data.player_anchor.insertAdjacentHTML(
          'afterend',
          `<sup title="${cmt2}">${data.comments}</sup>`
        )
      }
    }
    if (options.maxCommentHeight) {
      const h = options.maxCommentHeight
      comments.forEach(comment =>
        comment.addEventListener('click', () => {
          if (
            comment.clientHeight > h - 50 &&
            !$(location.hash).has(comment).length
          )
            location.hash = `#${comment.parentNode.parentNode.id}`
        })
      )
    }
  }

  const waitForComments = () => {
    const comments = $('#comments')
      ? [...$('#comments').nextElementSibling.children].slice(1)
      : ''
    if (comments.length && !comments[0].classList.contains('spinner'))
      betterComments()
    else {
      if (comments.length === 0) return
      setTimeout(waitForComments, 1000)
    }
  }

  const checkForRecording = (url, success, retrying) => {
    const request = new XMLHttpRequest()
    request.open('GET', `${url}?anbt`, true)
    request.responseType = 'arraybuffer'
    request.onload = () => {
      const buffer = request.response
      const dataView = new window.DataView(buffer)
      const magic = dataView.getUint32(0)
      if (magic != 0x89504e47) return request.onerror()
      for (let i = 8; i < buffer.byteLength; i += 4) {
        const chunklen = dataView.getUint32(i)
        i += 4
        const chunkname = dataView.getUint32(i)
        i += 4
        if (chunkname === 0x73764762) return success()
        else {
          if (chunkname === 0x49454e44) break
          i += chunklen
        }
      }
    }
    request.onerror = () => {
      console.log(
        'checkForRecording fail (likely due to cache without CORS), retrying'
      )
      if (!retrying) checkForRecording(`${url}?anbt`, success, true)
    }
    request.send()
  }

  const addReplayButton = drawing => {
    if (drawing.replayAdded) return
    drawing.replayAdded = true
    const { parentNode, src } = drawing
    checkForRecording(src, () => {
      const newid = $(`img[src='${src}']`)
        .parentNode.querySelector('a[href^="/panel/"]')
        .href.match(/\/panel\/[^/]+\/([^/]+)/)[1]
      const id = newid.length >= 8 ? newid : scrambleID(parentNode.id.slice(6))
      const replayButton = $(
        `<a href="/sandbox/#${id}" class="panel-number anbt_replaypanel fas fa-redo-alt text-muted" title="Replay"></a>`
      )
      replayButton.addEventListener('click', event => {
        if (event.which === 2) return
        event.preventDefault()
        setupNewCanvas(true, `/sandbox/#${id}`)
      })
      parentNode.insertAdjacentHTML('beforebegin', replayButton.outerHTML)
    })
  }

  const reversePanels = () => {
    const element = $('.gamepanel-holder')[0].parentNode.parentNode
    ;[...element.childNodes]
      .reverse()
      .forEach(child => element.appendChild(child))
  }

  const betterGame = () => {
    if (document.title === 'Not Safe For Work (18+) Gate') {
      if (options.autoBypassNSFW) window.DrawceptionPlay.bypassNsfwGate()
      return
    }
    const drawings = $(
      'img[src^="https://cdn.drawception.com/images/panels/"],img[src^="https://cdn.drawception.com/drawings/"]'
    )
    if ($('#btn-copy-url'))
      $('#btn-copy-url').insertAdjacentHTML(
        'afterend',
        ' <a href="#" class="btn btn-default reversePanels" title="Reverse panels"><span class="fas fa-sort-amount-up"></span> Reverse</a>'
      )
    $('.reversePanels').addEventListener('click', reversePanels)
    const favButton = $(
      '<span class="panel-number anbt_favpanel fas fa-heart text-muted" title="Favorite"></span>'
    )
    $('.panel-number', true).forEach(panelNumber =>
      panelNumber.insertAdjacentHTML('afterend', favButton.outerHTML)
    )
    $('.gamepanel', true).forEach(({ parentNode }) => {
      if (parentNode.querySelector('.gamepanel-tools>a:last-child') === null)
        return
      const panels = getLocalStorageItem('gpe_panelFavorites', {})
      const id = parentNode
        .querySelector('.gamepanel-tools>a:last-child')
        .href.match(/\/panel\/[^/]+\/([^/]+)\/[^/]+\//)[1]
      if (panels[id])
        parentNode
          .querySelector('.anbt_favpanel')
          .classList.add('anbt_favedpanel')
    })
    $('.anbt_favpanel', true).forEach(favPanelButton => {
      favPanelButton.addEventListener('click', () => {
        if (favPanelButton.classList.contains('anbt_favedpanel')) return
        const { parentNode } = favPanelButton
        const id = parentNode
          .querySelector('.gamepanel-tools>a:last-child')
          .href.match(/\/panel\/[^/]+\/([^/]+)\/[^/]+\//)[1]
        const panels = getLocalStorageItem('gpe_panelFavorites', {})
        const panel = {
          time: Date.now(),
          by: parentNode.querySelector('.panel-user a').textContent
        }
        panel.userLink = parentNode
          .querySelector('.panel-user a')
          .href.match(/\/player\/[^/]+\/[^/]+\//)[0]
        const img = parentNode.querySelector('.gamepanel img')
        if (img) {
          panel.image = img.src
          panel.caption = img.alt
        } else {
          panel.caption = parentNode
            .querySelector('.gamepanel')
            .textContent.trim()
        }
        panels[id] = panel
        localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels))
        favPanelButton.classList.add('anbt_favedpanel')
      })
    })
    if (options.newCanvas) {
      if (drawings)
        drawings.forEach(drawing =>
          drawing.addEventListener('load', addReplayButton(drawing))
        )
    }
    setTimeout(waitForComments, 200)
  }

  const getCookie = name =>
    document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))[2] || null

  const setCookie = (name, value, expire) => {
    if (expire) {
      const time = new Date()
      time.setTime(time.getTime() + 24 * expire * 60 * 60 * 1e3)
      expire = time.toUTCString()
    }
    document.cookie = `${name}=${value ? JSON.stringify(value) : ''}; expires=${
      expire ? expire : 'Thu, 01 Jan 1970 00:00:00 UTC'
    }; path=/`
  }

  const getPanelId = url => {
    const match = url.match(/\/panel\/[^/]+\/(\w+)\//)
    if (match) return match[1]
  }

  const base62ToDecimal = number => {
    number = number.toString()
    const cachePosition = {}
    let result = 0
    let pow = 1
    for (let i = number.length - 1; i >= 0; i--) {
      const character = number[i]
      if (typeof cachePosition[character] === 'undefined') {
        cachePosition[character] = globals.alphabet.indexOf(character)
      }
      result += pow * cachePosition[character]
      pow *= 62
    }
    return result
  }

  const unscrambleID = string =>
    base62ToDecimal([...string].reverse().join('')) - 3521614606208

  const betterPanel = () => {
    const favButton = $(
      '<button class="btn btn-info" style="margin-top: 20px"><span class="fas fa-heart"></span> <b>Favorite</b></button>'
    )
    const gamePanel = $(
      '.panel-caption-display>.flex,.gamepanel-holder>.gamepanel'
    )
    if (gamePanel) gamePanel.insertAdjacentHTML('afterend', favButton.outerHTML)
    const favBtn = $('.btn.btn-info')
    if (favBtn) {
      favBtn.addEventListener('click', event => {
        event.preventDefault()
        const panels = getLocalStorageItem('gpe_panelFavorites', {})
        const panel = {
          time: Date.now(),
          by: $('.lead a', true)[0].textContent,
          userLink: $('.lead a', true)[0].href.match(
            /\/player\/[^/]+\/[^/]+\//
          )[0]
        }
        const id = document.location.href.match(/\/panel\/[^/]+\/([^/]+)\//)[1]
        const img = $('.gamepanel img')
        if (img) {
          panel.image = img.src
          panel.caption = img.alt
        } else {
          panel.caption = $('.gamepanel').textContent.trim()
        }
        panels[id] = panel
        localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels))
        favBtn.setAttribute('disabled', 'disabled')
        favBtn.querySelector('b').textContent = 'Favorited!'
      })
    }
    const panels = getLocalStorageItem('gpe_panelFavorites', {})
    if (
      document.location.href.match(/\/panel\/[^/]+\/([^/]+)\//) &&
      panels[document.location.href.match(/\/panel\/[^/]+\/([^/]+)\//)[1]]
    ) {
      favBtn.setAttribute('disabled', 'disabled')
      favBtn.querySelector('b').textContent = 'Favorited!'
    }
    const panelId = getPanelId(location.pathname)
    if (options.newCanvas && panelId && unscrambleID(panelId) >= 14924553) {
      const img = $('.gamepanel img')
      if (img)
        checkForRecording(img.src, () => {
          const replayLink = $(
            `<a class="btn btn-primary" style="margin-top: 20px" href="/sandbox/#${panelId}"><span class="fas fa-redo-alt"></span> <b>Replay</b></a> `
          )
          replayLink.addEventListener('click', event => {
            if (event.which === 2) return
            event.preventDefault()
            setupNewCanvas(true, `/sandbox/#${panelId}`)
          })
          $('.gamepanel').insertAdjacentHTML('afterend', replayLink.outerHTML)
        })
    }
    if (
      $('.btn-primary').length > 1 &&
      $('.btn-primary')[1].textContent === 'Play again'
    ) {
      const ccButton = $(
        '<button class="btn btn-info" style="margin-top: 20px"><span class="fas fa-plus"></span> <b>Add to Cover Creator</b></button>'
      )
      ccButton.addEventListener('click', event => {
        event.preventDefault()
        const id = unscrambleID(panelId)
        const cookie = getCookie('covercreatorids')
        const ids = cookie ? JSON.parse(cookie) : []
        if (!ids.includes(id)) {
          if (ids.length > 98) {
            window.apprise(
              'Max cover creator drawings selected. Please remove some before adding more.'
            )
            return
          } else ids.push(id.toString())
        } else {
          ccButton
            .setAttribute('disabled', 'disabled')
            .querySelector('b').textContent = 'Already added!'
          return
        }
        setCookie('covercreatorids', JSON.stringify(ids))
        ccButton
          .setAttribute('disabled', 'disabled')
          .querySelector('b').textContent = 'Added!'
      })
      $('.gamepanel').insertAdjacentHTML('afterend', ccButton.outerHTML)
    }
  }

  const rot13 = number =>
    [...number.toString()]
      .map(character => {
        character = character.charCodeAt(0)
        if (character >= 97 && character <= 122)
          character = ((character - 97 + 13) % 26) + 97
        if (character >= 65 && character <= 90)
          character = ((character - 65 + 13) % 26) + 65
        return String.fromCharCode(character)
      })
      .join('')

  const simpleHash = number =>
    number
      .toString()
      .split('')
      .reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)

  const randomGreeting = () => {
    const change_every_half_day = Math.floor(Date.now() / (1000 * 60 * 60 * 12))
    const rnddata = simpleHash(
      change_every_half_day + parseInt(globals.userid, 10) + 178889
    )
    return rot13(globals.greetings[rnddata % globals.greetings.length])
  }

  const addReplaySign = drawing => {
    if (drawing.replayAdded) return
    drawing.replayAdded = true
    const panel = drawing.parentNode.parentNode
    const { src } = drawing
    checkForRecording(src, () => {
      const newid = src.match(/(\w+).png$/)[1]
      const replaySign =
        newid.length >= 8
          ? $(
              `<a href="/sandbox/#${newid}" class="pull-right fas fa-redo-alt" style="color:#8af;margin-right:4px" title="Replay!"></a>`
            )
          : $(
              '<span class="pull-right fas fa-redo-alt" style="color:#8af;margin-right:4px" title="Replayable!"></span>'
            )
      panel.appendChild(replaySign)
    })
  }

  const fadeOut = (element, duration = 400) => {
    duration = duration === 'slow' ? 600 : duration
    element.style.opacity = element.style.opacity
      ? parseFloat(element.style.opacity) - 0.1
      : 1
    if (parseFloat(element.style.opacity) < 0) {
      element.style.opacity = 0
      element.style.display = 'none'
    } else
      setTimeout(() => {
        fadeOut(element, duration)
      }, duration / 10)
  }

  const viewMyGameBookmarks = () => {
    const removeButtonHTML =
      '<a class="anbt_gamedel pull-right lead fas fa-times btn btn-sm btn-danger" href="#" title="Remove" style="margin-left: 10px"></a>'
    const games = getLocalStorageItem('gpe_gameBookmarks', {})
    const result = []
    for (let id in games) {
      const extraClass = games[id].own ? ' anbt_owncaption' : ''
      if (id.length > 10) {
        result.push(
          `<p class="well${extraClass}" id="${id}"><span>${id}</span>${removeButtonHTML}</p>`
        )
        const xhr = new XMLHttpRequest()
        xhr.open('GET', `/play/${id}`)
        xhr.onload = () => {
          const { responseText, status } = xhr
          if (status === 200) {
            const m =
              responseText.match(/Game is not private/) ||
              (responseText.match(/Problem loading game/) && 'del')
            if (m) {
              const gamename =
                `${
                  games[id].own
                    ? ` with your caption${
                        games[id].caption ? ` ${games[id].caption}` : ''
                      }`
                    : ''
                }${
                  games[id].time
                    ? ` bookmarked on ${formatTimestamp(games[id].time)}`
                    : ''
                }` || id
              const status = m === 'del' ? 'Deleted' : 'Unfinished public'
              $(`#${id}`).querySelector(
                'span'
              ).textContent = `${status} game${gamename}`
              return
            }
            const title = responseText.match(/<title>(.+)<\/title>/)[1]
            const [url, gameId] = responseText.match(/\/game\/([^/]+)\/[^/]+\//)
            delete games[id]
            games[gameId] = {
              title,
              url
            }
            $(`#${id}`).id = gameId
            const spanId = $(`#${gameId}`).querySelector('span')
            spanId.parentNode.replaceChild(
              $(`<a href="${url}">${title}</a>`),
              spanId
            )
            localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games))
          } else {
            $(`#${id}`).querySelector(
              'span'
            ).textContent = `Error while retrieving game: ${responseText}`
          }
        }
        xhr.send()
      } else if (id.length === 10)
        result.push(
          `<p class="well${extraClass}" id="${id}"><a href="${games[id].url}">${games[id].title}</a>${removeButtonHTML}</p>`
        )
    }
    $('#anbt_userpage').innerHTML = result.length
      ? result.join('')
      : "You don't have any bookmarked games."
    $('#anbt_userpage .anbt_gamedel', true).forEach(gameDelete =>
      gameDelete.addEventListener('click', event => {
        event.preventDefault()
        const { id } = gameDelete.parentNode
        fadeOut($(`#${id}`))
        delete games[id]
        localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games))
      })
    )
  }

  const viewMyPanelFavorites = () => {
    const panels = getLocalStorageItem('gpe_panelFavorites', {})
    let result = ''
    let needsUpdate = false
    for (const id in panels) {
      if (panels[id].image && panels[id].image.match(/^\/pub\/panels\//)) {
        needsUpdate = true
        panels[id].image = panels[id].image.replace(
          '/pub/panels/',
          'https://cdn.drawception.com/images/panels/'
        )
      }
      result += `<div id="${id}" style="float: left; position: relative; min-width: 150px;"><div class="thumbpanel-holder" style="overflow:hidden"><a class="anbt_paneldel" href="#" title="Remove">X</a><a href="/panel/-/${id}/-/" class="thumbpanel" rel="tooltip" title="${
        panels[id].caption
      }">${
        panels[id].image
          ? `<img src="${panels[id].image}" width="125" height="104" alt="${panels[id].caption}" />`
          : panels[id].caption
      }</a><span class="text-muted" style="white-space:nowrap">by <a href="${
        panels[id].userLink
      }">${
        panels[id].by
      }</a></span><br><small class="text-muted"><span class="fas fa-heart text-danger"></span> ${formatTimestamp(
        panels[id].time
      )}</small></div></div>`
    }
    if (needsUpdate)
      localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels))
    result = result
      ? `${result}<div style="clear:left"></div>`
      : "You don't have any favorited panels."
    $('#anbt_userpage').innerHTML = result
    $('#anbt_userpage .anbt_paneldel', true).forEach(panelDelete =>
      panelDelete.addEventListener('click', event => {
        event.preventDefault()
        const { id } = panelDelete.parentNode.parentNode
        fadeOut($(`#${CSS.escape(id)}`))
        delete panels[id]
        localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels))
      })
    )
  }

  const betterPlayer = () => {
    const pubinfo = $('.profile-header-info .text-muted > span:last-child')
    if (pubinfo) linkifyNodeText(pubinfo.parentNode)
    const loc = document.location.href
    if (loc.match(new RegExp(`/player/${globals.userId}/[^/]+/(?:$|#)`))) {
      const anbtSection = $('<h2>ANBT stuff: </h2>')
      const panelFavoritesButton = $(
        '<a class="btn btn-primary viewFavorites" href="#anbt_panelfavorites">Panel Favorites</a>'
      )
      const gameBookmarks = $(
        '<a class="btn btn-primary viewBookmarks" href="#anbt_gamebookmarks">Game Bookmarks</a>'
      )
      anbtSection.appendChild(panelFavoritesButton)
      anbtSection.appendChild(gameBookmarks)
      const profilemain = $('.profile-layout-content').firstChild
      profilemain.insertAdjacentHTML(
        'afterbegin',
        `<h5 id="anbt_userpage">${randomGreeting()}</h5>`
      )
      profilemain.insertAdjacentHTML('afterbegin', anbtSection.outerHTML)
      $('.viewFavorites').addEventListener('click', event => {
        event.preventDefault()
        viewMyPanelFavorites()
      })
      $('.viewBookmarks').addEventListener('click', event => {
        event.preventDefault()
        viewMyGameBookmarks()
      })
      if (document.location.hash.includes('#anbt_panelfavorites'))
        viewMyPanelFavorites()
      if (document.location.hash.includes('#anbt_gamebookmarks'))
        viewMyGameBookmarks()
      if (window.date) {
        const pubinfo = $('.profile-user-header>div.row>div>h1+p')
        if (pubinfo)
          [...pubinfo.childNodes][4].nodeValue = ` ${formatTimestamp(
            window.date
          )} \xa0`
      }
    } else {
      const drawings = $(
        'img[src^="https://cdn.drawception.com/images/panels/"],img[src^="https://cdn.drawception.com/drawings/"]',
        true
      )
      if (options.newCanvas)
        drawings.forEach(drawing =>
          drawing.addEventListener('load', addReplaySign(drawing))
        )
      drawings.forEach(({ src, parentNode }) => {
        if (src.match(/-1\.png$/))
          parentNode.parentNode.appendChild(
            $(
              '<span class="pull-right" title="Draw First game"><img src="/img/icon-coins.png"></span>'
            )
          )
      })
    }
    if (loc.match(/player\/\d+\/[^/]+\/(posts)|(comments)\//)) {
      $('.forum-thread-starter', true).forEach(threadStarter => {
        const vue = threadStarter.childNodes[0].__vue__
        if (vue) {
          const ts = threadStarter.querySelector('a.text-muted').firstChild
          ts.textContent = `${ts.textContent.trim()}, ${formatTimestamp(
            vue.comment_date * 1000
          )}`
          if (vue.edit_date > 0) {
            const el = ts.parentNode.parentNode.querySelector(
              'span[rel="tooltip"]'
            )
            const text = `${el.title}, ${formatTimestamp(
              vue.edit_date * 1000
            ).replace(/ /g, '\u00A0')}`
            el.setAttribute('title', text)
          }
        }
        const postlink = threadStarter.querySelector(
          '.add-margin-top small.text-muted'
        )
        const created = postlink.textContent.match(/^\s*Created/)
        const commented = postlink.textContent.match(/^\s*Commented/)
        const prefix = commented
          ? 'Comment in the game'
          : created
          ? 'New thread'
          : 'Reply in'
        const n = $(`<h4 class="anbt_threadtitle">${prefix}: </h4>`)
        const thread = postlink.querySelector('a')
        n.appendChild(thread)
        threadStarter.insertAdjacentHTML('afterbegin', n.outerHTML)
        postlink.parentNode.parentNode.removeChild(postlink.parentNode)
      })
    }
  }

  const escapeHTML = value =>
    value
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')

  const addGroup = (name, settings) => {
    const controlGroup = $('<div class="control-group"></div>')
    controlGroup.appendChild($(`<label class="control-label">${name}</label>`))
    settings.forEach(setting => {
      const value = options[setting[0]]
      const [name, type, description] = setting
      const controls = $('<div class="controls"></div>')
      if (type === 'boolean') {
        controls.appendChild(
          $(
            `<label><input type="checkbox" id="anbt_${name}" name="${name}" value="1" ${
              value ? 'checked="checked"' : ''
            }"> ${description}</label>`
          )
        )
      } else if (type === 'number') {
        $(
          `<b>${description}:</b><input class="form-control" type="text" data-subtype="number" name="${name}" value="${escapeHTML(
            value || 0
          )}">`
        ).forEach(node => controls.appendChild(node))
      } else if (type === 'longstr') {
        $(
          `<b>${description}:</b><textarea class="form-control" name="${name}">${escapeHTML(
            value
          )}</textarea>`
        ).forEach(node => controls.appendChild(node))
      } else {
        $(
          `<b>${description}:</b><input class="form-control" type="text" name="${name}" value="${escapeHTML(
            value
          )}">`
        ).forEach(node => controls.appendChild(node))
      }
      controlGroup.appendChild(controls)
    })
    return controlGroup
  }

  const fadeIn = (element, duration = 400) => {
    element.style.display = 'inline'
    duration = duration === 'slow' ? 600 : duration
    element.style.opacity = element.style.opacity
      ? parseFloat(element.style.opacity) + 0.1
      : 0.2
    if (parseFloat(element.style.opacity) > 1) element.style.opacity = 1
    else
      setTimeout(() => {
        fadeIn(element, duration)
      }, duration / 10)
  }

  const loadScriptSettings = () => {
    const result = getLocalStorageItem('gpe_anbtSettings', null)
    if (!result) return
    for (const i in result) window.options[i] = result[i]
  }

  const updateScriptSettings = ({ currentTarget: theForm }) => {
    const result = {}
    theForm.querySelectorAll('input,textarea').forEach(fromField => {
      if (fromField.type === 'checkbox')
        result[fromField.name] = fromField.checked ? 1 : 0
      else if (fromField.getAttribute('data-subtype') === 'number')
        result[fromField.name] = parseFloat(fromField.value) || 0
      else result[fromField.name] = fromField.value
    })
    localStorage.setItem('gpe_anbtSettings', JSON.stringify(result))
    loadScriptSettings()
    fadeIn($('#anbtSettingsOK'), 'slow')
    setTimeout(() => {
      fadeOut($('#anbtSettingsOK'), 'slow')
    }, 800)
  }

  const betterSettings = () => {
    const theForm = $(
      '<form class="regForm form-horizontal settingsForm" action="#"></form>'
    )
    theForm.appendChild($('<legend>ANBT script settings</legend>'))
    theForm.appendChild(
      addGroup('Pen Tablet (unavailable for the moment...)', [
        [
          'enableWacom',
          'boolean',
          'Enable Wacom plugin / pressure sensitivity support'
        ],
        [
          'fixTabletPluginGoingAWOL',
          'boolean',
          'Try to prevent Wacom plugin from disappearing'
        ]
      ])
    )
    theForm.appendChild(
      addGroup('Play (most settings are for the new canvas only)', [
        [
          'newCanvas',
          'boolean',
          'New drawing canvas (also allows <a href="http://grompe.org.ru/replayable-drawception/">watching playback</a>)'
        ],
        [
          'submitConfirm',
          'boolean',
          'Confirm submitting if more than a minute is left'
        ],
        ['smoothening', 'boolean', 'Smoothing of strokes'],
        ['hideCross', 'boolean', 'Hide the cross when drawing'],
        [
          'enterToCaption',
          'boolean',
          'Submit captions (and start games) by pressing Enter'
        ],
        [
          'backup',
          'boolean',
          'Save the drawing in case of error and restore it in sandbox'
        ],
        [
          'timeoutSound',
          'boolean',
          'Warning sound when only a minute is left (normal games)'
        ],
        [
          'timeoutSoundBlitz',
          'boolean',
          'Warning sound when only 5 seconds left (blitz)'
        ],
        ['timeoutSoundVolume', 'number', 'Volume of the warning sound, in %'],
        [
          'rememberPosition',
          'boolean',
          'Show your panel position and track changes in unfinished games list'
        ],
        ['colorNumberShortcuts', 'boolean', 'Use 0-9 keys to select the color'],
        [
          'colorUnderCursorHint',
          'boolean',
          'Show the color under the cursor in the palette'
        ],
        [
          'colorDoublePress',
          'boolean',
          'Double press 0-9 keys to select color without pressing shift'
        ],
        [
          'bookmarkOwnCaptions',
          'boolean',
          'Automatically bookmark your own captions in case of dustcatchers'
        ]
      ])
    )
    theForm.appendChild(
      addGroup('Miscellaneous', [
        [
          'localeTimestamp',
          'boolean',
          `Format timestamps as your system locale (${new Date().toLocaleString()})`
        ],
        [
          'proxyImgur',
          'boolean',
          'Replace imgur.com links to filmot.com to load, in case your ISP blocks them'
        ],
        ['ajaxRetry', 'boolean', 'Retry failed AJAX requests'],
        [
          'autoplay',
          'boolean',
          'Automatically start replay when watching playback'
        ],
        ['autoBypassNSFW', 'boolean', 'Automatically bypass NSFW game warning'],
        ['markStalePosts', 'boolean', 'Mark stale forum posts'],
        [
          'maxCommentHeight',
          'number',
          'Maximum comments and posts height until directly linked (px, 0 = no limit)'
        ],
        [
          'useOldFont',
          'boolean',
          'Use old Nunito font (which is usually bolder and less wiggly)'
        ],
        ['useOldFontSize', 'boolean', 'Use old, smaller font size'],
        ['markdownTools', 'boolean', 'Markdown tools for messages'],
        [
          'anbtDarkMode',
          'boolean',
          "Switch between ANBT's and Drawception's dark mode"
        ]
      ])
    )
    theForm.appendChild(
      addGroup('Advanced', [
        [
          'newCanvasCSS',
          'longstr',
          'Custom CSS for new canvas (experimental, <a href="https://github.com/EnderDragonneau/Drawception-ANBT/tree/master/newcanvas_styles">get styles here</a>)'
        ],
        [
          'forumHiddenUsers',
          'longstr',
          'Comma-separated list of user IDs whose forum posts are hidden'
        ]
      ])
    )
    $(
      '<br><div class="control-group"><div class="controls"><input name="submit" type="submit" class="btn btn-primary settingsFormSubmit" value="Apply"> <b id="anbtSettingsOK" class="label label-theme_holiday" style="display:none">Saved!</b></div></div>'
    ).forEach(node => theForm.appendChild(node))
    $('#main').insertAdjacentHTML('afterbegin', theForm.outerHTML)
    $('.settingsForm').addEventListener(
      'submit',
      form => updateScriptSettings(form) && false
    )
    if ($('input[name="location"]'))
      $('input[name="location"]').setAttribute('maxlength', '65')
  }

  const betterPages = {
    betterCreate,
    betterForums,
    betterGame,
    betterPanel,
    betterPlayer,
    betterSettings
  }

  const bold = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = new RegExp(`\\*\\*(${selection.replace(/\*/g, '')})\\*\\*`)
    if (selection.match(selRegex)) selection = selection.replace(selRegex, '$1')
    else if (selectionStart > 0 && selectionEnd < length) {
      if (
        value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)
      ) {
        selectionStart--
        selectionEnd++
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else if (
        value.substring(selectionStart - 2, selectionEnd + 2).match(selRegex)
      ) {
        selectionStart -= 2
        selectionEnd += 2
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else
        selection = selection.match(/\*\*.+\*\*/g)
          ? selection.replace(/\*\*/g, '')
          : `**${selection.replace(/\n/g, '**\n**')}**`
    } else {
      if (
        !selectionStart &&
        value.substring(selectionStart, selectionEnd + 1).match(selRegex)
      ) {
        selectionEnd++
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else if (
        selectionEnd === length &&
        value.substring(selectionStart - 1, selectionEnd).match(selRegex)
      ) {
        selectionStart--
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else
        selection = selection.match(/\*\*.+\*\*/g)
          ? selection.replace(/\*\*/g, '')
          : `**${selection.replace(/\n/g, '**\n**')}**`
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const code = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = /^ {4}(.*)/gm
    if (selection.match(selRegex)) selection = selection.replace(/^ {4}/gm, '')
    else if (
      selectionStart === 0 ||
      value.substring(selectionStart - 1, selectionEnd).match(/\n.*/gm)
    ) {
      if (selection.match(/^ {4}/gm))
        selection = selection.replace(/^ {4}/gm, '')
      else
        selection = `${
          selectionStart === 0
            ? ''
            : value.substring(selectionStart - 1, selectionEnd).match(/^\n/)
            ? '\n'
            : '\n\n'
        }    ${selection.replace(/\n/g, '\n    ')}`
    } else
      selection = `${
        value.substring(selectionStart - 1, selectionEnd).match(/^\n/)
          ? '\n'
          : '\n\n'
      }    ${selection.replace(/\n^(.*)/gm, '\n    $1')}${
        value.substring(selectionEnd, selectionEnd + 1).match(/\n/) ? '' : '\n'
      }`
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const heading = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = /^#+ .*/gm
    if (selection.match(selRegex)) {
      selection = selection.replace(/^# /gm, '')
      if (selection.match(/^#{2,} /gm)) selection.replace(/(^#*)# /gm, '$1 ')
    } else if (
      !selectionStart ||
      value.substring(selectionStart - 1, selectionEnd).match(/\n.*/gm)
    )
      selection = `${
        value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
        !selectionStart
          ? ''
          : '\n'
      }###### ${selection.replace(/\n/g, '\n###### ')}`
    else if (
      value.substring(selectionStart - 1, selectionEnd).match(selRegex)
    ) {
      selectionStart -= 4
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/(^#*)# /gm, '$1 ')
    } else if (
      value.substring(selectionStart - 2, selectionEnd).match(selRegex)
    ) {
      selectionStart -= 5
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/(^#*)# /gm, '$1 ')
    } else selection = `\n###### ${selection.replace(/\n/g, '\n###### ')}`
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const highlighter = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = new RegExp(`\`(${selection.replace(/`/g, '')})\``)
    if (selection.match(selRegex)) selection = selection.replace(selRegex, '$1')
    else if (selectionStart > 0 && selectionEnd < length) {
      if (
        value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)
      ) {
        selectionStart--
        selectionEnd++
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else {
        selection = selection.match(/`.+`/g)
          ? selection.replace(/`/g, '')
          : `\`${selection.replace(/\n/g, '`\n`')}\``
      }
    } else {
      if (
        !selectionStart &&
        value.substring(selectionStart, selectionEnd + 1).match(selRegex)
      ) {
        selectionEnd++
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else if (
        selectionEnd === length &&
        value.substring(selectionStart - 1, selectionEnd).match(selRegex)
      ) {
        selectionStart--
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else {
        selection = selection.match(/`.+`/g)
          ? selection.replace(/`/g, '')
          : `\`${selection.replace(/\n/g, '`\n`')}\``
      }
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const image = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = /!\[(.*)\]\((\S*)( ".*")?\)/
    if (selection.match(selRegex))
      textarea.value =
        value.substring(0, selectionStart) +
        selection.replace(selRegex, '$1 $2') +
        value.substring(selectionEnd, length)
    else {
      let link = ''
      if (!selection.match(/\[(.*)\]\((\S*)( ".*")?\)/)) {
        link = selection.match(/https?:\/\/\S*/) || ''
        selection = selection
          .replace(link[0], '')
          .replace(/ +/g, ' ')
          .trim()
      } else selection = ''
      const divModal = $(
        `<div class="v--modal-overlay scrollable overlay-fade-enter-active" style="opacity: 0" id="markdown"><div class="v--modal-background-click"><div class="v--modal-top-right"></div><div class="v--modal-box v--modal" style="top: 89px; left: 240px; width: 800px; height: auto;"><div style="padding: 30px;"><button type="button" class="close">×</button><h4 class="clear-top">Markdown informations box</h4><hr><div><h4 class="clear-top">Text:</h4><input id="markdown-text" type="text" placeholder="Insert text here" class="form-control input-lg input-prompt"><h4>Link:</h4><input id="markdown-link" type="text" placeholder="Insert link here" class="form-control input-lg input-prompt"><h4>Hover message:</h4><input id="markdown-hover" type="text" placeholder="Message when hover the link (optional)" class="form-control input-lg input-prompt"></div><hr><p class="text-center clear-bot"><button type="button" id="markdown-done" class="btn btn-default">Done</button></p></div></div></div></div>`
      )
      $('.navbar-header>div:last-child').append(divModal)
      setTimeout(() => {
        document.body.classList.add('v--modal-block-scroll')
        $('#markdown').style.opacity = 1
      }, 1)
      $('#markdown-text').value = selection ? selection : ''
      $('#markdown-link').value = link ? link[0] : ''
      $('.close').addEventListener('click', () => {
        document.body.classList.remove('v--modal-block-scroll')
        $('#markdown').outerHTML = ''
      })
      $('#markdown-done').addEventListener('click', () => {
        const tag = `![${$('#markdown-text').value}](${
          $('#markdown-link').value
        }${
          $('#markdown-hover').value ? ` "${$('#markdown-hover').value}"` : ''
        })`
        selection = value.substring(selectionStart, selectionEnd)
        textarea.value =
          value.substring(0, selectionStart) +
          (selection.match(/\[(.*)\]\((\S*)( ".*")?\)/)
            ? selection.replace(/\[.*\]/, `[${tag}]`)
            : tag) +
          value.substring(selectionEnd, length)
        document.body.classList.remove('v--modal-block-scroll')
        $('#markdown').outerHTML = ''
      })
    }
  }

  const italic = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = new RegExp(
      `\\*(?=\\S*${selection.replace(
        /(.*)\*(.*)/g,
        ''
      )})((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)`
    )
    const italicRegex = /\*(?=\S)((?:\*\*|\\[\s\S]|\s+(?:\\[\s\S]|[^\s\*\\]|\*\*)|[^\s\*\\])+?)\*(?!\*)/g
    if (selection.match(selRegex)) selection = selection.replace(selRegex, '$1')
    else if (selectionStart > 0 && selectionEnd < length) {
      if (
        value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)
      ) {
        selectionStart--
        selectionEnd++
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else {
        selection = selection.match(italicRegex)
          ? selection.replace(italicRegex, '$1')
          : `*${selection.replace(/\n/g, '*\n*')}*`
      }
    } else {
      if (
        !selectionStart &&
        value.substring(selectionStart, selectionEnd + 1).match(selRegex)
      ) {
        selectionEnd++
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else if (
        selectionEnd === length &&
        value.substring(selectionStart - 1, selectionEnd).match(selRegex)
      ) {
        selectionStart--
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else
        selection = selection.match(italicRegex)
          ? selection.replace(italicRegex, '$1')
          : `*${selection.replace(/\n/g, '*\n*')}*`
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const link = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = /^(?!!)\[(.*)\]\((\S*)( ".*")?\)/
    if (selection.match(selRegex))
      textarea.value =
        value.substring(0, selectionStart) +
        selection.replace(selRegex, '$1 $2') +
        value.substring(selectionEnd, length)
    else {
      let imageLink = ''
      if (!selection.match(/!\[(.*)\]\((\S*)( ".*")?\)/)) {
        imageLink = selection.match(/https?:\/\/\S*/) || ''
        selection = selection
          .replace(imageLink[0], '')
          .replace(/ +/g, ' ')
          .trim()
      }
      const divModal = $(
        `<div class="v--modal-overlay scrollable overlay-fade-enter-active" style="opacity: 0" id="markdown"><div class="v--modal-background-click"><div class="v--modal-top-right"></div><div class="v--modal-box v--modal" style="top: 89px; left: 240px; width: 800px; height: auto;"><div style="padding: 30px;"><button type="button" class="close">×</button><h4 class="clear-top">Markdown informations box</h4><hr><div><h4 class="clear-top">Text:</h4><input id="markdown-text" type="text" placeholder="Insert text here" class="form-control input-lg input-prompt"><h4>Link:</h4><input id="markdown-link" type="text" placeholder="Insert link here" class="form-control input-lg input-prompt"><h4>Hover message:</h4><input id="markdown-hover" type="text" placeholder="Message when hover the link (optional)" class="form-control input-lg input-prompt"></div><hr><p class="text-center clear-bot"><button type="button" id="markdown-done" class="btn btn-default">Done</button></p></div></div></div></div>`
      )
      $('.navbar-header>div:last-child').append(divModal)
      setTimeout(() => {
        document.body.classList.add('v--modal-block-scroll')
        $('#markdown').style.opacity = 1
      }, 1)
      $('#markdown-text').value = selection ? selection : ''
      $('#markdown-link').value = imageLink ? imageLink[0] : ''
      $('.close').addEventListener('click', () => {
        document.body.classList.remove('v--modal-block-scroll')
        $('#markdown').outerHTML = ''
      })
      $('#markdown-done').addEventListener('click', () => {
        selection = `[${$('#markdown-text').value}](${
          $('#markdown-link').value
        }${
          $('#markdown-hover').value ? ` "${$('#markdown-hover').value}"` : ''
        })`
        textarea.value =
          value.substring(0, selectionStart) +
          selection +
          value.substring(selectionEnd, length)
        document.body.classList.remove('v--modal-block-scroll')
        $('#markdown').outerHTML = ''
      })
    }
  }

  const listOl = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = /^( {3})*\d+\. (.*)/gm
    if (selection.match(selRegex)) {
      selection = selection.match(/^ {3}/)
        ? selection.replace(/^ {3}/gm, '')
        : selection.replace(/^\d+\. /gm, '')
    } else if (
      !selectionStart ||
      value.substring(selectionStart - 1, selectionEnd).match(/^\n.*/)
    ) {
      let countOl = 0
      selection = `${
        value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
        !selectionStart
          ? ''
          : '\n'
      }0. ${selection.replace(/\n/g, () => {
        countOl++
        return `\n${countOl}. `
      })}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/)
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`
    } else if (
      value
        .substring(selectionStart - 4, selectionEnd)
        .match(/( {3})*\d+\. (.*)/)
    ) {
      selectionStart -= 4
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/( {3})*(\d+\.) /g, '   $1$2 ')
    } else if (
      value
        .substring(selectionStart - 5, selectionEnd)
        .match(/( {3})*\d+\. (.*)/)
    ) {
      selectionStart -= 5
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/( {3})*(\d+\.) /g, '   $1$2 ')
    } else {
      let countOl = 0
      selection = `\n0. ${selection.replace(/\n/g, () => {
        countOl++
        return `\n${countOl}. `
      })}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/) ||
        selectionEnd === length
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const listUl = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = /^( {3})*- (.*)/
    if (selection.match(selRegex))
      selection = selection.match(/^ {3}/)
        ? selection.replace(/^ {3}/gm, '')
        : selection.replace(/^- /gm, '')
    else if (
      !selectionStart ||
      value.substring(selectionStart - 1, selectionEnd).match(/^\n.*/)
    )
      selection = `${
        value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
        !selectionStart
          ? ''
          : '\n'
      }- ${selection.replace(/\n/g, '\n- ')}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/)
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`
    else if (
      value.substring(selectionStart - 1, selectionEnd).match(selRegex)
    ) {
      selectionStart--
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/( {3})*- /g, '$1   - ')
    } else if (
      value.substring(selectionStart - 2, selectionEnd).match(selRegex)
    ) {
      selectionStart -= 2
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/( {3})*- /g, '$1   - ')
    } else
      selection = `\n- ${selection.replace(/\n/g, '\n- ')}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/) ||
        selectionEnd === length
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const quoteRight = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = /^>+\s.*/gm
    if (selection.match(selRegex))
      selection = selection.match(/^> /gm)
        ? selection.replace(/^> /gm, '')
        : selection.replace(/(^>*)> /gm, '$1 ')
    else if (
      !selectionStart ||
      value.substring(selectionStart - 1, selectionEnd).match(/^\n.*/)
    )
      selection = `${
        value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
        !selectionStart
          ? ''
          : '\n'
      }> ${selection.replace(/\n/g, '\n> ')}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/)
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`
    else if (
      value.substring(selectionStart - 1, selectionEnd).match(selRegex)
    ) {
      selectionStart--
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/(^>*)\s/gm, '$1> ')
    } else if (
      value.substring(selectionStart - 2, selectionEnd).match(selRegex)
    ) {
      selectionStart -= 2
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/(^>*)\s/gm, '$1> ')
    } else
      selection = `\n> ${selection.replace(/\n/g, '\n> ')}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/) ||
        selectionEnd === length
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const strikethrough = (
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) => {
    const selRegex = /~~((.*\W?)*)~~/
    if (selection.match(selRegex)) selection = selection.replace(selRegex, '$1')
    else if (selectionStart > 0 && selectionEnd < length) {
      if (selection.match(selRegex)) selection.replace(selRegex, '$1')
      else if (
        value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)
      ) {
        selectionStart--
        selectionEnd++
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else if (
        value.substring(selectionStart - 2, selectionEnd + 2).match(selRegex)
      ) {
        selectionStart -= 2
        selectionEnd += 2
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else {
        selection = selection.match(/~~.+~~/g)
          ? selection.replace(/~~/g, '')
          : `~~${selection}~~`
      }
    } else {
      if (
        !selectionStart &&
        value.substring(selectionStart, selectionEnd + 1).match(selRegex)
      ) {
        selectionEnd++
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else if (
        selectionEnd === length &&
        value.substring(selectionStart - 1, selectionEnd).match(selRegex)
      ) {
        selectionStart--
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1')
      } else {
        selection = selection.match(/~~.+~~/g)
          ? selection.replace(/~~/g, '')
          : `~~${selection}~~`
      }
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length)
  }

  const markdown = {
    bold: {
      title: 'bold text',
      replaceFunc: bold
    },
    italic: {
      title: 'italic text',
      replaceFunc: italic
    },
    heading: {
      title: 'enlarges/reduces the text',
      replaceFunc: heading
    },
    strikethrough: {
      title: 'strikethrough text',
      replaceFunc: strikethrough
    },
    highlighter: {
      title: 'highlighted text',
      replaceFunc: highlighter
    },
    'list-ul': {
      title: 'unordered list',
      replaceFunc: listUl
    },
    'list-ol': {
      title: 'ordered list',
      replaceFunc: listOl
    },
    'quote-right': {
      title: 'quote',
      replaceFunc: quoteRight
    },
    code: {
      title: 'block of code',
      replaceFunc: code
    },
    link: {
      title: 'insert link',
      replaceFunc: link
    },
    image: {
      title: 'insert image',
      replaceFunc: image
    }
  }

  const getSelectedText = event => {
    const textarea = $('#input-comment')
    const { value, selectionStart, selectionEnd } = textarea
    const { length } = value
    const selection = value.substring(selectionStart, selectionEnd)
    markdown[`${event.currentTarget.id}`].replaceFunc(
      value,
      length,
      selectionStart,
      selectionEnd,
      selection,
      textarea
    )
  }

  const addMarkdownTools = () => {
    const textarea = $('#input-comment')
    if (!textarea) return
    const markdownDiv = $('<div id="markdown-editor"></div>')
    Object.keys(markdown).forEach(toolName =>
      markdownDiv.appendChild(
        $(
          `<div id="${toolName}" class="test-markdown fas fa-${toolName} btn btn-default" title="${markdown[toolName].title}"></div>`
        )
      )
    )
    textarea.insertAdjacentHTML('beforebegin', markdownDiv.outerHTML)
    ;[...$('#markdown-editor').children].forEach(children =>
      children.addEventListener('click', getSelectedText)
    )
  }

  const getNotifications = () => {
    if (!window.notificationsOpened) {
      $('#user-notify-list').innerHTML =
        '<img src="/img/loading.gif" alt="Loading...."/>'
      const xhr = new XMLHttpRequest()
      xhr.open('GET', '/notification/view/')
      xhr.onload = () => {
        if (xhr.status === 200) {
          $('#user-notify-list').innerHTML = xhr.responseText
          $('#user-notify-count').textContent = '0'
          window.notificationsOpened = true
        } else {
          $('#user-notify-list').innerHTML = xhr.responseText
          window.notificationsOpened = true
        }
      }
    }
  }

  const toggleLight = () => {
    if (options.anbtDarkMode) {
      const inDark = getLocalStorageItem('gpe_inDark', 0)
      if (!inDark) {
        const css = document.createElement('style')
        css.id = 'darkgraycss'
        css.type = 'text/css'
        css.appendChild(
          document.createTextNode(getLocalStorageItem('gpe_darkCSS'))
        )
        document.head.appendChild(css)
      } else {
        document.head.removeChild(document.getElementById('darkgraycss'))
      }
      localStorage.setItem('gpe_inDark', `${inDark ? 0 : 1}`)
    } else {
      if (document.body.classList.contains('theme-night')) {
        document.body.classList.remove('theme-night')
        setCookie('theme-night')
      } else {
        document.body.classList.add('theme-night')
        setCookie('theme-night', 1, 365)
      }
    }
  }

  const pageEnhancements = () => {
    loadScriptSettings()
    if (typeof DrawceptionPlay === 'undefined') return
    if (document.getElementById('newcanvasyo')) return
    try {
      const tmpuserlink = $('.player-dropdown a[href^="/player/"]')
      const username = tmpuserlink.querySelector('strong').textContent
      const userid = tmpuserlink.href.match(/\/player\/(\d+)\//)[1]
      localStorage.setItem('gpe_lastSeenName', username)
      localStorage.setItem('gpe_lastSeenId', userid)
    } catch (e) {}
    const currentPage = location.href.match(/drawception\.com\/([^/]+)/)
    if (currentPage) {
      const page = currentPage[1]
      const functionName = `better${page.replace(
        page[0],
        page[0].toUpperCase()
      )}`
      if (betterPages[functionName]) betterPages[functionName]()
    }
    addStyle(
      '.panel-user {width: auto} .panel-details img.loading {display: none}' +
        '.gpe-wide, .gpe-wide-block {display: none}' +
        '.gpe-btn {padding: 5px 8px; height: 28px}' +
        '.gpe-spacer {margin-right: 7px; float:left}' +
        '@media (min-width:992px) {.navbar-toggle,.btn-menu-player {display: none} .gpe-wide {display: inline} .gpe-wide-block {display: block}}' +
        '@media (min-width:1200px) {.gpe-btn {padding: 5px 16px;} .gpe-spacer {margin-right: 20px;} .panel-number {left: -30px}}' +
        '#anbtver {font-size: 10px; position:absolute; opacity:0.3; right:10px; top: 0;}' +
        '.anbt_paneldel {position:absolute; padding:1px 6px; color:#FFF; background:#d9534f; text-decoration: none !important; right: 18px; border-radius: 5px}' +
        '.anbt_paneldel:hover {background:#d2322d}' +
        '.anbt_favpanel {top: 20px; font-weight: normal; padding: 0 2px}' +
        '.anbt_favpanel:hover {color: #d9534f; cursor:pointer}' +
        '.anbt_favedpanel {color: #d9534f; border-color: #d9534f}' +
        '.anbt_replaypanel {top: 55px; font-weight: normal; padding: 0 8px}' +
        '.anbt_replaypanel:hover {color: #8af; text-decoration: none}' +
        ".anbt_owncaption:before {content: ''; display: inline-block; background: #5C5; border: 1px solid #080; width: 10px; height: 10px; border-radius: 10px; margin-right: 10px;}" +
        '.gamepanel, .thumbpanel, .comment-body {word-wrap: break-word}' +
        '.comment-body img {max-width: 100%}' +
        '.forum-thread.anbt_hidden {display: none}' +
        '.anbt_showt .forum-thread.anbt_hidden {display: block; opacity: 0.6}' +
        ".anbt_unhidet:after {content: ' threads hidden. Show'}" +
        ".anbt_showt .anbt_unhidet:after {content: ' threads hidden. Hide'}" +
        ".anbt_hft:after {content: '[hide]'}" +
        '.anbt_hft, .anbt_unhidet {padding-left: 0.4em; cursor:pointer}' +
        ".forum-thread.anbt_hidden .anbt_hft:after {content: '[show]'}" +
        '.anbt_threadtitle {margin: 0 0 10px}' +
        '.avatar {box-sizing: content-box}' +
        '.pagination {margin: 0px}' +
        '#nav-drag {position: fixed; width: 100%; z-index: 2000}' +
        '#header-bar-container {position: relative; width: 100%; top: 6rem}' +
        '.wrapper {position: relative; top: 6rem}' +
        'footer {position: relative; top: 6rem}' +
        '.option span:first-child {display: flex; flex-direction: row; justify-content: space-between}' +
        '.grid-settings div[class^="grid-"] label {display: inline-flex}' +
        'input[type="checkbox"], input[type="radio"] {margin:4px 4px 0 0}' +
        '@-moz-document url-prefix() {input[type="checkbox"], input[type="radio"] {margin:0 4px 0 0}}' +
        '.tooltip {z-index: 3000;}'
    )
    if (options.maxCommentHeight) {
      const maxHeight = options.maxCommentHeight
      addStyle(
        `.comment-holder[id]:not(:target) .comment-body {overflow-y: hidden; max-height: ${maxHeight}px; position:relative}.comment-holder[id]:not(:target) .comment-body:before{content: 'Click to read more'; position:absolute; width:100%; height:50px; left:0; top:${maxHeight -
          50}px;text-align: center; font-weight: bold; color: #fff; text-shadow: 0 0 2px #000; padding-top: 20px; background:linear-gradient(transparent, rgba(0,0,0,0.4))}`
      )
      $('.comment-body', true).forEach(comment =>
        comment.addEventListener('click', () => {
          if (
            comment.clientHeight > maxHeight - 50 &&
            location.hash.indexOf(comment) === -1
          )
            location.hash = `#${comment.parentNode.parentNode.id}`
        })
      )
    }
    if (options.useOldFontSize) document.body.style.fontSize = '15px'
    if (options.useOldFont) {
      const nunito = $("link[href*='Nunito']")
      nunito.parentNode.removeChild(nunito)
      addStyle(
        "@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap')"
      )
    }
    if (options.anbtDarkMode) {
      if (document.body.classList.contains('theme-night')) {
        document.body.classList.remove('theme-night')
        setCookie('theme-night')
      }
    }
    if (options.markdownTools) addMarkdownTools()
    if (options.newCanvas) {
      const inSandbox = location.href.match(/drawception\.com\/sandbox\/#?(.*)/)
      const inPlay = location.href.match(
        /drawception\.com\/(:?contests\/)?play\/(.*)/
      )
      const hasCanvas = document.getElementById('canvas-holder')
      const hasCanvasOrGameForm = document.querySelector('.playtimer')
      const captionContest =
        location.href.match(/contests\/play\//) && !hasCanvas
      if (!captionContest && (inSandbox || (inPlay && hasCanvasOrGameForm))) {
        setTimeout(() => setupNewCanvas(inSandbox, location.href), 1)
        return
      }
      $('a[href^="/sandbox/"]', true).forEach(sandboxButton =>
        sandboxButton.addEventListener('click', event => {
          if (event.which === 2) return
          event.preventDefault()
          setupNewCanvas(true, event.currentTarget.href)
        })
      )
      $('a[href="/play/"]', true).forEach(playButton =>
        playButton.addEventListener('click', event => {
          if (event.which === 2) return
          event.preventDefault()
          setupNewCanvas(false, event.currentTarget.href)
        })
      )
    }
    if ($('.navbar-toggle')) {
      const navbarToggle = $('.navbar-toggle').parentNode
      const navbarButtonsList = [
        '<span class="gpe-wide gpe-spacer"></span>',
        '<a href="/sandbox/" title="Sandbox" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#5A5"><span class="fas fa-edit" style="color:#BFB" /></a>',
        '<a href="/browse/all-games/" title="Browse Games" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-folder-open" /></a>',
        '<a href="/contests/" title="Contests" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-trophy" /></a>',
        '<a href="#" title="Toggle light" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item toggle-light" style="background:#AA5"><span class="fas fa-eye" style="color:#FFB" /></a>',
        '<a href="/leaderboard/" title="Leaderboards" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-fire" /></a>',
        '<a href="/faq/" title="FAQ" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-question-circle " /></a>',
        '<a href="/forums/" title="Forums" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#55A"><span class="fas fa-comments" style="color:#BBF" /></a>',
        '<a href="/search/" title="Search" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-search" /></a>',
        '<a href="/dashboard/" title="Dashboard" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-bell" /></a>',
        '<a href="/settings/" id="menusettings" title="Settings" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-cog" /></a>',
        '<a href="/logout" title="Log Out" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#A55"><span class="fas fa-sign-out-alt" style="color:#FBB" /></a>'
      ]
      navbarButtonsList.forEach(button => navbarToggle.appendChild($(button)))
      $('#main-menu').insertAdjacentHTML(
        'afterbegin',
        '<a href="#" class="list-group-item toggle-light"><span class="fas fa-eye"></span> Toggle light</a>'
      )
    }
    $('.toggle-light').forEach(button =>
      button.addEventListener('click', toggleLight)
    )
    const menuPlayer = $('.btn-menu-player')
    if (menuPlayer) {
      const userlink = $('.player-dropdown a[href^="/player/"]').href
      const useravatar = $('.btn-menu-player').innerHTML
      const element = $(
        `<a href="${userlink}" title="View Profile" class="gpe-wide-block navbar-btn navbar-user-item" style="margin-top:8px">${useravatar}</a>`
      )
      menuPlayer.parentNode.appendChild(element)
    }
    const num =
      $('#user-notify-count') && $('#user-notify-count').textContent.trim()
    addStyle(
      `#user-notify-list .list-group .list-group-item .fas {color: #888}#user-notify-list .list-group .list-group-item:nth-child(-n+${num}) .fas {color: #2F5}a.wrong-order {color: #F99} div.comment-holder:target {background-color: #DFD}.comment-new a.text-muted:last-child:after {content: 'New'; color: #2F5; font-weight: bold; background-color: #183; border-radius: 9px; display: inline-block; padding: 0px 6px; margin-left: 10px;}`
    )
    window.getNotifications = getNotifications
    let versionDisplay = `ANBT v${versions.scriptVersion}`
    try {
      const appver = $('script[src^="/build/app"]').src.match(/(\w+)\.js$/)[1]
      const runtimever = $('script[src^="/build/runtime"]').src.match(
        /(\w+)\.js$/
      )[1]
      versionDisplay += ` | app ${appver}`
      if (appver !== versions.siteVersion) versionDisplay += '*'
      versionDisplay += ` | runtime ${runtimever}`
      if (runtimever !== versions.runtimeVersion) versionDisplay += '*!!!'
    } catch (e) {}
    const wrapperSection = $('.wrapper')
    if (wrapperSection)
      wrapperSection.appendChild($(`<div id="anbtver">${versionDisplay}</div>`))
    const linkList = [
      '<li><a href="/forums/-/11830/-/">ANBT script</a></li>',
      '<li><a href="http://drawception.wikia.com/">Wiki</a></li>',
      '<li><a href="http://chat.grompe.org.ru/#drawception">Chat</a> (<a href="https://discord.gg/CNd5KTJ">Discord</a>)</li>'
    ]
    $('.footer-main .list-unstyled').forEach((list, index) =>
      list.appendChild($(linkList[index]))
    )
  }

  const wrapper = () => {
    window.options = options
    const mark = document.createElement('b')
    mark.id = '_anbt_'
    mark.style.display = 'none'
    document.body.appendChild(mark)
    if (!window.DrawceptionPlay) {
      const loader = setInterval(() => {
        if (!window.DrawceptionPlay) return
        pageEnhancements()
        clearInterval(loader)
      }, 100)
    } else pageEnhancements()
  }

  addDarkCSS()
  setDarkMode()
  if (document && document.body) {
    if (!document.getElementById('_anbt_')) wrapper()
    if (window.opera && !getLocalStorageItem('gpe_operaWarning', 0)) {
      const anbtTitle = document.createElement('h2')
      anbtTitle.innerHTML =
        'ANBT speaking:<br/>Rename your script file so it doesn\'t contain ".user." part for smoother loading!<br/>This warning is only shown once.'
      const mainSection = document.getElementById('main')
      mainSection.insertBefore(anbtTitle, mainSection.firstChild)
      localStorage.setItem('gpe_operaWarning', 1)
    }
  }
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      if (!document.getElementById('_anbt_')) wrapper()
    },
    false
  )
})()
