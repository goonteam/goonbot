import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";

const eightBallResponses: string[] = [ // took responses from pybot (by touchcreator)
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes, definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Ask the magic 8 ball your question. 100% accurate...")
        .addStringOption(option =>
            option
                .setName("question")
                .setDescription("The question to ask the magic 8 ball!")
                .setRequired(true)
                .setMinLength(5)
                .setMaxLength(100)
        )
        .addBooleanOption(option =>
            option
                .setName("hidden")
                .setDescription("Whether you would like others to see your question and response (false by default).")
                .setRequired(false)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        let randomResponse: string = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)];
        const question = interaction.options.getString("question");
        const hidden = interaction.options.getBoolean("hidden");

        const embed = new EmbedBuilder()
            .setTitle(`Answer to "${question}" :8ball:`)
            .setColor("Random")
            .addFields({
                name: "Your answer is.... :8ball:",
                value: randomResponse,
                inline: false
            });
        

        if (hidden) {
            interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral,
            })
        } else {
            interaction.reply({
                embeds: [embed],
            })
        }
        
    },
};