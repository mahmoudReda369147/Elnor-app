
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Stage } from '../types';
import { Card, Button, Badge } from '../components/UI';
import Logo from '../components/Logo';

interface HomePageProps {
  user: User;
  stages: Stage[];
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, stages, onLogout }) => {
  const navigate = useNavigate();
  const totalStages = stages.length;

  const handleStageClick = (stage: Stage) => {
    if (stage.isUnlocked) {
      navigate(`/stage/${stage.id}`);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/20" />

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-100/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-amber-100/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* User Info */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-teal-500/30">
                {user.fullName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                  مرحباً، {user.fullName}
                </h1>
                <p className="text-slate-500">واصل رحلتك في طلب العلم الشرعي</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Stage Badge */}
              <div className="flex-1 lg:flex-initial bg-white rounded-2xl px-6 py-4 shadow-lg shadow-slate-200/50 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-400/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">المستوى الحالي</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {user.stageNumber} <span className="text-slate-400 text-base font-normal">/ {totalStages}</span>
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="ghost" onClick={handleLogout} className="hidden lg:flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                خروج
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Progress Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">تقدمك في البرنامج</h2>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500">الإنجاز الكلي</span>
                    <span className="text-teal-600 font-bold text-lg">{Math.round((user.stageNumber / totalStages) * 100)}%</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(user.stageNumber / totalStages) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      className="h-full bg-gradient-to-l from-teal-400 via-teal-500 to-teal-600 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>

                <p className="text-slate-500">
                  أنت في <span className="text-teal-600 font-semibold">المستوى {user.stageNumber}</span> من أصل {totalStages} مستويات
                </p>
              </div>

              <div className="hidden md:block w-px h-24 bg-slate-200" />

              <div className="flex gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600 mb-1">{user.stageNumber}</div>
                  <div className="text-slate-500 text-sm">مستوى مكتمل</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500 mb-1">{totalStages - user.stageNumber}</div>
                  <div className="text-slate-500 text-sm">مستوى متبقي</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Stages Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">المراحل الدراسية</h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {stages.map((stage) => (
              <motion.div
                key={stage.id}
                variants={itemVariants}
                whileHover={stage.isUnlocked ? { y: -8, transition: { duration: 0.3 } } : {}}
                onClick={() => handleStageClick(stage)}
                className={stage.isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
              >
                <div className={`
                  relative h-full rounded-3xl overflow-hidden transition-all duration-500
                  ${stage.isUnlocked
                    ? stage.id === user.stageNumber
                      ? 'bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-2xl shadow-teal-500/30'
                      : 'bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl'
                    : 'bg-slate-50 border border-slate-100 opacity-60'
                  }
                `}>
                  {/* Current Stage Indicator */}
                  {stage.id === user.stageNumber && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="gold" size="sm">المرحلة الحالية</Badge>
                    </div>
                  )}

                  {/* Locked Overlay */}
                  {!stage.isUnlocked && (
                    <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] flex items-center justify-center z-20">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col h-full min-h-[260px]">
                    {/* Stage Number */}
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold mb-5
                      ${stage.isUnlocked
                        ? stage.id === user.stageNumber
                          ? 'bg-white/20 text-white'
                          : 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30'
                        : 'bg-slate-200 text-slate-400'
                      }
                    `}>
                      {stage.id}
                    </div>

                    {/* Stage Title */}
                    <h3 className={`text-lg font-bold mb-3 ${
                      stage.isUnlocked
                        ? stage.id === user.stageNumber ? 'text-white' : 'text-slate-800'
                        : 'text-slate-400'
                    }`}>
                      {stage.title}
                    </h3>

                    {/* Stage Description */}
                    <p className={`text-sm leading-relaxed mb-6 ${
                      stage.isUnlocked
                        ? stage.id === user.stageNumber ? 'text-teal-100' : 'text-slate-500'
                        : 'text-slate-400'
                    }`}>
                      {stage.description}
                    </p>

                    {/* Action */}
                    <div className="mt-auto">
                      {stage.isUnlocked ? (
                        <div className={`flex items-center gap-2 font-semibold ${
                          stage.id === user.stageNumber ? 'text-white' : 'text-teal-600'
                        }`}>
                          {stage.id < user.stageNumber ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              مكتملة - مراجعة
                            </>
                          ) : (
                            <>
                              متابعة الدراسة
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                              </svg>
                            </>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          يفتح بعد إكمال المرحلة السابقة
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-slate-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              جميع الحقوق محفوظة لمنصة النور © {new Date().getFullYear()}
            </p>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              تسجيل الخروج
            </Button>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default HomePage;
