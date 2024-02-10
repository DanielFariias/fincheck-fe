import { ChevronDownIcon } from '@radix-ui/react-icons'
import { TransactionsIcon } from '../../../../components/icons/transactions-icon'
import { FilterIcon } from '../../../../components/icons/filter-icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import { MONTHS } from '../../../../../app/config/constants'
import { SliderOption } from './slider-option'
import { SliderNavigation } from './slider-navigation'
import { formatCurrency } from '../../../../../app/utils/format-currency'
import { CategoryIcon } from '../../../../components/icons/categories/category-icon'
import { useTransactionController } from './use-transaction-controller'
import { cn } from '../../../../../app/utils/cn'
import { Spinner } from '../../../../components/spinner'

import emptyStateImg from '../../../../../assets/empty-state.svg'

export function Transactions() {
  const { areValuesVisible, isLoading, isInitialLoading, transactions } =
    useTransactionController()

  const hasTransactions = transactions.length > 0

  return (
    <div className="bg-gray-100 rounded-2xl p-10 w-full h-full flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className=" w-12 h-12" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <header>
            <div className="flex justify-between w-full">
              <button className="flex items-center gap-2 text-gray-900">
                <TransactionsIcon />
                <span className="text-gray-800 text-sm tracking-[-0.5px]">
                  Transações
                </span>
                <ChevronDownIcon />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper slidesPerView={3} spaceBetween={16} centeredSlides>
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center flex-col justify-center h-full">
                <Spinner className="w-12 h-12" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex items-center flex-col justify-center h-full">
                <img src={emptyStateImg} alt="Nenhuma transação encontrada" />
                <p className="text-center text-gray-700 mt-4">
                  Nenhuma transação encontrada
                </p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                <div className="rounded-2xl bg-white p-4 flex items-center justify-between gap-16">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="font-medium tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">11/12/2032</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-red-800 tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-[8px]',
                    )}
                  >
                    -{formatCurrency(1000)}
                  </span>
                </div>
                <div className="rounded-2xl bg-white p-4 flex items-center justify-between gap-16">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="font-medium tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">11/12/2032</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-green-800 tracking-[-0.5px] font-medium',
                      !areValuesVisible && 'blur-[8px]',
                    )}
                  >
                    {formatCurrency(1000)}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
