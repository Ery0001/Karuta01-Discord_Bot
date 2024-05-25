const express = require("express");
const cron = require('node-cron');
const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const { scheduleMessage, scheduleEmbed } = require('./schedulers');
const { handleMessage, handleCommand } = require('./handlers');

const app = express();
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'] }
});
const prefix = "c.";

client.commands = new Discord.Collection();
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./commands/${commandName}`);
    client.commands.set(commandName, command);
}

client.on("messageCreate", async message => {
    if (message.content.startsWith(prefix)) {
        handleCommand(client, message, prefix);
    } else {
        handleMessage(message);
    }
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('The Legend Of Neverland', { type: 'PLAYING' });
    client.user.setStatus('idle');

    // Schedule messages and embeds
    scheduleMessage(client);
    scheduleEmbed(client);
});

client.login('YOUR_BOT_TOKEN');

app.listen(3000, () => {
    console.log("Project is running!");
});

app.get("/", (req, res) => {
    res.send("Erythina is Online! (i think)");
});
