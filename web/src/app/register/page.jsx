'use client';

import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post('/auth/register', data);
      router.push('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto py-10">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('name')} placeholder="Name" className="w-full border p-2 rounded" />
        <input {...register('email')} placeholder="Email" className="w-full border p-2 rounded" />
        <input type="password" {...register('password')} placeholder="Password" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
}
