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
        categories: []
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
function AdminDashboard() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadPages = async () => {
    setLoading(true);
    const list = await getPagesList();
    const sorted = [...list].sort((a, b) => {
      const coreSlugs = ["home", "blogs", "faq"];
      const aIsCore = coreSlugs.includes(a.slug);
      const bIsCore = coreSlugs.includes(b.slug);
      if (aIsCore && !bIsCore) return -1;
      if (!aIsCore && bIsCore) return 1;
      return b.id - a.id;
    });
    setPages(sorted);
    setLoading(false);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`هل أنت متأكد من رغبتك في حذف المقال "${title || slug}" نهائياً؟`)) {
      return;
    }
    try {
      const res = await deletePageData(slug);
      if (res.success) {
        setSuccessMsg("تم حذف المقال بنجاح.");
        loadPages();
      } else {
        setErrorMsg(`فشل الحذف: ${res.error}`);
      }
    } catch (err) {
      setErrorMsg("حدث خطأ أثناء الاتصال بالخادم لحذف المقال.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!newTitle.trim()) {
      setErrorMsg("الرجاء إدخال عنوان المقال.");
      return;
    }

    const cleanSlug = newSlug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    if (!cleanSlug) {
      setErrorMsg("الرجاء إدخال معرّف المقال (Slug) باللغة الإنجليزية.");
      return;
    }

    const fullSlug = `blog-details-${cleanSlug}`;
    if (pages.some((p) => p.slug === fullSlug)) {
      setErrorMsg("معرّف المقال (Slug) مستخدم بالفعل. الرجاء اختيار معرّف آخر.");
      return;
    }

    setCreating(true);
    try {
      const today = new Date().toLocaleDateString("ar-SA", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      const puckData = {
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
      };

      const res = await savePageData(fullSlug, `مقالة: ${newTitle} - Examy`, puckData);
      if (res.success) {
        setSuccessMsg("تم إنشاء المقال بنجاح! جاري تحويلك للمحرر البصري...");
        setTimeout(() => {
          window.location.href = `/admin/blog-details?slug=${cleanSlug}`;
        }, 1200);
      } else {
        setErrorMsg("حدث خطأ أثناء حفظ المقال في قاعدة البيانات.");
        setCreating(false);
      }
    } catch (err) {
      setErrorMsg("فشل الاتصال بقاعدة البيانات لإنشاء المقال.");
      setCreating(false);
    }
  };

  const blogPages = pages.filter((p) => p.slug.startsWith("blog-details-"));

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#07100E",
      color: "#ffffff",
      fontFamily: "'Cairo', sans-serif",
      direction: "rtl",
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #172F29",
          paddingBottom: 24,
          marginBottom: 36
        }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#E8F1EE" }}>لوحة تحكم المحتوى (CMS)</h1>
            <p style={{ fontSize: 14, color: "#8E9F9A", marginTop: 4 }}>إدارة وتعديل صفحات منصة اختباري وتصميم المدوّنة</p>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "#0C1815",
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid #172F29"
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#00E08A" }}></div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#00E08A" }}>قاعدة البيانات متصلة</span>
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
            ✓ {successMsg}
          </div>
        )}

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#E8F1EE" }}>الصفحات الرئيسية</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20
          }}>
            <div style={{
              backgroundColor: "#0C1815",
              border: "1px solid #172F29",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E8F1EE" }}>الصفحة الرئيسية (Homepage)</h3>
                <p style={{ fontSize: 13, color: "#8E9F9A", marginTop: 6, lineHeight: 1.5 }}>
                  تعديل الهيرو، مزايا المنصة، أرقام وإحصائيات اختباري، وقسم الشركاء والأسعار.
                </p>
              </div>
              <a href="/admin/home" style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "#00E08A",
                color: "#07100E",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                padding: "10px 0",
                borderRadius: 8,
                marginTop: 20,
                transition: "opacity 0.2s"
              }}>
                تعديل الصفحة الرئيسية
              </a>
            </div>

            <div style={{
              backgroundColor: "#0C1815",
              border: "1px solid #172F29",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E8F1EE" }}>صفحة المدوّنة (Blogs Page)</h3>
                <p style={{ fontSize: 13, color: "#8E9F9A", marginTop: 6, lineHeight: 1.5 }}>
                  تعديل ترويسة صفحة المدوّنة وعناوينها الفرعية التي يعرض فيها المقالات التلقائية.
                </p>
              </div>
              <a href="/admin/blogs" style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "transparent",
                border: "1px solid #00E08A",
                color: "#00E08A",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                padding: "9px 0",
                borderRadius: 8,
                marginTop: 20,
                transition: "background 0.2s"
              }}>
                تعديل صفحة المدوّنة
              </a>
            </div>

            <div style={{
              backgroundColor: "#0C1815",
              border: "1px solid #172F29",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#E8F1EE" }}>الأسئلة الشائعة (FAQ)</h3>
                <p style={{ fontSize: 13, color: "#8E9F9A", marginTop: 6, lineHeight: 1.5 }}>
                  إضافة أو حذف أو تعديل الأسئلة الشائعة وإجاباتها وتوزيعها في تصنيفات منظمة.
                </p>
              </div>
              <a href="/admin/faq" style={{
                display: "block",
                textAlign: "center",
                backgroundColor: "transparent",
                border: "1px solid #172F29",
                color: "#E8F1EE",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                padding: "9px 0",
                borderRadius: 8,
                marginTop: 20,
                transition: "background 0.2s"
              }}>
                تعديل الأسئلة الشائعة
              </a>
            </div>
          </div>
        </section>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1.8fr 1.2fr",
          gap: 30
        }}>
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#E8F1EE" }}>مقالات المدوّنة المنشورة ({blogPages.length})</h2>
              <button onClick={loadPages} style={{ background: "none", border: "none", color: "#00E08A", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                🔄 تحديث
              </button>
            </div>

            {loading ? (
              <div style={{ backgroundColor: "#0C1815", border: "1px solid #172F29", borderRadius: 12, padding: "40px 0", textAlign: "center", color: "#8E9F9A" }}>
                جاري تحميل قائمة المقالات...
              </div>
            ) : blogPages.length === 0 ? (
              <div style={{ backgroundColor: "#0C1815", border: "1px solid #172F29", borderRadius: 12, padding: "40px 0", textAlign: "center", color: "#8E9F9A" }}>
                لا يوجد مقالات منشورة حالياً. استخدم النموذج لإنشاء مقالك الأول!
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {blogPages.map((page) => {
                  const cleanSlug = page.slug.replace("blog-details-", "");
                  return (
                    <div key={page.id} style={{ backgroundColor: "#0C1815", border: "1px solid #172F29", borderRadius: 10, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1, paddingLeft: 20 }}>
                        <h4 style={{ fontSize: 15, fontWeight: 700, color: "#E8F1EE" }}>
                          {page.title ? page.title.replace("مقالة: ", "").replace(" - Examy", "") : "بدون عنوان"}
                        </h4>
                        <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#8E9F9A", marginTop: 4 }}>
                          <span>معرف الرابط (Slug): <strong style={{ color: "#ffffff" }}>{cleanSlug}</strong></span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={`/admin/blog-details?slug=${cleanSlug}`} style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid #172F29", color: "#ffffff", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "6px 12px", borderRadius: 6 }}>
                          تعديل المحتوى
                        </a>
                        <button onClick={() => handleDelete(page.slug, page.title)} style={{ backgroundColor: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#f87171", fontSize: 13, fontWeight: 600, padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}>
                          حذف
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#E8F1EE" }}>إضافة مقال جديد</h2>
            <form onSubmit={handleCreate} style={{ backgroundColor: "#0C1815", border: "1px solid #172F29", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#8E9F9A", marginBottom: 8 }}>عنوان المقال الرئيسي</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="مثال: أهمية التقييم الإلكتروني في تطوير مهارات التفكير" style={{ width: "100%", backgroundColor: "#07100E", border: "1px solid #172F29", borderRadius: 8, padding: "10px 12px", color: "#ffffff", fontSize: 14, outline: "none" }} required />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#8E9F9A", marginBottom: 4 }}>معرّف الرابط (Slug)</label>
                <span style={{ display: "block", fontSize: 11, color: "#8E9F9A", marginBottom: 8 }}>يُكتب بالإنجليزية، ويستخدم كعنوان للرابط (Slug). مثال: online-assessments</span>
                <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "-"))} placeholder="online-assessments" style={{ width: "100%", backgroundColor: "#07100E", border: "1px solid #172F29", borderRadius: 8, padding: "10px 12px", color: "#ffffff", fontSize: 14, outline: "none", fontFamily: "monospace" }} required />
              </div>
              <button type="submit" disabled={creating} style={{ width: "100%", backgroundColor: "#00E08A", color: "#07100E", border: "none", fontWeight: 700, fontSize: 14, padding: "12px 0", borderRadius: 8, cursor: creating ? "not-allowed" : "pointer", opacity: creating ? 0.7 : 1, marginTop: 10 }}>
                {creating ? "جاري الإنشاء..." : "إنشاء مقال جديد والذهاب للمحرر"}
              </button>
            </form>
          </section>
        </div>

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
        const dbData = await getPageData(slug);
        if (dbData && dbData.puckData) {
          const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
          setData(parsed);
        } else {
          setData(
            slug === "faq"
              ? faqFallbackData
              : slug === "blogs"
              ? blogsFallbackData
              : initialData
          );
        }
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
      alert(`تم حفظ تصميم الصفحة (${slug}) بنجاح في قاعدة البيانات PostgreSQL!`);
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء حفظ الصفحة في قاعدة البيانات.");
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
