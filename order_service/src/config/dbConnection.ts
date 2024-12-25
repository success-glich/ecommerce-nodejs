import { Pool } from 'pg'
import * as schema from '../db/schema'
import {NodePgDatabase,drizzle} from 'drizzle-orm/node-postgres'
import { DB_URL } from '.'

const pool = new Pool({
    connectionString:DB_URL
})

const  DB: NodePgDatabase<typeof schema> = drizzle(pool,{schema});
export default DB;