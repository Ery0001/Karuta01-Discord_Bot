const express = require("express");
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const app = express();
const someFunc = () => {
    console.log ("Sacrifice Everything for Haruki!");
    setTimeout(someFunc, 3000);
}

setTimeout(someFunc, 3000);
app.listen(3000, () => {
  console.log("Project is running!");
})

app.get("/", (req,res) => {
  res.send("Haruki is Online! (i think)");
})

//bot.on("message", function (message) { if (message.content="h.test") {
//const channel01 - bot.channels.cache.find(channel -> channel.id 1014184233679458385");
  //channel01.send("It works!")
//}                                
//});



const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  allowedMentions: ["users"]
});
const fs = require("fs");
const prefix = "h."
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
  if (message.content === "embed") {
    let embed = new Discord.MessageEmbed()
      .setDescription("Haruki Village is a Japanese theme Village And Found on the Minecraft Server named Fallenskymc.\n \n The Main Purpose of The server is to guide New members Of Haruki village and easily access the Village Rules.\n \n FALLENSKYMC SERVER INFORMATION: \n DISCORD/ https://bit.ly/fsmcdiscord \n Server IP: play.fallenskymc.com \n Port: 19132 \n \n HARUKI FOUNDERS: \n EmpireOfZedi16 \n EmperorPads \n KuriGohan \n \n DISCORD SERVER CREATOR: \n EmpireOfZedi16")
      .setImage("https://i.ibb.co/ySbzqHN/20220424-140236.jpg")
      .setColor("#FFFFFF")

    message.channel.send({ embeds: [embed] })
  }
  if (message.content === "embed0") {
    let embed = new Discord.MessageEmbed()
      .setDescription("Haruki will Temporary Become a Community discord Server, and of course if our original platform will eventually came back, Haruki will Gladly return to exactly the same as before.\n \n There are Currently two domains on this server \n by the following:\n \n GENERAL COMMUNITY - A Public domain and everyone can access this. \n \n WEEB/OTAKU COMMUNITY - Private domain for a specific kind of groups only are allowed, but of course everyone shall have permission on this domain if they desired it. \n \n FOUNDERS:\n> <@894665274123513856> \n> <@526289740945686538> \n> <@617160581023137804> \n \n DISCORD SERVER CREATOR:\n> <@894665274123513856> \n \n [春樹/Haruki]")
      .setImage("https://i.ibb.co/ySbzqHN/20220424-140236.jpg")
      .setColor("#FFFFFF")

    message.channel.send({ embeds: [embed] })
  }

  if (message.content === "embed010") {
    let embed = new Discord.MessageEmbed()
      .setDescription("Haruki Nakatomi is Faction from the Haruki Empire which is a Japanese theme Village And Found on the Minecraft Server named kerotscraft.\n \n The Main Purpose of The server is to guide New members Of Haruki Nakatomi and easily access the Village Rules.\n \n KEROTSCRAFT SERVER INFORMATION: \n DISCORD: https://bit.ly/kerotscraftsmp \n Server IP: play.kerotscraft.com \n Port: 19111 \n \n HARUKI MAIN DISCORD:\n> https://bit.ly/HarukiEmpire \n \n FACTION FOUNDER:\n> <@947362523890470942> \n \n HARUKI FOUNDERS:\n> <@894665274123513856> \n> <@526289740945686538> \n> <@617160581023137804> \n \n DISCORD SERVER CREATOR:\n> <@947362523890470942> \n \n [春樹/Haruki]")
      .setImage("https://i.ibb.co/ySbzqHN/20220424-140236.jpg")
      .setColor("#FFFFFF")

    message.channel.send({ embeds: [embed] })
  }

  if (message.content === "embed2") {
    let embed = new Discord.MessageEmbed()
      .setTitle("HARUKI RULES")
      .setDescription("﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌ \n \n 𝙃𝙖𝙧𝙪𝙠𝙞 𝙫𝙞𝙡𝙡𝙖𝙜𝙚 𝙧𝙪𝙡𝙚𝙨 \n [ 1 ] Traditional Japanese themed builds is a must  (it's the main purpose of our Village)  \n \n [ 2 ] Ask EmperorPads/EmpireOfZedi16 First if you're planning to build/claim on Haruki land. \n \n [ 3 ] Don't exposed your farm build, it may ruin The village's image and also unfair to others that are following the rules (we suggest build it on underground or Just do [/Pw hachi] to teleport to our Haruki farming ground. to access the hachi password just type Farm on cmd Channel on this server. in case you're wondering why some of the village Builds are not japanese theme it's because Before then there were no rules thus some houses are not japanese themed) \n \n [ 4 ] Always Remember to be kind to anyone. See everyone as quals even if you have higher equipment,age, intelligence etc. \n \n [5] If you're Building Japanese Builds make it more realistic and related to Traditional japan. Modern Japanese Builds are prohibited but may possible to allow in the future. \n \n ﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌ \n 𝙃𝙖𝙧𝙪𝙠𝙞 𝘿𝙞𝙨𝙘𝙤𝙧𝙙 𝙧𝙪𝙡𝙚𝙨 \n [1] Discord names and avatars must be appropriate. \n \n [2] Be respectful and welcoming as toxicity is disallowed. these applies to all members and don't be racist, homophobic, etc. \n \n [3] No Inappropriate Language The use of profanity should be kept to a minimum. However, any derogatory language towards any user is prohibited. \n \n [4] Do not bully or harass another member in any way, shape, or form Haruki is a place of peace. \n \n [5] lewdness Intentions is strictly prohibited. \n \n [6] Leaking the personal information of others is prohibited. \n \n [春樹/Haruki] ").setImage("https://c.tenor.com/CljZoHx0rzAAAAAC/tenor.gif")
      .setColor("#2FC9E3")
    
    message.channel.send({ embeds: [embed] })
  }
  if (message.content === "embed02") {
    let embed = new Discord.MessageEmbed()
      .setTitle("𝙃𝙖𝙧𝙪𝙠𝙞 𝘿𝙞𝙨𝙘𝙤𝙧𝙙 𝙧𝙪𝙡𝙚𝙨")
      .setDescription("﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌ \n \n [1] Discord names and avatars must be appropriate. \n \n [2] Be respectful and welcoming as toxicity is disallowed. these applies to all members and don't be racist, homophobic, etc. \n \n [3] No Inappropriate Language The use of profanity should be kept to a minimum. However, any derogatory language towards any user is prohibited. \n \n [4] Do not bully or harass another member in any way, shape, or form Haruki is a place of peace. \n \n [5] lewdness Intentions is strictly prohibited. \n \n [6] Leaking the personal information of others is prohibited. \n \n [春樹/Haruki] ").setImage("https://c.tenor.com/CljZoHx0rzAAAAAC/tenor.gif")
      .setColor("#2FC9E3")
    
    message.channel.send({ embeds: [embed] })
  }
  if (message.content === "embed3") {
    let embed = new Discord.MessageEmbed()
      .setDescription("Haruki Village is a Japanese theme Village And Found on the Minecraft Server named Fallenskymc.\n \n The Main Purpose of The server is to guide New members Of Haruki village and easily access the Village Rules.\n \n FALLENSKYMC SERVER INFORMATION: \n DISCORD/ https://bit.ly/fsmcdiscord \n Server IP: play.fallenskymc.com \n Port: 19132 \n \n HARUKI FOUNDER: \n EmpireOfZedi16 \n EmperorPads \n \n DISCORD SERVER CREATOR: \n EmpireOfZedi16")
      .setImage("https://i.ibb.co/ySbzqHN/20220424-140236.jpg")
      .setColor("#FFFFFF")
    
    message.channel.send({ embeds: [embed] })
  }
  if (message.content === "embed4") {
    let embed = new Discord.MessageEmbed()
      .setDescription("hey there are you a Weeb? If so provide at least Five of your favorite Anime/Manga to claim your Weeb role") 
      .setImage("https://c.tenor.com/aKz0JfSlyZoAAAAd/anime.gif")
      .setColor("#FF1B18")
  
    message.channel.send({ embeds: [embed] })
  }
  if (message.content === "embed5") {
    let embed = new Discord.MessageEmbed()
    .setDescription("Welcome to **HARUKI NSFW** section! \n \n NSFW stands for **Not Safe For Work**. This is content that would not be seen as appropriate in a work environment. Do wisely follow Discord's Regulations. Content that includes discussions of nudity, sexuality and violence is considered NSFW content and should occur only in the properly marked category/channels. \n \n Inorder to obtain <@&991462065136996414> You have to Make a <#967949541183746049> And provide proof that you're 18 or older.")
    .setColor("#E499EB")
.setImage("https://i.ibb.co/31WsXVF/20220818-212813.jpg")
    
    message.channel.send({ embeds: [embed] })
  }
