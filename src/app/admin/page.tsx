"use client";

import React, { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../../puck/config";

// بيانات المكونات الأصلية المتكاملة لمنصة Examy
const initialData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجاناً",
        ctaLink: "#cta",
        links: [
          { label: "المنتج", href: "#features" },
          { label: "كيف يعمل", href: "#how" },
          { label: "الأسعار", href: "#pricing" },
          { label: "الأسئلة الشائعة", href: "#faq" }
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
      type: "HowItWorks",
      props: {
        eyebrowText: "كيف يعمل",
        title: "أربع خطوات. اختبارٌ كامل.",
        subtitle: "من فكرة في رأس المعلم إلى اختبار جاهز للطلاب — مساعدُك في كل خطوة.",
        steps: [
          {
            n: "01",
            t: "صِف الاختبار",
            d: "اكتب وصفاً بالعربية، أو اختر من القوالب. حدّد المادة والصف والعدد.",
            iconName: "Edit"
          },
          {
            n: "02",
            t: "يولّد الذكاء الاصطناعي",
            d: "يُنشئ النظام الأسئلة من بنك مرتبط بالمنهج السعودي ونواتج التعلم.",
            iconName: "Brain"
          },
          {
            n: "03",
            t: "راجع وعدّل",
            d: "حرّر أي سؤال، بدّل المستوى البلومي، أو أضف نماذج (A/B) بضغطة.",
            iconName: "Layers"
          },
          {
            n: "04",
            t: "شارك وحلّل",
            d: "أرسل للطلاب، صحّح آلياً، واحصل على تحليلات الأداء فوراً.",
            iconName: "Chart"
          }
        ],
        id: "how-it-works"
      }
    },
    {
      type: "FeatureTabs",
      props: {
        id: "feature-tabs"
      }
    },
    {
      type: "Stats",
      props: {
        id: "stats-banner",
        eyebrowText: "أرقام تتحدّث",
        title: "آلاف المعلمين يستخدمون اختباري يومياً",
        items: [
          { label: "دقّة في التوليد", sub: "نتائج مراجعة من خبراء تربويين" },
          { label: "اختبار شهرياً", sub: "يُنشَأ على اختباري" },
          { label: "معلم ومعلمة", sub: "يستخدمون المنصة يومياً" },
          { label: "مدرسة وجامعة", sub: "في المملكة العربية السعودية" }
        ]
      }
    },

    {
      type: "FinalCTA",
      props: {
        id: "final-cta",
        title: "جاهز لتختصر وقتك و",
        titleAccent: "تطوّر طريقتك",
        titleSuffix: " في الاختبارات؟",
        subtitle: "ابدأ مجاناً اليوم. لا حاجة لبطاقة ائتمان — ٥ اختبارات شهرياً للأبد.",
        ctas: [
          { label: "ابدأ مجاناً الآن", href: "#", variant: "primary" },
          { label: "تحدّث مع المبيعات", href: "#", variant: "ghost" }
        ],
        features: [
          { value: "مجاني للأبد" },
          { value: "دعم بالعربية" },
          { value: "مستضاف في السعودية" }
        ]
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

export default function AdminEditor() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("puck-page-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // التحقق من أن الهيكل متوافق وإلا تحميل الافتراضي
        if (parsed.content && Array.isArray(parsed.content)) {
          const migratedContent = parsed.content.map((item: any) => {
            if (item.type === "Nav") {
              const updatedProps = { ...item.props };
              if (!updatedProps.links) {
                updatedProps.links = [
                  { label: "المنتج", href: "#features" },
                  { label: "كيف يعمل", href: "#how" },
                  { label: "الأسعار", href: "#pricing" },
                  { label: "الأسئلة الشائعة", href: "#faq" }
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
            if (item.type === "Hero") {
              const updatedProps = { ...item.props };
              if (!updatedProps.ctas) {
                updatedProps.ctas = [
                  {
                    label: updatedProps.primaryCtaText || "ابدأ مجاناً الآن",
                    href: updatedProps.primaryCtaLink || "#cta",
                    variant: "primary"
                  },
                  {
                    label: updatedProps.secondaryCtaText || "شاهد كيف يعمل",
                    href: updatedProps.secondaryCtaLink || "#how",
                    variant: "secondary"
                  }
                ];
              }
              delete updatedProps.primaryCtaText;
              delete updatedProps.primaryCtaLink;
              delete updatedProps.secondaryCtaText;
              delete updatedProps.secondaryCtaLink;
              return { ...item, props: updatedProps };
            }
            if (item.type === "HowItWorks") {
              const updatedProps = { ...item.props };
              if (!updatedProps.eyebrowText) {
                updatedProps.eyebrowText = "كيف يعمل";
              }
              if (!updatedProps.title) {
                updatedProps.title = "أربع خطوات. اختبارٌ كامل.";
              }
              if (!updatedProps.subtitle) {
                updatedProps.subtitle = "من فكرة في رأس المعلم إلى اختبار جاهز للطلاب — مساعدُك في كل خطوة.";
              }
              if (!updatedProps.steps || updatedProps.steps.length === 0) {
                updatedProps.steps = [
                  {
                    n: "01",
                    t: "صِف الاختبار",
                    d: "اكتب وصفاً بالعربية، أو اختر من القوالب. حدّد المادة والصف والعدد.",
                    iconName: "Edit",
                  },
                  {
                    n: "02",
                    t: "يولّد الذكاء الاصطناعي",
                    d: "يُنشئ النظام الأسئلة من بنك مرتبط بالمنهج السعودي ونواتج التعلم.",
                    iconName: "Brain",
                  },
                  {
                    n: "03",
                    t: "راجع وعدّل",
                    d: "حرّر أي سؤال، بدّل المستوى البلومي، أو أضف نماذج (A/B) بضغطة.",
                    iconName: "Layers",
                  },
                  {
                    n: "04",
                    t: "شارك وحلّل",
                    d: "أرسل للطلاب، صحّح آلياً، واحصل على تحليلات الأداء فوراً.",
                    iconName: "Chart",
                  },
                ];
              }
              return { ...item, props: updatedProps };
            }
            if (item.type === "FeatureTabs") {
              const updatedProps = { ...item.props };
              if (!updatedProps.eyebrowText) {
                updatedProps.eyebrowText = "كل ما تحتاجه";
              }
              if (!updatedProps.title) {
                updatedProps.title = "كل احتياجات الاختبار في مكانٍ واحد";
              }
              if (!updatedProps.subtitle) {
                updatedProps.subtitle = "تصفّح المزايا واحدةً واحدة — كل تبويبٍ يكشف لك كيف يعمل داخل المنصة.";
              }
              if (!updatedProps.tabs || updatedProps.tabs.length === 0) {
                updatedProps.tabs = [
                  {
                    short: "المنهج السعودي",
                    t: "مرتبط بالمنهج السعودي",
                    d: "كل اختبار مبنيٌّ على بنك أسئلة ضخم ونواتج تعلم رسمية معتمدة، مرتبطٍ مباشرةً بالمنهج السعودي ومراحله الدراسية.",
                    iconName: "Saudi",
                    visualName: "Curriculum",
                    bullets: [
                      { value: "بنك أسئلة معتمد لكل مادة" },
                      { value: "نواتج تعلم رسمية ١٤٤٧هـ" },
                      { value: "تغطية لكل المراحل والصفوف" }
                    ]
                  },
                  {
                    short: "تحليلات",
                    t: "تحليلات عميقة",
                    d: "تقارير أداء دقيقة على مستوى الطالب والفصل والمادة، تكشف نقاط القوة والضعف وتساعدك على اتخاذ قرارٍ مبنيٍّ على البيانات.",
                    iconName: "Chart",
                    visualName: "Analytics",
                    bullets: [
                      { value: "أداء على مستوى الطالب والفصل" },
                      { value: "تحليل لكل مهارة ودرس" },
                      { value: "تصدير التقارير ومشاركتها" }
                    ]
                  },
                  {
                    short: "مستويات بلوم",
                    t: "مستويات بلوم",
                    d: "تنويع تلقائي ذكي للأسئلة عبر مستويات بلوم الستة — من التذكّر حتى الإبداع — لاختبارٍ متوازنٍ يقيس الفهم الحقيقي.",
                    iconName: "Layers",
                    visualName: "Bloom",
                    bullets: [
                      { value: "توزيع متوازن للأسئلة" },
                      { value: "تحكّم في نسبة كل مستوى" },
                      { value: "قياس مهارات التفكير العليا" }
                    ]
                  },
                  {
                    short: "التصحيح الآلي",
                    t: "تصحيح آلي + OMR",
                    d: "صحّح الاختبارات الإلكترونية لحظياً، والورقية عبر الماسح الضوئي بتقنية OMR — دقّةٌ عالية ووقتٌ موفور.",
                    iconName: "Shield",
                    visualName: "OMR",
                    bullets: [
                      { value: "تصحيح أونلاين فوري" },
                      { value: "مسح ضوئي OMR للورقي" },
                      { value: "نتائج ودرجات تلقائية" }
                    ]
                  },
                  {
                    short: "قوالب جاهزة",
                    t: "قوالب جاهزة",
                    d: "مكتبة قوالب احترافية لكل المراحل والمواد، قابلة للتخصيص الكامل لتبدأ من نقطةٍ متقدمة في ثوانٍ.",
                    iconName: "Bookmark",
                    visualName: "Templates",
                    bullets: [
                      { value: "قوالب لكل مرحلة ومادة" },
                      { value: "تخصيص كامل للشكل والمحتوى" },
                      { value: "احفظ قوالبك الخاصة" }
                    ]
                  },
                  {
                    short: "مشاركة فورية",
                    t: "مشاركة فوريّة",
                    d: "أرسل الاختبار لطلابك في لحظة — عبر رابط مباشر، رمز QR، أو من داخل المنصة — دون أي تعقيد.",
                    iconName: "Users",
                    visualName: "Share",
                    bullets: [
                      { value: "رابط مباشر قابل للنسخ" },
                      { value: "رمز QR للمشاركة السريعة" },
                      { value: "إرسال داخل المنصة للطلاب" }
                    ]
                  }
                ];
              }
              return { ...item, props: updatedProps };
            }
            if (item.type === "Stats") {
              const updatedProps = { ...item.props };
              if (!updatedProps.eyebrowText) {
                updatedProps.eyebrowText = "أرقام تتحدّث";
              }
              if (!updatedProps.title) {
                updatedProps.title = "آلاف المعلمين يستخدمون اختباري يومياً";
              }
              if (!updatedProps.items) {
                updatedProps.items = [
                  {
                    label: updatedProps.stat1Label || "دقّة في التوليد",
                    sub: updatedProps.stat1Sub || "نتائج مراجعة من خبراء تربويين",
                  },
                  {
                    label: updatedProps.stat2Label || "اختبار شهرياً",
                    sub: updatedProps.stat2Sub || "يُنشَأ على اختباري",
                  },
                  {
                    label: updatedProps.stat3Label || "معلم ومعلمة",
                    sub: updatedProps.stat3Sub || "يستخدمون المنصة يومياً",
                  },
                  {
                    label: updatedProps.stat4Label || "مدرسة وجامعة",
                    sub: updatedProps.stat4Sub || "في المملكة العربية السعودية",
                  },
                ];
              }
              delete updatedProps.stat1Label;
              delete updatedProps.stat1Sub;
              delete updatedProps.stat2Label;
              delete updatedProps.stat2Sub;
              delete updatedProps.stat3Label;
              delete updatedProps.stat3Sub;
              delete updatedProps.stat4Label;
              delete updatedProps.stat4Sub;
              return { ...item, props: updatedProps };
            }
            if (item.type === "FinalCTA") {
              const updatedProps = { ...item.props };
              if (!updatedProps.title) {
                updatedProps.title = "جاهز لتختصر وقتك و";
              }
              if (!updatedProps.titleAccent) {
                updatedProps.titleAccent = "تطوّر طريقتك";
              }
              if (!updatedProps.titleSuffix) {
                updatedProps.titleSuffix = " في الاختبارات؟";
              }
              if (!updatedProps.subtitle) {
                updatedProps.subtitle = "ابدأ مجاناً اليوم. لا حاجة لبطاقة ائتمان — ٥ اختبارات شهرياً للأبد.";
              }
              if (!updatedProps.ctas || updatedProps.ctas.length === 0) {
                updatedProps.ctas = [
                  { label: "ابدأ مجاناً الآن", href: "#", variant: "primary" },
                  { label: "تحدّث مع المبيعات", href: "#", variant: "ghost" }
                ];
              }
              if (!updatedProps.features || updatedProps.features.length === 0) {
                updatedProps.features = [
                  { value: "مجاني للأبد" },
                  { value: "دعم بالعربية" },
                  { value: "مستضاف في السعودية" }
                ];
              }
              return { ...item, props: updatedProps };
            }
            return item;
          }).filter((item: any) => item && item.type !== "FAQ" && item.type !== "Showcase" && item.type !== "Testimonials" && item.type !== "Pricing");
          setData({ ...parsed, content: migratedContent });
        } else {
          setData(initialData);
        }
      } catch (e) {
        setData(initialData);
      }
    } else {
      setData(initialData);
    }
  }, []);

  const handleSave = async (newData: any) => {
    localStorage.setItem("puck-page-data", JSON.stringify(newData));
    alert("تم حفظ تصميم الصفحة محلياً بنجاح! يمكنك الآن ربطها بـ Laravel APIs لحفظها بشكل دائم.");
  };

  if (!data) {
    return (
      <div style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        fontSize: "1.2rem",
        color: "#64748b"
      }}>
        جاري تحميل المحرر البصري لـ Examy...
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", direction: "ltr" }}>
      < Puck config={config} data={data} onPublish={handleSave} />
    </div>
  );
}
