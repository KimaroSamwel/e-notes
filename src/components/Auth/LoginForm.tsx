
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { apiRequest } from '../../utils/api';
import { setAuthToken } from '../../utils/auth';
import { Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginCredentials {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await apiRequest('/auth/login', 'POST', credentials);
      setAuthToken(response.data.token);
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="login-form container mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="space-y-4">
        <div>
          <Mail className="inline-block mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <Lock className="inline-block mr-2" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </form>
      <div className="mt-6">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </motion.div>
  );
};
