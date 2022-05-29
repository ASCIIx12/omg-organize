import {defineEventHandler, useBody} from "h3";
import {MongoClient} from "mongodb";
import Routine from "~/server/model/routine";

const mongo = new MongoClient('mongodb://localhost:27017')

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    if (!body) {
        event.res.writeHead(401, )
    }

    const client = await mongo.connect()
    const db = client.db('organizer')

    const routines = db.collection<Routine>('routines');
    // routines.insertOne()


    await client.close()
    return event.res.writeHead(200)
})
