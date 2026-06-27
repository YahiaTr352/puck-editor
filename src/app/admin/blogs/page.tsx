"use client";

import React, { useState, useEffect } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../../../puck/config";
import { getPageData, savePageData } from "../../actions";

const initialBlogsData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
        links: [
          { label: "الميزات", href: "/#features" },
          { label: "الأسعار", href: "/#pricing" },
          { label: "كيف يعمل", href: "/#how_it_works" },
          { label: "القوالب الجاهزة", href: "/#actual-models" }
        ],
        id: "nav-header"
      }
    },
    {
      type: "BlogList",
      props: {
        id: "blogs-block",
        title: "مدوّنة اختباري التعليمية",
        subtitle: "نصائح وإرشادات تعليمية، مقالات متخصصة في الذكاء الاصطناعي والتقويم المدرسي لمساعدتك على التفوق.",
        posts: []
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
          { label: "المدوّنة", href: "/blogs" },
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
      title: "المدوّنة - Examy"
    }
  }
};

export default function BlogsAdminEditor() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const dbData = await getPageData("blogs");
        if (dbData && dbData.puckData) {
          const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
          if (parsed.content && Array.isArray(parsed.content)) {
            const migratedContent = parsed.content.map((item: any) => {
              if (item.type === "Nav") {
                const updatedProps = { ...item.props };
                updatedProps.links = [
                  { label: "الميزات", href: "/#features" },
                  { label: "الأسعار", href: "/#pricing" },
                  { label: "كيف يعمل", href: "/#how_it_works" },
                  { label: "القوالب الجاهزة", href: "/#actual-models" }
                ];
                if (!updatedProps.actions) {
                  updatedProps.actions = [
                    { label: "تسجيل دخول", href: "#login", variant: "link" },
                    { label: updatedProps.ctaText || "ابدأ مجاناً", href: updatedProps.ctaLink || "#cta", variant: "primary" }
                  ];
                }
                return { ...item, props: updatedProps };
              }
              if (item.type === "BlogList") {
                const updatedProps = { ...item.props };
                if (!updatedProps.posts || updatedProps.posts.length === 0) {
                  updatedProps.posts = [];
                }
                if (updatedProps.title === undefined || updatedProps.title === "") {
                  updatedProps.title = "مدوّنة اختباري التعليمية";
                }
                if (updatedProps.subtitle === undefined || updatedProps.subtitle === "") {
                  updatedProps.subtitle = "نصائح وإرشادات تعليمية، مقالات متخصصة في الذكاء الاصطناعي والتقويم المدرسي لمساعدتك على التفوق.";
                }
                return { ...item, props: updatedProps };
              }
              if (item.type === "Footer") {
                const updatedProps = { ...item.props };
                const defs = {
                  description: "منصة سعودية مدعومة بالذكاء الاصطناعي لإنشاء وإدارة الاختبارات، مرتبطة بالمنهج السعودي.",
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
                };
                Object.keys(defs).forEach(key => {
                  const val = updatedProps[key];
                  if (
                    val === undefined ||
                    val === null ||
                    val === "" ||
                    (Array.isArray(val) && val.length === 0)
                  ) {
                    updatedProps[key] = (defs as any)[key];
                  }
                });
                return { ...item, props: updatedProps };
              }
              return item;
            });
            setData({ ...parsed, content: migratedContent });
          } else {
            setData(initialBlogsData);
          }
        } else {
          setData(initialBlogsData);
        }
      } catch (e) {
        console.error("Failed to load page data:", e);
        setData(initialBlogsData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (newData: any) => {
    try {
      const pageTitle = newData.root?.props?.title || "المدوّنة - Examy";
      await savePageData("blogs", pageTitle, newData);
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
        جاري تحميل محرر المدوّنة...
      </div>
    );
  }

  const blogsConfig = { ...config } as any;
  const puckComponents = config.components || {};
  blogsConfig.components = {
    Nav: puckComponents.Nav,
    BlogList: puckComponents.BlogList,
    Footer: puckComponents.Footer
  };

  return (
    <div style={{ height: "100vh", direction: "ltr" }} className="puck-editor-theme-override">
      <Puck
        config={blogsConfig}
        data={data}
        onPublish={handleSave}
        overrides={{
          iframe: ({ children, document }: any) => {
            useEffect(() => {
              if (document) {
                document.documentElement.dir = "rtl";
                document.documentElement.lang = "ar";
                document.body.setAttribute("data-theme", "dark");
                document.body.setAttribute("data-anims", "on");
                document.body.className = "min-h-full flex flex-col";

                const copyStyles = () => {
                  const classId = "injected-parent-style";
                  document.querySelectorAll(`.${classId}`).forEach((el: any) => el.remove());
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
                const timeoutId = setTimeout(copyStyles, 250);
                const observer = new MutationObserver(copyStyles);
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
