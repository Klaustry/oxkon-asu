// ** React Imports
import { Fragment } from 'react'

// ** Hooks
import { useRTL } from '@hooks/useRTL'

// ** Third Party Components
import SwiperCore, {
  Grid,
  Lazy,
  Virtual,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
} from 'swiper'

// ** Demo Components

import SwiperLazy from './SwiperLazyLoad'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/swiper/swiper.scss'

// ** Init Swiper Functions
SwiperCore.use([
  Navigation,
  Grid,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual,
])

const Slider = () => {
  // ** Hooks
  const [isRtl] = useRTL()

  return (
    <Fragment>
      <SwiperLazy isRtl={isRtl} />
    </Fragment>
  )
}

export default Slider
