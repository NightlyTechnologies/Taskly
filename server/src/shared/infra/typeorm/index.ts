import { createConnection } from 'typeorm';

createConnection(process.env.CONNECTION_NAME);
