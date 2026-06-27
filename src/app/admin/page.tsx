"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../../puck/config";
import { getPagesList, deletePageData, savePageData, getPageData, getDynamicBlogsList } from "../actions";

const newBlogFallbackData = {
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
        title: "",
        subtitle: "",
        date: "",
        author: "فريق اختباري",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
        content: "<p>اكتب محتوى المقال هنا...</p>"
      }
    },
    {
      type: "Footer",
      props: {
        id: "footer-block",
        description: "منصة سعودية مدعومة بالذكاء اصطناعي لإنشاء وإدارة الاختبارات، مرتبطة بالمنهج السعودي."
      }
    }
  ],
  root: {
    props: {
      title: "تفاصيل المقالة - Examy"
    }
  }
};

const initialData = {
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
      type: "Hero",
      props: {
        variant: "aurora",
        badgeText: "منصة سعودية · مدعومة بالذكاء الاصطناعي",
        title: "اختبارُك جاهزٌ خلال دقيقة",
        gradientText: "حسب المنهج السعودي",
        subtitle: "منصة ذكاء اصطناعي تُولّد الاختبارات وتُديرها وتُحلّل نتائجها — مرتبطة بنواتج التعلم ومستويات بلوم، تختصر ساعاتٍ من الإعداد إلى دقائق.",
        ctas: [
          { label: "ابدأ مجاناً الآن", href: "#cta", variant: "primary" },
          { label: "شاهد كيف يعمل", href: "#how", variant: "secondary" }
        ],
        id: "hero-section"
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
      title: "الصفحة الرئيسية - Examy"
    }
  }
};

const faqFallbackData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
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

const blogsFallbackData = {
  content: [
    {
      type: "Nav",
      props: {
        ctaText: "ابدأ مجانًا",
        ctaLink: "/login?start=true",
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
      type: "BlogList",
      props: {
        id: "blogs-block",
        eyebrow: "مدوّنة اختباري",
        title: "رؤى ومقالات لمعلّمي الغد في المملكة",
        subtitle: "أفكار عملية عن الذكاء الاصطناعي في التعليم، التقويم المتوازن، والمنهج السعودي — من فريق اختباري ونخبة من المعلمين.",
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

// --- dashboard component ---
// --- dashboard styling & interactive animations ---
const cardStyle: React.CSSProperties = {
  position: "relative",
  backgroundColor: "rgba(12, 24, 21, 0.45)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  borderRadius: 20,
  padding: 30,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
};

const cardGlowStyle: React.CSSProperties = {
  position: "absolute",
  top: "-50%",
  left: "-50%",
  width: "200%",
  height: "200%",
  background: "radial-gradient(circle at center, rgba(0, 224, 138, 0.04) 0%, transparent 60%)",
  pointerEvents: "none",
  zIndex: 1
};

const iconContainerStyle: React.CSSProperties = {
  fontSize: 32,
  width: 60,
  height: 60,
  borderRadius: 16,
  backgroundColor: "rgba(0, 224, 138, 0.1)",
  border: "1px solid rgba(0, 224, 138, 0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 24,
  boxShadow: "0 8px 16px rgba(0, 224, 138, 0.05)"
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 800,
  color: "#ffffff",
  marginBottom: 12
};

const cardDescStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#8E9F9A",
  lineHeight: 1.7,
  marginBottom: 30,
  minHeight: 68
};

const primaryBtnStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  backgroundColor: "#00E08A",
  color: "#07100E",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 14,
  padding: "14px 0",
  borderRadius: 12,
  transition: "all 0.2s ease",
  boxShadow: "0 8px 20px rgba(0, 224, 138, 0.25)"
};

const secondaryBtnStyle: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  backgroundColor: "transparent",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 14,
  padding: "13px 0",
  borderRadius: 12,
  transition: "all 0.2s ease"
};

const primaryHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "#00F79B";
  e.currentTarget.style.transform = "translateY(-2px)";
  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 224, 138, 0.4)";
};

const primaryLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "#00E08A";
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 224, 138, 0.25)";
};

const secondaryHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "rgba(0, 224, 138, 0.1)";
  e.currentTarget.style.borderColor = "#00E08A";
  e.currentTarget.style.color = "#00E08A";
  e.currentTarget.style.transform = "translateY(-2px)";
};

const secondaryLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.currentTarget.style.backgroundColor = "transparent";
  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
  e.currentTarget.style.color = "#ffffff";
  e.currentTarget.style.transform = "translateY(0)";
};

