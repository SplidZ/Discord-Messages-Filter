const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "say",
    description: "Say something.",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
    dm_permission: false,
    options: [
        {
            name: "message",
            description: "What do you want to say?",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        const say = interaction.options.getString('message');

        if (!interaction.member.permissions.has("Administrator")) {
            return interaction.reply({ content: "📡 **You do not have permission to use this command.**", ephemeral: true })
        }

        try {
            interaction.reply({ content: `${say}` });
        } catch (error) {
            return;
        }
    },
};