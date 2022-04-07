import { User, Message, MessageAttachment } from 'discord.js'
export abstract class player {
    constructor(public user: User, public type: string) {}
    changeLocation(location : string, message: Message) {
        const attachment = new MessageAttachment(`../images/${location.replace(' ', "_")}`, 'location')
        message.reply({files: [attachment]})
    }
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