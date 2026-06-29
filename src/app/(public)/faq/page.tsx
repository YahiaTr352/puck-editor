import React from "react";
import { getPageData } from "../../actions";
import { FAQClientView } from "./FAQClientView";

export const dynamic = "force-dynamic";

const DEFAULT_FAQ_CATEGORIES = [
  {
    label: "عن اختباري",
    iconName: "general",
    items: [
      { q: "ما هي منصة اختباري؟", a: "اختباري منصة ذكاء اصطناعي تساعد المعلمين والمعلمات على إنشاء الاختبارات وأوراق العمل خلال أقل من دقيقة، وفق المنهج السعودي، مع إمكانية تخصيص الاختبار وإخراجه بصيغة PDF جاهزة للطباعة." },
      { q: "هل أحتاج إلى خبرة تقنية لاستخدام المنصة؟", a: "لا. صُممت المنصة لتكون سهلة الاستخدام، ويمكن لأي معلم إنشاء اختبار خلال خطوات بسيطة دون أي خلفية تقنية." },
      { q: "هل يمكن استخدام المنصة من الجوال؟", a: "نعم. تعمل المنصة على الجوال والأجهزة اللوحية وأجهزة الكمبيوتر بكفاءة." },
      { q: "هل الذكاء الاصطناعي يغني عن دور المعلم؟", a: "لا. اختباري أداة تساعد المعلم وتختصر الوقت، بينما يبقى المعلم صاحب القرار النهائي في اختيار وتعديل واعتماد الأسئلة." }
    ]
  },
  {
    label: "إنشاء الاختبارات",
    iconName: "creation",
    items: [
      { q: "هل الأسئلة متوافقة مع المنهج السعودي؟", a: "نعم. يتم إنشاء الأسئلة بناءً على المنهج السعودي والدروس التي يحددها المعلم، مع مراعاة نواتج التعلم ومستويات الصعوبة المختلفة." },
      { q: "كم يستغرق إنشاء اختبار؟", a: "غالبًا أقل من دقيقة واحدة، حسب عدد الأسئلة والإعدادات المختارة." },
      { q: "هل يمكنني اختيار عدد الأسئلة؟", a: "نعم. يمكنك تحديد عدد الأسئلة المناسب لاحتياجك قبل إنشاء الاختبار." },
      { q: "ما أنواع الأسئلة التي تدعمها المنصة؟", a: "تدعم المنصة أنواعًا متعددة من الأسئلة تقابل مختلف أنماط التقويم:", list: [{ value: "الاختيار من متعدد" }, { value: "الصح والخطأ" }, { value: "أكمل الفراغ" }, { value: "المزاوجة (صل)" }, { value: "علِّل" }, { value: "الاستنتاج" }, { value: "الأسئلة المقالية" }, { value: "وغيرها من الأنماط التعليمية" }] },
      { q: "هل يمكن تعديل الأسئلة بعد إنشائها؟", a: "نعم. يمكنك تعديل الأسئلة أو حذفها أو إضافة أسئلة جديدة بسهولة قبل تصدير الاختبار." },
      { q: "هل توفر المنصة نموذج إجابة؟", a: "نعم. يتم إنشاء نموذج إجابة تلقائي مع كل اختبار." },
      { q: "هل يمكن إنشاء أكثر من نموذج للاختبار؟", a: "نعم. يمكنك إنشاء نماذج متعددة (A/B) لتقليل فرص الغش داخل الفصل." },
      { q: "هل الأسئلة مكررة أو منسوخة؟", a: "لا. يتم توليد الأسئلة ديناميكيًا وفق المعايير التعليمية والدروس المختارة، مع إمكانية إعادة التوليد للحصول على نماذج جديدة." },
      { q: "هل تدعم المنصة جميع المواد الدراسية؟", a: "نعم. تدعم معظم المواد الدراسية لجميع المراحل التعليمية وفق المناهج السعودية." },
      { q: "هل يمكن إنشاء أوراق عمل وليس اختبارات فقط؟", a: "نعم. يمكنك إنشاء أنواعًا متعددة من المحتوى التعليمي:", list: [{ value: "أوراق عمل" }, { value: "واجبات" }, { value: "تدريبات صفية" }, { value: "اختبارات قصيرة" }, { value: "اختبارات نهائية" }] }
    ]
  },
  {
    label: "التخصيص والإخراج",
    iconName: "customization",
    items: [
      { q: "هل يمكن إضافة شعار المدرسة وبياناتها？", a: "نعم. يمكنك تخصيص ترويسة الاختبار لتشمل بيانات مدرستك بالكامل:", list: [{ value: "شعار المدرسة" }, { value: "اسم المدرسة" }, { value: "اسم المعلم" }, { value: "اسم المدير" }, { value: "الفصل الدراسي" }, { value: "المادة الدراسية" }] },
      { q: "هل يمكن طباعة الاختبار مباشرة؟", a: "نعم. يتم تصدير الاختبار بصيغة PDF جاهزة للطباعة مباشرة." },
      { q: "هل تحفظ المنصة الاختبارات السابقة؟", a: "نعم. يتم حفظ اختباراتك داخل حسابك للرجوع إليها أو تعديلها لاحقًا." },
      { q: "هل يمكن مشاركة الاختبار إلكترونيًا؟", a: "نعم. يمكن مشاركة الاختبار إلكترونيًا مع الطلاب عبر رابط أو رمز QR بحسب نوع الاختبار." }
    ]
  },
  {
    label: "التصحيح والتحليلات",
    iconName: "grading",
    items: [
      { q: "هل توفر المنصة تصحيحًا آليًا للاختبارات؟", a: "نعم. تدعم المنصة الاختبارات الإلكترونية مع التصحيح الآلي وإظهار النتائج مباشرة." },
      { q: "هل تقدم المنصة تحليلات لنتائج الطلاب؟", a: "في الباقات المتقدمة توفر المنصة تحليلات تعليمية متكاملة:", list: [{ value: "تحليل أداء الطلاب" }, { value: "قياس نواتج التعلم" }, { value: "تحديد نقاط القوة والضعف" }, { value: "اقتراح خطط علاجية" }] },
      { q: "هل يمكن الاعتماد على اختباري في الاختبارات الرسمية؟", a: "نعم. يستخدم آلاف المعلمين المنصة لإنشاء اختباراتهم وأوراق عملهم اليومية والفصلية، مع إمكانية مراجعة وتعديل جميع الأسئلة قبل اعتمادها." },
      { q: "كم ساعة يمكن أن توفر عليّ المنصة؟", a: "يستطيع المعلم توفير عشرات الساعات خلال الفصل الدراسي عبر أتمتة إنشاء الاختبارات ونماذج الإجابة والتقارير التعليمية." }
    ]
  },
  {
    label: "الأسعار والبدء",
    iconName: "pricing",
    items: [
      { q: "هل توجد نسخة مجانية؟", a: "نعم. توفر المنصة باقة مجانية تتيح تجربة إنشاء أوراق العمل والاختبارات بحدود معينة." },
      { q: "كيف أبدأ باستخدام اختباري؟", a: "أنشئ حسابك مجانًا وابدأ في إنشاء أول اختبار خلال دقائق عبر الموقع: examy.ai" }
    ]
  }
];

