import { getPayload } from 'payload';
import config from '../../payload.config';

async function run() {
  const payload = await getPayload({ config });
  
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'blogs'
      }
    },
    draft: true
  });

  if (result.docs.length === 0) {
    console.log('No blogs page found in DB');
    process.exit(0);
  }

  const doc = result.docs[0];
  let puckData = doc.puckData as any;
  if (typeof puckData === 'string') {
    puckData = JSON.parse(puckData);
  }

  // Update title and subtitle inside puckData content
  if (puckData.content && Array.isArray(puckData.content)) {
    puckData.content = puckData.content.map((item: any) => {
      if (item.type === 'BlogList') {
        return {
          ...item,
          props: {
            ...item.props,
            title: "رؤى ومقالات لمعلّمي الغد في المملكة",
            subtitle: "أفكار عملية عن الذكاء الاصطناعي في التعليم، التقويم المتوازن، والمنهج السعودي — من فريق اختباري ونخبة من المعلمين."
          }
        };
      }
      return item;
    });
  }

  await payload.update({
    collection: 'pages',
    id: doc.id,
    data: {
      title: "المدوّنة - Examy",
      puckData: puckData,
      status: 'published'
    },
    draft: false
  });

  console.log('Updated blogs page in PostgreSQL DB successfully!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
