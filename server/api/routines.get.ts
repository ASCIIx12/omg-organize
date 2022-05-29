import {defineEventHandler} from "h3";
import {MongoClient} from "mongodb";
import Routine from "~/server/model/routine";

const mongo = new MongoClient('mongodb://localhost:27017')
let result = []

export default defineEventHandler(async () => {
  const client = await mongo.connect()
  const db = client.db('organizer')

  const response = db.collection<Routine>('routines').find({})

  if ((await db.collection("routines").estimatedDocumentCount() === 0)) {
    console.log("No documents!")
  }

  result = await response.toArray()

  await client.close()
  return result
})
