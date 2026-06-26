"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../../puck/config";
import { getPageData, savePageData } from "../actions";

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
          { label: "الأسئلة الشائعة", href: "/faq" }
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
      type: "Testimonials",
      props: {
        id: "testimonials-block"
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
        id: "footer-block",
        description: "منصة سعودية مدعومة بالذكاء اصطناعي لإنشاء وإدارة الاختبارات، مرتبطة بالمنهج السعودي.",
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
      }
    }
  ],
  root: {
    props: {
      title: "الصفحة الرئيسية - Examy"
    }
  }
};

// بيانات الأسئلة الشائعة الافتراضية
const faqFallbackData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجاناً",
        ctaLink: "#cta",
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
        categories: (config.components.FAQ as any).defaultProps?.categories || []
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

function AdminEditorContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || "home";
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const dbData = await getPageData(slug);
        if (dbData && dbData.puckData) {
          const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
          
          // ترحيل البيانات للتأكد من توافق المكونات
          const migratedContent = parsed.content.map((item: any) => {
            if (item.type === "Nav") {
              const updatedProps = { ...item.props };
              if (!updatedProps.links) {
                updatedProps.links = [
                  { label: "المنتج", href: slug === "faq" ? "/" : "#features" },
                  { label: "كيف يعمل", href: slug === "faq" ? "/#how" : "#how" },
                  { label: "الأسعار", href: slug === "faq" ? "/#pricing" : "#pricing" },
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
            if (item.type === "FAQ") {
              const updatedProps = { ...item.props };
              if (!updatedProps.categories || updatedProps.categories.length === 0) {
                updatedProps.categories = (config.components.FAQ as any).defaultProps?.categories || [];
              }
              return { ...item, props: updatedProps };
            }
            return item;
          });
          const filteredContent = slug === "home" 
            ? migratedContent.filter((item: any) => item && item.type !== "FAQ")
            : migratedContent;
          setData({ ...parsed, content: filteredContent });
        } else {
          // تحميل البيانات الافتراضية
          setData(slug === "faq" ? faqFallbackData : initialData);
        }
      } catch (e) {
        console.error("Failed to load page data:", e);
        setData(slug === "faq" ? faqFallbackData : initialData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const handleSave = async (newData: any) => {
    try {
      const defaultTitle = slug === "faq" ? "الأسئلة الشائعة - Examy" : "الصفحة الرئيسية - Examy";
      const pageTitle = newData.root?.props?.title || defaultTitle;
      
      await savePageData(slug, pageTitle, newData);
      alert(`تم حفظ تصميم الصفحة (${slug}) بنجاح في قاعدة البيانات PostgreSQL!`);
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء حفظ الصفحة في قاعدة البيانات.");
    }
  };

  if (loading || !data) {
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
        جاري تحميل المحرر البصري لـ Examy ({slug})...
      </div>
    );
  }

  const editorConfig = { ...config } as any;
  if (slug === "home") {
    const { FAQ, ...restComponents } = config.components;
    editorConfig.components = restComponents;
  } else if (slug === "faq") {
    const { Nav, FAQ, Footer } = config.components;
    editorConfig.components = { Nav, FAQ, Footer };
  }

  return (
    <div style={{ height: "100vh", direction: "ltr" }} className="puck-editor-theme-override">
      <Puck
        config={editorConfig}
        data={data}
        onPublish={handleSave}
        overrides={{
          iframe: ({ children, document }: any) => {
            useEffect(() => {
              if (document) {
                // Ensure RTL layout for arabic translation inside the iframe preview canvas
                document.documentElement.dir = "rtl";
                document.documentElement.lang = "ar";
                
                // Examy styling system depends on these dark mode tokens and animations
                document.body.setAttribute("data-theme", "dark");
                document.body.setAttribute("data-anims", "on");
                document.body.className = "min-h-full flex flex-col";

                const copyStyles = () => {
                  const classId = "injected-parent-style";
                  // Clear previously copied style tags
                  document.querySelectorAll(`.${classId}`).forEach((el: any) => el.remove());

                  // Clone and inject all parent style/link rules to replicate visitor environment
                  window.parent.document.querySelectorAll('style, link[rel="stylesheet"]').forEach((styleEl) => {
                    try {
                      const clone = styleEl.cloneNode(true) as HTMLElement;
                      clone.classList.add(classId);
                      document.head.appendChild(clone);
                    } catch (e) {
                      console.error("Style injection error:", e);
                    }
                  });
                };

                copyStyles();
                // Delay copy to guarantee Dev Server Webpack/Turbopack injected stylesheet updates are synced
                const timeoutId = setTimeout(copyStyles, 250);
                const observer = new MutationObserver(copyStyles);

                // Observe parent head changes to hot-reload styles in iframe preview
                observer.observe(window.parent.document.head, {
                  childList: true,
                  subtree: true,
                });

                return () => {
                  clearTimeout(timeoutId);
                  observer.disconnect();
                };
              }
            }, [document]);

            return <>{children}</>;
          },
        }}
      />
    </div>
  );
}

export default function AdminEditor() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        fontSize: "1.2rem",
        color: "#64748b"
      }}>
        جاري تهيئة محرر Examy...
      </div>
    }>
      <AdminEditorContent />
    </Suspense>
  );
}
