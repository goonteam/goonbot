import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quote")
        .setDescription("Give an inspirational quote, for when you feel down."),
    async execute(interaction: ChatInputCommandInteraction) {
        type Quote = {
            id: number,
            quote: string,
            author: string
        };

        const quoteApi: string = "https://qapi.vercel.app/api/random";
        let messageContents: string = "";
        await fetch(quoteApi)
            .then(response => response.json())
            .then(data => {
                const quoteData: Quote = data;
                messageContents = `"${quoteData.quote}" - ${quoteData.author}`;
                interaction.reply(messageContents)
            })
            .catch(error => {
                console.error("ERROR: ", error);
                interaction.reply("SORRY!!! THERE'S AN ERROR");
            });


    },
};