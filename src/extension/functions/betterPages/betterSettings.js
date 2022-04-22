import { $ } from '../selector'
import { addGroup } from '../settings/addGroup'
import { updateScriptSettings } from '../settings/updateScriptSettings'
import { git } from '../../../versionInfo';
const { user, repository, branch } = git;

export function betterSettings() {
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
      //["pressureExponent", "number", "Pressure exponent (smaller = softer tablet response, bigger = sharper)"],
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
  )
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
  )
  $(
    '<br><div class="control-group"><div class="controls"><input name="submit" type="submit" class="btn btn-primary settingsFormSubmit" value="Apply"> <b id="anbtSettingsOK" class="label label-theme_holiday" style="display:none">Saved!</b></div></div>'
  ).forEach(node => theForm.appendChild(node))
  $('#main').insertAdjacentHTML('afterbegin', theForm.outerHTML)
  $('.settingsForm').addEventListener('submit', updateScriptSettings)

  // Extend "location" input to max server-accepted 65 characters
  const location = $('input[name="location"]')
  if (location) location.setAttribute('maxlength', '65')
}
