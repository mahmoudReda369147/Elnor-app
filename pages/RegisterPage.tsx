
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Card } from '../components/UI';
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 bg-white sm:bg-[#fcfaf2]">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-emerald-900 mb-2">إنشاء حساب</h1>
          <p className="text-gray-600">انضم إلينا في هذه الرحلة المباركة</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Input
              label="الاسم الكامل"
              placeholder="أدخل اسمك هنا"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
            <Input
              label="رقم الهاتف"
              placeholder="05xxxxxxxx"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              required
            />
            <Select
              label="الدولة"
              options={COUNTRIES}
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
            />
            <Input
              label="كلمة المرور"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />

            <Button fullWidth type="submit" className="mt-6 shadow-xl" disabled={isLoading}>
              {isLoading ? 'جاري التسجيل...' : 'تأكيد التسجيل'}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-50">
            <p className="text-gray-500 text-sm mb-4">لديك حساب بالفعل؟</p>
            <Button variant="ghost" onClick={() => navigate('/login')}>
              تسجيل الدخول
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
