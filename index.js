const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 3276799
});
module.exports = client;

client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.login(client.config.token);