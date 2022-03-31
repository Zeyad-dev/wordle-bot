import { User, MessageEmbed, Message, MessageActionRow, MessageButton, Guild } from 'discord.js'
import { player } from './player'
import { Game } from './game'
import { client } from '..'
interface Data {
    players? : User[],
    global? : boolean,
    host?: User
}
export class Queue {
    public players
    public globalGame
    public host
    public embed : MessageEmbed
    private gameOptions
    constructor(data? : Data) {
        this.players = data?.players ?? []
        this.globalGame = data?.global ?? false
        this.host = data?.host ?? null
    }
    addPlayer(user : User, guild : Guild) { 
        if(this.players.length >= 9) {
            this.players.push(user)
            console.log(user)
            return this.startGame(guild)
        }
        if(this.players.length <= 0) this.host = user
        this.players.push(user)
        console.log(user)
    }
    startGame(guild: Guild) {
        new Game({
            players: this.players,
            gameOptions: this.gameOptions
        })
        console.log('Game started')
        if(this.globalGame) {
        client.queue = new Queue()
        } else {
        client.guildQueue.splice(client.guildQueue.findIndex(x => x.guild == guild.id), 1)
        }
    }
    sendEmbed(user: User, message: Message) {
        if(!this.embed) this.embed = new MessageEmbed()
        if(user.id == this.host.id) {
            this.embed.setTitle('Host Controls').setDescription('Use the below buttons to change the settings of the game.').addField('Player count:', `${this.players.length}`).setColor('RED').setAuthor({name: `${user.username}`, iconURL: `${user.displayAvatarURL()}`})
            const buttons = (array : string[]) => [
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Number of meetings per player')
                    .setStyle('SECONDARY')
                    .setDisabled(array.includes('meetings') ? true : false)
                    .setCustomId('meetings')
                )
            ]
        } else {

        }
    }

}