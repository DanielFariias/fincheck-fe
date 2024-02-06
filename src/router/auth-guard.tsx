import { Navigate, Outlet } from 'react-router-dom'

interface IAuthGuardProps {
  isPrivate: boolean
}

export function AuthGuard({ isPrivate }: IAuthGuardProps) {
  const isAuthenticated = false

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" replace />
  }

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
