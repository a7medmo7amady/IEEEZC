'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Globe, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '../components/button';
import { Input } from '../components/input';

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
    // Mock authentication
    router.push('/dashboard');
  };

  const handleOAuthLogin = (provider: string) => {
    // Mock OAuth
    alert(`${provider} login would be implemented here`);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00629B] via-[#004d7a] to-[#212121]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00629B] rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-3 group">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
          <span className="text-white font-bold text-xl">IEEE</span>
        </div>
        <div className="hidden sm:block">
          <div className="font-bold text-lg text-white">IEEE Zewail City</div>
          <div className="text-xs text-[#D4AF37]">Student Branch</div>
        </div>
      </Link>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Toggle */}
          <div className="flex gap-2 mb-8 p-1 bg-white/10 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                isLogin
                  ? 'bg-white text-[#00629B] shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                !isLogin
                  ? 'bg-white text-[#00629B] shadow-lg'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join IEEE ZC'}
            </h2>
            <p className="text-white/70">
              {isLogin
                ? 'Login to access your dashboard'
                : 'Create an account to get started'}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuthLogin('Google')}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 rounded-xl font-medium text-gray-700 transition-all duration-200 hover:scale-105"
            >
              <Globe className="w-5 h-5" />
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuthLogin('LinkedIn')}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] rounded-xl font-medium text-white transition-all duration-200 hover:scale-105"
            >
              <ExternalLink className="w-5 h-5" />
              Continue with LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-white/70">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-white/80">Full Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white/90"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-white/80">Email Address</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white/90"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-white/80">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-white/90"
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-[#D4AF37] hover:text-[#c49d2e]">
                  Forgot password?
                </a>
              </div>
            )}

            <Button type="submit" variant="secondary" size="lg" className="w-full mt-6">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Terms */}
          {!isLogin && (
            <p className="text-xs text-white/60 text-center mt-4">
              By registering, you agree to our{' '}
              <a href="#" className="text-[#D4AF37] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[#D4AF37] hover:underline">Privacy Policy</a>
            </p>
          )}
        </div>

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
