import fs from 'fs';
import pkg from 'pg';
const { Client } = pkg;

const blogsPath = 'C:\\Users\\user\\Desktop\\questionn\\questions-maker-backend\\blogs.json';

function formatArabicDate(dateStr) {
  try {
    const date = new Date(dateStr);
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    const toArabicNumerals = (num) => {
      const numerals = {
        '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
        '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
      };
      return num.toString().split('').map(digit => numerals[digit] || digit).join('');
    };
    
    return `${toArabicNumerals(day)} ${month} ${toArabicNumerals(year)}`;
  } catch {
    return '١٦ يونيو ٢٠٢٦';
  }
}

function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  const cleanPath = imagePath.replace(/^\//, '');
  return `https://examy.ai/storage/${cleanPath}`;
}

async function run() {
  if (!fs.existsSync(blogsPath)) {
    console.error("❌ blogs.json not found!");
    return;
  }

  const rawBlogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

  const blogs = rawBlogs;

  console.log(`💡 Seeding ${blogs.length} blogs into PostgreSQL...`);

  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'hammouripassword',
    database: 'payload_db',
  });

  await client.connect();

  const footerProps = {
    id: "footer-block",
    description: "منصة سعودية مدعومة بالذكاء اصطناعي لإنشاء وإدارة الاختبارات، مرتبطة بالمنهج السعودي.",
    twitterUrl: "https://x.com/examyai",
    instagramUrl: "https://www.instagram.com/examy.ai/",
    col1Title: "المنتج",
    col1Links: [
      { label: "الميزات", href: "/#features" },
      { label: "كيف يعمل", href: "/#how" },
      { label: "القوالب الجاهزة", href: "/#templates" }
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
      { label: "المدوّنة", href: "/blogs" },
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

  const navProps = {
    ctaText: "ابدأ مجانًا",
    ctaLink: "/login?start=true",
    links: [
      { label: "الميزات", href: "/#features" },
      { label: "الأسعار", href: "/#pricing" },
      { label: "كيف يعمل", href: "/#how_it_works" },
      { label: "القوالب الجاهزة", href: "/#actual-models" }
    ],
    id: "nav-header"
  };

  // 1. Build & Seed the Main "blogs" Listing Page
  const listPosts = blogs.map(b => {
    // Default author rules matching native app logic
    let author = "فريق اختباري";
    const tags = b.tags || "";
    if (tags.includes("نصائح") || tags.includes("معلم")) {
      author = "أ. منيرة العتيبي";
    }

    return {
      title: b.title,
      description: b.meta_description || b.seo_title || "",
      image: getImageUrl(b.image) || "",
      date: formatArabicDate(b.created_at),
      author: author,
      slug: b.slug
    };
  });

  const blogsPageData = {
    content: [
      {
        type: "Nav",
        props: navProps
      },
      {
        type: "BlogList",
        props: {
          id: "blogs-block",
          title: "مدوّنة اختباري التعليمية",
          subtitle: "نصائح وإرشادات تعليمية، مقالات متخصصة في الذكاء الاصطناعي والتقويم المدرسي لمساعدتك على التفوق.",
          posts: listPosts
        }
      },
      {
        type: "Footer",
        props: footerProps
      }
    ],
    root: {
      props: {
        title: "المدوّنة - Examy"
      }
    }
  };

  // Upsert the main "blogs" page
  await client.query(`
    INSERT INTO pages (title, slug, puck_data, status, _status, created_at, updated_at)
    VALUES ($1, $2, $3, 'published', 'published', NOW(), NOW())
    ON CONFLICT (slug) 
    DO UPDATE SET title = EXCLUDED.title, puck_data = EXCLUDED.puck_data, updated_at = NOW()
  `, ["المدوّنة - Examy", "blogs", JSON.stringify(blogsPageData)]);
  console.log("✅ Main 'blogs' page successfully seeded/updated.");

  // 2. Seed/Upsert each individual "blog-details-${slug}" page
  for (const b of blogs) {
    let author = "فريق اختباري";
    const tags = b.tags || "";
    if (tags.includes("نصائح") || tags.includes("معلم")) {
      author = "أ. منيرة العتيبي";
    }

    const detailPageData = {
      content: [
        {
          type: "Nav",
          props: navProps
        },
        {
          type: "BlogDetails",
          props: {
            id: "blog-details-block",
            title: b.title,
            subtitle: b.meta_description || b.seo_title || "",
            date: formatArabicDate(b.created_at),
            author: author,
            image: getImageUrl(b.image) || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
            content: b.text || ""
          }
        },
        {
          type: "Footer",
          props: footerProps
        }
      ],
      root: {
        props: {
          title: `مقالة: ${b.title} - Examy`
        }
      }
    };

    const detailsSlug = `blog-details-${b.slug}`;
    await client.query(`
      INSERT INTO pages (title, slug, puck_data, status, _status, created_at, updated_at)
      VALUES ($1, $2, $3, 'published', 'published', NOW(), NOW())
      ON CONFLICT (slug) 
      DO UPDATE SET title = EXCLUDED.title, puck_data = EXCLUDED.puck_data, updated_at = NOW()
    `, [`مقالة: ${b.title} - Examy`, detailsSlug, JSON.stringify(detailPageData)]);
  }

  console.log(`✅ All ${blogs.length} blog-details pages successfully seeded/updated.`);
  await client.end();
}

run().catch(console.error);
