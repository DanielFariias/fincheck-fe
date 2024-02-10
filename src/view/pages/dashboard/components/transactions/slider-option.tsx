import { useSwiper } from 'swiper/react'
import { cn } from '../../../../../app/utils/cn'

interface ISliderOptionProps {
  isActive: boolean
  month: string
  index: number
}

export function SliderOption({ isActive, month, index }: ISliderOptionProps) {
  const swiper = useSwiper()

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      className={cn(
        'w-full rounded-full h-12 text-gray-800 text-sm tracking-[-0.5px]',
        isActive && 'bg-white',
      )}
    >
      {month}
    </button>
  )
}
