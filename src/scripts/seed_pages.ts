import { getPayload } from 'payload';
import config from '../../payload.config';

const initialHomeData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
        links: [
          { label: "الميزات", href: "/#features" },
          { label: "الأسعار", href: "/#pricing" },
          { label: "كيف يعمل", href: "/#how_it_works" },
          { label: "القوالب الجاهزة", href: "/#actual-models" }
        ],
        id: "nav-header"
      }
    },
    {
      type: "Hero",
      props: {
        variant: "aurora",
        badgeText: "منصة سعودية · مدعومة بالذكاء الاصطناعي",
        title: "اختبارُك جاهزٌ خلال دقيقة",
        gradientText: "حسب المنهج السعودي",
        subtitle: "منصة ذكاء اصطناعي تُولّد الاختبارات وتُديرها وتُحلّل نتائجها — مرتبطة بنواتج التعلم ومستويات بلوم، تختصر ساعاتٍ من الإعداد إلى دقائق.",
        ctas: [
          { label: "ابدأ مجاناً الآن", href: "#cta", variant: "primary" },
          { label: "شاهد كيف يعمل", href: "#how", variant: "secondary" }
        ],
        id: "hero-section"
      }
    },
    {
      type: "Footer",
      props: {
        id: "footer-block"
      }
    }
  ],
  root: {
    props: {
      title: "الصفحة الرئيسية - Examy"
    }
  }
};

const initialFaqData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
        links: [
          { label: "المنتج", href: "/" },
          { label: "كيف يعمل", href: "/#how" },
          { label: "الأسعار", href: "/#pricing" },
          { label: "الأسئلة الشائعة", href: "/faq" }
        ],
        id: "nav-header"
      }
    },
    {
      type: "FAQ",
      props: {
        id: "faq-block",
        categories: []
      }
    },
    {
      type: "Footer",
      props: {
        id: "footer-block"
      }
    }
  ],
  root: {
    props: {
      title: "الأسئلة الشائعة - Examy"
    }
  }
};

async function run() {
  const payload = await getPayload({ config });

  // 1. Seed home page
  const homeRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } }
  });
  if (homeRes.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      draft: false,
      data: {
        title: 'الصفحة الرئيسية - Examy',
        slug: 'home',
        status: 'published',
        puckData: initialHomeData
      }
    });
    console.log('Seeded: home page');
  } else {
    console.log('Skipped: home page already exists');
  }

  // 2. Seed faq page
  const faqRes = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'faq' } }
  });
  if (faqRes.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      draft: false,
      data: {
        title: 'الأسئلة الشائعة - Examy',
        slug: 'faq',
        status: 'published',
        puckData: initialFaqData
      }
    });
    console.log('Seeded: faq page');
  } else {
    console.log('Skipped: faq page already exists');
  }

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
