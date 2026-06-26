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
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
        links: [
          { label: "المنتج", href: "#features" },
          { label: "كيف يعمل", href: "#how_it_works" },
          { label: "نماذج واقعية", href: "#actual-models" },
          { label: "الأسعار", href: "#pricing" },
          { label: "المدوّنة", href: "/blogs" },
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

export default function Home() {
  const [data, setData] = useState<any>(fallbackData);

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
                updatedProps.links = [
                  { label: "المنتج", href: "#features" },
                  { label: "كيف يعمل", href: "#how_it_works" },
                  { label: "نماذج واقعية", href: "#actual-models" },
                  { label: "الأسعار", href: "#pricing" },
                  { label: "المدوّنة", href: "/blogs" },
                  { label: "الأسئلة الشائعة", href: "/faq" }
                ];
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
            const filteredContent = migratedContent.filter((item: any) => item && item.type !== "FAQ");
            setData({ ...parsed, content: filteredContent });
          } else {
            setData(fallbackData);
          }
        } else {
          setData(fallbackData);
        }
      } catch (e) {
        console.error("Error loading page data from DB:", e);
        setData(fallbackData);
      }
    }
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <AmbientBackground bgStyle="fluid" intensity={75} blur={60} speed={100} grain={true} mesh={false} />
      <Render config={config} data={data} />
      <LiveActivity />
    </div>
  );
}
