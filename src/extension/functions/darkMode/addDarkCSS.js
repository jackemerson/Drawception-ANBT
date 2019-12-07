export function addDarkCSS() {
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
      // We have entered specificity hell...
      'a.anbt_replaypanel:hover{color:#8af$}' +
      '.anbt_favedpanel{color:#d9534f$}' +
      // Some lamey compression method!
      ''
    )
      .replace(/~/g, 'background-color:')
      .replace(/\$/g, ' !important')
  )
}
