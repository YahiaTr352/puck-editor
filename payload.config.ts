import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { seoPlugin } from '@payloadcms/plugin-seo';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateTitle = ({ doc }: any) => {
  return doc?.title ? `${doc.title} - Examy` : 'Examy';
};

const generateDescription = ({ doc }: any) => {
  try {
    const parsed = doc?.puckData 
      ? (typeof doc.puckData === 'string' ? JSON.parse(doc.puckData) : doc.puckData) 
      : null;
    const heroBlock = parsed?.content?.find((c: any) => c.type === 'Hero');
    return parsed?.root?.props?.description || heroBlock?.props?.subtitle || 'Examy';
  } catch (e) {
    return 'Examy';
  }
};

const generateURL = ({ doc }: any) => {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  if (!doc?.slug) return base;
  return `${base}/${doc.slug}`;
};

export default buildConfig({
  admin: {
    user: 'users',
    suppressHydrationWarning: true,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterDashboard: ['/src/components/CmsEditorLink#CmsEditorLink'],
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        // Email and password fields are automatically added by setting auth: true
      ],
    },
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
      },
      versions: {
        drafts: true,
      },
      access: {
        read: ({ req, id }) => {
          if (id) return true;
          const url = req?.url || '';
          const queryStr = req?.query ? JSON.stringify(req.query) : '';
          if (
            url.includes('blog-details') ||
            url.includes('blogs') ||
            url.includes('faq') ||
            queryStr.includes('blog-details') ||
            queryStr.includes('blogs') ||
            queryStr.includes('faq') ||
            queryStr.includes('blog')
          ) {
            return true;
          }
          return {
            slug: {
              equals: 'home',
            },
          };
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: "Notice: The page with slug 'home', '/', or 'landing-page' is automatically served on the root path (/) of the website.",
          }
        },
        {
          name: 'puckData',
          type: 'json',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        },
      ],
    },
    {
      slug: 'faq',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
      },
      versions: {
        drafts: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'puckData',
          type: 'json',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        },
      ],
    },
    {
      slug: 'blog',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
      },
      versions: {
        drafts: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'puckData',
          type: 'json',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        },
      ],
    },
  ],
  routes: {
    admin: '/cms', // Routed to /cms to avoid conflicts with Puck Editor's /admin path
  },
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    seoPlugin({
      collections: ['pages', 'faq', 'blog'],
      tabbedUI: true,
      generateTitle,
      generateDescription,
      generateURL,
    }),
  ],
});
