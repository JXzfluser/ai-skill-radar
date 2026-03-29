// @ts-nocheck
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'ai-bot-website';

let client;
let db;

async function connectToDatabase() {
  if (!db) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
  }
  return db;
}

module.exports = { connectToDatabase };