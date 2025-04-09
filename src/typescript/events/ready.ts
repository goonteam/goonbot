import { Client, Events } from "discord.js";

module.exports = {
    name: "ready",
    once: true,
    async execute(bot: Client | any) {
        console.log(`logged in as ${bot.user.tag}!`)
    }
}