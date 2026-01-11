
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Stage } from '../types';
import { Card, Button } from '../components/UI';

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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
      <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div className="text-right">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-900 mb-2">
            مرحباً بك، {user.fullName}
          </h1>
          <p className="text-gray-600">واصل تقدمك اليوم في مراحل التعلم والارتقاء.</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Stage Progress Badge */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 text-center">
            <p className="text-emerald-600 text-xs font-medium mb-1">المرحلة الحالية</p>
            <p className="text-emerald-900 font-bold text-xl">
              {user.stageNumber} <span className="text-gray-400 text-sm font-normal">/ {totalStages}</span>
            </p>
          </div>
          <Button variant="outline" className="text-sm px-4 py-2" onClick={handleLogout}>
            تسجيل الخروج
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-emerald-800 font-bold">تقدمك في البرنامج</h3>
          <span className="text-emerald-600 font-bold">{Math.round((user.stageNumber / totalStages) * 100)}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(user.stageNumber / totalStages) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-l from-emerald-500 to-emerald-600 rounded-full"
          />
        </div>
        <p className="text-gray-500 text-sm mt-3">
          أنت في المرحلة {user.stageNumber} من أصل {totalStages} مراحل
        </p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-emerald-800 mb-8 flex items-center gap-2">
          <span className="w-8 h-1 bg-emerald-700 rounded-full"></span>
          خطة التعلم الحالية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <motion.div
              key={stage.id}
              whileHover={stage.isUnlocked ? { y: -5 } : {}}
              onClick={() => handleStageClick(stage)}
              className={stage.isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
            >
              <Card className={`h-full relative transition-all duration-300 ${
                stage.isUnlocked
                  ? stage.id === user.stageNumber
                    ? 'border-emerald-500 border-2 bg-gradient-to-br from-white to-emerald-50 shadow-lg ring-4 ring-emerald-100'
                    : 'border-emerald-300 border bg-gradient-to-br from-white to-emerald-50 shadow-md'
                  : 'opacity-70 bg-gray-50 border-gray-100 grayscale-[0.5]'
              }`}>
                {/* Current Stage Badge */}
                {stage.id === user.stageNumber && (
                  <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                    المرحلة الحالية
                  </div>
                )}

                {!stage.isUnlocked && (
                  <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[1px] flex items-center justify-center z-20 rounded-2xl">
                    <div className="bg-white/90 p-3 rounded-full shadow-md text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col h-full min-h-[220px]">
                  <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-2xl font-bold ${
                    stage.isUnlocked
                      ? stage.id === user.stageNumber
                        ? 'bg-emerald-700 text-white shadow-lg'
                        : 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {stage.id}
                  </div>

                  <h3 className={`text-lg font-bold mb-2 ${stage.isUnlocked ? 'text-emerald-900' : 'text-gray-500'}`}>
                    {stage.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {stage.description}
                  </p>

                  <div className="mt-auto">
                    {stage.isUnlocked ? (
                      <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        {stage.id < user.stageNumber ? 'مكتملة' : stage.id === user.stageNumber ? 'متابعة الدراسة' : 'دخول المرحلة'} <span className="text-xl">←</span>
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs font-medium">مغلق حالياً</span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="mt-24 text-center text-gray-400 text-sm">
        جميع الحقوق محفوظة لمنصة النور © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default HomePage;
