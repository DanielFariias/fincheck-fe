import { ComponentProps } from 'react'
import { cn } from '../../app/utils/cn'

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'bg-teal-900 hover:bg-teal-800 w-full px-6 h-12 rounded-2xl text-white font-medium active:bg-teal-700 disabled:text-gray-500 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all',
        className,
      )}
    />
  )
}
