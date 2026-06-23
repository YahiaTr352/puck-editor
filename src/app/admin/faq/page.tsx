"use client";

import React, { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../../../puck/config";

const initialFaqData = {
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

export default function FAQAdminEditor() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("puck-faq-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.content && Array.isArray(parsed.content)) {
          setData(parsed);
        } else {
          setData(initialFaqData);
        }
      } catch (e) {
        setData(initialFaqData);
      }
    } else {
      setData(initialFaqData);
    }
  }, []);

  const handleSave = async (newData: any) => {
    localStorage.setItem("puck-faq-data", JSON.stringify(newData));
    alert("تم حفظ التعديلات بنجاح");
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
        جاري تحميل محرر الأسئلة الشائعة...
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", direction: "ltr" }}>
      <Puck config={config} data={data} onPublish={handleSave} />
    </div>
  );
}
