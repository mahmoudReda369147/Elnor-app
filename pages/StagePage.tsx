
import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Subject, ContentItem, User } from '../types';
import { STAGES_DATA } from '../constants';
import { Button, Card, Textarea, Badge } from '../components/UI';
import Logo from '../components/Logo';
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
  const [showIjazah, setShowIjazah] = useState(true);
  const contentSectionRef = useRef<HTMLDivElement>(null);

  // Find the stage from STAGES_DATA
  const stage = STAGES_DATA.find(s => s.id === Number(stageId));

  // If stage not found, redirect to home
  if (!stage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 bg-white rounded-3xl shadow-xl"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">المرحلة غير موجودة</h1>
          <p className="text-slate-500 mb-6">عذراً، لم نتمكن من إيجاد هذه المرحلة</p>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </motion.div>
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
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/30" />

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-100/20 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100/20 to-transparent rounded-full blur-3xl translate-y-1/2 translate-x-1/3" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="md" />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal-600 hover:border-teal-300 transition-all shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Title */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="primary">المستوى {stage.id}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{stage.title}</h1>
              <p className="text-slate-500">{stage.description}</p>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-lg border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 text-sm">المقررات</p>
                <p className="text-slate-800 font-bold">{stage.curriculum?.length || 0} مادة</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Curriculum Grid Section */}
        {stage.curriculum && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">المقررات الدراسية</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stage.curriculum.map((sub, idx) => {
                const fileCount = getSubjectFileCount(sub.title);
                const isSelected = selectedSubject?.title === sub.title;

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    onClick={() => handleSubjectClick(sub)}
                    className={`
                      relative p-5 rounded-2xl cursor-pointer transition-all duration-300
                      ${isSelected
                        ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-xl shadow-teal-500/25'
                        : 'bg-white border border-slate-100 hover:border-teal-200 hover:shadow-lg'
                      }
                    `}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                        ${isSelected ? 'bg-white/20' : 'bg-teal-50'}
                      `}>
                        <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-teal-600'}`}>
                          {idx + 1}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-bold truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                            {sub.title}
                          </h4>
                          {fileCount > 0 && (
                            <span className={`
                              text-xs px-2 py-0.5 rounded-full flex-shrink-0
                              ${isSelected ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-700'}
                            `}>
                              {fileCount}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm truncate ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                          {sub.book}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* Content Section */}
        <section ref={contentSectionRef}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">المحتوى التعليمي</h2>
            </div>

            {selectedSubject && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedSubject(null)}
              >
                عرض الكل
              </Button>
            )}
          </div>

          {/* Filter indicator */}
          {selectedSubject && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center gap-4 bg-teal-50 border border-teal-100 rounded-2xl p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-teal-800 font-bold">{selectedSubject.title}</p>
                <p className="text-teal-600 text-sm">{selectedSubject.book}</p>
              </div>
            </motion.div>
          )}

          {/* Content Items */}
          <div className="space-y-8">
            {getFilteredContent().length > 0 ? (
              getFilteredContent().map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    {/* Item Header */}
                    <div className="p-6 flex items-center justify-between border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center
                          ${item.type === 'video' ? 'bg-red-50 text-red-500' : item.type === 'pdf' ? 'bg-blue-50 text-blue-500' : item.type === 'playlist' ? 'bg-purple-50 text-purple-500' : 'bg-amber-50 text-amber-500'}
                        `}>
                          {item.type === 'video' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : item.type === 'pdf' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          ) : item.type === 'playlist' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-800">{item.title}</h4>
                          <p className="text-slate-500 text-sm">{item.description}</p>
                        </div>
                      </div>
                      <Badge variant={item.type === 'video' ? 'primary' : item.type === 'pdf' ? 'neutral' : item.type === 'playlist' ? 'purple' : 'gold'}>
                        {item.type === 'video' ? 'فيديو' : item.type === 'pdf' ? 'PDF' : item.type === 'playlist' ? 'قائمة تشغيل' : 'صوت'}
                      </Badge>
                    </div>

                    {/* Item Content */}
                    <div className="bg-slate-900">
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
                      ) : item.type === 'playlist' ? (
                        <div className="aspect-video w-full">
                          <iframe
                            className="w-full h-full"
                            src={item.url.replace('youtube.com/playlist', 'www.youtube.com/embed/videoseries')}
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
                          <div className="p-4 text-center border-t border-slate-100 bg-slate-50">
                            <Button variant="outline" size="sm" onClick={() => window.open(item.url, '_blank')}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              فتح في نافذة جديدة
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 flex justify-center bg-gradient-to-b from-slate-800 to-slate-900">
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-slate-500">لا يوجد محتوى متوفر حالياً لهذه المادة</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-8 md:p-12 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-teal-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              {/* Quran Ijazah Section */}
              <div className="text-center mb-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">القرءان الكريم</h3>
                <Button 
                  variant="outline" 
                  onClick={() => setShowIjazah(!showIjazah)}
                  className="mb-4"
                >
                  {showIjazah ? 'إخفاء الشروط' : 'عرض شروط الإجازة'}
                </Button>
              </div>

              {/* Ijazah Requirements */}
              {showIjazah && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-10 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl"
                >
                  <h4 className="text-lg font-bold text-emerald-800 mb-4">تم فتح باب الإجازة أونلاين للقرءان الكريم بقرائتي نافع و عاصم لوجه الله بشروط تتوفر مجتمعة في الطالبـ / بـة :</h4>
                  <ol className="text-right space-y-3 text-emerald-700">
                    <li>أن يكون أدبه و أخلاقه معروفة عندي</li>
                    <li>أن يقرأ أولا مشافهة عليّ قدرا يوضح تمكنه من أداء الأحكام التجويدية بأداء متقن تطمئن له النفس و هذا القدر لا يمكن تحديده الآن لأن من الطلبه من يقرأ جزءا فنطمئن لسلامة اداؤه و منهم من يقرأ عشرة اجزاء و لازال في النفس منه شئ فمثل هذا لا نرده بل نلزمه بالختمه مشافهة ثم ختمة أخرى للاجازة..( و هذا الشرط ملغي في حق من قرأ عليّ قدراً مشافهة  ثم انقطع لظرف ما و أراد أن يكمل)</li>
                    <li>أن يقرأ ختمة  وصل كامله لحفص من طرق القصر من طيبة النشر و أن يسمع و يشرح التحفة و الجزرية</li>
                    <li>إذا كان طفلا حافظا (يلزم وجود ولي أمره اثناء الاتصال لضمان أن لا يفتح مصحفا</li>
                    <li>القسم الا يفتح مصحفا ( و هذا الشرط ما اسهله علي كل أمين ) و ما اصعبه علي الاخر و لا نشكك في  احد</li>
                    <li>ألا يطلب مالا ممن طلب منه الإجازة و رءاه أهلا حتي و لو عرض عليه المال ( فشرطي أن تُعلم مجانا كما تَعلمت  مجانا )   بهذا ينتشر العلم و نضيق المجال علي تجار العلم و الأسانيد</li>
                  </ol>
                </motion.div>
              )}

              {/* WhatsApp Contact */}
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.05-.521-.099-.148-.445-1.02-.612-1.395-.167-.378-.335-.328-.445-.328-.112 0-.24-.018-.37-.018-.13 0-.34.05-.52.247-.18.197-.688.673-.688 1.642 0 .969.706 1.905.804 2.039.099.133 1.39 2.123 3.368 2.979.471.203.839.324 1.126.415.473.149.904.128 1.245.078.38-.056 1.171-.48 1.336-.943.165-.464.165-.861.116-.944-.05-.083-.182-.133-.38-.282M12.028 3.5c-4.689 0-8.5 3.811-8.5 8.5 0 1.497.39 2.904 1.072 4.123L3.5 20.5l4.426-1.083A8.473 8.473 0 0012.028 20.5c4.689 0 8.5-3.811 8.5-8.5s-3.811-8.5-8.5-8.5"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">تواصل معنا عبر واتساب</h3>
                <p className="text-slate-500 mb-6">عند الانتهاء من المرحلة، تواصل معنا عبر هذا الرقم للانتقال إلى المرحلة التالية</p>
                
                <Button 
                  type="button" 
                  size="lg" 
                  onClick={() => window.open('https://wa.me/201097442709', '_blank')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.05-.521-.099-.148-.445-1.02-.612-1.395-.167-.378-.335-.328-.445-.328-.112 0-.24-.018-.37-.018-.13 0-.34.05-.52.247-.18.197-.688.673-.688 1.642 0 .969.706 1.905.804 2.039.099.133 1.39 2.123 3.368 2.979.471.203.839.324 1.126.415.473.149.904.128 1.245.078.38-.056 1.171-.48 1.336-.943.165-.464.165-.861.116-.944-.05-.083-.182-.133-.38-.282M12.028 3.5c-4.689 0-8.5 3.811-8.5 8.5 0 1.497.39 2.904 1.072 4.123L3.5 20.5l4.426-1.083A8.473 8.473 0 0012.028 20.5c4.689 0 8.5-3.811 8.5-8.5s-3.811-8.5-8.5-8.5"/>
                  </svg>
                  +20 10 97442709
                </Button>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-100 text-center"
        >
          <Button variant="ghost" onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            العودة للرئيسية
          </Button>
        </motion.footer>
      </div>
    </div>
  );
};

export default StagePage;
