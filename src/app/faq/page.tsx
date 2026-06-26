"use client";

import React, { useState, useEffect } from "react";
import { Render } from "@puckeditor/core";
import { config } from "../../puck/config";
import { getPageData } from "../actions";

import { AmbientBackground } from "../../components/AmbientBackground";
import { LiveActivity } from "../../components/LiveActivity";

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

export default function FAQPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const dbData = await getPageData("faq");
        if (dbData && dbData.puckData) {
          const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
          if (parsed.content) {
            const migratedContent = parsed.content.map((item: any) => {
              if (item.type === "Nav") {
                const updatedProps = { ...item.props };
                if (!updatedProps.links) {
                  updatedProps.links = [
                    { label: "المنتج", href: "/" },
                    { label: "كيف يعمل", href: "/#how" },
                    { label: "الأسعار", href: "/#pricing" },
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
                return { ...item, props: updatedProps };
              }
              return item;
            });
            setData({ ...parsed, content: migratedContent });
          } else {
            setData(faqFallbackData);
          }
        } else {
          setData(faqFallbackData);
        }
      } catch (e) {
        console.error("Error loading page data from DB:", e);
        setData(faqFallbackData);
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
        جاري تحميل صفحة الأسئلة الشائعة...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
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
        <span>💡 هذه هي صفحة الأسئلة الشائعة العامة للزوار. تم تصميمها بالكامل بواسطة Puck Editor!</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="/admin?slug=home" style={{
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
            تعديل الصفحة الرئيسية 🛠️
          </a>
          <a href="/admin?slug=faq" style={{
            backgroundColor: "#00E08A",
            color: "#06120E",
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "0.85rem",
            transition: "background 0.2s"
          }}>
            تعديل صفحة الأسئلة الشائعة 🛠️
          </a>
        </div>
      </div>

      <AmbientBackground bgStyle="fluid" intensity={75} blur={60} speed={100} grain={true} mesh={false} />
      <Render config={config} data={data} />
      <LiveActivity />
    </div>
  );
}
