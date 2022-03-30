import { User } from 'discord.js'
abstract class player {
    constructor(public user: User) {}
}
class CrewMate extends player {
    constructor(public user: User) {
        super(user)
    }
}
class Imposter extends player {
    constructor(public user : User) {
        super(user)
    }
}