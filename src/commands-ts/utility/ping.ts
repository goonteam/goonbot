import { CacheType, ChatInputCommandInteraction } from "discord.js";
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping test, but it's actually smart!"),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        interaction.editReply(`PONG!!!! (Took ${ping} milliseconds).`)
    },
};