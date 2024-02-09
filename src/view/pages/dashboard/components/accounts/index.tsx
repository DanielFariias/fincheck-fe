import { EyeIcon } from '../../../../components/icons/eye-icon'
import { AccountCard } from './account-card'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { SliderNavigation } from './slider-navigation'
import { useAccountController } from './use-account-controller'

export function Accounts() {
  const { sliderState, setSliderState, slidesPerView } = useAccountController()
  return (
    <div className="bg-teal-900 rounded-2xl px-4 py-8 md:p-10 w-full h-full flex flex-col">
      <div>
        <span className="text-white tracking-[-0.5px] block">Saldo total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 1000,00
          </strong>
          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-end flex-col mt-10 md:mt-0">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={slidesPerView}
            onSlideChange={(swiper) => {
              setSliderState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
              })
            }}
          >
            <div
              className="flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white tracking-[-1px] text-lg">
                Minhas contas
              </strong>

              <SliderNavigation
                isBeginning={sliderState.isBeginning}
                isEnd={sliderState.isEnd}
              />
            </div>

            <div>
              <SwiperSlide>
                <AccountCard
                  color="#f92"
                  name="Inter"
                  balance={1000.77}
                  type="CHECKING"
                />
              </SwiperSlide>

              <SwiperSlide>
                <AccountCard
                  color="#f92"
                  name="Inter"
                  balance={1000.77}
                  type="CHECKING"
                />
              </SwiperSlide>

              <SwiperSlide>
                <AccountCard
                  color="#f92"
                  name="Inter"
                  balance={1000.77}
                  type="CHECKING"
                />
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  )
}
