
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card } from '../components/UI';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: (phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (phone.length < 5 || password.length < 3) {
      setError('يرجى التأكد من البيانات المدخلة');
      return;
    }

    setIsLoading(true);
    const result = await onLogin(phone, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'حدث خطأ في تسجيل الدخول');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-3xl bg-emerald-50 text-emerald-700 mb-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21V11M12 11c-1.333 0-4-.667-4-2s2.667-2 4-2 4 .667 4 2-2.667 2-4 2zM4 21h16" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-emerald-900 mb-2">منصة النور</h1>
          <p className="text-gray-600">أهلاً بك مجدداً في رحلتك التعليمية</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Input
              label="رقم الهاتف"
              placeholder="05xxxxxxxx"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              label="كلمة المرور"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button fullWidth type="submit" className="mt-4" disabled={isLoading}>
              {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </Button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-gray-500 text-sm mb-4">ليس لديك حساب؟</p>
            <Button variant="ghost" onClick={() => navigate('/register')}>
              إنشاء حساب جديد
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
