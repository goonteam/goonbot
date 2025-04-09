import { ChatInputCommandInteraction, MessageFlags, Events } from "discord.js"

// this came from the old file with slight modifications
// sorry for using any a lot, there was just too much errors....
module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: ChatInputCommandInteraction | any) {
        if (!interaction.isChatInputCommand()) {
            return;
        }
    
        // COPIED BTW!!!!
        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
            }
        }
    }
}