// --- dashboard component ---
const getEditUrl = (slug: string) => {
  if (slug.startsWith("blog-details-")) {
    const clean = slug.replace("blog-details-", "");
    return `/admin/blog-details?slug=${encodeURIComponent(clean)}`;
  }
  if (["home", "blogs", "faq"].includes(slug)) {
    return `/admin/${slug}`;
  }
  return `/admin?slug=${encodeURIComponent(slug)}`;
};

const getViewUrl = (slug: string) => {
  if (slug.startsWith("blog-details-")) {
    const clean = slug.replace("blog-details-", "");
    return `/blog-details?slug=${encodeURIComponent(clean)}`;
  }
  if (slug === "home") {
    return "/";
  }
  return `/${slug}`;
};

function AdminDashboard() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [pageType, setPageType] = useState<"blog" | "custom">("blog");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const loadPages = async () => {
    setLoading(true);
    try {
      const list = await getPagesList();
      const coreSlugs = ["home", "blogs", "faq"];
      const missingCore = coreSlugs.filter(slug => !list.some(p => p.slug === slug));
      
      const virtualPages = missingCore.map(slug => {
        const title = 
          slug === "home" 
            ? "الصفحة الرئيسية - Examy" 
            : slug === "faq" 
            ? "الأسئلة الشائعة - Examy" 
            : "المدوّنة - Examy";
        return {
          id: 0,
          slug,
          title,
          status: "draft",
          updatedAt: new Date().toISOString()
        };
      });

      const allPages = [...list, ...virtualPages];
      
      const sorted = allPages.sort((a, b) => {
        const aIsCore = coreSlugs.includes(a.slug);
        const bIsCore = coreSlugs.includes(b.slug);
        if (aIsCore && !bIsCore) return -1;
        if (!aIsCore && bIsCore) return 1;
        if (aIsCore && bIsCore) {
          return coreSlugs.indexOf(a.slug) - coreSlugs.indexOf(b.slug);
        }
        return b.id - a.id;
      });
      setPages(sorted);
    } catch (err) {
      console.error("Failed to load pages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`هل أنت متأكد من رغبتك في حذف الصفحة/المقال "${title || slug}" نهائياً؟`)) {
      return;
    }
    try {
      const res = await deletePageData(slug);
      if (res.success) {
        setSuccessMsg("تم حذف الصفحة بنجاح.");
        loadPages();
      } else {
        setErrorMsg(`فشل الحذف: ${res.error}`);
      }
    } catch (err) {
      setErrorMsg("حدث خطأ أثناء الاتصال بالخادم لحذف الصفحة.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!newTitle.trim()) {
      setErrorMsg("الرجاء إدخال عنوان الصفحة.");
      return;
    }

    const cleanSlug = newSlug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    if (!cleanSlug) {
      setErrorMsg("الرجاء إدخال معرّف الصفحة (Slug) باللغة الإنجليزية.");
      return;
    }

    const isBlog = pageType === "blog";
    const fullSlug = isBlog ? `blog-details-${cleanSlug}` : cleanSlug;
    
    if (pages.some((p) => p.slug === fullSlug)) {
      setErrorMsg("معرّف الصفحة (Slug) مستخدم بالفعل. الرجاء اختيار معرّف آخر.");
      return;
    }

    setCreating(true);
    try {
      const today = new Date().toLocaleDateString("ar-SA", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      const puckData = isBlog ? {
        ...newBlogFallbackData,
        content: newBlogFallbackData.content.map((item) => {
          if (item.type === "BlogDetails") {
            return {
              ...item,
              props: {
                ...item.props,
                title: newTitle,
                date: today
              }
            };
          }
          return item;
        }),
        root: {
          props: {
            title: `${newTitle} - Examy`
          }
        }
      } : {
        ...initialData,
        root: {
          props: {
            title: `${newTitle} - Examy`
          }
        }
      };

      const res = await savePageData(fullSlug, isBlog ? `مقالة: ${newTitle} - Examy` : `${newTitle} - Examy`, puckData);
      if (res.success) {
        setSuccessMsg("تم إنشاء الصفحة بنجاح! جاري تحويلك للمحرر البصري...");
        setTimeout(() => {
          window.location.href = getEditUrl(fullSlug);
        }, 1200);
      } else {
        setErrorMsg("حدث خطأ أثناء حفظ الصفحة في قاعدة البيانات.");
        setCreating(false);
      }
    } catch (err) {
      setErrorMsg("فشل الاتصال بقاعدة البيانات لإنشاء الصفحة.");
      setCreating(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#050b09",
      backgroundImage: "radial-gradient(circle at 50% -20%, #154536 0%, #050b09 60%)",
      color: "#ffffff",
      fontFamily: "'Cairo', sans-serif",
      direction: "rtl",
      padding: "80px 20px"
    }}>
      <div style={{ maxWidth: 1000, width: "100%", margin: "0 auto" }}>
        
        {/* Header */}
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: 24,
          marginBottom: 50
        }}>
          <div>
            <h1 style={{ 
              fontSize: "clamp(28px, 4vw, 38px)", 
              fontWeight: 900, 
              color: "#ffffff",
              letterSpacing: "-0.02em",
              textShadow: "0 0 40px rgba(0, 224, 138, 0.2)"
            }}>
              محرر صفحات منصة اختباري
            </h1>
            <p style={{ 
              fontSize: 15, 
              color: "#8E9F9A", 
              marginTop: 8,
              lineHeight: 1.6
            }}>
              تعديل وتنسيق محتوى صفحات الموقع والتفاعلات بشكل مرئي وبسيط دون الحاجة لأي برمجة.
            </p>
          </div>
        </header>

        {errorMsg && (
          <div style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            padding: "12px 16px",
            borderRadius: 8,
            marginBottom: 24,
            fontSize: 14,
            fontWeight: 500
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{
            backgroundColor: "rgba(0, 224, 138, 0.12)",
            border: "1px solid rgba(0, 224, 138, 0.25)",
            color: "#00E08A",
            padding: "12px 16px",
            borderRadius: 8,
            marginBottom: 24,
            fontSize: 14,
            fontWeight: 500
          }}>
            ✅ {successMsg}
          </div>
        )}

        {/* Cards Grid */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: "#ffffff" }}>الصفحات الرئيسية</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 30
          }}>
            {/* Card 1: Homepage */}
            <div style={cardStyle}>
              <div style={cardGlowStyle}></div>
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={iconContainerStyle}>🏠</div>
                <h3 style={cardTitleStyle}>الصفحة الرئيسية (Homepage)</h3>
                <p style={cardDescStyle}>
                  تعديل الهيرو، مزايا المنصة، أرقام وإحصائيات اختباري، وقسم الشركاء والأسعار.
                </p>
                <a 
                  href="/admin/home" 
                  style={primaryBtnStyle}
                  onMouseEnter={primaryHover}
                  onMouseLeave={primaryLeave}
                >
                  تعديل الصفحة الرئيسية
                </a>
              </div>
            </div>

            {/* Card 2: Blogs */}
            <div style={cardStyle}>
              <div style={cardGlowStyle}></div>
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={iconContainerStyle}>📝</div>
                <h3 style={cardTitleStyle}>صفحة المدوّنة (Blogs Page)</h3>
                <p style={cardDescStyle}>
                  تعديل ترويسة صفحة المدوّنة وعناوينها الفرعية التي يعرض فيها المقالات التلقائية.
                </p>
                <a 
                  href="/admin/blogs" 
                  style={secondaryBtnStyle}
                  onMouseEnter={secondaryHover}
                  onMouseLeave={secondaryLeave}
                >
                  تعديل صفحة المدوّنة
                </a>
              </div>
            </div>

            {/* Card 3: FAQ */}
            <div style={cardStyle}>
              <div style={cardGlowStyle}></div>
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={iconContainerStyle}>🙋‍♂️</div>
                <h3 style={cardTitleStyle}>الأسئلة الشائعة (FAQ)</h3>
                <p style={cardDescStyle}>
                  إضافة أو حذف أو تعديل الأسئلة الشائعة وإجاباتها وتوزيعها في تصنيفات منظمة.
                </p>
                <a 
                  href="/admin/faq" 
                  style={secondaryBtnStyle}
                  onMouseEnter={secondaryHover}
                  onMouseLeave={secondaryLeave}
                >
                  تعديل الأسئلة الشائعة
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Create Page Form */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: "#ffffff" }}>
            إنشاء صفحة أو مقال جديد
          </h2>
          <form onSubmit={handleCreate} style={{
            backgroundColor: "rgba(12, 24, 21, 0.45)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 20,
            padding: 30,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            alignItems: "end"
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, color: "#8E9F9A", fontWeight: 600 }}>عنوان الصفحة/المقالة:</label>
              <input 
                type="text" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="مثال: أهمية التقييم المستمر"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#ffffff",
                  fontSize: 14,
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#00E08A"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, color: "#8E9F9A", fontWeight: 600 }}>معرّف الرابط (Slug) بالإنجليزية:</label>
              <input 
                type="text" 
                value={newSlug} 
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="مثال: continuous-assessment"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#ffffff",
                  fontSize: 14,
                  outline: "none",
                  direction: "ltr",
                  textAlign: "right",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#00E08A"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, color: "#8E9F9A", fontWeight: 600 }}>نوع الصفحة:</label>
              <select 
                value={pageType} 
                onChange={(e: any) => setPageType(e.target.value)}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#ffffff",
                  fontSize: 14,
                  outline: "none",
                  cursor: "pointer",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "#00E08A"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
              >
                <option value="blog" style={{ backgroundColor: "#0C1815", color: "#ffffff" }}>مقال في المدونة (Blog Details)</option>
                <option value="custom" style={{ backgroundColor: "#0C1815", color: "#ffffff" }}>صفحة مخصصة (Custom Page)</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={creating}
              style={{
                backgroundColor: "#00E08A",
                color: "#07100E",
                border: "none",
                borderRadius: 10,
                padding: "13px 0",
                fontSize: 14,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(0, 224, 138, 0.25)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#00F79B";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#00E08A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {creating ? "جاري الإنشاء..." : "إنشاء الصفحة"}
            </button>
          </form>
        </section>

        {/* All Pages Table */}
        <section style={{ marginTop: 50, marginBottom: 50 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: "#ffffff" }}>
            جميع الصفحات والمقالات في قاعدة البيانات
          </h2>
          <div style={{
            backgroundColor: "rgba(12, 24, 21, 0.45)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
          }}>
            {loading ? (
              <div style={{ padding: 40, textAlign: "center", color: "#8E9F9A" }}>جاري تحميل الصفحات...</div>
            ) : pages.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#8E9F9A" }}>لا توجد صفحات حالياً.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                      <th style={{ padding: "16px 24px", color: "#8E9F9A", fontWeight: 700, fontSize: 14 }}>العنوان</th>
                      <th style={{ padding: "16px 24px", color: "#8E9F9A", fontWeight: 700, fontSize: 14 }}>المعرّف (Slug)</th>
                      <th style={{ padding: "16px 24px", color: "#8E9F9A", fontWeight: 700, fontSize: 14 }}>الحالة</th>
                      <th style={{ padding: "16px 24px", color: "#8E9F9A", fontWeight: 700, fontSize: 14 }}>تاريخ التحديث</th>
                      <th style={{ padding: "16px 24px", color: "#8E9F9A", fontWeight: 700, fontSize: 14, textAlign: "center" }}>العمليات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) => (
                      <tr 
                        key={page.slug} 
                        style={{ 
                          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                          transition: "background 0.2s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(0, 224, 138, 0.02)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <td style={{ padding: "16px 24px", fontWeight: 600, color: "#ffffff" }}>
                          {page.title}
                        </td>
                        <td style={{ padding: "16px 24px", fontFamily: "monospace", color: "#8E9F9A", direction: "ltr", textAlign: "right" }}>
                          {page.slug}
                        </td>
                        <td style={{ padding: "16px 24px" }}>
                          <span style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 700,
                            backgroundColor: page.status === "draft" ? "rgba(255, 180, 84, 0.15)" : "rgba(0, 224, 138, 0.15)",
                            color: page.status === "draft" ? "#FFB454" : "#00E08A",
                            border: page.status === "draft" ? "1px solid rgba(255, 180, 84, 0.25)" : "1px solid rgba(0, 224, 138, 0.25)"
                          }}>
                            {page.status === "draft" ? "مسودة" : "منشور"}
                          </span>
                        </td>
                        <td style={{ padding: "16px 24px", color: "#8E9F9A", fontSize: 14 }}>
                          {new Date(page.updatedAt).toLocaleString("ar-SA", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        <td style={{ padding: "16px 24px", textAlign: "center" }}>
                          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                            <a 
                              href={getEditUrl(page.slug)} 
                              style={{
                                padding: "6px 12px",
                                borderRadius: 8,
                                backgroundColor: "rgba(0, 224, 138, 0.1)",
                                border: "1px solid rgba(0, 224, 138, 0.2)",
                                color: "#00E08A",
                                fontSize: 13,
                                fontWeight: 700,
                                textDecoration: "none",
                                transition: "all 0.15s ease"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#00E08A";
                                e.currentTarget.style.color = "#07100E";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(0, 224, 138, 0.1)";
                                e.currentTarget.style.color = "#00E08A";
                              }}
                            >
                              تعديل مرئي
                            </a>
                            <a 
                              href={getViewUrl(page.slug)}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                padding: "6px 12px",
                                borderRadius: 8,
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "#ffffff",
                                fontSize: 13,
                                fontWeight: 700,
                                textDecoration: "none",
                                transition: "all 0.15s ease"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"}
                            >
                              معاينة
                            </a>
                            {!["home", "blogs", "faq"].includes(page.slug) && (
                              <button 
                                onClick={() => handleDelete(page.slug, page.title)}
                                style={{
                                  padding: "6px 12px",
                                  borderRadius: 8,
                                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                                  border: "1px solid rgba(239, 68, 68, 0.3)",
                                  color: "#f87171",
                                  fontSize: 13,
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  transition: "all 0.15s ease"
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "#ef4444";
                                  e.currentTarget.style.color = "#ffffff";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                                  e.currentTarget.style.color = "#f87171";
                                }}
                              >
                                حذف
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

// --- editor component ---
function AdminEditorContent({ slug }: { slug: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const dbData = await getPageData(slug, { draft: true });
        let rawData = dbData && dbData.puckData 
          ? (typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData)
          : (slug === "faq" ? faqFallbackData : slug === "blogs" ? blogsFallbackData : initialData);

        if (rawData.content && Array.isArray(rawData.content)) {
          let posts: any[] = [];
          if (slug === "blogs") {
            try {
              posts = await getDynamicBlogsList({ draft: true });
            } catch (err) {
              console.error("Failed to fetch dynamic blogs list for editor:", err);
            }
          }

          rawData.content = rawData.content.map((item: any) => {
            if (item.type === "BlogList") {
              const updatedProps = { ...item.props };
              updatedProps.posts = posts;
              if (updatedProps.eyebrow === undefined || updatedProps.eyebrow === "") {
                updatedProps.eyebrow = "مدوّنة اختباري";
              }
              if (updatedProps.title === undefined || updatedProps.title === "") {
                updatedProps.title = "رؤى ومقالات لمعلّمي الغد في المملكة";
              }
              if (updatedProps.subtitle === undefined || updatedProps.subtitle === "") {
                updatedProps.subtitle = "أفكار عملية عن الذكاء الاصطناعي في التعليم، التقويم المتوازن، والمنهج السعودي — من فريق اختباري ونخبة من المعلمين.";
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
            return item;
          });
        }
        setData(rawData);
      } catch (e) {
        console.error("Failed to load page data:", e);
        setData(initialData);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const handleSave = async (newData: any) => {
    try {
      const defaultTitle = 
        slug === "faq"
          ? "الأسئلة الشائعة - Examy"
          : slug === "blogs"
          ? "المدوّنة - Examy"
          : "الصفحة الرئيسية - Examy";
      const pageTitle = newData.root?.props?.title || defaultTitle;
      
      await savePageData(slug, pageTitle, newData);
      alert("تم حفظ التعديلات بنجاح!");
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء حفظ التعديلات.");
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
        جاري تحميل المحرر البصري لـ Examy ({slug})...
      </div>
    );
  }

  const editorConfig = { ...config } as any;
  const puckComponents = config.components || {};
  if (slug === "home") {
    const { FAQ, BlogList, BlogDetails, ...restComponents } = puckComponents;
    editorConfig.components = restComponents;
  } else if (slug === "faq") {
    editorConfig.components = { Nav: puckComponents.Nav, FAQ: puckComponents.FAQ, Footer: puckComponents.Footer };
  } else if (slug === "blogs") {
    editorConfig.components = { Nav: puckComponents.Nav, BlogList: puckComponents.BlogList, Footer: puckComponents.Footer };
  }

  return (
    <div style={{ height: "100vh", direction: "ltr" }} className="puck-editor-theme-override">
      <Puck
        config={editorConfig}
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

// --- router component ---
function AdminPageContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") || searchParams.get("slag");

  if (slug) {
    return <AdminEditorContent slug={slug} />;
  }

  return <AdminDashboard />;
}

export default function AdminPage() {
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
        جاري تهيئة لوحة التحكم...
      </div>
    }>
      <AdminPageContent />
    </Suspense>
  );
}
