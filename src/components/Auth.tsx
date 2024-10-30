import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogIn, UserPlus, KeyRound, Mail, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/auth';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional(),
});

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data: any) => {
    // Simulate authentication
    login({
      id: '1',
      email: data.email,
      name: data.name || data.email.split('@')[0],
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-indigo-900/90"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDUwIDAgTCAwIDAgMCA1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 text-white">
          {isLogin ? 'Welcome To Nour Notebook!' : 'Create an account'}
        </h2>
        <p className="text-center text-white/80 mb-8">
          {isLogin ? 'Your digital notebook awaits you' : 'Start your journey of digital note-taking'}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-white/50 text-white"
              />
            </div>
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-white/50 text-white"
                />
              </div>
              {errors.name && (
                <p className="text-red-300 text-sm mt-1">{errors.name.message as string}</p>
              )}
            </div>
          )}

          <div>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-white/50 text-white"
              />
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password.message as string}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-purple-900 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            {isLogin ? (
              <>
                <LogIn className="w-5 h-5" /> Sign In
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" /> Sign Up
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-white/80">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-white hover:text-white/90 font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
