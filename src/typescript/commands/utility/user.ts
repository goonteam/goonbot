import { ChatInputCommandInteraction, SlashCommandBuilder, User } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Get information about the user (maybe).")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("The user you want information about.")
                .setRequired(false)
            ),
    async execute(interaction: ChatInputCommandInteraction) {
        let user: User | null = interaction.options.getUser("user");

        if (!user) {
            user = interaction.user;
        }

        let userGlobalName: string | null = user.globalName; // because for bots its weird

        if (!userGlobalName) {
            userGlobalName = user.username;
        }

        await interaction.reply(`The user is named ${userGlobalName} (or ${user.username}).`); 
    },
};