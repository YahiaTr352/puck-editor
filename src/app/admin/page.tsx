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
        id: "faq-block"
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
            return item;
          });
          setData({ ...parsed, content: migratedContent });
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

  return (
    <div style={{ height: "100vh", direction: "ltr" }}>
      <Puck config={config} data={data} onPublish={handleSave} />
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