const faqFallbackData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
        links: [
          { label: "المنتج", href: "/#features" },
          { label: "كيف يعمل", href: "/#how_it_works" },
          { label: "نماذج واقعية", href: "/#actual-models" },
          { label: "المدوّنة", href: "/blogs" },
          { label: "الأسئلة الشائعة", href: "/faq" }
        ],
        id: "nav-header"
      }
    },
    {
      type: "FAQ",
      props: {
        id: "faq-block",
        categories: DEFAULT_FAQ_CATEGORIES
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

export async function generateMetadata() {
  try {
    const dbData = await getPageData("faq");
    const puckData = dbData && dbData.puckData 
      ? (typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData)
      : null;
    const title = puckData?.root?.props?.title || (dbData as any)?.meta?.title || dbData?.title || "الأسئلة الشائعة - Examy";
    const faqBlock = puckData?.content?.find((c: any) => c.type === "FAQ");
    const description = puckData?.root?.props?.description || (dbData as any)?.meta?.description || faqBlock?.props?.subtitle || "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات والأسعار.";
    const keywords = (dbData as any)?.meta?.keywords || undefined;
    return {
      title,
      description,
      keywords,
    };
  } catch (e) {
    return {
      title: "الأسئلة الشائعة - Examy",
      description: "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات والأسعار.",
    };
  }
}

export default async function FAQPage() {
  let data = faqFallbackData;
  let homeNav: any = null;
  let homeFooter: any = null;

  // Fetch home layout first to sync Nav and Footer
  try {
    const homeData = await getPageData("home");
    if (homeData && homeData.puckData) {
      const parsedHome = typeof homeData.puckData === 'string' ? JSON.parse(homeData.puckData) : homeData.puckData;
      if (parsedHome.content) {
        homeNav = parsedHome.content.find((c: any) => c.type === "Nav");
        homeFooter = parsedHome.content.find((c: any) => c.type === "Footer");
      }
    }
  } catch (e) {
    console.error("Error loading home page for layout sync:", e);
  }

  try {
    const dbData = await getPageData("faq");
    if (dbData && dbData.puckData) {
      const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
      if (parsed.content) {
        const migratedContent = parsed.content.map((item: any) => {
          if (item.type === "Nav") {
            const updatedProps = { ...item.props };
            if (!updatedProps.links || updatedProps.links.length === 0) {
              updatedProps.links = [
                { label: "المنتج", href: "/#features" },
                { label: "كيف يعمل", href: "/#how_it_works" },
                { label: "نماذج واقعية", href: "/#actual-models" },
                { label: "المدوّنة", href: "/blogs" },
                { label: "الأسئلة الشائعة", href: "/faq" }
              ];
            }
            if (!updatedProps.actions) {
              updatedProps.actions = [
                { label: "تسجيل دخول", href: "#login", variant: "link" },
                { label: updatedProps.ctaText || "ابدأ مجاناً", href: updatedProps.ctaLink || "#cta", variant: "primary" }
              ];
            }
            return { ...item, props: updatedProps };
          }
          if (item.type === "FAQ") {
            const updatedProps = { ...item.props };
            if (!updatedProps.categories || updatedProps.categories.length === 0) {
              updatedProps.categories = (config.components.FAQ as any).defaultProps?.categories || [];
            }
            if (updatedProps.title === undefined || updatedProps.title === "") {
              updatedProps.title = "كل ما تريد معرفته عن اختباري";
            }
            if (updatedProps.subtitle === undefined || updatedProps.subtitle === "") {
              updatedProps.subtitle = "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات، التصحيح، التخصيص، والأسعار. لم تجد إجابتك? فريقنا جاهز لمساعدتك.";
            }
            return { ...item, props: updatedProps };
          }
          if (item.type === "Footer") {
            const updatedProps = { ...item.props };
            const defs = {
              description: "منصة سعودية مدعومة بالذكاء الاصطناعي لإنشاء وإدارة الاختبارات، مرتبطة بالمنهج السعودي.",
              twitterUrl: "https://x.com/examyai",
              instagramUrl: "https://www.instagram.com/examy.ai/",
              col1Title: "المنتج",
              col1Links: [
                { label: "الميزات", href: "#" },
                { label: "كيف يعمل", href: "#" },
                { label: "القوالب الجاهزة", href: "#" }
              ],
              col2Title: "لمن",
              col2Links: [
                { label: "للمعلمين", href: "#" },
                { label: "للمدارس", href: "#" },
                { label: "للجامعات", href: "#" },
                { label: "للجهات التعليمية", href: "#" }
              ],
              col3Title: "موارد",
              col3Links: [
                { label: "مركز المساعدة", href: "#" },
                { label: "المدوّنة", href: "#" },
                { label: "عن اختباري", href: "#" },
                { label: "تواصل معنا", href: "#" }
              ],
              col4Title: "الشركة",
              col4Links: [
                { label: "سياسة الخصوصية", href: "#" },
                { label: "الشروط والأحكام", href: "#" }
              ],
              copyrightText: "© ٢٠٢٦ اختباري · Examy. صُنع بحبٍّ في المملكة العربية السعودية 🇸🇦",
              statusText: "توليد ذكي وموثوق"
            };
            Object.keys(defs).forEach(key => {
              const val = updatedProps[key];
              if (
                val === undefined ||
                val === null ||
                val === "" ||
                (Array.isArray(val) && val.length === 0)
              ) {
                updatedProps[key] = (defs as any)[key];
              }
            });
            return { ...item, props: updatedProps };
          }
          return item;
        });
        data = { ...parsed, content: migratedContent };
      }
    }
  } catch (e) {
    console.error("Error loading page data from DB:", e);
  }

  // Sync Nav/Footer with home
  if (data.content) {
    data.content = data.content.map((item: any) => {
      if (item.type === "Nav" && homeNav) {
        return { ...item, props: { ...homeNav.props } };
      }
      if (item.type === "Footer" && homeFooter) {
        return { ...item, props: { ...homeFooter.props } };
      }
      return item;
    });
  }

  return <FAQClientView data={data} />;
}
