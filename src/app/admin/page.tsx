"use client";

import React from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const pages = [
    {
      title: "الصفحة الرئيسية",
      route: "/",
      editRoute: "/admin/home",
      status: "منشورة",
      lastModified: "اليوم",
    },
    {
      title: "صفحة الأسئلة الشائعة",
      route: "/faq",
      editRoute: "/admin/faq",
      status: "منشورة",
      lastModified: "منذ ساعة",
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      color: "#0f172a",
      fontFamily: "'Cairo', system-ui, sans-serif",
      direction: "rtl",
    }}>
      {/* Top Navbar */}
      <header style={{
        height: "64px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h2 style={{ fontSize: "1.15rem", fontWeight: 800, margin: 0, color: "#0f172a" }}>لوحة تحكم الإدارة</h2>
        </div>
        <div>
          <Link href="/" style={{
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            color: "#334155",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            textDecoration: "none",
            fontWeight: 700,
            transition: "all 0.15s"
          }}
          >
            زيارة الموقع المباشر 🌐
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px 24px"
      }}>
        {/* Page Title */}
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>إدارة صفحات الموقع</h1>
          <p style={{ color: "#475569", fontSize: "0.95rem", marginTop: "6px" }}>
            قائمة الصفحات العامة المتاحة للتخصيص والتعديل البصري الفوري.
          </p>
        </div>

        {/* Pages Table */}
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                <th style={{ padding: "16px 24px", fontSize: "0.85rem", color: "#475569", fontWeight: 700 }}>الصفحة</th>
                <th style={{ padding: "16px 24px", fontSize: "0.85rem", color: "#475569", fontWeight: 700 }}>المسار</th>
                <th style={{ padding: "16px 24px", fontSize: "0.85rem", color: "#475569", fontWeight: 700 }}>الحالة</th>
                <th style={{ padding: "16px 24px", fontSize: "0.85rem", color: "#475569", fontWeight: 700 }}>آخر تعديل</th>
                <th style={{ padding: "16px 24px", fontSize: "0.85rem", color: "#475569", fontWeight: 700, width: "200px" }}>التحرير</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p, i) => (
                <tr 
                  key={i} 
                  style={{ 
                    borderBottom: i === pages.length - 1 ? "none" : "1px solid #e2e8f0",
                    transition: "background 0.2s"
                  }}
                >
                  <td style={{ padding: "18px 24px", fontWeight: 700, fontSize: "0.95rem", color: "#0f172a" }}>
                    {p.title}
                  </td>
                  <td style={{ padding: "18px 24px", fontSize: "0.9rem", color: "#64748b", fontFamily: "monospace" }}>
                    {p.route}
                  </td>
                  <td style={{ padding: "18px 24px" }}>
                    <span style={{
                      background: "#dcfce7",
                      color: "#15803d",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: 700
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: "18px 24px", fontSize: "0.9rem", color: "#64748b" }}>
                    {p.lastModified}
                  </td>
                  <td style={{ padding: "18px 24px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link href={p.editRoute} style={{
                        background: "#00E08A",
                        color: "#06120E",
                        padding: "8px 24px",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        transition: "opacity 0.15s",
                        whiteSpace: "nowrap"
                      }}
                      >
                        تعديل بصري
                      </Link>
                      <Link href={p.route} style={{
                        background: "#ffffff",
                        color: "#334155",
                        padding: "8px 18px",
                        borderRadius: "6px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        border: "1px solid #cbd5e1",
                        transition: "all 0.15s",
                        whiteSpace: "nowrap"
                      }}
                      >
                        عرض
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}
