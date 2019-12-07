import { addStyle } from '../addStyle'
import { $ } from '../selector'

export function betterStore() {
  const storeSections = $('.grid-store')
  if (!storeSections) return
  storeSections.shift()
  storeSections.forEach(section => {
    const buySections = section.querySelectorAll('.grid-store-btn>.btn-group')
    buySections.forEach(buySection => {
      const buttonGrid = buySection.parentElement
      const paletteTitle = buttonGrid.parentElement
        .querySelector('.text-title')
        .textContent.trim()
      if (paletteTitle === 'Roulette') return
      const tryButton = document.createElement('a')
      tryButton.classList.add('btn', 'btn-buy')
      tryButton.innerHTML = '<i class="fas fa-palette"></i> Test it'
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
      )
      tryButton.href = `https://drawception.com/sandbox/?palette=${colours.join()}`
      const buttonGroup = document.createElement('div')
      buttonGroup.classList.add('btn-group')
      buttonGroup.appendChild(tryButton)
      buttonGrid.insertBefore(buttonGroup, buySection)
    })
  })
  addStyle(
    '@media screen and (min-width:768px) and (max-width:1279px){.grid-store-btn{display:flex;flex-direction:column;align-items:center}.btn-group-justified>.btn,.btn-group-justified>.btn-group,.btn-group-justified>div{width:100%}.btn-group>.btn{border-radius:.2em!important}}'
  )
}
