/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import * as SC from '../../lib/SoundCloud'
import css from './home.style'
import Header from '../header/header'
import Playlist from '../playlist/playlist'
import HttpSelectBody from '../../lib/HttpSelectBody'

const view = ({playlist, header}) => O
  .combineLatest(header.DOM, playlist.DOM)
  .map(views => <div className={css(css.home, 'flexCol')}>{views}</div>)

const createTrendingTracksRequest = () => O.just({
  url: SC.toURI('/tracks', {}),
  category: 'trending-tracks'
})

export default ({HTTP, AUDIO, DOM, ROUTER}) => {
  const tracks$ = HttpSelectBody(HTTP, 'trending-tracks')
  const header = Header({DOM, ROUTER})
  const defaultTrack$ = tracks$.map(R.head)
  const playlist = Playlist({tracks$, defaultTrack$, AUDIO, DOM})
  playlist.selectedTrack$.subscribe(x => console.log('TODO: remove subscription', x))
  return {
    DOM: view({header, playlist}),
    HTTP: createTrendingTracksRequest(),
    AUDIO: O.merge(playlist.audio$),
    ROUTER: O.merge(header.ROUTER)
  }
}
