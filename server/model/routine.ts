export default interface Routine {
    _id: {
        "$oid": string
    }
    contents: {
        title: string
        description?: string
        relatedTasks: []
    }
    config?: {}
    meta: {
        created: {
            "$timestamp": {
                "t": number,
                "i": number
            }
        }
        updated: {
            "$timestamp": {
                "t": number,
                "i": number
            }
        }
        createdBy?: string
    }
}