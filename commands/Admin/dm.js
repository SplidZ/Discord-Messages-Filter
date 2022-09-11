const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "dm",
    description: "Send a private message.",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
    dm_permission: false,
    options: [
        {
            name: "user",
            description: "Which user do you want to send a message to?",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "message",
            description: "What message do you want to send?",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {
        const user = interaction.options.getUser("user");
        const message = interaction.options.getString("message");

        if (!interaction.member.permissions.has("Administrator")) {
            return interaction.reply({ content: "📡 **You do not have permission to use this command.**", ephemeral: true })
        }

        if (user.id === client.user.id) {
            return interaction.reply({ content: "📡 **I can't send myself messages.**", ephemeral: true })
        }

        try {
            user.send(message)
            return interaction.reply({ content: "⏱️ **Message sent.**" })
        } catch (error) {
            return interaction.reply({ content: "📡 **I cannot send messages to this user.**", ephemeral: true })
        }
    },
};
