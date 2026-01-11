
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User } from './types';
import { STAGES_DATA } from './constants';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import StagePage from './pages/StagePage';
import Logo from './components/Logo';
import api from './services/api';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      if (api.isLoggedIn()) {
        try {
          const response = await api.getCurrentUser();
          setUser(response.user as User);
        } catch {
          // Token invalid, clear storage
          api.logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Create stages with isUnlocked based on user's stageNumber
  const getStagesForUser = () => {
    if (!user) return STAGES_DATA;

    return STAGES_DATA.map(stage => ({
      ...stage,
      isUnlocked: stage.id <= user.stageNumber
    }));
  };

  const handleLogin = async (phoneNumber: string, password: string) => {
    try {
      const response = await api.login(phoneNumber, password);
      setUser(response.user as User);
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'حدث خطأ في تسجيل الدخول';
      return { success: false, message };
    }
  };

  const handleRegister = async (userData: Omit<User, 'id' | 'stageNumber'> & { password: string }) => {
    try {
      const response = await api.register(userData);
      setUser(response.user as User);
      return { success: true };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'حدث خطأ في التسجيل';
      return { success: false, message };
    }
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Logo size="xl" variant="icon" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0 }}
              className="w-2 h-2 bg-teal-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="w-2 h-2 bg-teal-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              className="w-2 h-2 bg-teal-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-[#fcfaf2] selection:bg-emerald-200">
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <RegisterPage onRegister={handleRegister} />
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <HomePage user={user} stages={getStagesForUser()} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/stage/:stageId"
          element={
            user ? <StagePage user={user} /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
