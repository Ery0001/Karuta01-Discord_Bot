const express = require("express");
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const cron = require('node-cron');
const cronParser = require('cron-parser');
const later = require('later');
const moment = require('moment-timezone');
const app = express();
const someFunc = () => {
    console.log("The ability to freeze the time? Interesting question.");
    setTimeout(someFunc, 3000);
}

setTimeout(someFunc, 3000);
app.listen(3000, () => {
    console.log("Project is running!");
})

app.get("/", (req, res) => {
    res.send("Erythina is Online! (i think)");
})

const { Client, GatewayIntentBits, MessageEmbed, Collection } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent // Required to read message content
    ],
    allowedMentions: { parse: ['users', 'roles', 'everyone'] }
});
const fs = require("fs");
const prefix = "h."
// client.commands = new Discord.Collection();
client.commands = new Collection();

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

if (message.content === "embed_lianfaction_rulestart323235") {
    let embed = new Discord.MessageEmbed()
        .setDescription(`\`\`\`js
LIAN CLAN RULES
\`\`\`
1. No KC-ing During Nodes  
2. No KC-ing Outside of This Server  
3. Complete Your Karuta Work (KW) Daily  
4. Maintain Appropriate Conduct  
   • No excessive sexual jokes or comments.  
   • No explicit content (images, videos, GIFs, messages, or Karuta tags).  
   • Moderators decide what qualifies as explicit.  
5. Be Respectful & Avoid Bullying  
   • No bullying, especially over wishlists.  
   • Stop when asked; slurs are strictly prohibited.  

\`\`\`js
CLAN RECRUITMENT AND LOYALTY
\`\`\`
1. No Poaching from Other Clans  
2. Speak to a Shogun Before Recruiting  
3. Use \`kcv\` to Check if a Player is in a Clan  
4. Do Not Steal Followers from Other Members  

\`\`\`js
WISHLISTED CARD PROTECTION
\`\`\`
1. Wishlisted Cards in <#1354641347197407290> are Protected  
2. Only the Wishlister or Dropper May Claim It Within 40 Seconds  
3. After 40 Seconds, It is Free for Anyone  
4. Server-Wide Drops are Open for All  
5. Dropper Should Ping the Wishlister  
6. Do Not Grab a Wishlisted Card for Someone Else  

\`\`\`js
PUNISHMENTS FOR VIOLATIONS
\`\`\`
1. Attempting to grab a protected wishlisted card, even if unsuccessful, will result in punishment.  
2. Strikes expire one by one every two weeks.  
3. Punishments accumulate and must be fully served.  

**__First offense:__** 2-week ban from giveaways and mass drops.  
**__Second offense:__** Additional 1-month ban from giveaways and mass drops, plus a 2-week event ban.  
**__Third offense or more:__** 1-week mute.  

Event bans apply to any event that starts during the punishment period, even if the ban expires before the event ends. All penalties are enforced retroactively.  

For the full main server rules, check <#1305705930926850119>.
`)
        .setColor("#FC7074")
        .setImage("https://ik.imagekit.io/Zedi/Screenshot%202025-03-27%20190526.jpg")
        .setFooter("Rules and regulations are all from the main clan server.");

    message.channel.send({ embeds: [embed] });
}

    if (message.content === "embed_lianfaction_rulesend324235") {
        let embed = new Discord.MessageEmbed()
            //.setTitle("EDICT OF UNITY")
            .setDescription("We strictly request your adherence to Discord's Terms of Service and guidelines, which can be found at the following links:\n\nTerms of Service: https://discord.com/terms\nGuidelines: https://discord.com/guidelines")
            .setColor("#FC7074")
            .setImage("https://ik.imagekit.io/Zedi/20250328_092838.png?updatedAt=1743125339723")
            .setFooter("Lian Faction")

        message.channel.send({ embeds: [embed] })
    }

    if (message.content === "embed_lianfaction_info234876") {
    let embed = new Discord.MessageEmbed()
        .setDescription(
            "## WELCOME TO LIAN FACTION\n\n" +
            "Lian Faction is a sub-clan of Violet Villa, led by <@1242447806086516841>. We follow the rules and structure of the main clan while managing our own operations.\n\n" +
            "This faction serves as an extension of Violet Villa, providing a space for members to grow, collaborate, and contribute to the overall strength of the clan. While maintaining independence in management, we uphold the same standards and values as the main clan." +
            "Decisions made here align with the greater goals of Violet Villa, ensuring stability and order. All members are expected to engage actively, support each other, and maintain the integrity of the faction."
        )
        .setColor("#FC7074")
        // .setImage("https://ik.imagekit.io/Zedi/20250328_092838.png?updatedAt=1743125339723")
        .setFooter("Lian Faction")

    message.channel.send({ embeds: [embed] });
}
    if (!message.author.bot) {
        const messageContent = message.content.toLowerCase();
        const words = messageContent.split(" ");

        if (messageContent.length <= 21) {
        // if (messageContent.includes("morning")) {
        //     message.channel.send(`Good Morning <@!${message.author.id}>!`);
        // }
        }
        const hasMention = words.some(word =>
        word.startsWith("@Cheongmun") ||
        word.startsWith("Cheongmun") ||
        word.startsWith("Cheongmn") ||
        word.startsWith("Cheongmu") ||
        word.startsWith("Cheongun") ||
        word.startsWith("Cheonmun") ||
        word.startsWith("Cheong")
        );

        const hasAsk = words.includes("who");
        if (hasMention && hasAsk) {
            message.reply(`Greetings, I am Cheongmun, developed by <@894665274123513856>, And one of the previous sect leader of mount hua sect.\nRead here to know more about me: https://return-of-the-blossoming-blade.fandom.com/wiki/Cheongmun`);
        }
        
    }
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const updatePresence = () => {
        client.user.setStatus('idle');
        client.user.setActivity({
            name: `Karuta Bot`,
            type: 1,
            url: 'https://www.twitch.tv/karuta_official'
        });
    };
    updatePresence();
    // Refresh presence every 30 minutes
    setInterval(updatePresence, 30 * 60 * 1000); // 30 minutes

    //FOR MESSAGE SPAM DETECTION LIMIT
        setInterval(() => {
        userMessageCounts.clear();
        console.log('User message counts have been reset.');
    }, 30 * 60 * 1000);
});

