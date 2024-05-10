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

// Importing aoi.js and initializing the chat bot
const aoijs = require("aoi.js");
const bot = new aoijs.AoiClient({
  token: process.env.Token, // Replace "Token" with your actual token
  prefix: prefix,
  intents: ["GUILDS", "GUILD_MESSAGES"],
  mobilePlatform: true,
});

// Main command for the chat bot
bot.command({
  name: "$alwaysExecute",
  category: "Command Support",
  code: `
  $reply[$messageID;yes]
  $httpRequest[https://api.udit.tk/api/chatbot?message=$message&name=Erythrina&gender=Female&race=Flower%20Fairy&description=She%20may%20be%20quiet%2C%20but%20her%20very%20presence%20draws%20people's%20respect.%20The%20mystery%20surrounding%20her%20comes%20from%20her%20unusual%20grasp%20of%20time.%20In%20the%20eyes%20of%20Erythrina%2C%20the%20abstract%20of%20time%20becomes%20a%20%5Bsilky%20substance%5D.%20She%20doesn't%20know%20how%20she%20got%20this%20power%2C%20probably%20because%20the%20Cabala%20ancients%20used%20to%20use%20her%20to%20count%20time.%0A%0A**Details**%0AFloriography: Unyielding%0ABirthday: 12/22%0AHeight: 164 cm%0AZodiac: Sagittarius%0AInstrument: Piano%0AFavorite Food: Vegetables%0AGifts: Two-tone Hourglass%0AHobby: Sand art%0ADislikes: Socializing&user=$authorId;GET;;message]
  $botTyping
  $cooldown[2s;{newEmbed:{description:\:_\: Don't send messages too fast, you can break me by doing it}{color:RED}}]

  $onlyIf[$checkContains[$message;@everyone;@here]==false;{newEmbed:{description:\:_\: I don't disturb people!}{color:#ff0000}}]

  $onlyForChannels[$getServerVar[chatbotChannel];]

  $onlyIf[$getServerVar[chatbotChannel]!=;]
  $suppressErrors
  `,
});


bot.variables({
  money: 0,
  chatbotChannel: "",
});

// Event handler for incoming messages
client.on("messageCreate", message => {
  // Your existing message event handling code here

  // Chat bot interaction
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

    // Pass the message to the chat bot
    bot.executeCommand(message.content, message);
  }
});

client.on('ready', async () => {
  console.log('Bot Is Launched')
  client.user.setActivity({
    name: `The Legend Of Neverland`,
    type: 'PLAYING'
  });
  client.user.setStatus('idle');
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.token);
