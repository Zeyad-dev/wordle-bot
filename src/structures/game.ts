import { Imposter, CrewMate, player } from './player'
import { User } from 'discord.js'
interface Data {
    players: User[],
    gameOptions: object
}
export class Game {
    public players
    public finalPlayers : any[]
    public gameOptions
    constructor(data : Data) {
        this.players = data.players
        this.gameOptions = data.gameOptions
        this.finalPlayers = []
        this.setRoles()
    }
    setRoles() {
        for(let i = 1; i<=this.gameOptions.numberOfImposters; i++) {
            let random = Math.floor(Math.random() * this.players.length)
            this.finalPlayers.push(new Imposter(this.players[random]))
            this.players.splice(random, 1)
        }
        for(let i = 1; i<=(10 - this.gameOptions.numberOfImposters); i++) {
            let random = Math.floor(Math.random() * this.players.length)
            this.finalPlayers.push(new CrewMate(this.players[random]))
            this.players.splice(random, 1)
        }
    }
}