import { useAuth } from '../../../app/hooks/use-auth'
import { Button } from '../../components/button'

export function Dashboard() {
  const { signOut } = useAuth()
  return (
    <div>
      <Button onClick={signOut}>Sair</Button>
    </div>
  )
}
