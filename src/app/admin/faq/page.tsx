"use client";

import React, { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../../../puck/config";
import { getPageData, savePageData } from "../../actions";

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
        subtitle: "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات، التصحيح، التخصيص، والأسعار. لم تجد إجابتك؟ فريقنا جاهز لمساعدتك.",
        categories: (config.components.FAQ as any).defaultProps?.categories || []
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const dbData = await getPageData("faq");
        if (dbData && dbData.puckData) {
          const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
          if (parsed.content && Array.isArray(parsed.content)) {
            const migratedContent = parsed.content.map((item: any) => {
              if (item.type === "FAQ") {
                const updatedProps = { ...item.props };
                if (!updatedProps.categories || updatedProps.categories.length === 0) {
                  updatedProps.categories = (config.components.FAQ as any).defaultProps?.categories || [];
                }
                if (updatedProps.title === undefined) {
                  updatedProps.title = (config.components.FAQ as any).defaultProps?.title || "";
                }
                if (updatedProps.subtitle === undefined) {
                  updatedProps.subtitle = (config.components.FAQ as any).defaultProps?.subtitle || "";
                }
                return { ...item, props: updatedProps };
              }
              return item;
            });
            setData({ ...parsed, content: migratedContent });
          } else {
            setData(initialFaqData);
          }
        } else {
          setData(initialFaqData);
        }
      } catch (e) {
        console.error("Failed to load page data:", e);
        setData(initialFaqData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (newData: any) => {
    try {
      const pageTitle = newData.root?.props?.title || "الأسئلة الشائعة - Examy";
      await savePageData("faq", pageTitle, newData);
      alert("تم حفظ التعديلات بنجاح في قاعدة البيانات PostgreSQL!");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء حفظ التعديلات في قاعدة البيانات.");
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
        جاري تحميل محرر الأسئلة الشائعة...
      </div>
    );
  }

  const faqConfig = { ...config } as any;
  const { Nav, FAQ, Footer } = config.components;
  faqConfig.components = { Nav, FAQ, Footer };

  return (
    <div style={{ height: "100vh", direction: "ltr" }} className="puck-editor-theme-override">
      <Puck
        config={faqConfig}
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
