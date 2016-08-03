/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import * as S from '../lib/StyleUtils'
import * as T from '../lib/Themes'

const playbackInfoSTY = {
  textTransform: 'capitalize',
  fontSize: '1em',
  fontWeight: '600',
  overflow: 'hidden',
  paddingRight: `${T.BlockSpace}px`
}
export default ({selectedTrack$}) => {
  return {
    DOM: selectedTrack$.map(track =>
      div({style: playbackInfoSTY}, [
        div({style: S.overflowEllipsisSTY}, [track.title]),
        div({style: {...S.overflowEllipsisSTY, fontSize: '0.8em', color: T.Pallete.primaryColorSecondaryFont}}, track.user.username)
      ])
    ).startWith(null)
  }
}
