import { getDynamicBlogsList, getPageData } from '../src/app/actions.ts';

async function main() {
  try {
    console.log("1. Fetching getDynamicBlogsList({ draft: true })...");
    const posts = await getDynamicBlogsList({ draft: true });
    console.log("Success! Fetched posts count:", posts.length);

    console.log("2. Fetching getPageData('blogs', { draft: true })...");
    const dbData = await getPageData("blogs", { draft: true });
    console.log("Success! dbData exists:", !!dbData);

    if (dbData && dbData.puckData) {
      const rawData = typeof dbData.puckData === 'string' ? JSON.parse(dbData.puckData) : dbData.puckData;
      console.log("Parsing rawData success! content components count:", rawData.content?.length);
    }
  } catch (err) {
    console.error("FATAL ERROR inside loadData simulation:", err);
  }
}

main().catch(err => console.error(err));
