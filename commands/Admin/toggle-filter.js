const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");

module.exports = {
    name: "toggle-filter",
    description: "Manage the filter system.",
    default_member_permissions: PermissionsBitField.Flags.Administrator,
    dm_permission: false,
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "on",
            description: "Activate the system.",
        }, {
            type: ApplicationCommandOptionType.Subcommand,
            name: "off",
            description: "Disable the system.",
        }
    ],

    run: async (client, interaction, args) => {

        const sbc = interaction.options.getSubcommand();

        if (sbc === "on") {
        
            if (interaction.user.id !== interaction.guild.ownerId) {
                return interaction.reply({ content: "📡 **Only the server owner can run this command.**", ephemeral: true })
            }

            if (db.has(`filter.${interaction.guild.id}`)) {
                return interaction.reply({ content: "📡 **The system is already activated.**", ephemeral: true })
            }

            db.set(`filter.${interaction.guild.id}`, true);

            try {
                return interaction.reply({
                    content: "📡 **System activated.**" })
            } catch (error) {
                return;
            }

        } else if (sbc === "off") {

            if (interaction.user.id !== interaction.guild.ownerId) {
                return interaction.reply({ content: "📡 **Only the server owner can run this command.**", ephemeral: true })
            }

            if (!db.has(`filter.${interaction.guild.id}`)) {
                return interaction.reply({ content: "📡 **The system is already disabled.**", ephemeral: true })
            }

            db.delete(`filter.${interaction.guild.id}`);

            try {
                return interaction.reply({ content: "📡 **System disabled.**" })
            } catch (error) {
                return;
            }
        
        }

    },
};
