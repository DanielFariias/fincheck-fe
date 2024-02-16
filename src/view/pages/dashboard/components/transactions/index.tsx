import { Swiper, SwiperSlide } from 'swiper/react'

import { MONTHS } from '@/app/config/constants'

import { formatCurrency } from '@/app/utils/format-currency'
import { formatDate } from '@/app/utils/format-date'
import { cn } from '@/app/utils/cn'

import { CategoryIcon } from '@/view/components/icons/categories/category-icon'
import { FilterIcon } from '@/view/components/icons/filter-icon'
import { Spinner } from '@/view/components/spinner'

import { EditTransactionModal } from '../../modals/edit-transaction-modal'

import { useTransactionController } from './use-transaction-controller'
import { TransactionTypeDropdown } from './transaction-type-dropdown'
import { SliderNavigation } from './slider-navigation'
import { SliderOption } from './slider-option'
import { FiltersModal } from './filters-modal'

import emptyStateImg from '@/assets/empty-state.svg'

export function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    isInitialLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleCloseEditModal,
    handleOpenEditModal,
    isEditModalOpen,
    transactionBeingEdited,
  } = useTransactionController()

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
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex justify-between w-full">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                spaceBetween={16}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilters('month')(swiper.realIndex)
                }}
              >
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
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === 'EXPENSE' ? 'expense' : 'income'
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'tracking-[-0.5px] font-medium',
                        transaction.type === 'EXPENSE'
                          ? 'text-red-800'
                          : 'text-green-800',
                        !areValuesVisible && 'blur-[6px]',
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
