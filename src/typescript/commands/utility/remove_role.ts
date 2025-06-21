import { ChatInputCommandInteraction, MessageFlags, PermissionsBitField, Role, SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-role")
        .setDescription("Remove a role from the server.")
        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("The role you would like to remove")
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const interactionUser = interaction.member;
        const role = interaction.options.getRole("role") as Role;
        let error = false;

        if ((interactionUser?.permissions as PermissionsBitField).has(PermissionsBitField.Flags.ManageRoles)) {

            await role.delete()
                .then((deleted) => {
                    console.log(`Deleted the ${deleted.name} role!`)

                    interaction.reply({
                        content: `Deleted the ${role.name} role!`,
                        flags: MessageFlags.Ephemeral
                    });
                })
                .catch(() => {
                    console.error();

                    interaction.reply({
                        content: "Couldn't delete that role!",
                        flags: MessageFlags.Ephemeral
                    });
                });


        } else {
            await interaction.reply({
                content: "Sorry, you don't have the permissions to do this.",
                flags: MessageFlags.Ephemeral
            });
        }
    },
};