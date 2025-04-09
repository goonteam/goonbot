import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("goon")
        .setDescription("Self-explanatory."),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("I gooned to this.");
    },
};