"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../../../puck/config";
import { getPageData, savePageData } from "../../actions";

const initialBlogDetailsData = {
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
      type: "BlogDetails",
      props: {
        id: "blog-details-block",
        title: "كيف يغير الذكاء الاصطناعي طرق التدريس في المدارس السعودية؟",
        subtitle: "دراسة شاملة عن أثر تقنيات الذكاء الاصطناعي التوليدي في تحسين جودة التعليم وتخفيف الأعباء الإدارية عن كاهل المعلمين.",
        date: "26 يونيو 2026",
        author: "أ. سارة الحربي",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
        content: ""
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
      title: "تفاصيل المقالة - Examy"
    }
  }
};

function BlogDetailsAdminContent() {
  const searchParams = useSearchParams();
  const articleSlug = searchParams.get("slug") || "default";
  const dbSlug = `blog-details-${articleSlug}`;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const dbData = await getPageData(dbSlug);
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
              if (item.type === "BlogDetails") {
                const updatedProps = { ...item.props };
                const defs = {
                  title: "كيف يغير الذكاء الاصطناعي طرق التدريس في المدارس السعودية؟",
                  subtitle: "دراسة شاملة عن أثر تقنيات الذكاء الاصطناعي التوليدي في تحسين جودة التعليم وتخفيف الأعباء الإدارية عن كاهل المعلمين.",
                  date: "26 يونيو 2026",
                  author: "أ. سارة الحربي",
                  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
                  content: ""
                };
                Object.keys(defs).forEach(key => {
                  const val = updatedProps[key];
                  if (val === undefined || val === null || val === "") {
                    updatedProps[key] = (defs as any)[key];
                  }
                });
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
            setData(initialBlogDetailsData);
          }
        } else {
          const customizedFallback: any = { ...initialBlogDetailsData };
          if (articleSlug === "ai-in-saudi-education") {
            customizedFallback.content = initialBlogDetailsData.content.map(item => {
              if (item.type === "BlogDetails") {
                return {
                  ...item,
                  props: {
                    ...item.props,
                    title: "كيف يغير الذكاء الاصطناعي طرق التدريس في المدارس السعودية؟",
                    subtitle: "دراسة شاملة عن أثر تقنيات الذكاء الاصطناعي التوليدي في تحسين جودة التعليم وتخفيف الأعباء الإدارية عن كاهل المعلمين.",
                    date: "26 يونيو 2026",
                    author: "أ. سارة الحربي",
                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
                  }
                };
              }
              return item;
            });
          } else if (articleSlug === "balanced-exam-design") {
            customizedFallback.content = initialBlogDetailsData.content.map(item => {
              if (item.type === "BlogDetails") {
                return {
                  ...item,
                  props: {
                    ...item.props,
                    title: "دليلك الشامل لتصميم اختبار مدرسي متوازن",
                    subtitle: "نستعرض في هذا المقال جدول المواصفات، ومستويات بلوم المعرفية، وكيفية صياغة أسئلة تقيس الفهم الفعلي للطلاب.",
                    date: "24 يونيو 2026",
                    author: "د. خالد السديري",
                    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
                    content: `إن إعداد اختبار مدرسي متوازن يتطلب دقة ومنهجية واضحة. يعتبر جدول المواصفات الأداة الأساسية لضمان تغطية الاختبار لجميع الفصول الدراسية ونواتج التعلم المستهدفة بنسب متزنة.

مستويات بلوم المعرفية:
1. التذكر: قياس مدى قدرة الطالب على استرجاع المعلومات.
2. الفهم: قياس استيعاب المفاهيم الأساسية وشرحها.
3. التطبيق: استخدام المعرفة في مواقف جديدة.
4. التحليل: تفكيك المعلومات إلى أجزاء وتحديد العلاقات.
5. التقويم: اتخاذ القرارات وإصدار الأحكام بناءً على معايير.
6. الابتكار: تجميع العناصر لإنشاء نمط أو منتج جديد.

باستخدام الذكاء الاصطناعي في منصة اختباري، يمكن للمعلم بناء هذا التوازن تلقائياً بضغطة زر واحدة.`
                  }
                };
              }
              return item;
            });
          }
          setData(customizedFallback);
        }
      } catch (e) {
        console.error("Failed to load page data:", e);
        setData(initialBlogDetailsData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [articleSlug, dbSlug]);

  const handleSave = async (newData: any) => {
    try {
      const pageTitle = newData.root?.props?.title || "تفاصيل المقالة - Examy";
      await savePageData(dbSlug, pageTitle, newData);
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
        جاري تحميل محرر المقالة ({articleSlug})...
      </div>
    );
  }

  const blogDetailsConfig = { ...config } as any;
  const puckComponents = config.components || {};
  blogDetailsConfig.components = {
    Nav: puckComponents.Nav,
    BlogDetails: puckComponents.BlogDetails,
    Footer: puckComponents.Footer
  };

  return (
    <div style={{ height: "100vh", direction: "ltr" }} className="puck-editor-theme-override">
      <Puck
        config={blogDetailsConfig}
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

export default function BlogDetailsAdminEditor() {
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
        جاري تهيئة محرر المقالات...
      </div>
    }>
      <BlogDetailsAdminContent />
    </Suspense>
  );
}
