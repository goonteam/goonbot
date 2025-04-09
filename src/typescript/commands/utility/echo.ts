import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder, TextChannel } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Repeats what you input")
        .addStringOption(option =>
            option
                .setName("input")
                .setDescription("What you want the bot to repeat")
                .setRequired(true)
                .setMinLength(5)
                .setMaxLength(350)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const echoed = interaction.options.getString("input");

        await interaction.deferReply({
            flags: MessageFlags.Ephemeral
        });

        await (interaction.channel as TextChannel).send(echoed as string);

        await interaction.editReply({
            content: "Sent!"
        })
    },
};