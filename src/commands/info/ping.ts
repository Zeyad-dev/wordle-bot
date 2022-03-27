import { Command } from "../../structures/Command";
import randomword from 'random-words'
import { MessageEmbed, MessageActionRow, MessageButton, Message} from 'discord.js'
export default new Command({
    name: "wordle",
    description: "wordle game",
    run: async ({ interaction }) => {
        let word = randomword({exactly: 1000, maxLength: 5, minLength: 5}).filter(x => x.length === 5)
        while(word[0].includes('z')) {
            word = randomword({exactly: 1000, maxLength: 5, minLength: 5}).filter(x => x.length === 5)
        }
        const components = (state) => [
            new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('A')
                        .setStyle('SECONDARY')
                        .setCustomId('A').setDisabled(state),
                    new MessageButton()
                        .setLabel('B')
                        .setStyle('SECONDARY')
                        .setCustomId('B').setDisabled(state),
                    new MessageButton()
                        .setLabel('C')
                        .setStyle('SECONDARY').setCustomId('C').setDisabled(state),
                    new MessageButton()
                        .setLabel('D')
                        .setStyle('SECONDARY').setCustomId('D').setDisabled(state),
                    new MessageButton()
                        .setLabel('E')
                        .setStyle('SECONDARY').setCustomId('E').setDisabled(state),
                ),
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('F')
                        .setStyle('SECONDARY').setCustomId('F').setDisabled(state),
                    new MessageButton()
                        .setLabel('G')
                        .setStyle('SECONDARY').setCustomId('G').setDisabled(state),
                    new MessageButton()
                        .setLabel('H')
                        .setStyle('SECONDARY').setCustomId('H').setDisabled(state),
                    new MessageButton()
                        .setLabel('I')
                        .setStyle('SECONDARY').setCustomId('I').setDisabled(state),
                    new MessageButton()
                        .setLabel('J')
                        .setStyle('SECONDARY').setCustomId('J').setDisabled(state),
                ),
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('K')
                        .setStyle('SECONDARY').setCustomId('K').setDisabled(state),
                    new MessageButton()
                        .setLabel('L')
                        .setStyle('SECONDARY').setCustomId('L').setDisabled(state),
                    new MessageButton()
                        .setLabel('M')
                        .setStyle('SECONDARY').setCustomId('M').setDisabled(state),
                    new MessageButton()
                        .setLabel('N')
                        .setStyle('SECONDARY').setCustomId('N').setDisabled(state),
                    new MessageButton()
                        .setLabel('O')
                        .setStyle('SECONDARY').setCustomId('O').setDisabled(state),
                ),
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('P')
                        .setStyle('SECONDARY').setCustomId('P').setDisabled(state),
                    new MessageButton()
                        .setLabel('Q')
                        .setStyle('SECONDARY').setCustomId('Q').setDisabled(state),
                    new MessageButton()
                        .setLabel('R')
                        .setStyle('SECONDARY').setCustomId('R').setDisabled(state),
                    new MessageButton()
                        .setLabel('S')
                        .setStyle('SECONDARY').setCustomId('S').setDisabled(state),
                    new MessageButton()
                        .setLabel('T')
                        .setStyle('SECONDARY').setCustomId('T').setDisabled(state),
                ),
                new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('U')
                        .setStyle('SECONDARY').setCustomId('U').setDisabled(state),
                    new MessageButton()
                        .setLabel('V')
                        .setStyle('SECONDARY').setCustomId('V').setDisabled(state),
                    new MessageButton()
                        .setLabel('W')
                        .setStyle('SECONDARY').setCustomId('W').setDisabled(state),
                    new MessageButton()
                        .setLabel('X')
                        .setStyle('SECONDARY').setCustomId('X').setDisabled(state),
                    new MessageButton()
                        .setLabel('Y')
                        .setStyle('SECONDARY').setCustomId('Y').setDisabled(state),
                )
        ]
        const guessed = []
        console.log(word)
        const message = '```' + `${guessed.length == 5 ? guessed.join(" ") : guessed.join(" ") + repeat('_ ', guessed.length - 5)}` + '```'
        const msg : Message = (await interaction.reply({content: `${message}`, components: components(false), fetchReply: true}) as Message)
        const filter = (i) => {
            if(i.user.id == interaction.user.id) return true
            else return void i.reply({content: 'This game is not your\'s!', ephemeral: true})
        }
        const collector = msg.createMessageComponentCollector({
            filter,
        })
        collector.on('collect', async (i) => {
            if(guessed.length <= 5) {
            guessed.push(i.value)
            msg.edit({content: `${message}`})
            }
        })


        //https://api.dictionaryapi.dev/api/v2/entries/en/dog
        function repeat(character, number) {
            let i = 1
            while(i<number) {
                i++
                return character
            }
        }
    }
});
