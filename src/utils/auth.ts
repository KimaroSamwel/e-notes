import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../store/authStore';

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
}

export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp! * 1000 > Date.now();
  } catch {
    return false;
  }
};