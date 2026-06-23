"use client";

import React, { useState, useEffect } from "react";
import { Render } from "@puckeditor/core";
import { config } from "../puck/config";

import { AmbientBackground } from "../components/AmbientBackground";
import { LiveActivity } from "../components/LiveActivity";

const fallbackData = {
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
      type: "Showcase",
      props: {
        id: "showcase-interactive"
      }
    },
    {
      type: "Stats",
      props: {
        id: "stats-banner"
      }
    },
    {
      type: "Testimonials",
      props: {
        id: "testimonials-block"
      }
    },
    {
      type: "FAQ",
      props: {
        id: "faq-block"
      }
    },
    {
      type: "Pricing",
      props: {
        id: "pricing-block"
      }
    },
    {
      type: "FinalCTA",
      props: {
        id: "final-cta"
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

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedData = localStorage.getItem("puck-page-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // التحقق من صحة الهيكل وتواجد مكون الهيرو
        if (parsed.content && parsed.content.some((item: any) => item.type === "Hero")) {
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
            return item;
          });
          setData({ ...parsed, content: migratedContent });
        } else {
          setData(fallbackData);
        }
      } catch (e) {
        setData(fallbackData);
      }
    } else {
      setData(fallbackData);
    }
  }, []);

  if (!data) {
    return (
      <div style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b"
      }}>
        جاري تحميل الصفحة...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* الخلفية التفاعلية المضيئة المرفقة بالتصميم الأصلي */}
      <AmbientBackground bgStyle="fluid" intensity={75} blur={60} speed={100} grain={true} mesh={false} />

      {/* شريط توجيهي علوي يربط بين الصفحة والمحرر البصري */}
      <div style={{
        backgroundColor: "rgba(12, 24, 21, 0.95)",
        color: "#ffffff",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.95rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        direction: "rtl",
        position: "relative",
        zIndex: 100
      }}>
        <span>💡 هذه هي الصفحة العامة للزوار. تم تصميمها بالكامل بواسطة Puck Editor!</span>
        <a href="/admin" style={{
          backgroundColor: "#00E08A",
          color: "#06120E",
          padding: "8px 16px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "0.85rem",
          transition: "background 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
        onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
        >
          دخول لوحة تحكم المحرر البصري 🛠️
        </a>
      </div>

      {/* عرض مكونات Puck البصرية بكامل عرض الشاشة ودون حواجز مقيدة */}
      <div style={{ direction: "rtl", width: "100%" }}>
        <Render config={config} data={data} />
      </div>

      {/* الأنشطة الحية التفاعلية */}
      <LiveActivity />
    </div>
  );
}
