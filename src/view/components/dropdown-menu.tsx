import * as RdxDropdown from '@radix-ui/react-dropdown-menu'

import { cn } from '../../app/utils/cn'

export function Root({ children }: { children: React.ReactNode }) {
  return <RdxDropdown.Root>{children}</RdxDropdown.Root>
}

export function Trigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropdown.Trigger className="outline-none" asChild>
      {children}
    </RdxDropdown.Trigger>
  )
}

interface IContentProps {
  children: React.ReactNode
  className?: string
}

export function Content({ children, className }: IContentProps) {
  return (
    <RdxDropdown.Portal>
      <RdxDropdown.Content
        className={cn(
          'rounded-2xl bg-white p-2 space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]',
          'data-[side=top]:animate-slide-down-and-fade',
          'data-[side=bottom]:animate-slide-up-and-fade',
          className,
        )}
      >
        {children}
      </RdxDropdown.Content>
    </RdxDropdown.Portal>
  )
}

interface ItemProps {
  children: React.ReactNode
  className?: string
  onSelect?: () => void
}

export function Item({ children, className, onSelect }: ItemProps) {
  return (
    <RdxDropdown.Item
      onSelect={onSelect}
      className={cn(
        'min-h-[40px] py-2 px-4 outline-none flex items-center justify-normal text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-xl cursor-pointer transition-colors',
        className,
      )}
    >
      {children}
    </RdxDropdown.Item>
  )
}

export const DropdownMenu = {
  Root,
  Trigger,
  Content,
  Item,
}
