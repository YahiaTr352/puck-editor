import { getPageData } from '../src/app/actions.ts';

async function main() {
  console.log("Fetching blogs page data with draft: true...");
  const data = await getPageData("blogs", { draft: true });
  console.log("Returned data keys:", Object.keys(data || {}));
  console.log("Returned title:", data?.title);
  console.log("puckData exists:", !!data?.puckData);
  if (data?.puckData) {
    console.log("puckData keys:", Object.keys(data.puckData));
    const puckDataObj = typeof data.puckData === 'string' ? JSON.parse(data.puckData) : data.puckData;
    console.log("content components:", puckDataObj.content?.map(c => c.type));
    const blogListBlock = puckDataObj.content?.find(c => c.type === 'BlogList');
    console.log("BlogList title in db:", blogListBlock?.props?.title);
    console.log("BlogList eyebrow in db:", blogListBlock?.props?.eyebrow);
  }
}

main().catch(err => console.error(err));
