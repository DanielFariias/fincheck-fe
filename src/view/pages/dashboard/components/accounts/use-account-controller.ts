import { useMemo, useState } from 'react'
import { useWindowWidth } from '../../../../../app/hooks/use-window-width'
import { useDashboard } from '../dashboard-context/use-dashboard'
import { useBankAccounts } from '../../../../../app/hooks/use-bank-accounts'

export function useAccountController() {
  const { width } = useWindowWidth()
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard()

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  })

  function getSlidesPerView() {
    const breakpoints = [
      { max: 10000, min: 1000, value: 2.2 },
      { max: 1000, min: 768, value: 1.5 },
      { max: 768, min: 500, value: 2.2 },
      { max: 500, min: 0, value: 1.2 },
    ]

    const breakpoint = breakpoints.find(
      (bp) => width >= bp.min && width <= bp.max,
    )

    return breakpoint ? breakpoint.value : 1.2
  }

  const slidesPerView = getSlidesPerView()

  const { accounts, isFetching } = useBankAccounts()

  const currentBalance = useMemo(() => {
    return accounts.reduce((acc, account) => {
      return acc + account.currentBalance
    }, 0)
  }, [accounts])

  return {
    sliderState,
    setSliderState,
    slidesPerView,
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal,
    accounts,
    isLoading: isFetching,
    currentBalance,
  }
}
