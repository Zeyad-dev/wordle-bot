import { User } from 'discord.js'
export abstract class player {
    constructor(public user: User, public type: string) {}
}
export class CrewMate extends player {
    constructor(public user: User) {
        super(user, 'Crew mate')
    }
}
export class Imposter extends player {
    constructor(public user : User) {
        super(user, 'Imposter')
    }
}