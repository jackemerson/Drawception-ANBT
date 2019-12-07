import './newcanvas/css/style.scss'
import { anbt } from './newcanvas/js/anbt'
import { bindEvents } from './newcanvas/js/functions/bindEvents'
import { ID } from './newcanvas/js/functions/idSelector'
import { needToGoDeeper } from './newcanvas/js/functions/needToGoDeeper'
import { updateTimer } from './newcanvas/js/functions/updateTimer'
import { globals } from './newcanvas/js/globals'

window.needToGoDeeper = needToGoDeeper
if (!window.options) window.options = {}
anbt.bindContainer(ID('svgContainer'))
bindEvents()
globals.timerStart = Date.now()
setInterval(updateTimer, 500)
if (window.anbtReady) window.anbtReady()
