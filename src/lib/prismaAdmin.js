import 'dotenv/config';
import pg from 'pg';
import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';

 let connectionString = process.env.DATABASE_URL;

if (connectionString) {

  const url = new URL(connectionString);

  url.searchParams.delete('channel_binding');


  if (!url.searchParams.has('pgbouncer')) {
    url.searchParams.set('pgbouncer', 'true');
  }

  connectionString = url.toString();
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prismaAdmin = new PrismaClient({ adapter });

export default prismaAdmin;
