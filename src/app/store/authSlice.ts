// store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { RootState } from './store';

interface DecodedToken {
  lastName: string;
  clientId: string;
  roles: string; // Note: Your token shows this as a string, not array
  iss: string;
  active: string;
  identityProvider: string;
  accountKey: string;
  aud: string;
  firstName: string;
  nbf: number;
  permissions: string[];
  name: string;
  exp: number;
  iat: number;
  jti: string;
  email: string;
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
  roles: string; // Changed from string[] to string
  permissions: string[];
  name: string;
  clientId: string;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
      const { token, refreshToken } = action.payload;
      const decoded = jwtDecode<DecodedToken>(token);
      
      state.token = token;
      state.refreshToken = refreshToken;
      state.user = {
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        roles: decoded.roles,
        permissions: decoded.permissions,
        name: decoded.name,
        clientId: decoded.clientId
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;


// Selectors
export const selectUserRole = (state: RootState) => state.auth.user?.roles;
export const isAdmin = (state: RootState) => selectUserRole(state) === 'ADMIN';
export const isManager = (state: RootState) => selectUserRole(state) === 'MERCHANT';
export const isAuthorizedUser = (state: RootState) => 
  ['ADMIN', 'MERCHANT'].includes(selectUserRole(state) || '');

export default authSlice.reducer;