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
    private gameOptions = {
        numberOfImposters : 2,
        numberOfEmergencyMeetings : 2,
        emergencyCooldown : 30000,
        discussionTime : 40000,
        votingTime : 40000,
        killCooldown : 30000
    };
    public playerObject = []
    constructor(data?: Data) {
        this.players = data?.players ?? []
        this.globalGame = data?.global ?? false
        this.host = data?.host ?? null
    }
    async addPlayer(interaction: CommandInteraction) {
        if (this.players.length >= 10) {
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
                        .setStyle(this.players.length >= 7 ? 'SUCCESS' : 'DANGER')
                        .setDisabled(this.players.length >= 7 ? false : true)
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
                ),
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Number of Imposters')
                        .setStyle('SECONDARY')
                        .setDisabled(array?.includes('imposters') || array?.includes('all') ? true : false)
                        .setCustomId('imposters'),
                )
        ]
        if (!editMessage) {
            if (!this.embed) this.embed = new MessageEmbed()
            if (user.id == this.host.id) {
                this.embed.setTitle('Host Controls').setDescription('Use the below buttons to change the settings of the game.').setColor('RED').setAuthor({ name: `${user.username}`, iconURL: `${user.displayAvatarURL()}` })
                const msg = await interaction.reply({ content: `Players found: ${this.players.length}/**10**`, embeds: [this.embed], components: buttons(), fetchReply: true, ephemeral: true }) as Message
                this.playerObject.push({ user: user.id, webhook: interaction.webhook, message: msg})
                const collector = msg.createMessageComponentCollector()
                collector.on('collect', async (i) => {
                    switch (i.customId) {
                        case 'start':
                            await i.deferUpdate()
                            this.startGame(interaction.guild)
                            break;
                        case 'meetings':
                            const msgg : Message = await i.reply({content: `Press one of the below buttons to set the number of emergency meetings per player.\nThe current emergency meetings per player is ${String(this.gameOptions.numberOfEmergencyMeetings)}.`, ephemeral : true, components : [
                                new MessageActionRow()
                                .addComponents(
                                    new MessageButton()
                                    .setLabel('1')
                                    .setStyle('SECONDARY')
                                    .setCustomId('1'),
                                    new MessageButton()
                                    .setLabel('2')
                                    .setStyle('SECONDARY')
                                    .setCustomId('2'),
                                    new MessageButton()
                                    .setLabel('3')
                                    .setStyle('SECONDARY')
                                    .setCustomId('3'),
                                )
                            ]}) as Message
                            const btncollector = msgg.createMessageComponentCollector()
                            btncollector.on('collect', async (ii) => {
                                this.gameOptions.numberOfEmergencyMeetings = parseInt(i.customId)
                                msgg.delete()
                            }) 
                            break
                    }

                })
            } else {
                const msg = await interaction.reply({ content: `Players found: ${this.players.length}/**10**`, ephemeral: true, fetchReply: true})
                this.playerObject.push({ user: user.id, webhook: interaction.webhook, message: msg})
            }
        } else {
            const object = this.playerObject[this.playerObject.findIndex(x => x.user == interaction.user.id)]
                if (user.id == this.host.id) {
                    return await object.webhook.editMessage(object.message, { content: `Players found: ${this.players.length + 1}/**10**`, embeds: [this.embed], components: buttons()})
                } else {
                    return await object.webhook.editMessage(object.message, { content: `Players found: ${this.players.length + 1}/**10**`})
                }
            }
    }

}
