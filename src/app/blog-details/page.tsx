"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Render } from "@puckeditor/core";
import { config } from "../../puck/config";
import { getPageData } from "../actions";

import { AmbientBackground } from "../../components/AmbientBackground";
import { LiveActivity } from "../../components/LiveActivity";

const blogDetailsFallbackData = {
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
        title: (config.components.BlogDetails as any).defaultProps?.title || "",
        subtitle: (config.components.BlogDetails as any).defaultProps?.subtitle || "",
        date: (config.components.BlogDetails as any).defaultProps?.date || "",
        author: (config.components.BlogDetails as any).defaultProps?.author || "",
        image: (config.components.BlogDetails as any).defaultProps?.image || "",
        content: (config.components.BlogDetails as any).defaultProps?.content || ""
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
      title: "تفاصيل المقالة - Examy"
    }
  }
};

function BlogDetailsContent() {
  const searchParams = useSearchParams();
  const articleSlug = searchParams.get("slug") || "default";
  const [data, setData] = useState<any>(blogDetailsFallbackData);

  useEffect(() => {
    async function load() {
      try {
        const dbData = (await getPageData(`blog-details-${articleSlug}`)) || (await getPageData("blog-details"));
        if (dbData && dbData.puckData) {
          const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
          if (parsed.content) {
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
                const defs = (config.components.BlogDetails as any).defaultProps || {};
                Object.keys(defs).forEach(key => {
                  const val = updatedProps[key];
                  if (val === undefined || val === null || val === "") {
                    updatedProps[key] = defs[key];
                  }
                });
                return { ...item, props: updatedProps };
              }
              if (item.type === "Footer") {
                const updatedProps = { ...item.props };
                const defs = (config.components.Footer as any).defaultProps || {};
                Object.keys(defs).forEach(key => {
                  const val = updatedProps[key];
                  if (
                    val === undefined ||
                    val === null ||
                    val === "" ||
                    (Array.isArray(val) && val.length === 0)
                  ) {
                    updatedProps[key] = defs[key];
                  }
                });
                return { ...item, props: updatedProps };
              }
              return item;
            });
            setData({ ...parsed, content: migratedContent });
          } else {
            setData(blogDetailsFallbackData);
          }
        } else {
          const customizedFallback: any = { ...blogDetailsFallbackData };
          if (articleSlug === "ai-in-saudi-education") {
            customizedFallback.content = blogDetailsFallbackData.content.map(item => {
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
            customizedFallback.content = blogDetailsFallbackData.content.map(item => {
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
        console.error("Error loading page data from DB:", e);
        setData(blogDetailsFallbackData);
      }
    }
    load();
  }, [articleSlug]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <AmbientBackground bgStyle="fluid" intensity={75} blur={60} speed={100} grain={true} mesh={false} />
      <Render config={config} data={data} />
      <LiveActivity />
    </div>
  );
}

export default function BlogDetailsPage() {
  return (
    <Suspense fallback={
      <div style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b"
      }}>
        جاري تحميل الصفحة...
      </div>
    }>
      <BlogDetailsContent />
    </Suspense>
  );
}
