import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(connectionString);

let conn;
try {
    console.log("\nConnecting to MongoDB...");
    conn = await client.connect();
    console.log("Connected to MongoDB");
} catch (e) {
    console.error(e);
}

const db = conn.db(dbName);

export default db;