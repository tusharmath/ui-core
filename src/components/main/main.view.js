/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import {h} from '@cycle/dom'
import css from './main.style'

const isMoving = STORE => {
  return STORE.select('animationState.touchStarted')
}
const params = (padding, touchStarted) => {
  return {
    class: {[css.touchStarted]: touchStarted},
    style: padding
  }
}
export default ({controls, STORE, padding$, header}) => {
  const touchStarted$ = isMoving(STORE)
  return O
    .combineLatest(
      padding$,
      header.DOM,
      touchStarted$,
      controls.DOM
    ).map(([padding, header, touchStarted, controls]) =>
      h(`div.flb.col`, params(padding, touchStarted), [
        header,
        controls
      ])
    )
}
