import React from "react";
import { getPageData } from "../../actions";
import { HomeClientView } from "../HomeClientView";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  try {
    const resolvedParams = await params;
    const slug = decodeURIComponent(resolvedParams.slug);
    
    // Ignore core pages or folders
    if (["home", "faq", "blogs", "blog-details", "login", "admin", "cms", "api"].includes(slug)) {
      return {};
    }
    
    const dbData = await getPageData(slug);
    if (!dbData) return {};
    
    const puckData = dbData && dbData.puckData 
      ? (typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData)
      : null;
    const title = puckData?.root?.props?.title || (dbData as any)?.meta?.title || dbData?.title || `${slug} - Examy`;
    const description = puckData?.root?.props?.description || (dbData as any)?.meta?.description || "";
    
    return {
      title,
      description,
    };
  } catch (e) {
    return {};
  }
}

export default async function CustomDynamicPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);

  // If someone requests core folders or files, skip it
  if (["home", "faq", "blogs", "blog-details", "login", "admin", "cms", "api"].includes(slug)) {
    return notFound();
  }

  let homeNav: any = null;
  let homeFooter: any = null;

  // Fetch home layout first to sync Nav and Footer
  try {
    const homeData = await getPageData("home");
    if (homeData && homeData.puckData) {
      const parsedHome = typeof homeData.puckData === 'string' ? JSON.parse(homeData.puckData) : homeData.puckData;
      if (parsedHome.content) {
        homeNav = parsedHome.content.find((c: any) => c.type === "Nav");
        homeFooter = parsedHome.content.find((c: any) => c.type === "Footer");
      }
    }
  } catch (e) {
    console.error("Error loading home page for layout sync:", e);
  }

  try {
    const dbData = await getPageData(slug);
    if (!dbData || !dbData.puckData) {
      return notFound();
    }

    const parsed = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
    
    // Sync Nav/Footer with home if they exist in the custom page
    if (parsed.content) {
      parsed.content = parsed.content.map((item: any) => {
        if (item.type === "Nav" && homeNav) {
          return { ...item, props: { ...homeNav.props } };
        }
        if (item.type === "Footer" && homeFooter) {
          return { ...item, props: { ...homeFooter.props } };
        }
        return item;
      });
    }

    return <HomeClientView data={parsed} />;
  } catch (e) {
    console.error(`Error loading custom page ${slug}:`, e);
    return notFound();
  }
}
