import { User } from 'discord.js'
interface Data {
    players? : class[],
    global? : Boolean,
    host?: User
}
export class Queue {
    public players
    public globalGame
    public host
    constructor(data? : Data) {
        this.players = data?.players ?? []
        this.globalGame = data?.global ?? false
        this.host = data?.host ?? null
    }
}