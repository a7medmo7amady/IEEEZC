'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Card } from '../components/card';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const handleGoogleLogin = () => {
    alert('Google login would be implemented here');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ieee-blue via-[#004d7a] to-charcoal" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-zc-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ieee-blue rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-3 group">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
          <span className="text-white font-bold text-xl">IEEE</span>
        </div>
        <div className="hidden sm:block">
          <div className="font-bold text-lg text-white">IEEE Zewail City</div>
          <div className="text-xs text-zc-gold">Student Branch</div>
        </div>
      </Link>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <Card>
          {/* Toggle */}
          <div className="flex gap-2 mb-8 p-1 bg-ieee-blue/10 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                isLogin
                  ? 'bg-ieee-blue text-white shadow-lg'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                !isLogin
                  ? 'bg-ieee-blue text-white shadow-lg'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Register
            </button>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-charcoal mb-2">
              {isLogin ? 'Welcome Back' : 'Join IEEE ZC'}
            </h2>
            <p className="text-charcoal/60">
              {isLogin
                ? 'Login to access your dashboard'
                : 'Create an account to get started'}
            </p>
          </div>

          {/* Google OAuth Button */}
          <div className="mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 rounded-xl font-medium text-charcoal border border-ieee-blue/20 transition-all duration-200 hover:scale-105 shadow-sm"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ieee-blue/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-charcoal/50">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-charcoal">Full Name</label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-charcoal">Email Address</label>
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-charcoal">Password</label>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-charcoal/60 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-zc-gold hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full mt-6">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Terms */}
          {!isLogin && (
            <p className="text-xs text-charcoal/50 text-center mt-4">
              By registering, you agree to our{' '}
              <a href="#" className="text-zc-gold hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-zc-gold hover:underline">Privacy Policy</a>
            </p>
          )}
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
