import bold from './functions/markdown/bold'
import code from './functions/markdown/code'
import heading from './functions/markdown/heading'
import highlighter from './functions/markdown/highlighter'
import image from './functions/markdown/image'
import italic from './functions/markdown/italic'
import link from './functions/markdown/link'
import listOl from './functions/markdown/listOl'
import listUl from './functions/markdown/listUl'
import quoteRight from './functions/markdown/quoteRight'
import strikethrough from './functions/markdown/strikethrough'

const markdown = {
  bold: {
    title: 'bold text',
    replace: bold
  },
  italic: {
    title: 'italic text',
    replace: italic
  },
  heading: {
    title: 'enlarges/reduces the text',
    replace: heading
  },
  strikethrough: {
    title: 'strikethrough text',
    replace: strikethrough
  },
  highlighter: {
    title: 'highlighted text',
    replace: highlighter
  },
  'list-ul': {
    title: 'unordered list',
    replace: listUl
  },
  'list-ol': {
    title: 'ordered list',
    replace: listOl
  },
  'quote-right': {
    title: 'quote',
    replace: quoteRight
  },
  code: {
    title: 'block of code',
    replace: code
  },
  link: {
    title: 'insert link',
    replace: link
  },
  image: {
    title: 'insert image',
    replace: image
  }
}

export default markdown
