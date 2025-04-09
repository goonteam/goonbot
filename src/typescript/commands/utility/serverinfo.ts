import { ChannelType, ChatInputCommandInteraction, EmbedBuilder, NonThreadGuildBasedChannel, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Information about THIS SERVER SPECIFICALLY"),
    async execute(interaction: ChatInputCommandInteraction) {

        if (interaction.guild) {
            const server = interaction.guild;
            let serverName = server.name;
            let memberCount = server.memberCount;
            
            let channelCount = (await server.channels.fetch()).filter(
                (channel) => (channel as NonThreadGuildBasedChannel).type != ChannelType.GuildCategory
            ).size;

            const embed = new EmbedBuilder() // set up the embed
                .setTitle(`Stats for ${serverName}`)
                .setColor("Random")
                .setThumbnail(server.iconURL())
                .addFields({
                    name: "Member Count:",
                    value: `${memberCount} members`,
                    inline: true
                },
                {
                    name: "Channel Count:",
                    value: `${channelCount} channels`,
                    inline: true
                }
            );

            interaction.reply({
                embeds: [embed]
            })
        }
        
    },
};