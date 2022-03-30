interface Data {
    players? : Class[]
}
export class Queue {
    constructor(data? : Data) {
        this.players = data?.players ? data?.players : []
    }
}