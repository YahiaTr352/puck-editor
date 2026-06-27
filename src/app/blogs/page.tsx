import React from "react";
import { getPageData } from "../actions";
import { BlogsClientView } from "./BlogsClientView";
import { getPayload } from "payload";
import config from "@payload-config";

const blogsFallbackData = {
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
        id: "footer-block"
      }
    }
  ],
  root: {
    props: {
      title: "المدوّنة - Examy"
    }
  }
};

export default async function BlogsPage() {
  let data = blogsFallbackData;
  let posts: any[] = [];

  // 1. Query all blog details pages dynamically from PostgreSQL via Payload local API
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'pages',
      limit: 100,
      draft: false,
    });

    const blogDocs = result.docs.filter((doc: any) => doc.slug.startsWith('blog-details-'));
    
    // Sort descending by ID to make newer/featured posts appear first
    blogDocs.sort((a: any, b: any) => b.id - a.id);

    posts = blogDocs.map((doc: any) => {
      const puckData = typeof doc.puckData === 'string' ? JSON.parse(doc.puckData) : doc.puckData;
      const blogDetails = puckData?.content?.find((c: any) => c.type === 'BlogDetails') || {};
      const props = blogDetails.props || {};

      const cleanSlug = doc.slug.replace('blog-details-', '');

      return {
        title: props.title || doc.title || "",
        description: props.subtitle || "",
        image: props.image || "",
        date: props.date || "",
        author: props.author || "فريق اختباري",
        slug: cleanSlug
      };
    });
  } catch (e) {
    console.error("Error fetching dynamic blogs list:", e);
  }

  // 2. Load the Blogs Page design from the pages table
  try {
    const dbData = await getPageData("blogs");
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
          if (item.type === "BlogList") {
            const updatedProps = { ...item.props };
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
        data = { ...parsed, content: migratedContent };
      }
    }
  } catch (e) {
    console.error("Error loading page design from DB:", e);
  }

  // 3. Inject the dynamically loaded posts into the page design
  if (data.content) {
    data.content = data.content.map((item: any) => {
      if (item.type === "BlogList") {
        return {
          ...item,
          props: {
            ...item.props,
            posts: posts
          }
        };
      }
      return item;
    });
  }

  return <BlogsClientView data={data} />;
}
