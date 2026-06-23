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

export default function AdminEditor() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("puck-page-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // التحقق من أن الهيكل متوافق وإلا تحميل الافتراضي
        if (parsed.content && parsed.content.some((item: any) => item.type === "Hero" && item.props.badgeText)) {
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
            return item;
          });
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
