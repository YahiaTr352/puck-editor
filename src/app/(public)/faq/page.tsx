import React from "react";
import { getPageData } from "../../actions";
import { FAQClientView } from "./FAQClientView";
import { config } from "../../../puck/config";

const faqFallbackData = {
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

export async function generateMetadata() {
  try {
    const dbData = await getPageData("faq");
    const puckData = dbData && dbData.puckData 
      ? (typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData)
      : null;
    const title = puckData?.root?.props?.title || dbData?.title || "الأسئلة الشائعة - Examy";
    const faqBlock = puckData?.content?.find((c: any) => c.type === "FAQ");
    const description = puckData?.root?.props?.description || faqBlock?.props?.subtitle || "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات والأسعار.";
    return {
      title,
      description,
    };
  } catch (e) {
    return {
      title: "الأسئلة الشائعة - Examy",
      description: "جمعنا أكثر أسئلة المعلمين والمعلمات تكرارًا حول إنشاء الاختبارات والأسعار.",
    };
  }
}

export default async function FAQPage() {
  let data = faqFallbackData;

  try {
    const dbData = await getPageData("faq");
    if (dbData && dbData.puckData) {
      const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
      if (parsed.content) {
        const migratedContent = parsed.content.map((item: any) => {
          if (item.type === "Nav") {
            const updatedProps = { ...item.props };
            updatedProps.links = [
              { label: "المنتج", href: "/#features" },
              { label: "كيف يعمل", href: "/#how_it_works" },
              { label: "نماذج واقعية", href: "/#actual-models" },
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
    }
  } catch (e) {
    console.error("Error loading page data from DB:", e);
  }

  return <FAQClientView data={data} />;
}
