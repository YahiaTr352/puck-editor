import { getPageData } from '../src/app/actions.ts';

async function run() {
  const data = await getPageData("blogs");
  if (!data) {
    console.log("❌ getPageData('blogs') returned null!");
  } else {
    console.log("Successfully fetched page data via Payload local API:");
    console.log("Keys of doc:", Object.keys(data));
    console.log("puckData field:", data.puckData ? "Exists" : "Not found");
    console.log("puck_data field (raw pg):", data.puck_data ? "Exists" : "Not found");
    if (data.puckData) {
      console.log("Type of puckData:", typeof data.puckData);
      console.log("Content component types:", data.puckData.content?.map((c) => c.type));
      const blogList = data.puckData.content?.find((c) => c.type === 'BlogList');
      if (blogList) {
        console.log("BlogList posts count in getPageData:", blogList.props?.posts?.length);
      }
    }
  }
}

run().catch(console.error);
