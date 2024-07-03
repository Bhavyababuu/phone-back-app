// Example serverless function connecting to MongoDB
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function handler(req, res) {
  let client;
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db('todo');
    const collection = database.collection('registrationusers');

    const result = await collection.find({}).toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  } finally {
    client.close();
  }
}

module.exports = handler;
