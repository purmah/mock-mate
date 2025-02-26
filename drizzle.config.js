/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_2x5rQsORwPDm@ep-calm-paper-a8w8qcm9-pooler.eastus2.azure.neon.tech/mock-interview-ai?sslmode=require',
    }
  };