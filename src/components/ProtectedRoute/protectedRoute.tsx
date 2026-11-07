import type { ReactNode } from 'react'
import { useAuth } from '../../redux/authSlice'
import type { UserRole } from '../../utils/types'

export default function ProtectedRoute({ allowedRole, children }: { allowedRole?: UserRole; children: ReactNode }) {
  const { user } = useAuth()
  if (!user || (allowedRole && user.role !== allowedRole)) return null
  return children
}