import gsap from 'gsap'
import Flip from './gsap/Flip'

import { stylesArray } from './stylesArray'

export default function flexProducts () {
  gsap.registerPlugin(Flip)
  const elements = document.querySelectorAll('.col')
  let device = 'desktop'

  function setupAnimation () {
    swapPosition('none')

    elements.forEach(item => {
      item.removeEventListener('mouseenter', flipIn)
      item.removeEventListener('click', flipIn)
      item.removeEventListener('mouseleave', flipOut)

      if (device === 'desktop') {
        item.addEventListener('mouseenter', flipIn)
        item.addEventListener('mouseleave', flipOut)
      } else {
        item.addEventListener('click', flipCheck)
      }
    })
  }

  function flipCheck (event) {
    if (event.target.classList.contains('product-full')) {
      flipOut(event)
    } else {
      flipIn(event)
    }
  }

  function flipIn (event) {
    const display = event.target.dataset.display
    const state = Flip.getState('.col')
    swapPosition(display)
    Flip.from(state, {
      ease: 'power1.out',
      duration: 0.8,
      absolute: true,
      nested: true
    })
  }

  function flipOut (event) {
    const state = Flip.getState('.col')
    swapPosition('none')
    Flip.from(state, {
      ease: 'power1.out',
      duration: 0.8,
      absolute: true,
      nested: true
    })
  }

  function swapPosition (display) {
    stylesArray[device][display].forEach(el => {
      document.querySelector('#' + el.column).style.gridArea = el.gridArea
      const productInner = document.querySelector('#' + el.column)
      productInner.className = 'col'
      productInner.classList.add(el.class)
    })
  }

  const mediaQueryMob = window.matchMedia('(max-width: 800px)')
  const mediaQueryTab = window.matchMedia('(min-width: 800px) and (max-width:1200px)')
  const mediaQueryFull = window.matchMedia('(min-width: 1200px)')

  function handleBreakChange (e, deviceType) {
    // Check if the media query is true
    if (e.matches) {
      device = deviceType
      setupAnimation()
    }
  }

  mediaQueryMob.addEventListener('change', function (e) {
    handleBreakChange(e, 'mobile')
  })
  mediaQueryTab.addEventListener('change', function (e) {
    handleBreakChange(e, 'tablet')
  })
  mediaQueryFull.addEventListener('change', function (e) {
    handleBreakChange(e, 'desktop')
  })

  if (mediaQueryMob.matches) {
    device = 'mobile'
    setupAnimation()
  } else if (mediaQueryTab.matches) {
    device = 'tablet'
    setupAnimation()
  } else {
    device = 'desktop'
    setupAnimation()
  }

}
