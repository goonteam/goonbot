import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder, TextChannel, PermissionsBitField } from "discord.js";


// not using comments will come back to bite me
module.exports = {
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge messages.")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("The amount you want to purge")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.channel as TextChannel;
        const messageAmount: number = interaction.options.getInteger("amount") as number;
        const interactionUser = interaction.member;

        if ((interactionUser?.permissions as PermissionsBitField).has(PermissionsBitField.Flags.ManageMessages)) {
            await channel.bulkDelete(messageAmount)
            .then(messages => console.log(`deleted ${messageAmount} messages`))
            .catch(error => console.log(error));

            await interaction.reply({
                content: `Purged ${messageAmount} messages!`,
                flags: MessageFlags.Ephemeral
            })
        } else {
            interaction.reply({
                content: "You don't have enough permissions to do this!",
                flags: MessageFlags.Ephemeral
            })
        }
    },
};