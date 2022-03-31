import { player } from './player'
interface Data {
    players: player,
    gameOptions: any[]
}
export class Game {
    public players
    public gameOptions
    constructor(data : Data) {
        this.players = data.players
        this.gameOptions = data.gameOptions
    }
}