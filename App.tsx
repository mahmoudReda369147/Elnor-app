
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User } from './types';
import { STAGES_DATA } from './constants';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import StagePage from './pages/StagePage';
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
      <div className="min-h-screen flex items-center justify-center bg-[#fcfaf2]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full"
        />
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
