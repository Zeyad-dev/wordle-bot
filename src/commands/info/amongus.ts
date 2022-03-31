import { Command } from '../../structures/Command'
import { Queue } from '../../structures/Queue'
import { Imposter, CrewMate } from '../../structures/player'
export default new Command({
    name: 'amongus',
    description: 'amongus',
    options: [
        {
            name: 'global',
            description: 'Whether you want to play with people in other servers or play in the current server.',
            type: 'BOOLEAN',
            required: true,
        }
    ],
    run: async ({client, interaction}) => {
        let randomNumber = Math.floor(Math.random() * 10)
        let userClass
        if(interaction.options.getBoolean('global')) {
            const queue = client.queue
        queue.globalGame = true
        let numberOfImposters = 1
        if(randomNumber == 1 || randomNumber == 2 && numberOfImposters <= 2) {
            numberOfImposters++
            userClass = new Imposter(interaction.user)
        } else {
            userClass = new CrewMate(interaction.user)
        }
        queue.addPlayer(userClass, interaction.user, interaction.guild)
        console.log(queue)
    } else {
        let queue
        const index = client.guildQueue.findIndex(x => x.guild == interaction.guild.id)
        if(index == -1) {
            let queueObject = client.guildQueue.push({
                guild: interaction.guild.id,
                queue: new Queue({globalGame : false})
            })
            queue = client.guildQueue[queueObject - 1].queue
        } else queue = client.guildQueue[index].queue
        console.log(queue)

    }
    }
})