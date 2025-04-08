import { ChatInputCommandInteraction } from "discord.js";

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dumb-ping")
        .setDescription("Ping test, or something"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("PONG!!!!");
    },
};