import { savePageData, getPageData } from '../src/app/actions.ts';
import pkg from 'pg';
const { Client } = pkg;

async function main() {
  const slug = 'blog-details-أنواع-التعلم-الذاتي';
  console.log("Fetching original page...");
  const orig = await getPageData(slug, { draft: true });
  console.log("Original title:", orig?.puckData?.content?.find(c => c.type === 'BlogDetails')?.props?.title);

  console.log("Saving page with updated title...");
  const puckData = JSON.parse(JSON.stringify(orig.puckData));
  const blogDetails = puckData.content.find(c => c.type === 'BlogDetails');
  blogDetails.props.title = "تم تعديل العنوان بنجاح";
  
  await savePageData(slug, 'أنواع التعلم الذاتي وأهم فوائده - Examy', puckData);

  console.log("Fetching page again with draft: true...");
  const updatedDraft = await getPageData(slug, { draft: true });
  console.log("Updated Draft title:", updatedDraft?.puckData?.content?.find(c => c.type === 'BlogDetails')?.props?.title);

  console.log("Fetching page again with draft: false...");
  const updatedPub = await getPageData(slug, { draft: false });
  console.log("Updated Published title:", updatedPub?.puckData?.content?.find(c => c.type === 'BlogDetails')?.props?.title);
}

main().catch(err => {
  console.error(err);
});
