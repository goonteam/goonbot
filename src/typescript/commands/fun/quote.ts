import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quote")
        .setDescription("Give an inspirational quote, for when you feel down."),
    async execute(interaction: ChatInputCommandInteraction) {
        type Quote = {
            q: string,
            a: string,
            h?: string
        };

        const quoteApi: string = "https://zenquotes.io/api/random";

        

        await fetch(quoteApi)
            .then(response => response.json())
            .then(data => {
                const quoteData: Quote = data[0];

                const embed = new EmbedBuilder()
                            .setTitle(`${interaction.user.displayName}'s quote:`)
                            .setColor("Random")
                            .addFields({
                                name: `“${quoteData.q}”`,
                                value: `\\- ${quoteData.a}`
                            })
                            .setFooter({text: "Quotes from https://zenquotes.io"});
                interaction.reply({
                    embeds: [embed]
                });
            })
            .catch(error => {
                console.error("ERROR: ", error);
                interaction.reply("SORRY!!! THERE'S AN ERROR");
            });


    },
};