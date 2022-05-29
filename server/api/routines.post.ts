import {defineEventHandler, useBody} from "h3"
import {MongoClient} from "mongodb"
import Routine from "~/server/model/Routine"
import {constants} from "http2"
import {CONSTANT} from "~/server/CONSTANT";

const mongo = new MongoClient(CONSTANT.MONGO_URI)

export default defineEventHandler(async (event): Promise<{
    code: number,
    error?: string,
    documentSchema?: {}
}> => {
    const body = await useBody<Routine>(event)

    if (!body) {
        return {
            code: constants.HTTP_STATUS_BAD_REQUEST,
            error: 'Empty request body'
        }
    }

    const client = await mongo.connect()
    const db = client.db('organizer')

    const routines = db.collection<Routine>('routines');
    const resultSchema = await routines.insertOne({
        contents: body.contents,
        meta: {
            created: new Date().toJSON(),
            updated: new Date().toJSON()
        }
    }, {})

    await client.close()
    return {
        code: constants.HTTP_STATUS_OK,
        documentSchema: resultSchema
    }
})
