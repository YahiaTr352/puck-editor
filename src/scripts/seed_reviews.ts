import { getPayload } from 'payload';
import config from '../../payload.config';

const LA_EVENTS = [
  { type: 'review', name: 'أ. منيرة العتيبي', role: 'معلمة رياضيات', avatar: 'م',
    body: 'كنت أقضي ٣ ساعات لإعداد اختبار — الآن في ١٠ دقائق بجودة أعلى.' },
  { type: 'subscribe', name: 'خالد من الرياض', plan: 'الباقة الاحترافية', avatar: 'خ', role: 'معلم رياضيات' },
  { type: 'create', name: 'معلّم في جدة', subject: 'علوم · سادس ابتدائي', avatar: 'ج', count: 24, role: 'معلم علوم' },

  { type: 'review', name: 'د. عبدالله الحربي', role: 'مدير مدرسة', avatar: 'ع',
    body: 'التقارير على مستوى المادة والفصل غيّرت طريقة اتخاذ قراراتنا.' },
  { type: 'subscribe', name: 'نورة من الدمام', plan: 'باقة المدارس', avatar: 'ن', role: 'مديرة مدرسة' },
  { type: 'create', name: 'معلّمة في أبها', subject: 'لغة عربية · متوسط', avatar: 'أ', count: 18, role: 'معلمة لغة عربية' },

  { type: 'review', name: 'أ. سارة القحطاني', role: 'مشرفة لغة عربية', avatar: 'س',
    body: 'الربط بنواتج التعلم الرسمية وفّر علينا أسابيع كاملة.' },
  { type: 'subscribe', name: 'فهد من مكة', plan: 'الباقة الاحترافية', avatar: 'ف', role: 'معلم فيزياء' },
  { type: 'create', name: 'معلّم في تبوك', subject: 'فيزياء · ثانوي', avatar: 'ت', count: 30, role: 'معلم فيزياء' },

  { type: 'review', name: 'أ. خالد الزهراني', role: 'معلم علوم', avatar: 'خ',
    body: 'نماذج (A/B) جعلت التصحيح عادلاً ومنعت الغش — تحفة.' },
  { type: 'subscribe', name: 'هند من القصيم', plan: 'باقة المدارس', avatar: 'ه', role: 'معلمة' },
  { type: 'create', name: 'معلّمة في حائل', subject: 'رياضيات · رابع ابتدائي', avatar: 'ح', count: 15, role: 'معلمة رياضيات' },
];

async function run() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: 'reviews',
    limit: 1,
  });

  if (existing.docs.length === 0) {
    console.log('Seeding reviews...');
    for (const ev of LA_EVENTS) {
      await payload.create({
        collection: 'reviews',
        data: {
          name: ev.name,
          type: ev.type,
          role: ev.role,
          avatar: ev.avatar,
          body: ev.body || undefined,
          plan: ev.plan || undefined,
          subject: ev.subject || undefined,
          count: ev.count || undefined,
        },
      });
      console.log(`Seeded review/event: ${ev.name}`);
    }
    console.log('Seeding reviews finished successfully.');
  } else {
    console.log('Skipped: reviews collection already has records.');
  }

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