const DROP_CARDS_CHANNEL_ID = '1354641347197407290';
const EMOTE_ID = '<:customemote:1354789755979698217>';

const MAIN_CHAT_CHANNELS = ['1354641347197407289', '1355021656728539276'];
const userMessageCounts = new Collection();
const MESSAGE_LIMIT = 20;
const MESSAGE_LENGTH_THRESHOLD = 25;

// client.on('messageCreate', message => {
//     if (message.author.bot) return;
    
//     const triggerWords = ['kd', 'k!d', 'k!drop'];
//     if (triggerWords.includes(message.content.toLowerCase()) && message.channel.id !== DROP_CARDS_CHANNEL_ID) {
//         message.reply(`The place for drawing cards is <#${DROP_CARDS_CHANNEL_ID}>. Head there to continue. ${EMOTE_ID}`);
//     }

//         // Message spam detection (only count messages with over 25 characters)
//     if (!MAIN_CHAT_CHANNELS.includes(message.channel.id) && message.content.length > MESSAGE_LENGTH_THRESHOLD) {
//         const userId = message.author.id;
//         const userMessages = userMessageCounts.get(userId) || 0;

//         if (userMessages >= MESSAGE_LIMIT) {
//             message.reply(`You're quite active! If you’d like to continue chatting, the main discussion happens here: <#${MAIN_CHAT_CHANNELS[0]}>.`);
//             userMessageCounts.set(userId, 0); // Reset count after notification
//         } else {
//             userMessageCounts.set(userId, userMessages + 1);
//         }
//     }
    
// });

const KARUTA_ID = "646937666251915264";
const TRACKED_ROLES = ["1354641345905561884", "1354641345905561883", "1354641345762955338"];
const NOTIFY_CHANNEL_ID = "1355431839640322158";
const CONFIMATION_CHANNEL_ID = "1355021656728539276";
const REACT_EMOJI = "⚙";
const NEXT_PAGE_EMOJI = "➡️";
const CHECK_EMOJI = "✅";

