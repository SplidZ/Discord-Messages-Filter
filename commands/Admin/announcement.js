const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: "announcement",
    description: "Make an announcement.",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
    dm_permission: false,
    options: [
        {
            name: "announcement",
            description: "What do you want to announce?",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        const announcement = interaction.options.getString('announcement');

        if (!interaction.member.permissions.has("Administrator")) {
            return interaction.reply({ content: "📡 **You do not have permission to use this command.**", ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setColor("0xBE1931")
            .setTitle("Announcement")
            .setDescription(`${announcement}`)

        try {
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            return;
        }
    },
};