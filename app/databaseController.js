const { MongoClient } = require('mongodb');
const Config = require('../config');

const uri = `mongodb+srv://evgeniy:${Config.dbPassword}@cluster-for-bots.qrj3z.mongodb.net/<dbname>?retryWrites=true&w=majority`;

async function findUserSchedule(id) {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => { console.log(err); });
  try {
    const db = client.db('schedule');
    const collection = db.collection('events');
    const query = { id };
    const res = await collection.findOne(query);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    client.close();
  }
}

async function addEvent(id, event) {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => { console.log(err); });
  try {
    const db = client.db('schedule');
    const collection = db.collection('events');
    const query = { id };
    const res = await collection
      .updateOne(query,
        {
          $push:
          {
            events:
            {
              $each: [event],
              $sort: { time: -1 },
            },
          },
        });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    client.close();
  }
}

async function addNewSchedule(id, event) {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => { console.log(err); });
  try {
    const db = client.db('schedule');
    const collection = db.collection('events');
    const doc = { id, events: [event] };
    const res = await collection
      .insert(doc);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    client.close();
  }
}

module.exports = { hello, findUserSchedule, addEvent, addNewSchedule };
