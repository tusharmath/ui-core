/**
 * Created by tushar.mathur on 06/08/16.
 */

'use strict'
import {getBCR} from './BoundingClientRect'

export default DOM => DOM
  .select(':root')
  .elements()
  .take(1)
  .map(getBCR)
