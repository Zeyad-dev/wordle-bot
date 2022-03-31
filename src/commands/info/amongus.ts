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
        let arrayOfNums = [
            '1','2','3','4','5','6','7','8','9','10'
        ]
        let randomNumber = Math.floor(Math.random() * arrayOfNums.length)
        arrayOfNums.splice(randomNumber, 1)
        let userClass
        let numberOfImposters = 2
        let numberOfCrewMates = 8

        if(interaction.options.getBoolean('global')) {
            const queue = client.queue
        queue.globalGame = true
        queue.addPlayer(userClass, interaction.user, interaction.guild)
        console.log(queue)
    } else {
        let queue
        const index = client.guildQueue.findIndex(x => x.guild == interaction.guild.id)
        if(index == -1) {
            let queueObject = client.guildQueue.push({
                guild: interaction.guild.id,
                queue: new Queue({global : false})
            })
            queue = client.guildQueue[queueObject - 1].queue
        } else queue = client.guildQueue[index].queue
        queue.addPlayer(userClass, interaction.user, interaction.guild)
        console.log(queue)

    }
    }
})