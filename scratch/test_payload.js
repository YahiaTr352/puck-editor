import { getDynamicBlogsList } from '../src/app/actions.ts';

async function main() {
  console.log("Calling getDynamicBlogsList...");
  const posts = await getDynamicBlogsList();
  console.log("Result posts count:", posts.length);
  if (posts.length > 0) {
    console.log("First post:", posts[0]);
  }
}

main().catch(err => {
  console.error("Error running test:", err);
});
