
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Subject, ContentItem, User } from '../types';
import { STAGES_DATA } from '../constants';
import { Button, Card, Textarea } from '../components/UI';
import { motion } from 'framer-motion';

interface StagePageProps {
  user: User;
}

const StagePage: React.FC<StagePageProps> = ({ user }) => {
  const { stageId } = useParams<{ stageId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);

  // Find the stage from STAGES_DATA
  const stage = STAGES_DATA.find(s => s.id === Number(stageId));

  // If stage not found, redirect to home
  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">المرحلة غير موجودة</h1>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </div>
      </div>
    );
  }

  const getFilteredContent = (): ContentItem[] => {
    if (!selectedSubject) {
      return stage.content;
    }
    return stage.content.filter(item => item.filter === selectedSubject.title);
  };

  const getSubjectFileCount = (subjectTitle: string): number => {
    return stage.content.filter(item => item.filter === subjectTitle).length;
  };

  const handleSubjectClick = (subject: Subject) => {
    if (selectedSubject?.title === subject.title) {
      setSelectedSubject(null);
    } else {
      setSelectedSubject(subject);
      setTimeout(() => {
        contentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log(`تم إرسال رسالة من المرحلة ${stage.id}: ${message}`);
      setSubmitted(true);
      setMessage('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/islamic-art.png")',
        backgroundRepeat: 'repeat'
      }}></div>

      <div className="max-w-5xl mx-auto px-6 py-10 md:py-16 relative z-10">
        <header className="mb-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
          <Button variant="outline" className="p-3 rounded-full h-12 w-12 border-emerald-200" onClick={() => navigate('/')}>
            <span className="text-xl font-bold">←</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-emerald-900 mb-2">{stage.title}</h1>
            <p className="text-gray-600 max-w-2xl">{stage.description}</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
              الخطة الدراسية
            </div>
          </div>
        </header>

        {/* Curriculum Grid Section */}
        {stage.curriculum && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-20"
          >
            <div className="bg-emerald-900 rounded-[2.5rem] p-1 mb-8 shadow-2xl">
              <div className="bg-emerald-900 py-6 text-center text-white border-b border-emerald-800">
                <h2 className="text-2xl font-bold font-quran tracking-wide">مقررات المستوى الأول</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-emerald-800 rounded-b-[2.4rem] overflow-hidden">
                {stage.curriculum.map((sub, idx) => {
                  const fileCount = getSubjectFileCount(sub.title);
                  return (
                    <div
                      key={idx}
                      className={`bg-white p-6 transition-colors group cursor-pointer ${
                        selectedSubject?.title === sub.title
                          ? 'bg-emerald-100 ring-2 ring-emerald-500 ring-inset'
                          : 'hover:bg-emerald-50'
                      } ${
                        fileCount > 0 ? 'hover:shadow-lg' : 'opacity-75'
                      }`}
                      onClick={() => handleSubjectClick(sub)}
                    >
                      <h4 className="text-emerald-900 font-bold mb-1 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full transition-transform ${
                          selectedSubject?.title === sub.title ? 'bg-emerald-600 scale-150' : 'bg-emerald-500 group-hover:scale-125'
                        }`}></span>
                        {sub.title}:
                        {fileCount > 0 && (
                          <span className={`mr-auto text-xs px-2 py-0.5 rounded-full ${
                            selectedSubject?.title === sub.title
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {fileCount} ملفات
                          </span>
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{sub.book}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        )}

        <div className="space-y-16">
          {/* Content Items */}
          <section ref={contentSectionRef}>
            <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
              <span className="bg-emerald-100 p-2 rounded-lg">📚</span>
              المحتوى المرئي والمواد العلمية
            </h3>

            {/* Filter indicator */}
            {selectedSubject && (
              <div className="mb-8 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <div className="bg-emerald-600 text-white p-2 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-emerald-800 font-bold">{selectedSubject.title}</p>
                  <p className="text-emerald-600 text-sm">{selectedSubject.book}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubject(null)}
                  className="text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                >
                  عرض الكل
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-12">
              {getFilteredContent().length > 0 ? (
                getFilteredContent().map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-none shadow-xl shadow-emerald-900/5">
                      <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-bold text-emerald-900 mb-1">{item.title}</h4>
                          <p className="text-gray-500 text-sm">{item.description}</p>
                        </div>
                        <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-700">
                          {item.type === 'video' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : item.type === 'pdf' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-900">
                        {item.type === 'video' ? (
                          <div className="aspect-video w-full">
                            <iframe
                              className="w-full h-full"
                              src={item.url}
                              title={item.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : item.type === 'pdf' ? (
                          <div className="bg-white">
                            <div className="w-full h-[600px]">
                              <iframe
                                className="w-full h-full"
                                src={item.url}
                                title={item.title}
                              ></iframe>
                            </div>
                            <div className="p-4 text-center border-t border-gray-100">
                              <Button variant="outline" onClick={() => window.open(item.url, '_blank')}>فتح في نافذة جديدة</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-8 flex justify-center bg-emerald-50/20">
                            <audio controls className="w-full max-w-lg">
                              <source src={item.url} type="audio/mpeg" />
                              متصفحك لا يدعم مشغل الصوت.
                            </audio>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-400">لا يوجد محتوى متوفر حالياً لهذه المرحلة.</p>
                </div>
              )}
            </div>
          </section>

          {/* Message Section */}
          <section className="mt-20 py-16 px-8 rounded-[3rem] bg-white border border-emerald-100 shadow-2xl shadow-emerald-900/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>

            <div className="text-center mb-10 relative z-10">
              <h3 className="text-2xl font-bold text-emerald-900 mb-2">تواصل معنا</h3>
              <p className="text-gray-600">هل لديك استفسار حول المنهج أو المقررات؟</p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-6 relative z-10">
              <Textarea
                placeholder="اكتب استفسارك هنا..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-emerald-50/30 border-emerald-100 focus:bg-white"
              />
              <div className="flex justify-center">
                <Button type="submit" className="min-w-[220px]" disabled={submitted}>
                  {submitted ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      تم الإرسال بنجاح
                    </>
                  ) : 'إرسال الرسالة'}
                </Button>
              </div>
            </form>
          </section>
        </div>

        <div className="mt-20 text-center">
          <Button variant="ghost" onClick={() => navigate('/')} className="text-gray-400">العودة للرئيسية</Button>
        </div>
      </div>
    </div>
  );
};

export default StagePage;
