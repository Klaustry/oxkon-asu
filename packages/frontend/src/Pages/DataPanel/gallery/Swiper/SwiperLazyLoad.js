// ** Third Party Components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const params = {
  lazy: true,
  navigation: true,
  // pagination: {
  //   clickable: true,
  // },
}

const imgs = [
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
  '/assets/images/banner/banner-9.jpg',
  '/assets/images/banner/banner-8.jpg',
  '/assets/images/banner/banner-7.jpg',
  '/assets/images/banner/banner-20.jpg',
  '/assets/images/banner/banner-5.jpg',
  '/assets/images/banner/banner-4.jpg',
]

const SwiperLazyLoad = ({ isRtl }) => {
  return (
    <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
      {imgs.map((e, i) => (
        <SwiperSlide key={i}>
          <img src={e} alt="swiper 2" className="swiper-lazy img-fluid" />
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SwiperLazyLoad
