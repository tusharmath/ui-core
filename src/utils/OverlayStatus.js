'use strict'

import {Observable} from 'rxjs'
import R from 'ramda'

export const DEFAULT = -1
export const PLAYING = 0
export const PAUSED = 1

const isRequired = x => ['reallyPlaying', 'pause', 'loadStart', 'ended'].includes(x)
const status = R.curry((id, track) => track.id === id ? PAUSED : DEFAULT)
const toObj = R.map(R.zipObj(['status', 'track']))
export const getStatus$ = ({selectedTrackId$, audio$, tracks$}) => {
  const getStatus = ([event, id, tracks]) => tracks
    .map(track => {
      const isSelected = track.id === id
      if ([isSelected, event === 'reallyPlaying'].every(Boolean)) return {status: PLAYING, track}
      if ([isSelected, ['pause', 'loadStart'].includes(event)].every(Boolean)) return {status: PAUSED, track}
      return {status: DEFAULT, track}
    })

  const requiredAudio$ = audio$.pluck('event').filter(isRequired)
  const getInitialStatus = ([tracks, status]) => toObj(R.zip(status(tracks), tracks))
  const iniStatus$ = tracks$
    .combineLatest(selectedTrackId$.map(R.compose(R.map, status, R.nthArg(0))))
    .map(getInitialStatus).takeUntil(requiredAudio$)
  const status$ = Observable.combineLatest(requiredAudio$, selectedTrackId$, tracks$).map(getStatus)
  return Observable.merge(iniStatus$, status$)
}
