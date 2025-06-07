'use client';

import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { loginSuccess } from '@/redux/slices/userSlice';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/auth/login', data);
      const { token, user } = res.data;

      dispatch(loginSuccess({ token, user }));
      localStorage.setItem('token', token);
      document.cookie = `token=${token}; path=/; max-age=86400`;

      toast.success(`Welcome back, ${user.name}!`);
      router.push('/tasks');
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || 'Login failed';
      toast.error(message);
    }
  };

  return (
    <div className="max-w-sm mx-auto py-10">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email format',
              },
            })}
            placeholder="Email"
            className="w-full border p-2 rounded"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
