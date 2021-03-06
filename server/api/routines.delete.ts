import {MongoClient, ObjectId} from "mongodb";
import {defineEventHandler, useBody} from "h3";
import Routine from "~/server/model/Routine";
import {CONSTANT} from "~/server/CONSTANT";

const mongo = new MongoClient(CONSTANT.MONGO_URI)

export default defineEventHandler(async event => {

    const body = await useBody<{ _id: string }>(event)

    if (!body._id) {
        return {
            message: "No _id provided."
        }
    }

    const client = await mongo.connect()
    const db = client.db('organizer')

    const routines = db.collection<Routine>('routines')
    const result = await routines.deleteOne({
        "_id": new ObjectId(body._id)
    }, {})

    await client.close()
    return result
})