import { bold } from './functions/markdown/bold'
import { code } from './functions/markdown/code'
import { heading } from './functions/markdown/heading'
import { highlighter } from './functions/markdown/highlighter'
import { image } from './functions/markdown/image'
import { italic } from './functions/markdown/italic'
import { link } from './functions/markdown/link'
import { listOl } from './functions/markdown/listOl'
import { listUl } from './functions/markdown/listUl'
import { quoteRight } from './functions/markdown/quoteRight'
import { strikethrough } from './functions/markdown/strikethrough'

export const markdown = {
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
}
