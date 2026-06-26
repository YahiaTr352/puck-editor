"use client";

import React, { useState, useEffect } from "react";
import { Render } from "@puckeditor/core";
import { config } from "../puck/config";
import { getPageData } from "./actions";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const dbData = await getPageData("home");
        if (dbData && dbData.puckData) {
          const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
          if (parsed.content) {
            const migratedContent = parsed.content.map((item: any) => {
              if (item.type === "Nav") {
                const updatedProps = { ...item.props };
                if (!updatedProps.links) {
                  updatedProps.links = [
                    { label: "المنتج", href: "#features" },
                    { label: "كيف يعمل", href: "#how" },
                    { label: "الأسعار", href: "#pricing" },
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
            setData(fallbackData);
          }
        } else {
          setData(fallbackData);
        }
      } catch (e) {
        console.error("Error loading page data from DB:", e);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !data) {
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
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="/admin?slug=home" style={{
            backgroundColor: "#00E08A",
            color: "#06120E",
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "0.85rem",
            transition: "background 0.2s"
          }}>
            تعديل الصفحة الرئيسية 🛠️
          </a>
          <a href="/admin?slug=faq" style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "#ffffff",
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "0.85rem",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "background 0.2s"
          }}>
            تعديل صفحة الأسئلة الشائعة 🛠️
          </a>
        </div>
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
