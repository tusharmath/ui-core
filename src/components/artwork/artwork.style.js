/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as S from '../../lib/StyleUtils'
import {BlockHeight, BlockSpace, Palette} from '../../lib/Themes'
import R from 'ramda'
import {row, jc_sb as jcsb} from 'flex-jss'
const animation = time => ({animation: `playing-animation ${time}ms infinite`})
export default create({
  container: {
    ...S.block(BlockHeight),
    margin: BlockSpace,
    backgroundColor: Palette.bg__artwork
  },
  playingAnimation: {
    ...S.size(17),
    extend: R.merge(row, jcsb),
    margin: 0,
    padding: 0,
    '& li': {
      display: 'block',
      backgroundColor: Palette.bg__artworkPlayingIcon,
      flexGrow: '1',
      transformOrigin: '0 100%',
      marginRight: '1px',
      '&:last-child': {marginRight: 0},
      '&:nth-child(1)': animation(1250),
      '&:nth-child(2)': animation(1000),
      '&:nth-child(3)': animation(750)
    },
    '&.no-animation': {
      '& li': {
        animation: 'none !important',
        transform: 'scaleY(0.1)'
      }
    },
    '&.pause-animation li': {animationPlayState: 'paused'}
  },
  '@keyframes playing-animation': {
    '0%': {transform: 'scaleY(0.1)'},
    '50%': {transform: 'scaleY(1)'},
    '100%': {transform: 'scaleY(0.1)'}
  },
  placeholder: {
    ...S.block(50),
    margin: BlockSpace,
    color: Palette.fg__artwork,
    backgroundColor: Palette.bg__artwork
  },
  artwork: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    backgroundSize: '100%',
    margin: `${BlockSpace}px`,
    ...S.size(50)
  }
})
