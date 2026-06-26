"use client";

import React, { useState, useEffect } from "react";
import { Render } from "@puckeditor/core";
import { config } from "../../puck/config";
import { getPageData } from "../actions";

import { AmbientBackground } from "../../components/AmbientBackground";
import { LiveActivity } from "../../components/LiveActivity";

const blogsFallbackData = {
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
      type: "BlogList",
      props: {
        id: "blogs-block",
        title: (config.components.BlogList as any).defaultProps?.title || "",
        subtitle: (config.components.BlogList as any).defaultProps?.subtitle || "",
        posts: (config.components.BlogList as any).defaultProps?.posts || []
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

export default function BlogsPage() {
  const [data, setData] = useState<any>(blogsFallbackData);

  useEffect(() => {
    async function load() {
      try {
        const dbData = await getPageData("blogs");
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
              if (item.type === "BlogList") {
                const updatedProps = { ...item.props };
                if (!updatedProps.posts || updatedProps.posts.length === 0) {
                  updatedProps.posts = (config.components.BlogList as any).defaultProps?.posts || [];
                }
                if (updatedProps.title === undefined || updatedProps.title === "") {
                  updatedProps.title = (config.components.BlogList as any).defaultProps?.title || "";
                }
                if (updatedProps.subtitle === undefined || updatedProps.subtitle === "") {
                  updatedProps.subtitle = (config.components.BlogList as any).defaultProps?.subtitle || "";
                }
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
            setData(blogsFallbackData);
          }
        } else {
          setData(blogsFallbackData);
        }
      } catch (e) {
        console.error("Error loading page data from DB:", e);
        setData(blogsFallbackData);
      }
    }
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <AmbientBackground bgStyle="fluid" intensity={75} blur={60} speed={100} grain={true} mesh={false} />
      <Render config={config} data={data} />
      <LiveActivity />
    </div>
  );
}
