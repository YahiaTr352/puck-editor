"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AmbientBackground } from "../../components/AmbientBackground";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("pages");

  const pages = [
    {
      title: "الصفحة الرئيسية",
      route: "/",
      editRoute: "/admin/home",
      status: "منشورة",
      lastModified: "اليوم",
      author: "المسؤول الرئيسي",
      icon: "🏠"
    },
    {
      title: "صفحة الأسئلة الشائعة",
      route: "/faq",
      editRoute: "/admin/faq",
      status: "منشورة",
      lastModified: "منذ ساعة",
      author: "المسؤول الرئيسي",
      icon: "💬"
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row-reverse", // RTL Sidebar layout
      background: "#07100E",
      color: "#E8F1EE",
      fontFamily: "'Cairo', system-ui, sans-serif",
      direction: "rtl",
      position: "relative",
      overflowX: "hidden"
    }}>
      {/* Background spotlights */}
      <AmbientBackground bgStyle="fluid" intensity={40} blur={90} speed={60} grain={true} mesh={false} />

      {/* Sidebar (WordPress style) */}
      <aside style={{
        width: "260px",
        background: "#0C1815",
        borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
        display: "flex",
        flexDirection: "column",
        zIndex: 20,
        position: "relative"
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: "24px 20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{ fontSize: "1.5rem" }}>🛠️</span>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>لوحة تحكم Examy</h2>
        </div>

        {/* Navigation Menu */}
        <nav style={{ padding: "20px 12px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
          <button 
            onClick={() => setActiveTab("dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "dashboard" ? "rgba(0, 220, 138, 0.15)" : "transparent",
              color: activeTab === "dashboard" ? "#00E08A" : "rgba(232, 241, 238, 0.7)",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              textAlign: "right",
              cursor: "pointer",
              fontWeight: activeTab === "dashboard" ? "700" : "500",
              transition: "all 0.2s"
            }}
          >
            <span style={{ minWidth: "24px" }}>📊</span>
            <span>الرئيسية</span>
          </button>

          <button 
            onClick={() => setActiveTab("pages")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "pages" ? "rgba(0, 220, 138, 0.15)" : "transparent",
              color: activeTab === "pages" ? "#00E08A" : "rgba(232, 241, 238, 0.7)",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              textAlign: "right",
              cursor: "pointer",
              fontWeight: activeTab === "pages" ? "700" : "500",
              transition: "all 0.2s"
            }}
          >
            <span style={{ minWidth: "24px" }}>📄</span>
            <span>الصفحات</span>
          </button>

          <button 
            onClick={() => setActiveTab("settings")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "none",
              background: activeTab === "settings" ? "rgba(0, 220, 138, 0.15)" : "transparent",
              color: activeTab === "settings" ? "#00E08A" : "rgba(232, 241, 238, 0.7)",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              textAlign: "right",
              cursor: "pointer",
              fontWeight: activeTab === "settings" ? "700" : "500",
              transition: "all 0.2s"
            }}
          >
            <span style={{ minWidth: "24px" }}>⚙️</span>
            <span>الإعدادات</span>
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          padding: "20px",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          fontSize: "0.85rem",
          color: "rgba(232, 241, 238, 0.5)"
        }}>
          النسخة 1.0.0
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
        position: "relative"
      }}>
        {/* Top Header Bar */}
        <header style={{
          height: "70px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          background: "rgba(12, 24, 21, 0.4)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px"
        }}>
          <div>
            <h1 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0 }}>لوحة إدارة المحتوى</h1>
          </div>
          <div>
            <Link href="/" style={{
              background: "rgba(0, 224, 138, 0.1)",
              border: "1px solid rgba(0, 224, 138, 0.2)",
              color: "#00E08A",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              textDecoration: "none",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s"
            }}
            >
              <span>زيارة الموقع المباشر</span>
              <span>🌐</span>
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <div style={{ padding: "40px" }}>
          {activeTab === "pages" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                <div>
                  <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>كل الصفحات</h2>
                  <p style={{ color: "rgba(232, 241, 238, 0.6)", fontSize: "0.9rem", marginTop: "4px" }}>
                    إدارة وتعديل الصفحات العامة والمحتوى باستخدام المحرر البصري.
                  </p>
                </div>
              </div>

              {/* Table of Pages */}
              <div style={{
                background: "#0C1815",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
              }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", background: "rgba(255,255,255,0.02)" }}>
                      <th style={{ padding: "18px 24px", fontSize: "0.9rem", color: "rgba(232, 241, 238, 0.6)", fontWeight: 700 }}>اسم الصفحة</th>
                      <th style={{ padding: "18px 24px", fontSize: "0.9rem", color: "rgba(232, 241, 238, 0.6)", fontWeight: 700 }}>المسار</th>
                      <th style={{ padding: "18px 24px", fontSize: "0.9rem", color: "rgba(232, 241, 238, 0.6)", fontWeight: 700 }}>الحالة</th>
                      <th style={{ padding: "18px 24px", fontSize: "0.9rem", color: "rgba(232, 241, 238, 0.6)", fontWeight: 700 }}>التعديل الأخير</th>
                      <th style={{ padding: "18px 24px", fontSize: "0.9rem", color: "rgba(232, 241, 238, 0.6)", fontWeight: 700 }}>التحرير</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((p, i) => (
                      <tr 
                        key={i} 
                        style={{ 
                          borderBottom: i === pages.length - 1 ? "none" : "1px solid rgba(255, 255, 255, 0.06)",
                          transition: "background 0.2s"
                        }}
                      >
                        <td style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
                          <span style={{ fontSize: "1.3rem" }}>{p.icon}</span>
                          <span style={{ fontWeight: 700, fontSize: "1rem" }}>{p.title}</span>
                        </td>
                        <td style={{ padding: "20px 24px", fontSize: "0.9rem", color: "rgba(232, 241, 238, 0.7)", fontFamily: "monospace" }}>{p.route}</td>
                        <td style={{ padding: "20px 24px" }}>
                          <span style={{
                            background: "rgba(0, 224, 138, 0.12)",
                            color: "#00E08A",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "0.8rem",
                            fontWeight: 700
                          }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: "20px 24px", fontSize: "0.9rem", color: "rgba(232, 241, 238, 0.6)" }}>{p.lastModified}</td>
                        <td style={{ padding: "20px 24px" }}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <Link href={p.editRoute} style={{
                              background: "#00E08A",
                              color: "#06120E",
                              padding: "6px 14px",
                              borderRadius: "8px",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              textDecoration: "none",
                              transition: "opacity 0.2s"
                            }}
                            >
                              تعديل بصري 🛠️
                            </Link>
                            <Link href={p.route} style={{
                              background: "rgba(255, 255, 255, 0.08)",
                              color: "#ffffff",
                              padding: "6px 14px",
                              borderRadius: "8px",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              textDecoration: "none",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              transition: "background 0.2s"
                            }}
                            >
                              عرض 👁️
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div style={{ padding: "30px", textAlign: "center", background: "#0C1815", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "8px" }}>مرحباً بك في لوحة تحكم Examy</h3>
              <p style={{ color: "rgba(232, 241, 238, 0.6)" }}>استخدم القائمة الجانبية للتنقل وإدارة الصفحات المختلفة للمنصة.</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div style={{ padding: "30px", textAlign: "center", background: "#0C1815", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "8px" }}>إعدادات لوحة التحكم</h3>
              <p style={{ color: "rgba(232, 241, 238, 0.6)" }}>جميع الإعدادات الافتراضية نشطة ومتصلة بالمنصة بنجاح.</p>
            </div>
          )}
        </div>
      </main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}
