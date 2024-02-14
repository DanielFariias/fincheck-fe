import { EyeIcon } from '../../../../components/icons/eye-icon'
import { AccountCard } from './account-card'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { SliderNavigation } from './slider-navigation'
import { useAccountController } from './use-account-controller'
import { formatCurrency } from '../../../../../app/utils/format-currency'
import { cn } from '../../../../../app/utils/cn'
import { Spinner } from '../../../../components/spinner'
import { PlusIcon } from '@radix-ui/react-icons'

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    slidesPerView,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance,
  } = useAccountController()

  return (
    <div className="bg-teal-900 rounded-2xl px-4 py-8 md:p-10 w-full h-full flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="text-teal-950/50 fill-white w-12 h-12" />
        </div>
      )}
      {!isLoading && (
        <>
          <div>
            <span className="text-white tracking-[-0.5px] block">
              Saldo total
            </span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-2xl tracking-[-1px] text-white',
                  !areValuesVisible && 'blur-md',
                )}
              >
                {formatCurrency(currentBalance)}
              </strong>
              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-end flex-col mt-10 md:mt-0">
            {accounts.length === 0 && (
              <div>
                <strong className="text-white tracking-[-1px] text-lg">
                  Minhas contas
                </strong>

                <button
                  className="mt-4 h-52 rounded-2xl border-2 border-dashed w-full border-teal-600 flex flex-col items-center justify-center gap-4 text-white"
                  onClick={openNewAccountModal}
                >
                  <div className="rounded-full w-11 h-11 border-2 border-dashed flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="font-medium tracking-[-0.5px] w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </div>
            )}

            {accounts.length > 0 && (
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
                    {accounts.map((account) => (
                      <SwiperSlide key={account.id}>
                        <AccountCard data={account} />
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
