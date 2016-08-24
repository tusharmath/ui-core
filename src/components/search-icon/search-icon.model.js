/**
 * Created by tushar.mathur on 24/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import Loader from '../loader/loader'
import uuid from '../../lib/uuid'

export const ICONS = {
  LOADER: 'loader',
  CLEAR: 'clear',
  SEARCH: 'search'
}

export const getIcon = (hasValue$, isLoading$) => {
  return O.combineLatest(
    hasValue$.startWith(false),
    isLoading$.startWith(false)
  )
    .map(([hasValue, isLoading]) => {
      if (isLoading) return ICONS.LOADER
      if (hasValue) return ICONS.CLEAR
      return ICONS.SEARCH
    })
    .distinctUntilChanged()
}

export const getIconDOM = (icon) => ({
  [ICONS.LOADER]: Loader(),
  [ICONS.CLEAR]: <x-icon-button key={uuid()} attrs-icon='close'/>,
  [ICONS.SEARCH]: <x-icon-button key={uuid()} attrs-icon='search'/>
})[icon]