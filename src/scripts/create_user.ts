import { getPayload } from 'payload';
import config from '../../payload.config';

async function run() {
  const payload = await getPayload({ config });
  
  // Check if a user already exists
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  });

  if (existingUsers.docs.length > 0) {
    console.log(`A user already exists in the database: ${existingUsers.docs[0].email}`);
    process.exit(0);
  }

  // Create the admin user
  const adminUser = await payload.create({
    collection: 'users',
    data: {
      email: 'admin@examy.ai',
      password: 'password123',
    },
  });

  console.log(`SUCCESS: Admin user created!`);
  console.log(`Email: ${adminUser.email}`);
  console.log(`Password: password123`);
  process.exit(0);
}

run().catch(err => {
  console.error('Failed to create admin user:', err);
  process.exit(1);
});
