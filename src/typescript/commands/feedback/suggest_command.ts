import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("suggest-command")
        .setDescription("Suggest a command for me to add!"),
    async execute(interaction: ChatInputCommandInteraction) {
        let responseLink = "https://docs.google.com/forms/d/e/1FAIpQLScmBhV2mogc86nZkt-kAMPa0mv0rVVmS6dUq85oalhJvV2PlA/viewform?usp=dialog";
        await interaction.deferReply({
            flags: MessageFlags.Ephemeral
        });

        const embed = new EmbedBuilder()
            .setTitle("Click the link below")
            .setColor("Random")
            .setDescription(`[Suggestions Form](${responseLink})`)
            .setThumbnail();

        interaction.editReply({
            embeds: [embed],
        })
    },
};