// ==UserScript==
// @name         Drawception ANBT
// @author       Grom PE
// @contributor  B Derouet https://github.com/B-Derouet
// @contributor  J Emerson https://github.com/jackemerson
// @namespace    http://grompe.org.ru/
// @version      2.12.2022.05-dev
// @description  Enhancement script for Drawception.com - Artists Need Better Tools
// @downloadURL  https://raw.github.com/jackemerson/Drawception-ANBT/development/build/drawception-anbt.user.js
// @updateURL    https://raw.github.com/jackemerson/Drawception-ANBT/development/build/drawception-anbt.user.js
// @match        http://drawception.com/*
// @match        https://drawception.com/*
// @match        http://stage.drawception.com/*
// @match        https://stage.drawception.com/*
// @grant        none
// @run-at       document-start
// @license      Public domain
// ==/UserScript==
(function () {
  'use strict';

  function addDarkCSS() {
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
        '.bg-color{~#444$}.progressbar{~#666$}' +
        'a.anbt_replaypanel:hover{color:#8af$}' +
        '.anbt_favedpanel{color:#d9534f$}' +
        ''
      )
        .replace(/~/g, 'background-color:')
        .replace(/\$/g, ' !important')
    );
  }

  function getLocalStorageItem(name, empty) {
    const item = localStorage.getItem(name);
    try {
      return item ? JSON.parse(item) : empty || '';
    } catch (e) {
      return item ? item : empty || '';
    }
  }

  function setDarkMode() {
    const settings = getLocalStorageItem('gpe_anbtSettings', {});
    if (settings.anbtDarkMode || typeof settings.anbtDarkMode === 'undefined') {
      if (getLocalStorageItem('gpe_inDark', 0)) {
        const css = document.createElement('style');
        css.id = 'darkgraycss';
        css.type = 'text/css';
        css.appendChild(
          document.createTextNode(getLocalStorageItem('gpe_darkCSS'))
        );
        const darkLoad = setInterval(() => {
          if (!document.head) return;
          document.head.appendChild(css);
          clearInterval(darkLoad);
        }, 100);
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
    timeOutSound: 0,
    timeOutSoundBlitz: 0,
    timeOutSoundVolume: 100,
    newCanvas: 1,
    proxyImgur: 0,
    ajaxRetry: 1,
    localeTimestamp: 0,
    autoPlay: 1,
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
  };

  function $(selector, array = false) {
    const elements = selector.startsWith('<')
      ? [
          ...new DOMParser().parseFromString(selector, 'text/html').body
            .children
        ]
      : [...document.querySelectorAll(selector)];
    return elements.length > 1 || array ? elements : elements[0];
  }

  function betterCreate() {
    if (options.enterToCaption) return;
    const prompt = $('#prompt');
    if (prompt) {
      prompt.addEventListener('keydown', event => {
        if (event.keyCode === 13) event.preventDefault();
      });
    }
  }

  function addStyle(css) {
    const parent =
      document.getElementsByTagName('head')[0] || document.documentElement;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    parent.appendChild(style);
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
  };

  function decimalToBase62(number) {
    let result;
    while (number !== 0) {
      const quotient = number % 62;
      result = globals.alphabet[quotient] + result;
      number = (number - quotient) / 62;
    }
    return result;
  }

  function scrambleID(number) {
    if (isNaN(number)) throw new Error('Invalid panel ID');
    return [...decimalToBase62(parseInt(number, 10) + 3521614606208)]
      .reverse()
      .join('');
  }

  function linkifyDrawingPanels(img) {
    if (img.parentNode.nodeName !== 'A') {
      if (
        img.src.match(/\/images\/panels\//) ||
        img.src.match(/\/pub\/panels\//)
      ) {
        img.outerHTML = `<a href="/game/${
          img.src.match(/\/([^-]+)-\d+.png/)[1]
        }/-/">${img.outerHTML}</a>`;
      }
      if (img.src.match(/\/drawings\//)) {
        img.outerHTML = `<a href="/panel/drawing/${
          img.src.match(/(\w+).png$/)[1]
        }/-/">${img.outerHTML}</a>`;
      }
      if (img.src.match(/\/panel\//)) {
        img.outerHTML = `<a href="${img.src}-/">${img.outerHTML}</a>`;
      }
      if (
        img.src.match(/\/images\/games\//) ||
        img.src.match(/\/pub\/games\//)
      ) {
        img.outerHTML = `<a href="/game/${
          img.src.match(/\/([^/]+)\.png/)[1]
        }/-/">${img.outerHTML}</a>`;
      }
      if (img.src.match(/\/display-panel.php?/)) {
        const newSrc = `/panel/drawing/${scrambleID(
          img.src.match(/x=(\d+)/)[1]
        )}/`;
        img.setAttribute('src', newSrc);
        img.outerHTML = `<a href="${newSrc}-/">${img.outerHTML}</a>`;
      }
    }
  }

  function linkifyNodeText(node) {
    if (!node.textContent.includes('://')) return;
    node.innerHTML = node.innerHTML.replace(
      /([^"]|^)(https?:\/\/(?:(?:(?:[^\s<()]*\([^\s<()]*\))+)|(?:[^\s<()]+)))/g,
      '$1<a href="$2">$2</a>'
    );
  }

  const consts_git = {
    user: 'jackemerson',
    repository: 'Drawception-ANBT',
    branch: 'development'
  };
  const scriptVersion = '2.12.2022.05-dev';
  const newCanvasVersion = 64;
  const siteVersion = '4aa2b913';
  const runtimeVersion = '1ba6bf05';
  const versions = {
    __proto__: null,
    scriptVersion: scriptVersion,
    newCanvasVersion: newCanvasVersion,
    siteVersion: siteVersion,
    runtimeVersion: runtimeVersion
  };

  function setupNewCanvas(inSandbox, url) {
    localStorage.getItem('anbt_canvasHTML');
    localStorage.getItem('anbt_canvasHTMLver');
    {
      const request = new XMLHttpRequest();
      const address = `https://api.github.com/repos/${consts_git.user}/${consts_git.repository}/contents/build/index.html?ref=${consts_git.branch}`;
      console.log(address);
      request.open('GET', address);
      request.setRequestHeader('Accept', 'application/vnd.github.3.raw');
      request.onload = () => {
        if (request.responseText.length < 10000) {
          alert(
            `Error: instead of new canvas code, got this response from GitHub:\n${request.responseText}`
          );
          location.pathname = '/';
        } else {
          localStorage.setItem('anbt_canvasHTML', request.responseText);
          localStorage.setItem('anbt_canvasHTMLver', versions.newCanvasVersion);
          setupNewCanvas();
        }
      };
      request.onerror = () => {
        alert('Error loading the new canvas code. Please try again.');
        location.pathname = '/';
      };
      request.send();
      return;
    }
  }

  function formatTimestamp(date) {
    if (typeof date === 'number') date = new Date(date);
    return options.localeTimestamp
      ? date.toLocaleString()
      : `${('0' + date.getDate()).slice(-2)} ${
          globals.months[date.getMonth()]
        } ${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${(
          '0' + date.getMinutes()
        ).slice(-2)}`;
  }

  function betterForums() {
    $('.comment-body *', true).forEach(comment => linkifyNodeText(comment));
    $('img', true).forEach(img => linkifyDrawingPanels(img));
    if (location.pathname.match(/\/forums\/(\w+|-)\/.+/)) {
      const hideUserIds = options.forumHiddenUsers
        ? options.forumHiddenUsers.split(',')
        : '';
      if (hideUserIds) {
        addStyle(
          '.anbt_hideUserPost:not(:target) {opacity: 0.4; margin-bottom: 10px}' +
            '.anbt_hideUserPost:not(:target) .comment-body, .anbt_hideUserPost:not(:target) .avatar {display: none}' +
            ''
        );
      }
      let lastId = 0;
      $('.comment-avatar', true).forEach(({ parentNode }) => {
        const commentHolder = parentNode.parentNode.parentNode;
        const anchor = commentHolder.id || '';
        commentHolder.classList.add('comment-holder');
        const textMuted = commentHolder.querySelector('a.text-muted');
        const vue = commentHolder.childNodes[0].__vue__;
        if (vue) {
          textMuted.textContent = `${textMuted.textContent.trim()}, ${formatTimestamp(
            vue.comment_date * 1000
          )}`;
          if (vue.edit_date > 0) {
            const element = textMuted.parentNode.querySelector(
              'span[rel="tooltip"]'
            );
            const text = `${element.title}, ${formatTimestamp(
              vue.edit_date * 1000
            ).replace(/ /g, '\u00A0')}`;
            element.setAttribute('title', text);
          }
        }
        if (anchor) {
          const id = parseInt(anchor.substring(1), 10);
          const text = textMuted.textContent.trim();
          textMuted.textContent = `${text} #${id}`;
          textMuted.setAttribute('title', 'Link to post');
          if (id < lastId) textMuted.classList.add('wrong-order');
          try {
            const { href } = commentHolder.querySelector('a[href^="/player/"]');
            if (href) {
              const userId = href.match(/\d+/)[0];
              if (hideUserIds.includes(userId))
                commentHolder.classList.add('anbt_hideUserPost');
            }
          } catch (e) {}
          lastId = id;
        }
      });
      if (
        $('.comment-holder') &&
        $('.comment-holder').length === 20 &&
        $('#comment-form .btn-primary')
      ) {
        $('#comment-form .btn-primary').insertAdjacentHTML(
          'afterend',
          '<div>Note: posting to another page</div>'
        );
      }
    }
    if (options.proxyImgur) {
      $('img[src*="imgur.com/"]', true).forEach(img =>
        img.setAttribute(
          'src',
          img.src.replace('imgur.com', 'filmot.com').replace('https', 'http')
        )
      );
    }
    const pagination = $('.pagination', true);
    if (pagination.length) {
      $('.breadcrumb').insertAdjacentHTML(
        'afterend',
        `<div class="text-center">${pagination[0].outerHTML}</div>`
      );
    }
    if (location.pathname.match(/\/forums\/(\w+)\/$/)) {
      const hiddenTopics = getLocalStorageItem('gpe_forumHiddenTopics', []);
      let hidden = 0;
      const tempUnhideLink = $('<a class="text-muted anbt_unhidet">');
      $('.forum-thread', true).forEach(thread => {
        const href = thread
          .querySelector('a:first-child')
          .href.match(/\/forums\/\w+\/(\d+)\//);
        if (!href || !href[1] || href[1] === '11830') return;
        const id = href[1];
        if (hiddenTopics.includes(id)) {
          thread.classList.add('anbt_hidden');
          hidden++;
        }
        const hideLink = $('<a class="text-muted anbt_hft">');
        hideLink.addEventListener('click', () => {
          const hiddenTopics = getLocalStorageItem('gpe_forumHiddenTopics', []);
          if (hiddenTopics.includes(id)) {
            if (hiddenTopics.includes(id))
              hiddenTopics.splice(hiddenTopics.indexOf(id), 1);
            hiddenTopics.splice(hiddenTopics.indexOf(id), 1);
            thread.classList.remove('anbt_hidden');
            hidden--;
          } else {
            if (!hiddenTopics.includes(id)) hiddenTopics.push(id);
            hiddenTopics.push(id);
            thread.classList.add('anbt_hidden');
            hidden++;
            tempUnhideLink.style.display = '';
          }
          tempUnhideLink.textContent = hidden;
          localStorage.setItem(
            'gpe_forumHiddenTopics',
            JSON.stringify(hiddenTopics)
          );
        });
        thread.querySelector('p:nth-child(2)').appendChild(hideLink);
      });
      tempUnhideLink.textContent = hidden;
      tempUnhideLink.addEventListener('click', () => {
        $('#main').classList.toggle('anbt_showt');
      });
      if (!hidden) tempUnhideLink.style.display = 'none';
      const threadToggle = $('#js-btn-toggle-thread');
      if (threadToggle) threadToggle.parentNode.appendChild(tempUnhideLink);
    }
    $('.btn.btn-default', true).forEach(button =>
      button.addEventListener('click', () => {
        if (button.textContent === 'Draw') setupNewCanvas();
      })
    );
  }

  function betterComments() {
    const comments = [...$('#comments').nextElementSibling.children].slice(1);
    comments.forEach(x => {
      x.parentNode.parentNode.classList.add('comment-holder');
    });
    const gamePlayers = [];
    const playerData = {};
    $('.gamepanel-holder', true).forEach((gamePanel, index) => {
      const detail = gamePanel.querySelector('.panel-details');
      const panel = gamePanel.querySelector('.gamepanel');
      const playerLink = detail.querySelector('.panel-user a');
      if (!playerLink) return;
      const id = playerLink.href.match(/\/player\/(\d+)\//)[1];
      playerData[id] = {
        panel_number: index + 1,
        player_anchor: playerLink,
        panel_id: panel.id,
        drew: panel.querySelector('img') !== null,
        comments: 0
      };
      gamePlayers.push(id);
    });
    const seenComments = getLocalStorageItem('gpe_seenComments', {});
    const gameId = location.href.match(/game\/([^/]+)\//)[1];
    if (comments) {
      const hour = Math.floor(Date.now() / (1000 * 60 * 60));
      for (const temporaryGame in seenComments) {
        if (seenComments[temporaryGame].h + 24 * 7 < hour)
          delete seenComments[temporaryGame];
      }
      let maxSeenId = 0;
      comments.forEach(holder => {
        const dateElement = holder.querySelector('a.text-muted');
        const vue = holder.__vue__;
        if (vue) {
          const text = dateElement.textContent.trim();
          dateElement.textContent = `${text}, ${formatTimestamp(
            vue.comment_date * 1000
          )}`;
          if (vue.edit_date > 0) {
            const element = dateElement.parentNode.querySelector(
              'span[rel="tooltip"]'
            );
            const title = `${element.title}, ${formatTimestamp(
              vue.edit_date * 1000
            ).replace(/ /g, '\u00A0')}`;
            element.setAttribute('title', title);
          }
        }
        const ago = dateElement.textContent;
        const commentId = parseInt(holder.id.slice(1), 10);
        dateElement.setAttribute('title', 'Link to comment');
        dateElement.textContent = `${dateElement.textContent.trim()} #${commentId}`;
        if (ago.match(/just now|min|hour|a day| [1-7] day/)) {
          if (!(seenComments[gameId] && seenComments[gameId].id >= commentId)) {
            holder.classList.add('comment-new');
            if (maxSeenId < commentId) maxSeenId = commentId;
          }
        }
        const link = holder.querySelector('.text-bold a')
          ? holder.querySelector('.text-bold a').href.match(/\/player\/(\d+)\//)
          : '';
        if (link) {
          const id = link[1];
          if (gamePlayers.includes(id)) {
            const drew = playerData[id].drew ? 'drew' : 'wrote';
            dateElement.insertAdjacentHTML(
              'beforebegin',
              `<a href="#panel-${playerData[id].panel_id}">(${drew} #${playerData[id].panel_number})</a> `
            );
            playerData[id].comments++;
          }
        }
      });
      if (maxSeenId) {
        seenComments[gameId] = {
          h: hour,
          id: maxSeenId
        };
      }
      localStorage.setItem('gpe_seenComments', JSON.stringify(seenComments));
    }
    for (const playerId in gamePlayers) {
      const data = playerData[playerId];
      if (data && data.comments) {
        const title = `Player left ${data.comments} comment${
          data.comments > 1 ? 's' : ''
        }`;
        data.player_anchor.title = title;
        data.player_anchor.insertAdjacentHTML(
          'afterend',
          `<sup title="${title}">${data.comments}</sup>`
        );
      }
    }
    if (options.maxCommentHeight) {
      comments.forEach(comment =>
        comment.addEventListener('click', () => {
          if (
            comment.clientHeight > options.maxCommentHeight - 50 &&
            !$(location.hash).has(comment).length
          )
            location.hash = `#${comment.parentNode.parentNode.id}`;
        })
      );
    }
  }

  function waitForComments() {
    const comments = $('#comments')
      ? [...$('#comments').nextElementSibling.children].slice(1)
      : '';
    if (comments.length && !comments[0].classList.contains('spinner')) {
      betterComments();
    } else {
      if (comments.length === 0) return;
      setTimeout(waitForComments, 1000);
    }
  }

  function checkForRecording(url, success, retrying) {
    const request = new XMLHttpRequest();
    request.open('GET', `${url}?anbt`, true);
    request.responseType = 'arraybuffer';
    request.onload = () => {
      const buffer = request.response;
      const dataView = new window.DataView(buffer);
      const magic = dataView.getUint32(0);
      if (magic != 0x89504e47) return request.onerror();
      for (let i = 8; i < buffer.byteLength; i += 4) {
        const chunkLength = dataView.getUint32(i);
        i += 4;
        const chunkName = dataView.getUint32(i);
        i += 4;
        if (chunkName === 0x73764762) {
          return success();
        } else {
          if (chunkName === 0x49454e44) break;
          i += chunkLength;
        }
      }
    };
    request.onerror = () => {
      console.log(
        'checkForRecording fail (likely due to cache without CORS), retrying'
      );
      if (!retrying) checkForRecording(`${url}?anbt`, success, true);
    };
    request.send();
  }

  function addReplayButton(drawing) {
    if (drawing.replayAdded) return;
    drawing.replayAdded = true;
    const { parentNode, src } = drawing;
    checkForRecording(src, () => {
      const newId = $(`img[src='${src}']`)
        .parentNode.querySelector('a[href^="/panel/"]')
        .href.match(/\/panel\/[^/]+\/([^/]+)/)[1];
      const id = newId.length >= 8 ? newId : scrambleID(parentNode.id.slice(6));
      const replayButton = $(
        `<a href="/sandbox/#${id}" class="panel-number anbt_replaypanel fas fa-redo-alt text-muted" title="Replay"></a>`
      );
      replayButton.addEventListener('click', event => {
        if (event.which === 2) return;
        event.preventDefault();
        setupNewCanvas();
      });
      parentNode.insertAdjacentHTML('beforebegin', replayButton.outerHTML);
    });
  }

  function reversePanels() {
    const element = $('.gamepanel-holder')[0].parentNode.parentNode;
    [...element.childNodes]
      .reverse()
      .forEach(child => element.appendChild(child));
  }

  function betterGame() {
    if (document.title === 'Not Safe For Work (18+) Gate') {
      if (options.autoBypassNSFW) window.DrawceptionPlay.bypassNsfwGate();
      return;
    }
    const drawings = $(
      'img[src^="https://cdn.drawception.com/images/panels/"],img[src^="https://cdn.drawception.com/drawings/"]'
    );
    const copyButton = $('#btn-copy-url');
    if (copyButton) {
      copyButton.insertAdjacentHTML(
        'afterend',
        ' <a href="#" class="btn btn-default reversePanels" title="Reverse panels"><span class="fas fa-sort-amount-up"></span> Reverse</a>'
      );
    }
    $('.reversePanels').addEventListener('click', reversePanels);
    const favoriteButton = $(
      '<span class="panel-number anbt_favpanel fas fa-heart text-muted" title="Favorite"></span>'
    );
    $('.panel-number', true).forEach(panelNumber =>
      panelNumber.insertAdjacentHTML('afterend', favoriteButton.outerHTML)
    );
    $('.gamepanel', true).forEach(({ parentNode }) => {
      if (parentNode.querySelector('.gamepanel-tools>a:last-child') === null)
        return;
      const panels = getLocalStorageItem('gpe_panelFavorites', {});
      const id = parentNode
        .querySelector('.gamepanel-tools>a:last-child')
        .href.match(/\/panel\/[^/]+\/([^/]+)\/[^/]+\//)[1];
      if (panels[id]) {
        parentNode
          .querySelector('.anbt_favpanel')
          .classList.add('anbt_favedpanel');
      }
    });
    $('.anbt_favpanel', true).forEach(favoritePanelButton => {
      favoritePanelButton.addEventListener('click', () => {
        if (favoritePanelButton.classList.contains('anbt_favedpanel')) return;
        const { parentNode } = favoritePanelButton;
        const id = parentNode
          .querySelector('.gamepanel-tools>a:last-child')
          .href.match(/\/panel\/[^/]+\/([^/]+)\/[^/]+\//)[1];
        const panels = getLocalStorageItem('gpe_panelFavorites', {});
        const panel = {
          time: Date.now(),
          by: parentNode.querySelector('.panel-user a').textContent
        };
        panel.userLink = parentNode
          .querySelector('.panel-user a')
          .href.match(/\/player\/[^/]+\/[^/]+\//)[0];
        const img = parentNode.querySelector('.gamepanel img');
        if (img) {
          panel.image = img.src;
          panel.caption = img.alt;
        } else {
          panel.caption = parentNode
            .querySelector('.gamepanel')
            .textContent.trim();
        }
        panels[id] = panel;
        localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels));
        favoritePanelButton.classList.add('anbt_favedpanel');
      });
    });
    if (options.newCanvas) {
      if (drawings) {
        drawings.forEach(drawing =>
          drawing.addEventListener('load', addReplayButton(drawing))
        );
      }
    }
    setTimeout(waitForComments, 200);
  }

  function getCookie(name) {
    const cookie = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))[2];
    return cookie || null;
  }

  function setCookie(name, value, expire) {
    if (expire) {
      const time = new Date();
      time.setTime(time.getTime() + 24 * expire * 60 * 60 * 1e3);
      expire = time.toUTCString();
    }
    document.cookie = `${name}=${value ? JSON.stringify(value) : ''}; expires=${
      expire ? expire : 'Thu, 01 Jan 1970 00:00:00 UTC'
    }; path=/`;
  }

  function getPanelId(url) {
    const match = url.match(/\/panel\/[^/]+\/(\w+)\//);
    if (match) return match[1];
  }

  function base62ToDecimal(number) {
    number = number.toString();
    const cachePosition = {};
    let result = 0;
    let power = 1;
    for (let i = number.length - 1; i >= 0; i--) {
      const character = number[i];
      if (typeof cachePosition[character] === 'undefined') {
        cachePosition[character] = globals.alphabet.indexOf(character);
      }
      result += power * cachePosition[character];
      power *= 62;
    }
    return result;
  }

  function unscrambleID(string) {
    return base62ToDecimal([...string].reverse().join('')) - 3521614606208;
  }

  function betterPanel() {
    let favoriteButton = $(
      '<button class="btn btn-info" style="margin-top: 20px"><span class="fas fa-heart"></span> <b>Favorite</b></button>'
    );
    const gamePanel = $(
      '.panel-caption-display>.flex,.gamepanel-holder>.gamepanel'
    );
    if (gamePanel)
      gamePanel.insertAdjacentHTML('afterend', favoriteButton.outerHTML);
    favoriteButton = $('.btn.btn-info');
    if (favoriteButton) {
      favoriteButton.addEventListener('click', event => {
        event.preventDefault();
        const panels = getLocalStorageItem('gpe_panelFavorites', {});
        const panel = {
          time: Date.now(),
          by: $('.lead a', true)[0].textContent,
          userLink: $('.lead a', true)[0].href.match(
            /\/player\/[^/]+\/[^/]+\//
          )[0]
        };
        const id = location.href.match(/\/panel\/[^/]+\/([^/]+)\//)[1];
        const img = $('.gamepanel img');
        if (img) {
          panel.image = img.src;
          panel.caption = img.alt;
        } else {
          panel.caption = $('.gamepanel').textContent.trim();
        }
        panels[id] = panel;
        localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels));
        favoriteButton.setAttribute('disabled', 'disabled');
        favoriteButton.querySelector('b').textContent = 'Favorited!';
      });
    }
    const panels = getLocalStorageItem('gpe_panelFavorites', {});
    if (
      location.href.match(/\/panel\/[^/]+\/([^/]+)\//) &&
      panels[location.href.match(/\/panel\/[^/]+\/([^/]+)\//)[1]]
    ) {
      favoriteButton.setAttribute('disabled', 'disabled');
      favoriteButton.querySelector('b').textContent = 'Favorited!';
    }
    const panelId = getPanelId(location.pathname);
    if (options.newCanvas && panelId && unscrambleID(panelId) >= 14924553) {
      const img = $('.gamepanel img');
      if (img) {
        checkForRecording(img.src, () => {
          const replayLink = $(
            `<a class="btn btn-primary" style="margin-top: 20px" href="/sandbox/#${panelId}"><span class="fas fa-redo-alt"></span> <b>Replay</b></a> `
          );
          replayLink.addEventListener('click', event => {
            if (event.which === 2) return;
            event.preventDefault();
            setupNewCanvas();
          });
          $('.gamepanel').insertAdjacentHTML('afterend', replayLink.outerHTML);
        });
      }
    }
    if (
      $('.btn-primary').length > 1 &&
      $('.btn-primary')[1].textContent === 'Play again'
    ) {
      const coverButton = $(
        '<button class="btn btn-info" style="margin-top: 20px"><span class="fas fa-plus"></span> <b>Add to Cover Creator</b></button>'
      );
      coverButton.addEventListener('click', event => {
        event.preventDefault();
        const id = unscrambleID(panelId);
        const cookie = getCookie('covercreatorids');
        const idList = cookie ? JSON.parse(cookie) : [];
        if (!idList.includes(id)) {
          if (idList.length > 98) {
            window.apprise(
              'Max cover creator drawings selected. Please remove some before adding more.'
            );
            return;
          } else {
            idList.push(id.toString());
          }
        } else {
          coverButton
            .setAttribute('disabled', 'disabled')
            .querySelector('b').textContent = 'Already added!';
          return;
        }
        setCookie('covercreatorids', JSON.stringify(idList));
        coverButton
          .setAttribute('disabled', 'disabled')
          .querySelector('b').textContent = 'Added!';
      });
      $('.gamepanel').insertAdjacentHTML('afterend', coverButton.outerHTML);
    }
  }

  function rot13(number) {
    return [...number.toString()]
      .map(character => {
        character = character.charCodeAt(0);
        if (character >= 97 && character <= 122) {
          character = ((character - 97 + 13) % 26) + 97;
        } else if (character >= 65 && character <= 90) {
          character = ((character - 65 + 13) % 26) + 65;
        }
        return String.fromCharCode(character);
      })
      .join('');
  }

  function simpleHash(number) {
    return number
      .toString()
      .split('')
      .reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0);
  }

  function randomGreeting() {
    const changeEveryHalfDay = Math.floor(Date.now() / (1000 * 60 * 60 * 12));
    const rndData = simpleHash(
      changeEveryHalfDay + parseInt(globals.userId, 10) + 178889
    );
    return rot13(globals.greetings[rndData % globals.greetings.length]);
  }

  function addReplaySign(drawing) {
    if (drawing.replayAdded) return;
    drawing.replayAdded = true;
    const panel = drawing.parentNode.parentNode;
    const { src } = drawing;
    checkForRecording(src, () => {
      const newId = src.match(/(\w+).png$/)[1];
      const replaySign =
        newId.length >= 8
          ? $(
              `<a href="/sandbox/#${newId}" class="pull-right fas fa-redo-alt" style="color:#8af;margin-right:4px" title="Replay!"></a>`
            )
          : $(
              '<span class="pull-right fas fa-redo-alt" style="color:#8af;margin-right:4px" title="Replayable!"></span>'
            );
      panel.appendChild(replaySign);
    });
  }

  function fadeOut(element, duration = 400) {
    duration = duration === 'slow' ? 600 : duration;
    element.style.opacity = element.style.opacity
      ? parseFloat(element.style.opacity) - 0.1
      : 1;
    if (parseFloat(element.style.opacity) < 0) {
      element.style.opacity = 0;
      element.style.display = 'none';
    } else {
      setTimeout(() => {
        fadeOut(element, duration);
      }, duration / 10);
    }
  }

  function viewMyGameBookmarks() {
    const removeButtonHTML =
      '<a class="anbt_gamedel pull-right lead fas fa-times btn btn-sm btn-danger" href="#" title="Remove" style="margin-left: 10px"></a>';
    const games = getLocalStorageItem('gpe_gameBookmarks', {});
    const result = [];
    for (let id in games) {
      const extraClass = games[id].own ? ' anbt_owncaption' : '';
      if (id.length > 10) {
        result.push(
          `<p class="well${extraClass}" id="${id}"><span>${id}</span>${removeButtonHTML}</p>`
        );
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/play/${id}`);
        xhr.onload = () => {
          const { responseText, status } = xhr;
          if (status === 200) {
            const m =
              responseText.match(/Game is not private/) ||
              (responseText.match(/Problem loading game/) && 'del');
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
                }` || id;
              const status = m === 'del' ? 'Deleted' : 'Unfinished public';
              $(`#${id}`).querySelector(
                'span'
              ).textContent = `${status} game${gamename}`;
              return;
            }
            const title = responseText.match(/<title>(.+)<\/title>/)[1];
            const [url, gameId] = responseText.match(
              /\/game\/([^/]+)\/[^/]+\//
            );
            delete games[id];
            games[gameId] = {
              title,
              url
            };
            $(`#${id}`).id = gameId;
            const spanId = $(`#${gameId}`).querySelector('span');
            spanId.parentNode.replaceChild(
              $(`<a href="${url}">${title}</a>`),
              spanId
            );
            localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games));
          } else {
            $(`#${id}`).querySelector(
              'span'
            ).textContent = `Error while retrieving game: ${responseText}`;
          }
        };
        xhr.send();
      } else if (id.length === 10) {
        result.push(
          `<p class="well${extraClass}" id="${id}"><a href="${games[id].url}">${games[id].title}</a>${removeButtonHTML}</p>`
        );
      }
    }
    $('#anbt_userpage').innerHTML = result.length
      ? result.join('')
      : "You don't have any bookmarked games.";
    $('#anbt_userpage .anbt_gamedel', true).forEach(gameDelete =>
      gameDelete.addEventListener('click', event => {
        event.preventDefault();
        const { id } = gameDelete.parentNode;
        fadeOut($(`#${id}`));
        delete games[id];
        localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games));
      })
    );
  }

  function viewMyPanelFavorites() {
    const panels = getLocalStorageItem('gpe_panelFavorites', {});
    let result = '';
    let needsUpdate = false;
    for (const id in panels) {
      if (panels[id].image && panels[id].image.match(/^\/pub\/panels\//)) {
        needsUpdate = true;
        panels[id].image = panels[id].image.replace(
          '/pub/panels/',
          'https://cdn.drawception.com/images/panels/'
        );
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
      )}</small></div></div>`;
    }
    if (needsUpdate)
      localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels));
    result = result
      ? `${result}<div style="clear:left"></div>`
      : "You don't have any favorited panels.";
    $('#anbt_userpage').innerHTML = result;
    $('#anbt_userpage .anbt_paneldel', true).forEach(panelDelete =>
      panelDelete.addEventListener('click', event => {
        event.preventDefault();
        const { id } = panelDelete.parentNode.parentNode;
        fadeOut($(`#${CSS.escape(id)}`));
        delete panels[id];
        localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels));
      })
    );
  }

  function betterPlayer() {
    const publicInfo = $('.profile-header-info .text-muted > span:last-child');
    if (publicInfo) linkifyNodeText(publicInfo.parentNode);
    const currentLocation = location.href;
    if (
      currentLocation.match(
        new RegExp(`/player/${globals.userId}/[^/]+/(?:$|#)`)
      )
    ) {
      const anbtSection = $('<h2>ANBT stuff: </h2>');
      const panelFavoritesButton = $(
        '<a class="btn btn-primary viewFavorites" href="#anbt_panelfavorites">Panel Favorites</a>'
      );
      const gameBookmarks = $(
        '<a class="btn btn-primary viewBookmarks" href="#anbt_gamebookmarks">Game Bookmarks</a>'
      );
      anbtSection.appendChild(panelFavoritesButton);
      anbtSection.appendChild(gameBookmarks);
      const profilemain = $('.profile-layout-content').firstChild;
      profilemain.insertAdjacentHTML(
        'afterbegin',
        `<h5 id="anbt_userpage">${randomGreeting()}</h5>`
      );
      profilemain.insertAdjacentHTML('afterbegin', anbtSection.outerHTML);
      $('.viewFavorites').addEventListener('click', event => {
        event.preventDefault();
        viewMyPanelFavorites();
      });
      $('.viewBookmarks').addEventListener('click', event => {
        event.preventDefault();
        viewMyGameBookmarks();
      });
      if (location.hash.includes('#anbt_panelfavorites'))
        viewMyPanelFavorites();
      if (location.hash.includes('#anbt_gamebookmarks')) viewMyGameBookmarks();
      if (window.date) {
        const publicInfo = $('.profile-user-header>div.row>div>h1+p');
        if (publicInfo) {
          [...publicInfo.childNodes][4].nodeValue = ` ${formatTimestamp(
            window.date
          )} \xa0`;
        }
      }
    } else {
      const drawings = $(
        'img[src^="https://cdn.drawception.com/images/panels/"],img[src^="https://cdn.drawception.com/drawings/"]',
        true
      );
      if (options.newCanvas) {
        drawings.forEach(drawing =>
          drawing.addEventListener('load', addReplaySign(drawing))
        );
      }
      drawings.forEach(({ src, parentNode }) => {
        if (src.match(/-1\.png$/))
          parentNode.parentNode.appendChild(
            $(
              '<span class="pull-right" title="Draw First game"><img src="/img/icon-coins.png"></span>'
            )
          );
      });
    }
    if (currentLocation.match(/player\/\d+\/[^/]+\/(posts)|(comments)\//)) {
      $('.forum-thread-starter', true).forEach(threadStarter => {
        const vue = threadStarter.childNodes[0].__vue__;
        if (vue) {
          const time = threadStarter.querySelector('a.text-muted').firstChild;
          time.textContent = `${time.textContent.trim()}, ${formatTimestamp(
            vue.comment_date * 1000
          )}`;
          if (vue.edit_date > 0) {
            const element = time.parentNode.parentNode.querySelector(
              'span[rel="tooltip"]'
            );
            const text = `${element.title}, ${formatTimestamp(
              vue.edit_date * 1000
            ).replace(/ /g, '\u00A0')}`;
            element.setAttribute('title', text);
          }
        }
        const postLink = threadStarter.querySelector(
          '.add-margin-top small.text-muted'
        );
        const created = postLink.textContent.match(/^\s*Created/);
        const commented = postLink.textContent.match(/^\s*Commented/);
        const prefix = commented
          ? 'Comment in the game'
          : created
          ? 'New thread'
          : 'Reply in';
        const prefixeTitle = $(`<h4 class="anbt_threadtitle">${prefix}: </h4>`);
        const thread = postLink.querySelector('a');
        prefixeTitle.appendChild(thread);
        threadStarter.insertAdjacentHTML('afterbegin', prefixeTitle.outerHTML);
        postLink.parentNode.parentNode.removeChild(postLink.parentNode);
      });
    }
  }

  function escapeHTML(value) {
    return value
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function addGroup(name, settings) {
    const controlGroup = $('<div class="control-group"></div>');
    controlGroup.appendChild($(`<label class="control-label">${name}</label>`));
    settings.forEach(setting => {
      const value = options[setting[0]];
      const [name, type, description] = setting;
      const controls = $('<div class="controls"></div>');
      if (type === 'boolean') {
        controls.appendChild(
          $(
            `<label><input type="checkbox" id="anbt_${name}" name="${name}" value="1" ${
              value ? 'checked="checked"' : ''
            }"> ${description}</label>`
          )
        );
      } else if (type === 'number') {
        $(
          `<b>${description}:</b><input class="form-control" type="text" data-subtype="number" name="${name}" value="${escapeHTML(
            value || 0
          )}">`
        ).forEach(node => controls.appendChild(node));
      } else if (type === 'longstr') {
        $(
          `<b>${description}:</b><textarea class="form-control" name="${name}">${escapeHTML(
            value
          )}</textarea>`
        ).forEach(node => controls.appendChild(node));
      } else {
        $(
          `<b>${description}:</b><input class="form-control" type="text" name="${name}" value="${escapeHTML(
            value
          )}">`
        ).forEach(node => controls.appendChild(node));
      }
      controlGroup.appendChild(controls);
    });
    return controlGroup;
  }

  function fadeIn(element, duration = 400) {
    element.style.display = 'inline';
    duration = duration === 'slow' ? 600 : duration;
    element.style.opacity = element.style.opacity
      ? parseFloat(element.style.opacity) + 0.1
      : 0.2;
    if (parseFloat(element.style.opacity) > 1) {
      element.style.opacity = 1;
    } else {
      setTimeout(() => {
        fadeIn(element, duration);
      }, duration / 10);
    }
  }

  function loadScriptSettings() {
    const localOptions = getLocalStorageItem('gpe_anbtSettings', null);
    if (!localOptions) return;
    for (const option in localOptions) {
      window.options[option] = localOptions[option];
    }
  }

  function updateScriptSettings({ currentTarget: theForm }) {
    const result = {};
    theForm.querySelectorAll('input,textarea').forEach(fromField => {
      if (fromField.type === 'checkbox') {
        result[fromField.name] = fromField.checked ? 1 : 0;
      } else if (fromField.getAttribute('data-subtype') === 'number') {
        result[fromField.name] = parseFloat(fromField.value) || 0;
      } else {
        result[fromField.name] = fromField.value;
      }
    });
    localStorage.setItem('gpe_anbtSettings', JSON.stringify(result));
    loadScriptSettings();
    fadeIn($('#anbtSettingsOK'), 'slow');
    setTimeout(() => {
      fadeOut($('#anbtSettingsOK'), 'slow');
    }, 800);
  }

  const { user, repository, branch } = consts_git;
  function betterSettings() {
    const theForm = $(
      '<form class="regForm form-horizontal settingsForm" action="#"></form>'
    );
    theForm.appendChild($('<legend>ANBT script settings</legend>'));
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
    );
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
          'timeOutSound',
          'boolean',
          'Warning sound when only a minute is left (normal games)'
        ],
        [
          'timeOutSoundBlitz',
          'boolean',
          'Warning sound when only 5 seconds left (blitz)'
        ],
        ['timeOutSoundVolume', 'number', 'Volume of the warning sound, in %'],
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
    );
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
          'autoPlay',
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
    );
    theForm.appendChild(
      addGroup('Advanced', [
        [
          'newCanvasCSS',
          'longstr',
          `Custom CSS for new canvas (experimental, <a href="https://github.com/${user}/${repository}/tree/${branch}/newcanvas_styles">get styles here</a>)`
        ],
        [
          'forumHiddenUsers',
          'longstr',
          'Comma-separated list of user IDs whose forum posts are hidden'
        ]
      ])
    );
    $(
      '<br><div class="control-group"><div class="controls"><input name="submit" type="submit" class="btn btn-primary settingsFormSubmit" value="Apply"> <b id="anbtSettingsOK" class="label label-theme_holiday" style="display:none">Saved!</b></div></div>'
    ).forEach(node => theForm.appendChild(node));
    $('#main').insertAdjacentHTML('afterbegin', theForm.outerHTML);
    $('.settingsForm').addEventListener('submit', updateScriptSettings);
    const location = $('input[name="location"]');
    if (location) location.setAttribute('maxlength', '65');
  }

  function betterStore() {
    const storeSections = $('.grid-store');
    if (!storeSections) return;
    storeSections.shift();
    storeSections.forEach(section => {
      const buySections = section.querySelectorAll(
        '.grid-store-btn>.btn-group'
      );
      buySections.forEach(buySection => {
        const buttonGrid = buySection.parentElement;
        const paletteTitle = buttonGrid.parentElement
          .querySelector('.text-title')
          .textContent.trim();
        if (paletteTitle === 'Roulette') return;
        const tryButton = document.createElement('a');
        tryButton.classList.add('btn', 'btn-buy');
        tryButton.innerHTML = '<i class="fas fa-palette"></i> Test it';
        const colours = [
          ...buttonGrid.parentElement.querySelector('.colors-holder').children
        ].map(color =>
          color.style.background
            .match(/\d{1,3}/g)
            .map(colorCode => parseInt(colorCode, 10))
            .map((value, index) =>
              index < 3 ? ('0' + value.toString(16)).slice(-2) : ''
            )
            .join('')
        );
        tryButton.href = `https://drawception.com/sandbox/?palette=${colours.join()}`;
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('btn-group');
        buttonGroup.appendChild(tryButton);
        buttonGrid.insertBefore(buttonGroup, buySection);
      });
    });
    addStyle(
      '@media screen and (min-width:768px) and (max-width:1279px){.grid-store-btn{display:flex;flex-direction:column;align-items:center}.btn-group-justified>.btn,.btn-group-justified>.btn-group,.btn-group-justified>div{width:100%}.btn-group>.btn{border-radius:.2em!important}}'
    );
  }

  const betterPages = {
    betterCreate,
    betterForums,
    betterGame,
    betterPanel,
    betterPlayer,
    betterSettings,
    betterStore
  };

  function bold(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = new RegExp(
      `\\*\\*(${selection.replace(/\*/g, '')})\\*\\*`
    );
    if (selection.match(selRegex)) {
      selection = selection.replace(selRegex, '$1');
    } else if (selectionStart > 0 && selectionEnd < length) {
      if (
        value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)
      ) {
        selectionStart--;
        selectionEnd++;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else if (
        value.substring(selectionStart - 2, selectionEnd + 2).match(selRegex)
      ) {
        selectionStart -= 2;
        selectionEnd += 2;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else {
        selection = selection.match(/\*\*.+\*\*/g)
          ? selection.replace(/\*\*/g, '')
          : `**${selection.replace(/\n/g, '**\n**')}**`;
      }
    } else {
      if (
        !selectionStart &&
        value.substring(selectionStart, selectionEnd + 1).match(selRegex)
      ) {
        selectionEnd++;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else if (
        selectionEnd === length &&
        value.substring(selectionStart - 1, selectionEnd).match(selRegex)
      ) {
        selectionStart--;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else {
        selection = selection.match(/\*\*.+\*\*/g)
          ? selection.replace(/\*\*/g, '')
          : `**${selection.replace(/\n/g, '**\n**')}**`;
      }
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  function code(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = /^ {4}(.*)/gm;
    if (selection.match(selRegex)) {
      selection = selection.replace(/^ {4}/gm, '');
    } else if (
      selectionStart === 0 ||
      value.substring(selectionStart - 1, selectionEnd).match(/\n.*/gm)
    ) {
      if (selection.match(/^ {4}/gm)) {
        selection = selection.replace(/^ {4}/gm, '');
      } else {
        selection = `${
          selectionStart === 0
            ? ''
            : value.substring(selectionStart - 1, selectionEnd).match(/^\n/)
            ? '\n'
            : '\n\n'
        }    ${selection.replace(/\n/g, '\n    ')}`;
      }
    } else {
      selection = `${
        value.substring(selectionStart - 1, selectionEnd).match(/^\n/)
          ? '\n'
          : '\n\n'
      }    ${selection.replace(/\n^(.*)/gm, '\n    $1')}${
        value.substring(selectionEnd, selectionEnd + 1).match(/\n/) ? '' : '\n'
      }`;
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  function heading(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = /^#+ .*/gm;
    if (selection.match(selRegex)) {
      selection = selection.replace(/^# /gm, '');
      if (selection.match(/^#{2,} /gm)) {
        selection.replace(/(^#*)# /gm, '$1 ');
      }
    } else if (
      !selectionStart ||
      value.substring(selectionStart - 1, selectionEnd).match(/\n.*/gm)
    ) {
      selection = `${
        value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
        !selectionStart
          ? ''
          : '\n'
      }###### ${selection.replace(/\n/g, '\n###### ')}`;
    } else if (
      value.substring(selectionStart - 1, selectionEnd).match(selRegex)
    ) {
      selectionStart -= 4;
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/(^#*)# /gm, '$1 ');
    } else if (
      value.substring(selectionStart - 2, selectionEnd).match(selRegex)
    ) {
      selectionStart -= 5;
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/(^#*)# /gm, '$1 ');
    } else {
      selection = `\n###### ${selection.replace(/\n/g, '\n###### ')}`;
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  function highlighter(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = new RegExp(`\`(${selection.replace(/`/g, '')})\``);
    if (selection.match(selRegex)) {
      selection = selection.replace(selRegex, '$1');
    } else if (selectionStart > 0 && selectionEnd < length) {
      if (
        value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)
      ) {
        selectionStart--;
        selectionEnd++;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else {
        selection = selection.match(/`.+`/g)
          ? selection.replace(/`/g, '')
          : `\`${selection.replace(/\n/g, '`\n`')}\``;
      }
    } else {
      if (
        !selectionStart &&
        value.substring(selectionStart, selectionEnd + 1).match(selRegex)
      ) {
        selectionEnd++;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else if (
        selectionEnd === length &&
        value.substring(selectionStart - 1, selectionEnd).match(selRegex)
      ) {
        selectionStart--;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else {
        selection = selection.match(/`.+`/g)
          ? selection.replace(/`/g, '')
          : `\`${selection.replace(/\n/g, '`\n`')}\``;
      }
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  function image(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = /!\[(.*)\]\((\S*)( ".*")?\)/;
    if (selection.match(selRegex)) {
      textarea.value =
        value.substring(0, selectionStart) +
        selection.replace(selRegex, '$1 $2') +
        value.substring(selectionEnd, length);
    } else {
      let link = '';
      if (!selection.match(/\[(.*)\]\((\S*)( ".*")?\)/)) {
        link = selection.match(/https?:\/\/\S*/) || '';
        selection = selection.replace(link[0], '').replace(/ +/g, ' ').trim();
      } else {
        selection = '';
      }
      const divModal = $(
        `<div class="v--modal-overlay scrollable overlay-fade-enter-active" style="opacity: 0" id="markdown"><div class="v--modal-background-click"><div class="v--modal-top-right"></div><div class="v--modal-box v--modal" style="top: 89px; left: 240px; width: 800px; height: auto;"><div style="padding: 30px;"><button type="button" class="close">×</button><h4 class="clear-top">Markdown informations box</h4><hr><div><h4 class="clear-top">Text:</h4><input id="markdown-text" type="text" placeholder="Insert text here" class="form-control input-lg input-prompt"><h4>Link:</h4><input id="markdown-link" type="text" placeholder="Insert link here" class="form-control input-lg input-prompt"><h4>Hover message:</h4><input id="markdown-hover" type="text" placeholder="Message when hover the link (optional)" class="form-control input-lg input-prompt"></div><hr><p class="text-center clear-bot"><button type="button" id="markdown-done" class="btn btn-default">Done</button></p></div></div></div></div>`
      );
      $('.navbar-header>div:last-child').append(divModal);
      setTimeout(() => {
        document.body.classList.add('v--modal-block-scroll');
        $('#markdown').style.opacity = 1;
      }, 1);
      $('#markdown-text').value = selection ? selection : '';
      $('#markdown-link').value = link ? link[0] : '';
      $('.close').addEventListener('click', () => {
        document.body.classList.remove('v--modal-block-scroll');
        $('#markdown').outerHTML = '';
      });
      $('#markdown-done').addEventListener('click', () => {
        const tag = `![${$('#markdown-text').value}](${
          $('#markdown-link').value
        }${
          $('#markdown-hover').value ? ` "${$('#markdown-hover').value}"` : ''
        })`;
        selection = value.substring(selectionStart, selectionEnd);
        textarea.value =
          value.substring(0, selectionStart) +
          (selection.match(/\[(.*)\]\((\S*)( ".*")?\)/)
            ? selection.replace(/\[.*\]/, `[${tag}]`)
            : tag) +
          value.substring(selectionEnd, length);
        document.body.classList.remove('v--modal-block-scroll');
        $('#markdown').outerHTML = '';
      });
    }
  }

  function italic(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = new RegExp(
      `\\*(?=\\S*${selection.replace(
        /(.*)\*(.*)/g,
        ''
      )})((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)`
    );
    const italicRegex =
      /\*(?=\S)((?:\*\*|\\[\s\S]|\s+(?:\\[\s\S]|[^\s\*\\]|\*\*)|[^\s\*\\])+?)\*(?!\*)/g;
    if (selection.match(selRegex)) {
      selection = selection.replace(selRegex, '$1');
    } else if (selectionStart > 0 && selectionEnd < length) {
      if (
        value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)
      ) {
        selectionStart--;
        selectionEnd++;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else {
        selection = selection.match(italicRegex)
          ? selection.replace(italicRegex, '$1')
          : `*${selection.replace(/\n/g, '*\n*')}*`;
      }
    } else {
      if (
        !selectionStart &&
        value.substring(selectionStart, selectionEnd + 1).match(selRegex)
      ) {
        selectionEnd++;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else if (
        selectionEnd === length &&
        value.substring(selectionStart - 1, selectionEnd).match(selRegex)
      ) {
        selectionStart--;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else {
        selection = selection.match(italicRegex)
          ? selection.replace(italicRegex, '$1')
          : `*${selection.replace(/\n/g, '*\n*')}*`;
      }
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  function link(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = /^(?!!)\[(.*)\]\((\S*)( ".*")?\)/;
    if (selection.match(selRegex)) {
      textarea.value =
        value.substring(0, selectionStart) +
        selection.replace(selRegex, '$1 $2') +
        value.substring(selectionEnd, length);
    } else {
      let imageLink = '';
      if (!selection.match(/!\[(.*)\]\((\S*)( ".*")?\)/)) {
        imageLink = selection.match(/https?:\/\/\S*/) || '';
        selection = selection
          .replace(imageLink[0], '')
          .replace(/ +/g, ' ')
          .trim();
      }
      const divModal = $(
        `<div class="v--modal-overlay scrollable overlay-fade-enter-active" style="opacity: 0" id="markdown"><div class="v--modal-background-click"><div class="v--modal-top-right"></div><div class="v--modal-box v--modal" style="top: 89px; left: 240px; width: 800px; height: auto;"><div style="padding: 30px;"><button type="button" class="close">×</button><h4 class="clear-top">Markdown informations box</h4><hr><div><h4 class="clear-top">Text:</h4><input id="markdown-text" type="text" placeholder="Insert text here" class="form-control input-lg input-prompt"><h4>Link:</h4><input id="markdown-link" type="text" placeholder="Insert link here" class="form-control input-lg input-prompt"><h4>Hover message:</h4><input id="markdown-hover" type="text" placeholder="Message when hover the link (optional)" class="form-control input-lg input-prompt"></div><hr><p class="text-center clear-bot"><button type="button" id="markdown-done" class="btn btn-default">Done</button></p></div></div></div></div>`
      );
      $('.navbar-header>div:last-child').append(divModal);
      setTimeout(() => {
        document.body.classList.add('v--modal-block-scroll');
        $('#markdown').style.opacity = 1;
      }, 1);
      $('#markdown-text').value = selection ? selection : '';
      $('#markdown-link').value = imageLink ? imageLink[0] : '';
      $('.close').addEventListener('click', () => {
        document.body.classList.remove('v--modal-block-scroll');
        $('#markdown').outerHTML = '';
      });
      $('#markdown-done').addEventListener('click', () => {
        selection = `[${$('#markdown-text').value}](${
          $('#markdown-link').value
        }${
          $('#markdown-hover').value ? ` "${$('#markdown-hover').value}"` : ''
        })`;
        textarea.value =
          value.substring(0, selectionStart) +
          selection +
          value.substring(selectionEnd, length);
        document.body.classList.remove('v--modal-block-scroll');
        $('#markdown').outerHTML = '';
      });
    }
  }

  function listOl(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = /^( {3})*\d+\. (.*)/gm;
    if (selection.match(selRegex)) {
      selection = selection.match(/^ {3}/)
        ? selection.replace(/^ {3}/gm, '')
        : selection.replace(/^\d+\. /gm, '');
    } else if (
      !selectionStart ||
      value.substring(selectionStart - 1, selectionEnd).match(/^\n.*/)
    ) {
      let countOl = 0;
      selection = `${
        value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
        !selectionStart
          ? ''
          : '\n'
      }0. ${selection.replace(/\n/g, () => {
        countOl++;
        return `\n${countOl}. `;
      })}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/)
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`;
    } else if (
      value
        .substring(selectionStart - 4, selectionEnd)
        .match(/( {3})*\d+\. (.*)/)
    ) {
      selectionStart -= 4;
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/( {3})*(\d+\.) /g, '   $1$2 ');
    } else if (
      value
        .substring(selectionStart - 5, selectionEnd)
        .match(/( {3})*\d+\. (.*)/)
    ) {
      selectionStart -= 5;
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/( {3})*(\d+\.) /g, '   $1$2 ');
    } else {
      let countOl = 0;
      selection = `\n0. ${selection.replace(/\n/g, () => {
        countOl++;
        return `\n${countOl}. `;
      })}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/) ||
        selectionEnd === length
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`;
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  function listUl(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = /^( {3})*- (.*)/;
    if (selection.match(selRegex)) {
      selection = selection.match(/^ {3}/)
        ? selection.replace(/^ {3}/gm, '')
        : selection.replace(/^- /gm, '');
    } else if (
      !selectionStart ||
      value.substring(selectionStart - 1, selectionEnd).match(/^\n.*/)
    ) {
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
      }`;
    } else if (
      value.substring(selectionStart - 1, selectionEnd).match(selRegex)
    ) {
      selectionStart--;
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/( {3})*- /g, '$1   - ');
    } else if (
      value.substring(selectionStart - 2, selectionEnd).match(selRegex)
    ) {
      selectionStart -= 2;
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/( {3})*- /g, '$1   - ');
    } else {
      selection = `\n- ${selection.replace(/\n/g, '\n- ')}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/) ||
        selectionEnd === length
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`;
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  function quoteRight(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = /^>+\s.*/gm;
    if (selection.match(selRegex)) {
      selection = selection.match(/^> /gm)
        ? selection.replace(/^> /gm, '')
        : selection.replace(/(^>*)> /gm, '$1 ');
    } else if (
      !selectionStart ||
      value.substring(selectionStart - 1, selectionEnd).match(/^\n.*/)
    ) {
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
      }`;
    } else if (
      value.substring(selectionStart - 1, selectionEnd).match(selRegex)
    ) {
      selectionStart--;
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/(^>*)\s/gm, '$1> ');
    } else if (
      value.substring(selectionStart - 2, selectionEnd).match(selRegex)
    ) {
      selectionStart -= 2;
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(/(^>*)\s/gm, '$1> ');
    } else {
      selection = `\n> ${selection.replace(/\n/g, '\n> ')}${
        value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/) ||
        selectionEnd === length
          ? ''
          : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
          ? '\n'
          : '\n\n'
      }`;
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  function strikethrough(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  ) {
    const selRegex = /~~((.*\W?)*)~~/;
    if (selection.match(selRegex)) {
      selection = selection.replace(selRegex, '$1');
    } else if (selectionStart > 0 && selectionEnd < length) {
      if (selection.match(selRegex)) {
        selection.replace(selRegex, '$1');
      } else if (
        value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)
      ) {
        selectionStart--;
        selectionEnd++;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else if (
        value.substring(selectionStart - 2, selectionEnd + 2).match(selRegex)
      ) {
        selectionStart -= 2;
        selectionEnd += 2;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else {
        selection = selection.match(/~~.+~~/g)
          ? selection.replace(/~~/g, '')
          : `~~${selection}~~`;
      }
    } else {
      if (
        !selectionStart &&
        value.substring(selectionStart, selectionEnd + 1).match(selRegex)
      ) {
        selectionEnd++;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else if (
        selectionEnd === length &&
        value.substring(selectionStart - 1, selectionEnd).match(selRegex)
      ) {
        selectionStart--;
        selection = value
          .substring(selectionStart, selectionEnd)
          .replace(selRegex, '$1');
      } else {
        selection = selection.match(/~~.+~~/g)
          ? selection.replace(/~~/g, '')
          : `~~${selection}~~`;
      }
    }
    textarea.value =
      value.substring(0, selectionStart) +
      selection +
      value.substring(selectionEnd, length);
  }

  const markdown = {
    bold: {
      title: 'bold text',
      execute: bold
    },
    italic: {
      title: 'italic text',
      execute: italic
    },
    heading: {
      title: 'enlarges/reduces the text',
      execute: heading
    },
    strikethrough: {
      title: 'strikethrough text',
      execute: strikethrough
    },
    highlighter: {
      title: 'highlighted text',
      execute: highlighter
    },
    'list-ul': {
      title: 'unordered list',
      execute: listUl
    },
    'list-ol': {
      title: 'ordered list',
      execute: listOl
    },
    'quote-right': {
      title: 'quote',
      execute: quoteRight
    },
    code: {
      title: 'block of code',
      execute: code
    },
    link: {
      title: 'insert link',
      execute: link
    },
    image: {
      title: 'insert image',
      execute: image
    }
  };

  function getSelectedText(event) {
    const textarea = $('#input-comment');
    const { value, selectionStart, selectionEnd } = textarea;
    const { length } = value;
    const selection = value.substring(selectionStart, selectionEnd);
    markdown[`${event.currentTarget.id}`].execute(
      value,
      length,
      selectionStart,
      selectionEnd,
      selection,
      textarea
    );
  }

  function addMarkdownTools() {
    const textarea = $('#input-comment');
    if (!textarea) return;
    const markdownDiv = $('<div id="markdown-editor"></div>');
    Object.keys(markdown).forEach(toolName =>
      markdownDiv.appendChild(
        $(
          `<div id="${toolName}" class="test-markdown fas fa-${toolName} btn btn-default" title="${markdown[toolName].title}"></div>`
        )
      )
    );
    textarea.insertAdjacentHTML('beforebegin', markdownDiv.outerHTML);
    [...$('#markdown-editor').children].forEach(children =>
      children.addEventListener('click', getSelectedText)
    );
  }

  function toggleLight() {
    if (options.anbtDarkMode) {
      const inDark = getLocalStorageItem('gpe_inDark', 0);
      if (!inDark) {
        const css = document.createElement('style');
        css.id = 'darkgraycss';
        css.type = 'text/css';
        css.appendChild(
          document.createTextNode(getLocalStorageItem('gpe_darkCSS'))
        );
        document.head.appendChild(css);
      } else {
        document.head.removeChild(document.getElementById('darkgraycss'));
      }
      localStorage.setItem('gpe_inDark', `${inDark ? 0 : 1}`);
    } else {
      if (document.body.classList.contains('theme-night')) {
        document.body.classList.remove('theme-night');
        setCookie('theme-night');
      } else {
        document.body.classList.add('theme-night');
        setCookie('theme-night', 1, 365);
      }
    }
  }

  function getNotifications() {
    if (window.notificationsOpened) return;
    $('#user-notify-list').innerHTML =
      '<img src="/img/loading.gif" alt="Loading...."/>';
    const request = new XMLHttpRequest();
    request.open('GET', '/notification/view/');
    request.onload = () => {
      if (request.status === 200) $('#user-notify-count').textContent = '0';
      $('#user-notify-list').innerHTML = request.responseText;
      window.notificationsOpened = true;
    };
  }

  function pageEnhancements() {
    loadScriptSettings();
    if (typeof DrawceptionPlay === 'undefined') return;
    if (document.getElementById('newcanvasyo')) return;
    try {
      const temporaryUserLink = $('.player-dropdown a[href^="/player/"]');
      const username = temporaryUserLink.querySelector('strong').textContent;
      const userId = temporaryUserLink.href.match(/\/player\/(\d+)\//)[1];
      localStorage.setItem('gpe_lastSeenName', username);
      localStorage.setItem('gpe_lastSeenId', userId);
    } catch (e) {}
    const currentPage = location.href.match(/drawception\.com\/([^/]+)/);
    if (currentPage) {
      const page = currentPage[1];
      const pageName = `better${page.replace(page[0], page[0].toUpperCase())}`;
      if (betterPages[pageName]) betterPages[pageName]();
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
        '#header-bar-container {position: relative; width: 100%; top: 6.4rem}' +
        '.wrapper {position: relative; top: 6.4rem}' +
        'footer {position: relative; top: 6.4rem}' +
        '.option span:first-child {display: flex; flex-direction: row; justify-content: space-between}' +
        '.grid-settings div[class^="grid-"] label {display: inline-flex}' +
        'input[type="checkbox"], input[type="radio"] {margin:4px 4px 0 0}' +
        '@-moz-document url-prefix() {input[type="checkbox"], input[type="radio"] {margin:0 4px 0 0}}' +
        '.tooltip {z-index: 3000;}' +
        '.bg-color {position: relative; width: 100%; top: 6.4rem}' +
        '.text-right > a[href*="store"] {margin-top: 1rem}'
    );
    if (options.maxCommentHeight) {
      const maxHeight = options.maxCommentHeight;
      addStyle(
        `.comment-holder[id]:not(:target) .comment-body {overflow-y: hidden; max-height: ${maxHeight}px; position:relative}.comment-holder[id]:not(:target) .comment-body:before{content: 'Click to read more'; position:absolute; width:100%; height:50px; left:0; top:${
          maxHeight - 50
        }px;text-align: center; font-weight: bold; color: #fff; text-shadow: 0 0 2px #000; padding-top: 20px; background:linear-gradient(transparent, rgba(0,0,0,0.4))}`
      );
      $('.comment-body', true).forEach(comment =>
        comment.addEventListener('click', () => {
          if (
            comment.clientHeight > maxHeight - 50 &&
            location.hash.indexOf(comment) === -1
          )
            location.hash = `#${comment.parentNode.parentNode.id}`;
        })
      );
    }
    if (options.useOldFontSize) document.body.style.fontSize = '15px';
    if (options.useOldFont) {
      const nunito = $("link[href*='Nunito']");
      nunito.parentNode.removeChild(nunito);
      addStyle(
        "@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap')"
      );
    }
    if (options.anbtDarkMode) {
      if (document.body.classList.contains('theme-night')) {
        document.body.classList.remove('theme-night');
        setCookie('theme-night');
      }
    }
    if (options.markdownTools) addMarkdownTools();
    if (options.newCanvas) {
      const inSandbox = location.href.match(
        /drawception\.com\/sandbox\/#?(.*)/
      );
      const inPlay = location.href.match(
        /drawception\.com\/(:?contests\/)?play\/(.*)/
      );
      const hasCanvas = document.getElementById('canvas-holder');
      const hasCanvasOrGameForm = document.querySelector('.playtimer');
      const captionContest =
        location.href.match(/contests\/play\//) && !hasCanvas;
      if ((!captionContest && inSandbox) || (inPlay && hasCanvasOrGameForm)) {
        setTimeout(() => setupNewCanvas(), 1);
        return;
      }
      $('a[href^="/sandbox/"]', true).forEach(sandboxButton =>
        sandboxButton.addEventListener('click', event => {
          if (event.which === 2) return;
          event.preventDefault();
          setupNewCanvas(true, event.currentTarget.href);
        })
      );
      $('a[href="/play/"]', true).forEach(playButton =>
        playButton.addEventListener('click', event => {
          if (event.which === 2) return;
          event.preventDefault();
          setupNewCanvas(false, event.currentTarget.href);
        })
      );
    }
    const navToggle = $('.navbar-toggle');
    if (navToggle) {
      const navbarToggle = navToggle.parentNode;
      const navbarButtonsList = [
        '<span class="gpe-wide gpe-spacer"></span>',
        '<a href="/sandbox/" title="Sandbox" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#5A5"><span class="fas fa-edit" style="color:#BFB" /></a>',
        '<a href="/browse/all-games/" title="Browse Games" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-folder-open" /></a>',
        '<a href="/contests/" title="Contests" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-trophy" /></a>',
        '<a href="#" title="Toggle light" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item toggle-light" style="background:#AA5"><span class="fas fa-eye" style="color:#FFB" /></a>',
        '<a href="/faq/" title="FAQ" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-question-circle " /></a>',
        '<a href="/forums/" title="Forums" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#55A"><span class="fas fa-comments" style="color:#BBF" /></a>',
        '<a href="/search/" title="Search" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-search" /></a>',
        '<a href="/dashboard/" title="Dashboard" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-bell" /></a>',
        `${
          $('a[href^="/secretus/"]')
            ? '<a href="/secretus/" title="Feed" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-mask" /></a>'
            : ''
        }`,
        '<a href="/settings/" id="menusettings" title="Settings" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-cog" /></a>',
        '<a href="/logout" title="Log Out" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#A55"><span class="fas fa-sign-out-alt" style="color:#FBB" /></a>'
      ];
      navbarButtonsList.forEach(button =>
        button.length > 0 ? navbarToggle.appendChild($(button)) : button
      );
      $('#main-menu').insertAdjacentHTML(
        'afterbegin',
        '<a href="#" class="list-group-item toggle-light"><span class="fas fa-eye"></span> Toggle light</a>'
      );
    }
    const lightButton = $('.toggle-light');
    if (lightButton)
      lightButton.forEach(button =>
        button.addEventListener('click', toggleLight)
      );
    const menuPlayer = $('.btn-menu-player');
    if (menuPlayer) {
      const userLink = $('.player-dropdown a[href^="/player/"]').href;
      const userAvatar = $('.btn-menu-player').innerHTML;
      const element = $(
        `<a href="${userLink}" title="View Profile" class="gpe-wide-block navbar-btn navbar-user-item" style="margin-top:8px">${userAvatar}</a>`
      );
      menuPlayer.parentNode.appendChild(element);
    }
    const number =
      $('#user-notify-count') && $('#user-notify-count').textContent.trim();
    addStyle(
      `#user-notify-list .list-group .list-group-item .fas {color: #888}#user-notify-list .list-group .list-group-item:nth-child(-n+${number}) .fas {color: #2F5}a.wrong-order {color: #F99} div.comment-holder:target {background-color: #DFD}.comment-new a.text-muted:last-child:after {content: 'New'; color: #2F5; font-weight: bold; background-color: #183; border-radius: 9px; display: inline-block; padding: 0px 6px; margin-left: 10px;}`
    );
    window.getNotifications = getNotifications;
    let versionDisplay = `ANBT v${versions.scriptVersion}`;
    try {
      const appVersion = $('script[src^="/build/app"]').src.match(
        /(\w+)\.js$/
      )[1];
      const runtimeVer = $('script[src^="/build/runtime"]').src.match(
        /(\w+)\.js$/
      )[1];
      versionDisplay += ` | app ${appVersion}`;
      if (appVersion !== versions.siteVersion) versionDisplay += '*';
      versionDisplay += ` | runtime ${runtimeVer}`;
      if (runtimeVer !== versions.runtimeVersion) versionDisplay += '*!!!';
    } catch (e) {}
    const wrapperSection = $('.wrapper');
    if (wrapperSection)
      wrapperSection.appendChild(
        $(`<div id="anbtver">${versionDisplay}</div>`)
      );
    const linkList = [
      '<li><a href="/forums/-/11830/-/">ANBT script</a></li>',
      '<li><a href="http://drawception.wikia.com/">Wiki</a></li>',
      '<li><a href="http://chat.grompe.org.ru/#drawception">Chat</a> (<a href="https://discord.gg/CNd5KTJ">Discord</a>)</li>'
    ];
    const footerLists = $('.footer-main .list-unstyled');
    if (footerLists)
      footerLists.forEach((list, index) =>
        list.appendChild($(linkList[index]))
      );
  }

  function wrapper() {
    window.options = options;
    const mark = document.createElement('b');
    mark.id = '_anbt_';
    mark.style.display = 'none';
    document.body.appendChild(mark);
    if (window.DrawceptionPlay) return pageEnhancements();
    const loader = setInterval(() => {
      if (!window.DrawceptionPlay) return;
      pageEnhancements();
      clearInterval(loader);
    }, 100);
  }

  addDarkCSS();
  setDarkMode();
  if (document && document.body) {
    if (!document.getElementById('_anbt_')) wrapper();
    if (window.opera && !getLocalStorageItem('gpe_operaWarning', 0)) {
      const anbtTitle = document.createElement('h2');
      anbtTitle.innerHTML =
        'ANBT speaking:<br/>Rename your script file so it doesn\'t contain ".user." part for smoother loading!<br/>This warning is only shown once.';
      const mainSection = document.getElementById('main');
      mainSection.insertBefore(anbtTitle, mainSection.firstChild);
      localStorage.setItem('gpe_operaWarning', 1);
    }
  }
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      if (!document.getElementById('_anbt_')) wrapper();
    },
    false
  );
})();
