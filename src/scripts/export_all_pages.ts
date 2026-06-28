import { getPayload } from 'payload';
import config from '../../payload.config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const payload = await getPayload({ config });
  
  const res = await payload.find({
    collection: 'pages',
    limit: 100,
    draft: false,
  });

  const docs = res.docs.map(doc => ({
    title: doc.title,
    slug: doc.slug,
    status: doc.status,
    puckData: doc.puckData,
  }));

  const scriptContent = `import { getPayload } from 'payload';
import config from '../../payload.config';

const seededData = ${JSON.stringify(docs, null, 2)};

async function run() {
  const payload = await getPayload({ config });
  console.log('Seeding ' + seededData.length + ' pages...');

  for (const page of seededData) {
    try {
      const existing = await payload.find({
        collection: 'pages',
        where: { slug: { equals: page.slug } },
        draft: true,
      });

      if (existing.docs.length > 0) {
        console.log('Page already exists: ' + page.slug + '. Updating...');
        await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          draft: false,
          data: page,
        });
      } else {
        console.log('Creating page: ' + page.slug);
        await payload.create({
          collection: 'pages',
          draft: false,
          data: page,
        });
      }
    } catch (e) {
      console.error('Failed to seed: ' + page.slug, e);
    }
  }

  // Create default admin user
  try {
    const adminExists = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@examy.ai' } },
    });
    if (adminExists.docs.length === 0) {
      console.log('Creating admin user...');
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@examy.ai',
          password: 'password123',
        },
      });
    }
  } catch (e) {
    console.error('Admin user check failed', e);
  }

  console.log('Seed completed successfully!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
`;

  fs.writeFileSync(path.join(__dirname, 'seed_all_pages.ts'), scriptContent);
  console.log('Successfully generated src/scripts/seed_all_pages.ts!');
  process.exit(0);
}

run().catch(console.error);
