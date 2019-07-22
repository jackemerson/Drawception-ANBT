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

export default markdown
