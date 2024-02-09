import { ComponentProps } from 'react'
import { cn } from '../../app/utils/cn'
import { Spinner } from './spinner'

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 w-full px-6 h-12 rounded-2xl text-white font-medium active:bg-teal-700 disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all flex items-center justify-center',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6 fill-teal-700" />}
    </button>
  )
}
