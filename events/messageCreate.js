const client = require("../index");
const db = require('quick.db');
const config = require('../config.json');

client.on('messageCreate', async (message) => {

    if (message.author.id === client.user.id) {
        return;
    }

    if (message.author.id === message.guild.ownerId) {
        return
    }

    if (db.has(`filter.${message.guild.id}`)) {

        if (config.message.some(x => message.content.toLowerCase().split(/\s+/).includes(x))) {

            if (message.deletable) {
                try {
                    message.delete();
                } catch (error) {
                    return;
                }
            }
        }

    }
})
