/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import {h} from '@cycle/dom'
import R from 'ramda'
import {Observable as O} from 'rx'
import css from './sliding-tab.style'

const controlSTYLE = (tabs) => ({width: `${100 / tabs.length}%`})
const containerSTYLE = (tabs, selected) => ({
  transform: `translateX(${100 / tabs.length * selected}%)`
})
const contentSTYLE = (tabs, width, selected) => ({
  width: `${tabs.length * 100}%`,
  transform: `translateX(-${width * selected}px)`
})
const li = (name, i) => h(`li`, {attrs: {id: i}}, name)
const contentSectionItem = (content) => h(`li`, [content])

export const view = R.curry((hooks, width, selected, tabs, content) => {
  const rootParams = {
    hook: hooks.rootHooks
  }
  const contentParams = {
    style: contentSTYLE(tabs, width, selected),
    hook: hooks.contentHooks,
    on: {touchmove: hooks.onTouchMove}
  }
  const containerParams = {
    style: containerSTYLE(tabs, selected),
    hook: hooks.controlContainerHooks
  }
  return h(`div.sliding-tab`, rootParams, [
    h(`div.${css.navContainer}`, [
      h(`ul.nav-items`, tabs.map(li)),
      h(`div.control-container`, containerParams, [
        h(`div.control`, {style: controlSTYLE(tabs)})
      ])
    ]),
    h(`div.${css.contentSection}`, [
      h(`ul`, contentParams, content.map(contentSectionItem))
    ])
  ])
})

export default ({width$, selected$, tabs$, content$, hooks}) => {
  return O.combineLatest(width$, selected$, tabs$, content$, view(hooks))
}
