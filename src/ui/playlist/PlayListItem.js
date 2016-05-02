/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../../Utils/Flexbox'
import Artwork from './Artwork'
import TrackDetail from './TrackDetail'
import SoundVisualizerIcon from './SoundVisualizerIcon'
import isTrackPlaying from '../../Utils/isTrackPlaying'
import * as T from '../../Utils/Themes'

const playListItemSTY = {
  fontSize: '1em',
  overflow: 'hidden'
}

const trackInfoSTY = {
  ...F.RowSpaceBetween,
  alignItems: 'center',
  color: T.font.primary,
  padding: '5px 0px'
}

// TODO: Move to isTrackPlaying function
const audioEvents = audio => Observable.merge(
  audio.events('pause').map('pause'),
  audio.events('playing').map('playing'),
  audio.events('play').map('play')
)

export default ({DOM, track, audio, selectedTrack$}, index) => {
  const {title, user, duration, artwork_url, id} = track
  const click$ = DOM.select('.playlist-item').events('click').map(track)
  const audio$ = audioEvents(audio)
  const selectedTrackId$ = selectedTrack$.pluck('id')
  const isTrackPlaying$ = isTrackPlaying({audio$, selectedTrackId$}, id)
    .startWith(false)
    .distinctUntilChanged()
    .map(play => play ? SoundVisualizerIcon : null)

  const trackStatus$ = isTrackPlaying$
    .map(icon => div({style: {position: 'relative', border: '1px solid #bbb'}}, [Artwork(artwork_url), icon]))

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