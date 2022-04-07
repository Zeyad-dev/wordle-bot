import { Imposter, CrewMate, player } from './player'
import { User } from 'discord.js'
interface Data {
    players: User[],
    gameOptions: object
}
interface Data2 {
    location: string,
    tasks: string[]
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
    public locationsObject : Data2[] = [
        {
            location: 'Admin',
            tasks: [
                'Swipe Card'
            ]
        },
        {
            location: 'Cafeteria',
            tasks: [
                'Upload Data', 
                'Empty garbage'
            ]
        },
        {
            location: 'Communications',
            tasks: [
                'Upload data',
                'Divert power to communications'
            ]
        },
        {
            location: 'Electrical',
            tasks: [
                'Upload data', 
                'Fix wiring', 
                'Calibrate distributor'
            ]
        },
        {
            location: 'Engines',
            tasks: [
                'Align engine output',
                'Divert power to Upper engine',
                'Divert power to lower engine'
            ]
        },
        {
            location: 'MedBay',
            tasks: [
                'Submit Scan',
                'Inspect sample'
            ]
        },
        {
            location: 'Navigation',
            tasks: [
                'Chart course',
                'Upload data', 
                'Divert power to Navigation', 
                'Stabilize steering'
            ]
        },
        {
            location: 'O2',
            tasks: [
                'Empty chute', 
                'Divert power to O2', 
                'Clean O2 filter'
            ]
        },
        {
            location: 'Reactor',
            tasks: [
                'Start reactor', 
                'Unlock manifolds'
            ]
        },
        {
            location: 'Shields',
            tasks: [
                'Prime Shields',
                'Divert power to shields'
            ]
        },
        {
            location: 'Weapons',
            tasks: [
                'Clear Asteroids', 
                'Upload data', 
                'Divert Power to Weapons'
            ]
        },
    ]
}