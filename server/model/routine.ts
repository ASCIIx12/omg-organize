export default interface Routine {
    _id?: {
        "$oid": string
    }
    contents: {
        title: string
        description?: string
        relatedTasks: []
    }
    config?: {}
    meta: {
        created: string
        updated: string
        createdBy?: string
    }
}