import {defineEventHandler, useBody} from "h3"
import {MongoClient} from "mongodb"
import Routine from "~/server/model/routine"

const mongo = new MongoClient('mongodb://localhost:27017')

export default defineEventHandler(async (event) => {
    let body, { contents, config } = await useBody<Routine>(event)

    if (!body) {
        event.res.writeHead(400)
    }

    const client = await mongo.connect()
    const db = client.db('organizer')

    const routines = db.collection<Routine>('routines');
    await routines.insertOne({
        contents,
        config,
        meta: {
            created: new Date().toJSON(),
            updated: new Date().toJSON()
        }
    })

    await client.close()
    return "yes"
})