if (message.content === "embed_neverland_Main") {
    let embed = new Discord.MessageEmbed()
        .setDescription(`# HARUKI IS COMING TO "THE LEGEND OF NEVERLAND"!\n
        <@&967473610149200012> I convince you, Shimins, to download and play with me in this fascinating game. It is like Genshin but with less hassle of Storage Space. We are currently creating a guild for the game, and it is called Haruki. I discovered this game because I was bored, so if you have nothing to do, come let's grind and play!
        \n\n## IMPORTANT INFOs:
        \n - Make sure to select the correct server, which is N438, before playing so that we'll all meet at the same domain.
        \n - After reaching level 35, join the guild and search for "Haruki" to find it.
        \n\n**SERVER: N438**
        \n\n**DOWNLOAD LINKS:**
        \n > *IOS*: https://apple.co/3QlNlHC
        > *Android:* https://bit.ly/44fXH1F
        > *PC:* https://bit.ly/4bgCx5x`)
        .setColor("#B486C1")
        .setImage("https://ik.imagekit.io/Zedi/20240427_220240.jpg?updatedAt=1714234354528");

    message.channel.send({ embeds: [embed] }).then(() => {
        // After sending the embed, delete the trigger message
        message.delete().catch(console.error);
    });
}
if (message.content === "embed_neverland_Faction1") {
    let embed = new Discord.MessageEmbed()
        .setDescription(`# HARUKI IS COMING TO "THE LEGEND OF NEVERLAND"!\n
        <@&1225833670582075443> I convince you, Shimins, to download and play with me in this fascinating game. It is like Genshin but with less hassle of Storage Space. We are currently creating a guild for the game, and it is called Haruki. I discovered this game because I was bored, so if you have nothing to do, come let's grind and play!
        \n\n## IMPORTANT INFOs:
        \n - Make sure to select the correct server, which is N438, before playing so that we'll all meet at the same domain.
        \n - After reaching level 35, join the guild and search for "Haruki" to find it.
        \n\n**SERVER: N438**
        \n\n**DOWNLOAD LINKS:**
        \n > *IOS*: https://apple.co/3QlNlHC
        > *Android:* https://bit.ly/44fXH1F
        > *PC:* https://bit.ly/4bgCx5x`)
        .setColor("#B486C1")
        .setImage("https://ik.imagekit.io/Zedi/20240427_220240.jpg?updatedAt=1714234354528");

    message.channel.send({ embeds: [embed] }).then(() => {
        // After sending the embed, delete the trigger message
        message.delete().catch(console.error);
    });
}
  if (message.content === "embed_belatedBirthday_Hirohito") {
    let embed = new Discord.MessageEmbed()
        .setDescription(`# BELATEDLY, BIRTHDAY TO HIROHITO.
        \n\n*Belatedly, @everyone, let us sincerely congratulate the late Emperor Michinomiya Hirohito on his birthday. His reign marked an era of resilience and progress for Japan. Under his guidance, our nation flourished, emerging as a global leader. Let us pay tribute to his legacy of leadership and dedication.
        \n\nTo the late Emperor Hirohito, we, the Haruki Empire, extend our sincere respect and gratitude. May his memory continue to inspire us as we shape our future.*`)
        .setColor("#D3D3D3")
        .setImage("https://ik.imagekit.io/Zedi/20240429_182758.jpg?updatedAt=1714386755939");

    message.channel.send({ embeds: [embed] }).then(() => {
        // After sending the embed, delete the trigger message
        message.delete().catch(console.error);
    });
}

  /*if (message.content === "Farm") {
    message.channel.send(`${message.author.username}  Hello if you're interested on our Pw farms do \n [!Farm] \n \n Follow exactly if the command has capitalize letters to ensure the command works. have a good day :>`);
  }
  if (message.content === "farm") {
    message.channel.send(`${message.author.username}  Hello if you're interested on our Pw farms do \n [!Farm] \n \n Follow exactly if the command has capitalize letters to ensure the command works. have a good day :>`);
  }*/
  if (message.content === "!Farm") {
    message.channel.send(`Hello <@!${message.author.id}> If You're building a massive farm or you don't have enough space Kindly Build Your Farm at Hachi, to teleport do [/pw Hachi] \n \n Password: Haruki \n \n More Commands: \n [!Hachi] For more Information/Password issues \n [!Warps] To see Haruki's Warps \n \n [This information is Strictly for Haruki citizen only]`);
  }
  if (message.content === "!Hachi") {
    message.channel.send(` Hachi was Originally Planned for Building Bee farms, but we Decided that we will turn it into Haruki Farm Area where All the Haruki citizen can freely build their Desired Farms. so enjoy (人 •͈ᴗ•͈) \n \n Land Owner: Aishaa11 \n ﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌ \n \n 𝘏𝘢𝘤𝘩𝘪 𝘗𝘸 𝘛𝘦𝘭𝘦𝘱𝘰𝘳𝘵𝘢𝘵𝘪𝘰𝘯 \n First you need to do the command [/Pw Hachi] and then type the password "Haruki" (don't forget to make sure that the password first letter is in Capital Letter, and also make sure to type the password fast or it will miss the command ) If you're still confused Try watching this video \n \n More Commands: \n [!Hachi] For more Information/Password issues \n [!Warps] To see Haruki's Warps \n \n https://youtu.be/jR6flSDHYlQ`);
  }
  if (message.content === "!Warps") {
    message.channel.send(`This is our Current Warps available \n \n [1] /Pw Haruki ( Haruki Village ) \n [2] /Pw Hachi ( Haruki Farm ) \n \n we will add more soon... <(￣︶￣)> \n \n More Commands: \n [!Hachi] For more Information/Password issues \n [!Warps] To see Haruki's Warps`)
  }
  
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

