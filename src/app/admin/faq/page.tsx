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
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
        links: [
          { label: "المنتج", href: "/#features" },
          { label: "كيف يعمل", href: "/#how_it_works" },
          { label: "نماذج واقعية", href: "/#actual-models" },
          { label: "المدوّنة", href: "/blogs" },
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const dbData = await getPageData("faq");
        
        // Fetch homepage Nav and Footer props to keep header/footer unified
        const homeDbData = await getPageData("home", { draft: true });
        const homeData = homeDbData && homeDbData.puckData 
          ? (typeof homeDbData.puckData === 'string' ? JSON.parse(homeDbData.puckData) : homeDbData.puckData)
          : null;
        
        let homeNavProps: any = null;
        let homeFooterProps: any = null;
        if (homeData && homeData.content && Array.isArray(homeData.content)) {
          const navItem = homeData.content.find((item: any) => item.type === "Nav");
          if (navItem) homeNavProps = navItem.props;
          const footerItem = homeData.content.find((item: any) => item.type === "Footer");
          if (footerItem) homeFooterProps = footerItem.props;
        }

        if (dbData && dbData.puckData) {
          const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
          if (parsed.content && Array.isArray(parsed.content)) {
            const migratedContent = parsed.content.map((item: any) => {
              if (item.type === "Nav") {
                const updatedProps = homeNavProps ? { ...homeNavProps, id: item.props.id || "nav-header" } : { ...item.props };
                if (!updatedProps.links || updatedProps.links.length === 0) {
                  updatedProps.links = [
                    { label: "المنتج", href: "/#features" },
                    { label: "كيف يعمل", href: "/#how_it_works" },
                    { label: "نماذج واقعية", href: "/#actual-models" },
                    { label: "المدوّنة", href: "/blogs" },
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
                if (updatedProps.title === undefined || updatedProps.title === "") {
                  updatedProps.title = "كل ما تريد معرفته عن اختباري";
                }
                if (updatedProps.subtitle === undefined || updatedProps.subtitle === "") {
                  updatedProps.subtitle = "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات، التصحيح، التخصيص، والأسعار. لم تجد إجابتك؟ فريقنا جاهز لمساعدتك.";
                }
                return { ...item, props: updatedProps };
              }
              if (item.type === "Footer") {
                const updatedProps = homeFooterProps ? { ...homeFooterProps, id: item.props.id || "footer-block" } : { ...item.props };
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
            setData(initialFaqData);
          }
        } else {
          setData(initialFaqData);
        }
      } catch (e) {
        console.error("Failed to load page data:", e);
        setData(initialFaqData);
      }
    }
    loadData();
  }, []);

  const handleSave = async (newData: any) => {
    try {
      const pageTitle = newData.root?.props?.title || "الأسئلة الشائعة - Examy";
      await savePageData("faq", pageTitle, newData);
      alert("تم حفظ التعديلات بنجاح!");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء حفظ التعديلات.");
    }
  };

  const faqConfig = { ...config } as any;
  const puckComponents = config.components || {};
  faqConfig.components = {
    Nav: puckComponents.Nav,
    FAQ: puckComponents.FAQ,
    Footer: puckComponents.Footer
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
