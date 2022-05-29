import {defineEventHandler} from "h3";

export default defineEventHandler(async (event) => {
    const url = event.req.url;
    const id = `.+/routines/(.*)/?`.match(url)[0]

    return {
        message: 'yes',
        id
    }
})