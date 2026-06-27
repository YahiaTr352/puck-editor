import { getDynamicBlogsList } from '../src/app/actions.ts';

async function main() {
  console.log("Fetching dynamic blogs list with draft: true...");
  const posts = await getDynamicBlogsList({ draft: true });
  posts.forEach(post => {
    if (post.slug === 'أنواع-التعلم-الذاتي') {
      console.log("Matched Post:", post);
    }
  });
}

main().catch(err => console.error(err));