client.on("messageCreate", async (message) => {

     // Karuta Clan Contribution Listener
    if (message.author.id !== KARUTA_ID || !message.embeds.length) return;
    
    const embed = message.embeds[0];
    if (embed.title !== "Clan Contribution" || !embed.fields.length) return;

    try {
        await message.react(REACT_EMOJI);
        console.log("Reaction added!");
    } catch (error) {
        console.error("Failed to react:", error);
    }

    const filter = (reaction, user) => 
        reaction.emoji.name === REACT_EMOJI &&
        !user.bot &&
        message.guild.members.cache.get(user.id)?.roles.cache.some(role => TRACKED_ROLES.includes(role.id));

    const collector = message.createReactionCollector({ filter, time: 60000 });

    collector.on("collect", async (reaction, user) => {
        console.log(`Reaction collected from ${user.username}`);
        processContributionEmbed(embed, message);
    });

    //sdfffff
    if (message.author.bot) return;
    const triggerWords = ["kd", "k!d", "k!drop"];
    if (triggerWords.includes(message.content.toLowerCase()) && message.channel.id !== DROP_CARDS_CHANNEL_ID) {
        message.reply(`The place for drawing cards is <#${DROP_CARDS_CHANNEL_ID}>. Head there to continue. ${EMOTE_ID}`);
    }

    // Message spam detection (only count messages with over 25 characters)
    if (!MAIN_CHAT_CHANNELS.includes(message.channel.id) && message.content.length > MESSAGE_LENGTH_THRESHOLD) {
        const userId = message.author.id;
        const userMessages = userMessageCounts.get(userId) || 0;

        if (userMessages >= MESSAGE_LIMIT) {
            message.reply(`You're quite active! If you’d like to continue chatting, the main discussion happens here: <#${MAIN_CHAT_CHANNELS[0]}>.`);
            userMessageCounts.set(userId, 0); // Reset count after notification
        } else {
            userMessageCounts.set(userId, userMessages + 1);
        }
    }
});

async function processContributionEmbed(embed, message) {
    if (!embed.fields.length) return;
    const contributionField = embed.fields[0]?.value;
    if (!contributionField || contributionField.trim() === "") return;

    let lazyWorkers = [];
    const lines = contributionField.split("\n");
    for (const line of lines) {
        const parts = line.split(" ");
        if (parts.length < 5) continue;

        const mention = parts[2];
        const contribution = parts[4].split("/")[0].replace("**", "").replace("**", "");

        if (contribution === "0") {
            lazyWorkers.push(mention);
        }
    }

    // if (lazyWorkers.length > 0) {
    //     const notifyChannel = message.guild.channels.cache.get(NOTIFY_CHANNEL_ID);
    //     const notifyChannels = message.guild.channels.cache.get(CONFIMATION_CHANNEL_ID);
    //     if (notifyChannels) {
    //         const confirmationMessage = await notifyChannels.send(
    //             `The following members have not contributed:\n${lazyWorkers.join(", ")}\n` +
    //             "Do you want to proceed with the announcement?"
    //         );
            
    //         await confirmationMessage.react(CHECK_EMOJI);

    //         const confirmFilter = (reaction, user) => 
    //             reaction.emoji.name === CHECK_EMOJI && 
    //             !user.bot &&
    //             message.guild.members.cache.get(user.id)?.roles.cache.some(role => TRACKED_ROLES.includes(role.id));

    //         const confirmCollector = confirmationMessage.createReactionCollector({ filter: confirmFilter, time: 60000, max: 1 });
            
    //         confirmCollector.on("collect", async () => {
    //             await notifyChannel.send(
    //                 "Dear clan members of **__Lian faction__**, please contribute to the clan treasury.\n\n" +
    //                 `The following members have not contributed:\n${lazyWorkers.join(", ")}`
    //             );
    //         });
    //     }
    // } else{

    // }

    if (lazyWorkers.length > 0) {
        const confirmationMessage = await message.channel.send(
            `The following members have not contributed:\n\n${lazyWorkers.join("\n")}\n\n` +
            "Do you want to proceed with the announcement?"
        );
        await confirmationMessage.react(CHECK_EMOJI);

        const confirmFilter = (reaction, user) => 
            reaction.emoji.name === CHECK_EMOJI && 
            !user.bot &&
            message.guild.members.cache.get(user.id)?.roles.cache.some(role => TRACKED_ROLES.includes(role.id));

        const confirmCollector = confirmationMessage.createReactionCollector({ filter: confirmFilter, time: 60000, max: 1 });

        confirmCollector.on("collect", async (reaction, user) => {
            const userChannel = reaction.message.channel;
            await notifyChannel.send(
                "Dear clan members of **__Lian faction__**, please contribute to the clan treasury.\n\n" +
                `The following members have not contributed:\n${lazyWorkers.join(", ")}`
            );
        });
    } else {
        await message.channel.send("It seems like there are no lazy workers.");
    }
        
}

client.login(process.env.token);
