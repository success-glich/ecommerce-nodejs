import { defineConfig } from 'drizzle-kit';
import { DB_URL } from './src/config/index';

export default defineConfig({
  out: './src/db/migrations',
  schema: './src/db/schema/*.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DB_URL
  },
  verbose:true,
  strict:true, 
});
