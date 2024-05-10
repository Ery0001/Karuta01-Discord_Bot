const express = require("express");
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const app = express();
const someFunc = () => {
    console.log ("The ability to freeze the time? Interesting question.");
    setTimeout(someFunc, 3000);
}

setTimeout(someFunc, 3000);
app.listen(3000, () => {
  console.log("Project is running!");
})

app.get("/", (req,res) => {
  res.send("Erythina is Online! (i think)");
})

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  allowedMentions: ["users"]
});
const fs = require("fs");
const prefix = "c."
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for (file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
  client.commands.set(commandName, command)
}

client.on("messageCreate", message => {
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    command.run(client, message, args)
  }
  if (message.content === "embed02") {
  let embed = new Discord.MessageEmbed()
    //.setTitle("EDICT OF UNITY")
    .setDescription("We strictly request your adherence to Discord's Terms of Service and guidelines, which can be found at the following links:\n\nTerms of Service: https://discord.com/terms\nGuidelines: https://discord.com/guidelines")
    .setColor("#B76A82")
    /*.setImage("https://ik.imagekit.io/Zedi/20240504_215923.jpg?updatedAt=1714831268770")*/
    .setFooter("Noblese Guild")
  
  message.channel.send({ embeds: [embed] })
} 

  /*if (message.content === "Farm") {
    message.channel.send(`${message.author.username}  Hello if you're interested on our Pw farms do \n [!Farm] \n \n Follow exactly if the command has capitalize letters to ensure the command works. have a good day :>`);
  }
  if (message.content === "farm") {
    message.channel.send(`${message.author.username}  Hello if you're interested on our Pw farms do \n [!Farm] \n \n Follow exactly if the command has capitalize letters to ensure the command works. have a good day :>`);
  }*/
  if (!message.author.bot) {
  const messageContent = message.content.toLowerCase();
    if (messageContent.includes("morning")) {
         message.channel.send(`Good Morning <@!${message.author.id}>!`);
    }
    if (messageContent.includes("afternoon")) {
         message.channel.send(`Good Afternoon <@!${message.author.id}>!`);
    }
    if (messageContent.includes("evening")) {
         message.channel.send(`Good Evening <@!${message.author.id}>!`);
    }
    }
})

client.on('ready', async () => {
  console.log('Bot Is Launched')
   client.user.setActivity({
    name: `The Legend Of Neverland`,
    type: 'PLAYING'
  })
});

client.on('ready', () => {
  client.user.setStatus('idle');
  console.log(`Logged in as ${client.user.tag}`)
})

client.login(process.env.token);
