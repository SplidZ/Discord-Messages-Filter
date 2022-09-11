const client = require("../index");

client.on("ready", async (messageCreate) => {
    console.log(`${client.user.tag} is ready.`);
});