import { Transition } from '@headlessui/react'
import { Logo } from './logo'

interface ILaunchScreenProps {
  isActive: boolean
}

export function LaunchScreen({ isActive }: ILaunchScreenProps) {
  return (
    <Transition
      show={isActive}
      enter="transition-opacity duration-50"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center">
        <Logo className="h-12 text-white animate-pulse" />
      </div>
    </Transition>
  )
}