const animeTitles = [
    "Mushoku Tensei",
    "Gurren Lagann",
    "Attack on Titan",
    "Mushoku Tensei",
    "Kaijuu 8-gou",
    "Re:Monster",
    "Dog Meat Tutorial",
    "Demon Slayer",
    "Bombing Twin Tower",
    "Mushoku Tensei",
    "Death Note",
    "Solo Leveling",
    "NieR:Automata",
    "Noragami",
    "Zankyou no Terror",
    "The Apothecary Diaries",
    "Mushoku Tensei",
    "That Time I Got Reincarnated as a Slime",
    "Ninja Kamui",
    "Sousou no Frieren",
    "Fullmetal Alchemist: Brotherhood",
    "Bleach"
];

client.on('ready', async () => {
  console.log('Bot Is Launched')
    updateAnimeStatus();  // Update status once initially
    setInterval(updateAnimeStatus, 60000); // Update status every minute
/*  client.user.setActivity({
    name: `Anime`,
    type: 'WATCHING'
  })*/
});

function updateAnimeStatus() {
    if (animeTitles.length > 0) {
        const title = animeTitles[Math.floor(Math.random() * animeTitles.length)];
        client.user.setActivity(`${title}`, { type: 'WATCHING' });
        console.log(`Watching: ${title}`);
    } else {
        client.user.setActivity('Anime', { type: 'WATCHING' });
        console.log('No anime titles available');
    }
}

client.on('ready', () => {
  client.user.setStatus('idle');
  console.log(`Logged in as ${client.user.tag}`)
})


client.login(process.env.token);
