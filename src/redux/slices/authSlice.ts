import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isLogin: boolean
}

const initialState: AuthState = {
  isLogin: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true
    },
    logout(state) {
      state.isLogin = false
    },
    registerUserSuccess(state) {
      state.isLogin = true
    }
  }
})

export const { login, logout, registerUserSuccess } = authSlice.actions
export default authSlice.reducer
