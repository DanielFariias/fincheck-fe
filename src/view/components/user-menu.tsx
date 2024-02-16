import { ExitIcon } from '@radix-ui/react-icons'
import { DropdownMenu } from './dropdown-menu'
import { useAuth } from '../../app/hooks/use-auth'
import { useQueryClient } from '@tanstack/react-query'

export function UserMenu() {
  const { signOut, user } = useAuth()
  const queryClient = useQueryClient()

  function signOutAndClearCache() {
    queryClient.clear()
    signOut()
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
          <span className="text-sm tracking-[-0.5px] text-teal-900 uppercase ">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32 mt-1">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signOutAndClearCache}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
