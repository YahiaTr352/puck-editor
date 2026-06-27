import React from "react";
import { getPageData } from "../actions";
import { BlogDetailsClientView } from "./BlogDetailsClientView";

const blogDetailsFallbackData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
        links: [
          { label: "الأسئلة الشائعة", href: "/faq" },
          { label: "المدوّنة", href: "/blogs" },
          { label: "نماذج واقعية", href: "/#actual-models" },
          { label: "كيف يعمل", href: "/#how_it_works" },
          { label: "المنتج", href: "/#features" }
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

type Args = {
  searchParams: Promise<{
    slug?: string;
  }>;
};

export default async function BlogDetailsPage({ searchParams }: Args) {
  const resolvedSearchParams = await searchParams;
  const articleSlug = resolvedSearchParams.slug || "default";
  
  let data = blogDetailsFallbackData;

  try {
    const dbData = (await getPageData(`blog-details-${articleSlug}`)) || (await getPageData("blog-details"));
    if (dbData && dbData.puckData) {
      const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
      if (parsed.content) {
        const migratedContent = parsed.content.map((item: any) => {
          if (item.type === "Nav") {
            const updatedProps = { ...item.props };
            updatedProps.links = [
              { label: "الأسئلة الشائعة", href: "/faq" },
              { label: "المدوّنة", href: "/blogs" },
              { label: "نماذج واقعية", href: "/#actual-models" },
              { label: "كيف يعمل", href: "/#how_it_works" },
              { label: "المنتج", href: "/#features" }
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
        data = { ...parsed, content: migratedContent };
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
        data = customizedFallback;
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
        data = customizedFallback;
      }
    }
  } catch (e) {
    console.error("Error loading page data from DB:", e);
  }

  return <BlogDetailsClientView data={data} />;
}
