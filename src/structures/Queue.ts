import { User, MessageEmbed, Message, MessageActionRow, MessageButton, Guild, CommandInteraction } from 'discord.js'
import { player } from './player'
import { Game } from './game'
import { client } from '..'
interface Data {
    players?: User[],
    global?: boolean,
    host?: User
}
export class Queue {
    public players
    public globalGame
    public host
    public embed: MessageEmbed
    private gameOptions
    public playerObject = []
    constructor(data?: Data) {
        this.players = data?.players ?? []
        this.globalGame = data?.global ?? false
        this.host = data?.host ?? null
    }
    async addPlayer(interaction: CommandInteraction) {
        if (this.players.length >= 9) {
            this.players.forEach(async player => await this.sendEmbed(player, interaction, true))
            this.players.push(interaction.user)
            await this.sendEmbed(interaction.user, interaction, false)
            return this.startGame(interaction.guild)
        }
        if (this.players.length <= 0) this.host = interaction.user
        this.players.forEach(async player => await this.sendEmbed(player, interaction, true))
        this.players.push(interaction.user)
        await this.sendEmbed(interaction.user, interaction, false)
    }
    startGame(guild: Guild) {
        new Game({
            players: this.players,
            gameOptions: this.gameOptions
        })
        console.log('Game started')
        if (this.globalGame) {
            client.queue = new Queue()
        } else {
            client.guildQueue.splice(client.guildQueue.findIndex(x => x.guild == guild.id), 1)
        }
    }
    async sendEmbed(user: User, interaction: CommandInteraction, editMessage: boolean) {
        const buttons = (array?: string[]) => [
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
        if (!editMessage) {
            if (!this.embed) this.embed = new MessageEmbed()
            if (user.id == this.host.id) {
                this.embed.setTitle('Host Controls').setDescription('Use the below buttons to change the settings of the game.').addField('Player count:', `${this.players.length}`).setColor('RED').setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL()}` })
                const msg = await interaction.reply({ content: `Players found: ${this.players.length}/**10**`, embeds: [this.embed], components: buttons(), fetchReply: true, ephemeral: true }) as Message
                this.playerObject.push({ user: user.id, message: msg })
                const collector = msg.createMessageComponentCollector()
                collector.on('collect', async (i) => {
                    switch (i.customId) {
                        case 'start':
                            this.startGame(interaction.guild)
                            break;
                        case 'meetings':
                            break
                    }

                })
            } else {
                return await interaction.reply({ content: `Players found: ${this.players.length}/**10**`, ephemeral: true, fetchReply: true})
            }
        } else {
            const object = this.playerObject[this.playerObject.findIndex(x => x.user == interaction.user.id)]
                if (user.id == this.host.id) {
                    return await object.message.edit({ content: `Players found: ${this.players.length}/**10**`, embeds: [this.embed], components: buttons()})
                } else {
                    return await object.message.edit({ content: `Players found: ${this.players.length}/**10**`})
                }
            }
    }

}
