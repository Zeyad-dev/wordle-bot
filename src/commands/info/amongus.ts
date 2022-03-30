import { Command } from '../../structures/Command'
export default new Command({
    name: 'amongus',
    description: 'amongus',
    options: [
        {
            name: 'Global':
            descriprion: 'Whether you want to play with'
        }
    ],
    run: async ({client, interaction}) => {
        const queue = client.queue
        if()
    }
})