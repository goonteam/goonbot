import { ChatInputCommandInteraction, EmbedBuilder, GuildMember, SlashCommandBuilder, User } from "discord.js";

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


        const embed = new EmbedBuilder()
            .setTitle(`Stats of ${user.username}`)
            .setColor("Random")
            .setThumbnail(user.displayAvatarURL())
            .addFields(
            {
                name: "Username",
                value: user.username,
                inline: true
            },
            {
                name: "Display Name",
                value: user.displayName,
                inline: true
            },
            {
                name: "ID",
                value: user.id,
                inline: true
            },
            {
                name: "Discord Join Date",
                value: user.createdAt.toDateString(),
                inline: true
            }
        )

        await interaction.reply({
            embeds: [embed]
        }); 
    },
};