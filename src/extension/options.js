const options = {
  enableWacom: 0, // Whether to enable Wacom plugin and thus pressure sensitivity support
  fixTabletPluginGoingAWOL: 1, // Fix pressure sensitivity disappearing in case of stupid/old Wacom plugin
  hideCross: 0, // Whether to hide the cross when drawing
  enterToCaption: 0, // Whether to submit caption by pressing Enter
  pressureExponent: 0.5, // Smaller = softer tablet response, bigger = sharper
  backup: 1,
  timeoutSound: 0,
  timeoutSoundBlitz: 0,
  timeoutSoundVolume: 100,
  newCanvas: 1,
  proxyImgur: 0,
  ajaxRetry: 1,
  localeTimestamp: 0,
  autoplay: 1, // Whether to automatically start playback of a recorded drawing
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

export default options