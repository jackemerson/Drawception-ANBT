import anbt from '../../anbt'
import makePng from '../anbt/makePng'
import uploadToImgur from '../anbt/uploadToImgur'
import ID from '../idSelector'
import warnStrokesAfterPosition from './warnStrokesAfterPosition'

const exportToImgur = event => {
  event.preventDefault()
  if (warnStrokesAfterPosition()) return
  ID('imgur').childNodes[0].nodeValue = 'Uploading...'
  ID('imgur').disabled = true
  makePng(600, 500, true)
  uploadToImgur(request => {
    ID('imgur').childNodes[0].nodeValue = 'Upload to imgur'
    ID('popup').classList.add('show')
    ID('popuptitle').childNodes[0].nodeValue = 'Imgur upload result'
    if (request && request.success) {
      anbt.unsaved = false
      //history.replaceState(null, null, "#" + r.data.id);
      ID('imgururl').href = `http://imgur.com/${request.data.id}`
      ID('imgururl').childNodes[0].nodeValue = 'Uploaded image'
      ID(
        'imgurdelete'
      ).href = `http://imgur.com/delete/${request.data.deletehash}`
      ID('imgurerror').childNodes[0].nodeValue = ''
      if (window.inForum)
        window.frameElement.ownerDocument.getElementById(
          'input-comment'
        ).value += `![](http://i.imgur.com/${request.data.id}.png)`
    } else {
      const error = request.data
        ? `Imgur error: ${request.data.error}`
        : `Error: ${request}`
      ID('imgurerror').childNodes[0].nodeValue = error
    }
    ID('imgur').disabled = false
  })
}

export default exportToImgur
