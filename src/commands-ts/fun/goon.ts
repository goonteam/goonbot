import { ChatInputCommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("goon")
        .setDescription("Self-explanatory."),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("I gooned to this.");
    },
};