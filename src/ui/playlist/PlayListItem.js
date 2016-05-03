/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import Artwork from './Artwork'
import TrackDetail from './TrackDetail'
import SoundVisualizerIcon from './SoundVisualizerIcon'
import {Overlay} from './Models'
import * as T from '../../Utils/Themes'
import PausedSoundVisualization from './PausedSoundVisualization'

const playListItemSTY = {
  fontSize: '1em',
  overflow: 'hidden'
}

const trackInfoSTY = {
  ...F.RowSpaceBetween,
  alignItems: 'center',
  color: T.font.primary,
  borderBottom: '1px solid rgb(228, 228, 228)'
}
export default ({DOM, track, audio, selectedTrack$}, index) => {
  const {title, user, duration, artwork_url, id} = track
  const click$ = DOM.select('.playlist-item').events('click').map(track)
  const selectedTrackId$ = selectedTrack$.pluck('id')
  const status$ = Overlay({selectedTrackId$, audio, id})
  const animation$ = status$.filter(x => x === 'PLAY_ANIMATION').map(SoundVisualizerIcon)
  const pausedAnimation$ = status$.filter(x => x === 'PAUSE_ANIMATION').map(PausedSoundVisualization)
  const clearAnimation$ = status$.filter(x => x === 'SHOW_NONE').map(null)
  const overlayItem$ = Observable.merge(animation$, pausedAnimation$, clearAnimation$).startWith(div()).distinctUntilChanged()
  const trackStatus$ = overlayItem$
    .map(overlay => div({style: {position: 'relative'}}, [Artwork(artwork_url), overlay]))
  return {
    click$,
    DOM: trackStatus$.map(status =>
      div({className: 'playlist-item', style: {...playListItemSTY}}, [
        div({style: trackInfoSTY}, [
          status,
          TrackDetail({title, user, duration})
        ])
      ]))
  }
}
