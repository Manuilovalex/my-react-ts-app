import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../redux/store'

interface ProtectedRouteProps {
  element: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isLogin } = useSelector((state: RootState) => state.auth)

  return isLogin ? <>{element}</> : <Navigate to="/" replace />
}

export default ProtectedRoute
