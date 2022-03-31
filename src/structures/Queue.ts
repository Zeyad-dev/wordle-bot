import { User } from 'discord.js'
import { player } from './player'
interface Data {
    players? : player[],
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
    addPlayer(player : player, user : User) {
        if(this.players.length <= 0) this.host = user
        this.players.push(player)
    }
}