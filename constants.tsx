
import { Stage } from './types';

export const COLORS = {
  primary: '#065f46', // Emerald Green
  secondary: '#d97706', // Amber/Gold
  bg: '#fcfaf2', // Beige
  dark: '#1f2937', // Deep Charcoal
};

export const STAGES_DATA: Stage[] = [
  {
    id: 1,
    title: 'المستوى الأول: التأسيس الشرعي',
    description: 'المرحلة الأولى لبناء طالب العلم، تشمل تسعة مقررات أساسية في مختلف العلوم الشرعية.',
    isUnlocked: true,
    curriculum: [
      { title: 'القرآن الكريم', book: 'الناس حتى الأحقاف', contentIds: [] },
      { title: 'الحديث الشريف', book: 'الأربعون النووية للإمام النووي', contentIds: ['pdf1', 'pl1', 'pl2'] },
      { title: 'التجويد', book: 'تحفة الأطفال للجمزوري' },
      { title: 'السيرة النبوية', book: 'الأرجوزة المئية للإمام ابن أبي العز الحنفي' },
      { title: 'العقيدة', book: 'المنظومة اللامية لشيخ الإسلام ابن تيمية', contentIds: [] },
      { title: 'آداب طالب العلم', book: 'كتاب حلية طالب العلم للشيخ بكر أبو زيد' },
      { title: 'علم النحو', book: 'منظومة الآجرومية لـ منصور ابن آجروم', contentIds: [] },
      { title: 'فقه المرأة', book: 'كتاب جلباب المرأة المسلمة للإمام الألباني' },
      { title: 'فقه العبادات', book: 'كتاب صفة صلاة النبي للإمام الألباني', contentIds: [] },
    ],
    content: [
      {
        id: 'pdf1',
        type: 'pdf',
        title: 'كتاب الأربعون النووية',
        description: 'متن الأربعين النووية للإمام النووي - طبعة دار المنهاج المعتمدة.',
        url: '/الأربعون النوويّة  طبعة دار المنهاج.pdf',
        filter: 'الحديث الشريف'
      },
      {
        id: 'pl1',
        type: 'video',
        title: 'سلسلة الدروس - القائمة الأولى',
        description: 'مجموعة من الدروس التعليمية المرئية الخاصة بالمستوى الأول.',
        url: 'https://www.youtube.com/embed/videoseries?list=PL6C71skKjoGurk0j-R6-Eb2VeFvj_PTAg',
        filter: 'الحديث الشريف'
      },
      {
        id: 'pl2',
        type: 'video',
        title: 'سلسلة الدروس - القائمة الثانية',
        description: 'تكملة الدروس العلمية للمقررات الدراسية في المستوى الأول.',
        url: 'https://www.youtube.com/embed/videoseries?list=PLaFz4e1HGG4zggncbF69RhQmglUySjSGv',
        filter: 'الحديث الشريف'
      },
      {
        id: 'tajweed-v1',
        type: 'video',
        title: 'شرح تحفة الأطفال - القائمة الكاملة',
        description: 'سلسلة دروس شرح منظومة تحفة الأطفال في التجويد.',
        url: 'https://www.youtube.com/embed/videoseries?list=PLKKsCIejtuZWEkMv41ftUkFTafbp6b3DE',
        filter: 'التجويد'
      },
      {
        id: 'tajweed-v2',
        type: 'video',
        title: 'درس تحفة الأطفال',
        description: 'درس مرئي في شرح تحفة الأطفال للجمزوري.',
        url: 'https://www.youtube.com/embed/cNEW_u2ycV4',
        filter: 'التجويد'
      },
      {
        id: 'tajweed-pdf',
        type: 'pdf',
        title: 'متن تحفة الأطفال',
        description: 'متن منظومة تحفة الأطفال للإمام الجمزوري.',
        url: 'https://eu.docs.wps.com/module/common/preview/?sid=sIDGA-9nOAqSF4MkG',
        filter: 'التجويد'
      },
      {
        id: 'seera-v1',
        type: 'video',
        title: 'شرح الأرجوزة المئية - القائمة الأولى',
        description: 'سلسلة دروس شرح الأرجوزة المئية في السيرة النبوية.',
        url: 'https://www.youtube.com/embed/videoseries?list=PLUtxhBXriVhOTeX5kWdTC1LJxW5Z5r-AY',
        filter: 'السيرة النبوية'
      },
      {
        id: 'seera-v2',
        type: 'video',
        title: 'شرح الأرجوزة المئية - القائمة الثانية',
        description: 'تكملة شرح الأرجوزة المئية في السيرة النبوية.',
        url: 'https://www.youtube.com/embed/videoseries?list=PLClZ7RmnwNVPjHwsbEJz_hG__Ng9n5D8P',
        filter: 'السيرة النبوية'
      },
      {
        id: 'seera-pdf',
        type: 'pdf',
        title: 'متن الأرجوزة المئية',
        description: 'متن الأرجوزة المئية للإمام ابن أبي العز الحنفي.',
        url: 'https://eu.docs.wps.com/module/common/preview/?sid=sIHuA-9nOAt2kt8kG',
        filter: 'السيرة النبوية'
      },
      {
        id: 'adab-v1',
        type: 'video',
        title: 'شرح حلية طالب العلم - القائمة الأولى',
        description: 'سلسلة دروس شرح كتاب حلية طالب العلم للشيخ بكر أبو زيد.',
        url: 'https://www.youtube.com/embed/videoseries?list=PL6GsantY-djKDlIOY0LcmUpb_uaEJ3c9X',
        filter: 'آداب طالب العلم'
      },
      {
        id: 'adab-v2',
        type: 'video',
        title: 'شرح حلية طالب العلم - القائمة الثانية',
        description: 'تكملة شرح كتاب حلية طالب العلم.',
        url: 'https://www.youtube.com/embed/videoseries?list=PLSxDHjyvWV9pWVUpVEjX9EYZdNvjHv46c',
        filter: 'آداب طالب العلم'
      },
      {
        id: 'adab-v3',
        type: 'video',
        title: 'أدب الهاتف',
        description: 'درس في آداب استخدام الهاتف لطالب العلم.',
        url: 'https://ar.islamway.net/book/32275/%D8%A3%D8%AF%D8%A8-%D8%A7%D9%84%D9%87%D8%A7%D8%AA%D9%81',
        filter: 'آداب طالب العلم'
      },
      {
        id: 'adab-pdf',
        type: 'pdf',
        title: 'كتاب حلية طالب العلم',
        description: 'كتاب حلية طالب العلم للشيخ بكر أبو زيد.',
        url: '/15_BAAboZaid_HelitTalebIlm.pdf',
        filter: 'آداب طالب العلم'
      },
      {
        id: 'fiqh-maraa-pdf',
        type: 'pdf',
        title: 'كتاب جلباب المرأة المسلمة',
        description: 'كتاب جلباب المرأة المسلمة في الكتاب والسنة للإمام الألباني.',
        url: '/جلباب المرأة المسلمة في الكتاب والسنة_78645_Foulabook.com_.pdf',
        filter: 'فقه المرأة'
      },
      {
        id: 'fiqh-ibadat-v1',
        type: 'video',
        title: 'صفة صلاة النبي',
        description: 'شرح كتاب صفة صلاة النبي للإمام الألباني.',
        url: 'https://archive.org/embed/sifatsalatelnabi',
        filter: 'فقه العبادات'
      }
    ]
  },
  { id: 2, title: 'المستوى الثاني', description: 'سيتم فتحها قريباً بعد إتمام المرحلة السابقة.', isUnlocked: false, content: [] },
  { id: 3, title: 'المستوى الثالث', description: 'محتوى متقدم في العقيدة والفقه.', isUnlocked: false, content: [] },
  { id: 4, title: 'المستوى الرابع', description: 'تعمق في علوم القرآن الكريم.', isUnlocked: false, content: [] },
  { id: 5, title: 'المستوى الخامس', description: 'دراسة السيرة النبوية العطرة.', isUnlocked: false, content: [] },
  { id: 6, title: 'المستوى السادس', description: 'تزكية النفس والأخلاق الإسلامية.', isUnlocked: false, content: [] },
  { id: 7, title: 'المستوى السابع', description: 'الختام ومنح شهادة الاجتياز.', isUnlocked: false, content: [] },
];

export const COUNTRIES = [
  'المملكة العربية السعودية',
  'مصر',
  'الإمارات العربية المتحدة',
  'الكويت',
  'قطر',
  'عمان',
  'البحرين',
  'الأردن',
  'المغرب',
  'الجزائر',
  'تونس',
  'أخرى'
];
