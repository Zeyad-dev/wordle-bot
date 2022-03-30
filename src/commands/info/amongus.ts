import { Command } from '../../structures/Command'
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
        const queue = client.queue
        let userClass
        if(interaction.options.getBoolean('Global')) queue.globalGame == true
        else queue.globalGame == false
        if(queue.players.length <= 0) queue.host == interaction.user
        if(randomNumber == 1 || randomNumber == 2) {
            userClass = new Imposter(interaction.user)
        } else {
            userClass = new CrewMate(interaction.user)
        }
        queue.players.push(userClass)
        console.log(queue)
    }
})