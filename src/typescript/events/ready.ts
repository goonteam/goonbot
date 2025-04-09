import { Client, Events } from "discord.js";

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(bot: Client | any) {
        console.log(`logged in as ${bot.user.tag}!`);
    }
}