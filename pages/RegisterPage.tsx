
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Card } from '../components/UI';
import Logo from '../components/Logo';
import { COUNTRIES } from '../constants';
import { motion } from 'framer-motion';

interface RegisterPageProps {
  onRegister: (userData: {
    fullName: string;
    phoneNumber: string;
    country: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    country: COUNTRIES[0],
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.phoneNumber || !formData.password) {
      setError('يرجى تعبئة كافة الحقول');
      return;
    }

    setIsLoading(true);
    const result = await onRegister(formData);
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message || 'حدث خطأ في التسجيل');
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-teal-50/30" />

      {/* Animated Blobs */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[450px] h-[450px] bg-gradient-to-br from-amber-200/30 to-amber-100/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 25, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-teal-200/40 to-teal-100/20 rounded-full blur-3xl"
      />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='20' fill='none' stroke='%230d9488' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <Logo size="xl" variant="icon" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl font-extrabold bg-gradient-to-l from-slate-800 to-slate-900 bg-clip-text text-transparent mb-3"
            >
              إنشاء حساب
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-500 text-lg"
            >
              انضم إلينا في هذه الرحلة المباركة
            </motion.p>
          </div>

          {/* Register Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border-2 border-red-100 text-red-600 px-5 py-4 rounded-2xl text-sm flex items-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </motion.div>
                )}

                <Input
                  label="الاسم الكامل"
                  placeholder="أدخل اسمك الكامل"
                  value={formData.fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, fullName: e.target.value})}
                  required
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                />

                <Input
                  label="رقم الهاتف"
                  placeholder="05xxxxxxxx"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, phoneNumber: e.target.value})}
                  required
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />

                <Select
                  label="الدولة"
                  options={COUNTRIES}
                  value={formData.country}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, country: e.target.value})}
                />

                <Input
                  label="كلمة المرور"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})}
                  required
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />

                <Button fullWidth type="submit" variant="gold" size="lg" className="mt-6" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري إنشاء الحساب
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      تأكيد التسجيل
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-slate-100"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-slate-400">أو</span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-slate-500 mb-4">لديك حساب بالفعل؟</p>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate('/login')}
                >
                  تسجيل الدخول
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center text-slate-400 text-sm mt-8"
          >
            جميع الحقوق محفوظة لمنصة حلقات دراية للتعليم عن بعد © {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
