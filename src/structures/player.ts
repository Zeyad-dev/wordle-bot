import { User } from 'discord.js'
export abstract class player {
    constructor(public user: User) {}
}
export class CrewMate extends player {
    constructor(public user: User) {
        super(user)
    }
}
export class Imposter extends player {
    constructor(public user : User) {
        super(user)
    }
}