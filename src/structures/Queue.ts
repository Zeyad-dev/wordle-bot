import { User, MessageEmbed, Message, MessageActionRow, MessageButton } from 'discord.js'
import { player } from './player'
import { Game } from './game'
interface Data {
    players? : player[],
    global? : Boolean,
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
    addPlayer(player : player, user : User) { 
        if(this.players.length >= 10) this.startGame()
        if(this.players.length <= 0) this.host = user
        this.players.push(player)
    }
    startGame() {
        new Game({
            players: this.players,
            gameOptions: this.gameOptions
        })
        console.log('Game started')
    }
    sendEmbed(user: User, message: Message) {
        if(!this.embed) this.embed = new MessageEmbed()
        if(user.id == this.host.id) {
            this.embed.setTitle('Host Controls').setDescription('Use the below buttons to change the settings of the game.').addField('Player count:', `${this.players.length}`).setColor('RED').setAuthor({name: `${user.username}`, iconURL: `${user.displayAvatarURL()}`})
            const buttons = [
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Number of meetings per player')
                    .setStyle('SECONDARY')
                    .setDisabled(false)
                    .setCustomId('meetings')
                )
            ]
        } else {

        }
    }

}