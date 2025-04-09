import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("define")
        .setDescription("Define a word")
        .addStringOption(option =>
            option
                .setName("word")
                .setDescription("The word you want to define.")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("The amount of definitions you want (if none, top definition will be used)")
                .setRequired(false)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const word: string | null = interaction.options.getString("word");
        let definitionCount: number | null = interaction.options.getInteger("amount");

        const dictionaryApi: string = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        let topDefinitions: any[] = [];

        await fetch(dictionaryApi)
            .then(response => response.json())
            .then(data => {
                if (!definitionCount || definitionCount < 1) {
                    definitionCount = 1;
                } 
                
                let meaningsNumber = 0;
                let definitionNumber = 0;

                for (let i = 0; i < definitionCount; i++) {
                    if (definitionNumber >= data[0].meanings[meaningsNumber].definitions.length) {
                        definitionNumber = 0;
                        meaningsNumber++;
                    }

                    try {
                        topDefinitions.push([data[0].meanings[meaningsNumber].definitions[definitionNumber].definition, data[0].meanings[meaningsNumber].partOfSpeech]);

                    } catch (error) {
                        break;
                    }



                    definitionNumber++;
                }

                // topDefinition = data[0].meanings[0].definitions[0].definition;

                // generating the actuall message



                // interaction.reply(`Word: ${word}\n\nDefinitions:\n${definitionBody}`) // ill make this an embed later

                const embed = new EmbedBuilder()
                    .setTitle(`Definitions for "${word}"`)
                    .setColor("Random");

                for (let i = 0; i < topDefinitions.length; i++) {

                    embed.addFields({
                        name: `Part of Speech: ${topDefinitions[i][1]}`,
                        value: topDefinitions[i][0],
                        inline: true
                    }); // this will add a field for each definition

                }

                interaction.reply({
                    embeds: [embed]
                })
            })
            .catch(error => {
                console.error("ERROR: ", error);
                interaction.reply("There was an error, should've known English anyway.");
            })
    },
};