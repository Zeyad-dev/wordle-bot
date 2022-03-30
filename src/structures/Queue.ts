import { User } from 'discord.js'
interface Data {
    players? : Class[],
    global? : Boolean,
    host?: User
}
export class Queue {
    constructor(data? : Data) {
        this.players = data?.players ? data?.players : []
        this.globalGame = data?.global ? true : false
        this.host = data?.host ? data?.host : null
    }
}