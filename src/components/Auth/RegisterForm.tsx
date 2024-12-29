
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { apiRequest } from '../../utils/api';
import { setAuthToken } from '../../utils/auth';
import { Lock, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import StripeCheckout from 'react-stripe-checkout';

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handlePaymentSuccess = async (token: any) => {
    setLoading(true);
    try {
      const response = await apiRequest('/auth/register', 'POST', {
        ...credentials,
        token
      });
      setAuthToken(response.data.token);
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="register-form container mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="space-y-4">
        <div>
          <User className="inline-block mr-2" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={credentials.name}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
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
        <div>
          <Lock className="inline-block mr-2" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </form>
      <div className="mt-6">
        <StripeCheckout
          stripeKey="your_stripe_public_key"
          token={handlePaymentSuccess}
          name="Subscription Payment"
          amount={500 * 100} // Amount in cents
          currency="USD"
        >
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay & Register'}
          </button>
        </StripeCheckout>
      </div>
    </motion.div>
  );
};
