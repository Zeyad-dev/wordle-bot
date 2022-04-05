import { User, MessageEmbed, Message, MessageActionRow, MessageButton, Guild, CommandInteraction } from 'discord.js'
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
    public playerObject : object[]
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
    sendEmbed(user: User, interaction : CommandInteraction, editMessage: boolean) {
        if(editMessage) {
        if(!this.embed) this.embed = new MessageEmbed()
        if(user.id == this.host.id) {
            this.embed.setTitle('Host Controls').setDescription('Use the below buttons to change the settings of the game.').addField('Player count:', `${this.players.length}`).setColor('RED').setAuthor({name: `${user.username}`, iconURL: `${user.displayAvatarURL()}`})
            const buttons = (array? : string[]) => [
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Start Game')
                    .setStyle('PRIMARY')
                    .setDisabled(this.players.length >= 7 ? true : false)
                    .setCustomId('start')
                ),
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Number of emergency meetings')
                    .setStyle('SECONDARY')
                    .setDisabled(array?.includes('meetings') || array?.includes('all') ? true : false)
                    .setCustomId('meetings'),
                    new MessageButton()
                    .setLabel('Emergency Cooldown')
                    .setStyle('SECONDARY')
                    .setDisabled(array?.includes('cooldown') || array?.includes('all') ? true : false)
                    .setCustomId('cooldown'),
                    new MessageButton()
                    .setLabel('Discussion Time')
                    .setStyle('SECONDARY')
                    .setDisabled(array?.includes('discussion') || array?.includes('all') ? true : false)
                    .setCustomId('discussion'),
                    new MessageButton()
                    .setLabel('Voting Time')
                    .setStyle('SECONDARY')
                    .setDisabled(array?.includes('voting') || array?.includes('all') ? true : false)
                    .setCustomId('voting'),
                    new MessageButton()
                    .setLabel('Kill Cooldown')
                    .setStyle('SECONDARY')
                    .setDisabled(array?.includes('kill') || array?.includes('all') ? true : false)
                    .setCustomId('kill'),
                )
            ]
            const msg = await interaction.reply({content: `Players found: ${this.players.length}/**10**`, embeds: [this.embed], components: buttons(), fetchReply: true, ephemeral: true})
            this.playerObject.push({user: user.id, message: msg})
            msg.createMessageComponentCollector()
        } else {

        }
    }
    }

}