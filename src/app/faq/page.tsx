"use client";

import React, { useState, useEffect } from "react";
import { Render } from "@puckeditor/core";
import { config } from "../../puck/config";

import { AmbientBackground } from "../../components/AmbientBackground";
import { LiveActivity } from "../../components/LiveActivity";

const fallbackFaqData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجاناً",
        ctaLink: "#cta",
        links: [
          { label: "المنتج", href: "/#features" },
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
        id: "faq-component",
        title: "كل ما تريد معرفته عن اختباري",
        subtitle: "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات، التصحيح، التخصيص، والأسعار. لم تجد إجابتك؟ فريقنا جاهز لمساعدتك."
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
          { label: "الميزات", href: "/#features" },
          { label: "كيف يعمل", href: "/#how" },
          { label: "القوالب الجاهزة", href: "/#templates" }
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
      title: "الأسئلة الشائعة - Examy"
    }
  }
};

export default function FAQPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedData = localStorage.getItem("puck-faq-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.content && Array.isArray(parsed.content)) {
          setData(parsed);
        } else {
          setData(fallbackFaqData);
        }
      } catch (e) {
        setData(fallbackFaqData);
      }
    } else {
      setData(fallbackFaqData);
    }
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <AmbientBackground bgStyle="fluid" intensity={75} blur={60} speed={100} grain={true} mesh={false} />

      <div style={{ direction: "rtl", width: "100%" }}>
        <Render config={config} data={data} />
      </div>

      <LiveActivity />
    </div>
  );
}
