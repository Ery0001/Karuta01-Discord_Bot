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

const Discord = require("discord.js");
const { Client, Intents, MessageEmbed, Collection } = require('discord.js');
const client = new Discord.Client({
    intents: [
        "GUILDS", 
        "GUILD_MESSAGES", 
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MEMBERS",
        "GUILD_EMOJIS_AND_STICKERS"
    ],
    // intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'] }
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

// Function to schedule messages
const scheduleMessage = (cronTime, timezone, message, channelId) => {
    cron.schedule(cronTime, () => {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            channel.send(message);
        } else {
            console.log('Channel not found.');
        }
    }, {
        scheduled: true,
        timezone: timezone
    });
};

const scheduleTempMessage = (cronTime, timezone, message, channelId, duration) => {
    cron.schedule(cronTime, () => {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            channel.send(message).then(sentMessage => {
                setTimeout(() => {
                    sentMessage.delete().catch(console.error);
                }, duration); 
            }).catch(console.error);
        } else {
            console.log('Channel not found.');
        }
    }, {
        scheduled: true,
        timezone: timezone
    });
};

const scheduleRndmMessage = (cronTime, timezone, channelId) => {
    cron.schedule(cronTime, () => {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            const randomMessage = randomMorningCalls();
            channel.send(randomMessage);
        } else {
            console.log('Channel not found.');
        }
    }, {
        scheduled: true,
        timezone: timezone
    });
};

const scheduleRemindersChannel = (cronTime, timezone, channelId, duration) => {
    cron.schedule(cronTime, () => {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            const randomMessage = randomRemindersChannel();
            channel.send(randomMessage).then(sentMessage => {
                setTimeout(() => {
                    sentMessage.delete().catch(console.error);
                }, duration); 
            }).catch(console.error);
        } else {
            console.log('Channel not found.');
        }
    }, {
        scheduled: true,
        timezone: timezone
    });
};

const scheduleEmbed = (cronTime, timezone, message, channelId, status) => {
    cron.schedule(cronTime, () => {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            let embed = new Discord.MessageEmbed()
                .setDescription(message)
                .setImage("https://ik.imagekit.io/Zedi/20250128_193631.jpg?updatedAt=1738064631421")
                /*.setFooter("Noblese Guild");*/
                if (status == 2){
                 embed.setColor("#EE4E4E")
                } else if (status == 1){
                 embed.setColor("#F6D286")
                }
            channel.send({ embeds: [embed] });
        } else {
            console.log('Channel not found.');
        }
    }, {
        scheduled: true,
        timezone: timezone
    });
};


const ErythinaMorningPhrase = [
    "Ugh, @everyone better snap outta dreamland and hustle up on those dailies! Like, pronto!",
    "Hey, sleepyheads! Time to rise and shine and get cracking on those dailies, cuties! @everyone",
    "@everyone Get up! It's not like I care, but we've all got our dailies to tackle.",
    "Ahem. Listen up, @everyone. The clock's ticking, and if you dawdle too long, you'll find yourself knee-deep in regrets. So, consider this your wake-up call.",
    "Get your butts outta bed, @everyone! Dailies won't do themselves, you know.",
    "Wakey-wakey, sleepyheads! Let's tackle those dailies, angels! @everyone",
    "Hey, rise and shine, @everyone! Dailies await, whether you like it or not.",
    "Morning, @everyone! Let's not waste time. Dailies won't wait for anyone.",
    "Dailies time, sweethearts! @everyone.",
    "Yo, @everyone! Time to kick yesterday's dust off and do those dailies!",
    "Rise and grind, @everyone! Dailies aren't gonna do themselves, you know.",
    "Dailies, darlings! @everyone.",
    "Attention, @everyone! It's time to tackle those dailies head-on.",
    "Hey, sleepyheads! Let's rise and conquer those dailies, cuties! @everyone.",
    "No time for slacking, @everyone! Dailies are calling, loud and clear.",
    "Morning, @everyone! Let's make today count. Dailies first, complaints later.",
    "Dailies, sweethearts! @everyone.",
    "Time's ticking, @everyone! Let's hustle up and knock out those dailies.",
    "Wake up, @everyone! Dailies won't wait for late risers.",
    "Alright, @everyone! Rise and grind. Dailies won't tackle themselves.",
    "Dailies, beauties! @everyone.",
    "Hey there, @everyone! Time to roll up those sleeves and tackle those dailies, angels!",
    "Morning, @everyone! Let's make today's dailies count, shall we?",
    "Enough with the snoozing, @everyone! Dailies time is now.",
    "Dailies, darlings! @everyone.",
    "Attention, @everyone! Let's tackle those dailies with gusto.",
    "Wake up and smell the dailies, @everyone! No time to waste.",
    "No excuses, @everyone! Time to dive into those dailies headfirst.",
    "Alright, @everyone! Let's shake off yesterday's dust and tackle those dailies.",
    "Morning, @everyone! Dailies await, so let's get to it.",
    "Time to rise and shine, @everyone! Dailies aren't gonna do themselves.",
    "Dailies, sweethearts! @everyone.",
    "Get up, get moving, @everyone! Dailies won't tackle themselves.",
    "Wakey-wakey, @everyone! Dailies are calling, loud and clear.",
    "Enough dilly-dallying, @everyone! Dailies time is now.",
    "Morning, @everyone! Let's kickstart the day with some dailies.",
    "Dailies, beauties! @everyone.",
    "Rise and grind, @everyone! Dailies await, so let's get to it.",
    "Attention, @everyone! It's time to show those dailies who's boss.",
    "Morning, @everyone! Let's tackle those dailies like pros.",
    "Time's a-wasting, @everyone! Let's dive into those dailies pronto.",
    "Up and at 'em, @everyone! Dailies await, so let's get moving.",
    "Dailies, darlings! @everyone.",
    "Enough lollygagging, @everyone! Dailies aren't gonna do themselves."
];

const ErythinaRemindersChannelPhrase = [
    "Reminders channel is over here: <#1347152454210420746>. Not that I care if you forget.",
    "The reminders channel is right here: <#1347152454210420746>. Try not to miss it, okay?",
    "In case you can’t figure it out, the reminders channel is here: <#1347152454210420746>.",
    "The reminders channel is over here: <#1347152454210420746>. Use it or don’t, up to you."
];

/*const ErythinaRemindersChannelPhrase = [
    "@everyone Reminders channel is over here: <#1347152454210420746>. Not that I care if you forget.",
    "@everyone The reminders channel is right here: <#1347152454210420746>. Try not to miss it, okay?",
    "@everyone In case you can’t figure it out, the reminders channel is here: <#1347152454210420746>.",
    "@everyone The reminders channel is over here: <#1347152454210420746>. Use it or don’t, up to you."
];*/

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

    /*if (message.content === "Farm") {
        message.channel.send(`${message.author.username}  Hello if you're interested on our Pw farms do n [!Farm] n n Follow exactly if the command has capitalize letters to ensure the command works. have a good day :>`);
    }
    if (message.content === "farm") {
        message.channel.send(`${message.author.username}  Hello if you're interested on our Pw farms do n [!Farm] n n Follow exactly if the command has capitalize letters to ensure the command works. have a good day :>`);
    }*/
    if (!message.author.bot) {
        const messageContent = message.content.toLowerCase();
        const words = messageContent.split(" ");

        if (messageContent.length <= 21) {
        if (messageContent.includes("morning")) {
            message.channel.send(`Good Morning <@!${message.author.id}>!`);
        }
        if (messageContent.includes("afternoon")) {
            message.channel.send(`Good Afternoon <@!${message.author.id}>!`);
        }
        if (messageContent.includes("evening")) {
            message.channel.send(`Good Evening <@!${message.author.id}>!`);
        }
        if (messageContent.includes("night")) {
            message.channel.send(`Good Night <@!${message.author.id}>!`);
        }
        if (messageContent.includes("night")) {
            message.channel.send(`Good Night <@!${message.author.id}>!`);
        }
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

        const hasMentionSchedule = words.some(word =>
        word.startsWith("schedules") ||
        word.startsWith("schedule") ||
        word.startsWith("schedul") ||
        word.startsWith("sched") ||
        word.startsWith("scheds") ||
        word.startsWith("sche")
        );

        const hasGreet = words.some(word =>
        word.startsWith("hello") ||
        word.startsWith("helloo") ||
        word.startsWith("helllo") ||
        word === "halo" ||
        word === "helo" ||
        word === "elo" ||
        word === "alo" ||
        word === "hi" ||
        word === "hey" ||
        word.startsWith("greetings") ||
        word.startsWith("howdy") ||
        word.startsWith("hey there") ||
        word.startsWith("what's up") ||
        word.startsWith("aloha") ||
        word.startsWith("bonjour") ||
        word.startsWith("ciao") ||
        word.startsWith("guten tag") ||
        word.startsWith("namaste") ||
        word.startsWith("salaam") ||
        word.startsWith("konnichiwa") ||
        word.startsWith("annyeong") ||
        word.startsWith("zdravstvuyte") ||
        word.startsWith() === "hiya" ||
        word === "hola" ||
        word === "sup" ||
        word === "yo" ||
        word.startsWith() === "yoo"
        );
        const hasCompliment1 = words.some(word =>
        word.startsWith("awesome") || 
        word.startsWith("amazing") || 
        word.startsWith("fantastic") || 
        word.startsWith("great") || 
        word.startsWith("wonderful") || 
        word.startsWith("excellent") || 
        word.startsWith("brilliant") || 
        word.startsWith("outstanding") || 
        word.startsWith("remarkable") || 
        word.startsWith("impressive") || 
        word.startsWith("fabulous") || 
        word.startsWith("incredible") || 
        word.startsWith("spectacular") || 
        word.startsWith("marvelous") || 
        word.startsWith("terrific") || 
        word.startsWith("superb") || 
        word.startsWith("good")
        );
        const hasSubject = words.some(word =>
            word.startsWith("you're") ||
            word.startsWith("you are") ||
            word.startsWith("your") ||
            word.toLowerCase() === "you" ||
            word.startsWith("you is") ||
            word.startsWith("u") ||
            word.startsWith("she") ||
            word.toLowerCase() === "her" ||
            word.startsWith("them") ||
            word.startsWith("female") ||
            word.startsWith("bot") ||
            word.startsWith("ai") ||
            word.startsWith("a.i") ||
            word.toLowerCase() === "the" ||
            word.toLowerCase() === "that" ||
            word.startsWith("this") ||
            word === "is"
        );

        const hasSaidQuiet = words.some(word =>
            word.startsWith("quiet") ||
            word === "shat" ||
            word === "shut" ||
            word === "shap" ||
            word === "stfu" ||
            word === "stf" ||
            word === "sh" ||
            word === "shh" ||
            word === "shh" ||
            word === "shhh" ||
            word === "shhhh" ||
            word === "shhhhh" ||
            word === "shhhhhh" ||
            word === "shhhhhhh" ||
            word === "shhhhhhhh" ||
            word === "sshhhhhhh" ||
            word === "sshhhhhh" ||
            word.startsWith("annoying") ||
            word.startsWith("loud")
        );
        const hasThanks = words.some(word =>
    word.startsWith("thanks") ||
    word.startsWith("thank") ||
    word.startsWith("thankful") ||
    word.startsWith("grateful") ||
    word.startsWith("appreciate") ||
    word.startsWith("appreciated") ||
    word.startsWith("appreciation") ||
    word.startsWith("gratitude") ||
    word.startsWith("cheers") ||
     word.toLowerCase() === "ta" ||
    word.startsWith("much obliged") ||
    word.startsWith("big thanks") ||
    word.startsWith("heartfelt thanks") ||
    word.startsWith("sincere thanks") ||
    word.startsWith("many thanks") ||
    word.startsWith("i appreciate it") ||
    word.startsWith("i'm thankful") ||
    word.startsWith("thank you") ||
    word.startsWith("terima kasih") || // Indonesian/Malay
    word.startsWith("salamat") || // Filipino/Tagalog
    word.startsWith("khob khun") || // Thai
    word.startsWith("khop kun") || // Thai
    word.startsWith("cảm ơn") || // Vietnamese
    word.startsWith("ကျေးဇူးတင်ပါတယ်") || // Burmese
    word.startsWith("ຂອບ​ໃຈ") || // Lao
    word.startsWith("អរគុណ") // Khmer
);
        const hasAsk = words.includes("who");
        const hasInvite = words.includes("invite");
        const hasLink = words.includes("link");
        const wordquite = words.includes("quite");
        if (hasGreet && hasMention) {
            const ErythinaRelpyGreetings = [
                `Oh, you’re here. nice to meet you.`,
                `Oh, it’s you. hello..`,
                `Pretend that I am not here`,
                `Hi`
            ];
            const randomReplyGreeting = ErythinaRelpyGreetings[Math.floor(Math.random() * ErythinaRelpyGreetings.length)];
            message.reply(randomReplyGreeting);
        }
        if (hasMention && hasSubject && hasCompliment1) {
            const ErythinaRelpyCompliment = [
                `Oh, thank you`,
                `Oh, it was nothing.`,
                `I know.`
            ];
            const randomReplyCompliment = ErythinaRelpyCompliment[Math.floor(Math.random() * ErythinaRelpyCompliment.length)];
            message.reply(randomReplyCompliment);
        }
        if (hasMention && hasCompliment1) {
            if (messageContent.length < 13) {
            message.reply(`...`);
         }
        }
        // if (hasInvite && hasLink) {
        //     message.reply(`take it then <:Stare_erythrina:1238029119632048159>nhttps://bit.ly/Noblese`);
        // }
        if (hasMention && hasThanks) {
            // message.reply(`you're welcome <@!${message.author.id}><:Stare_erythrina:1238029119632048159>`);
            message.reply(`you're welcome <@!${message.author.id}>`);
        }
        if (hasMention && hasAsk) {
            message.reply(`Greetings, I am Cheongmun, developed by <@894665274123513856>, And one of the previous sect leader of mount hua sect.\nRead here to know more about me: https://return-of-the-blossoming-blade.fandom.com/wiki/Cheongmun`);
        }

        if (hasMention && hasSaidQuiet) {
            const ErythinaRelpy = [
                `eh?`,
                `meanie :<`
            ];
            const randomReply = ErythinaRelpy[Math.floor(Math.random() * ErythinaRelpy.length)];
            message.reply(randomReply);
        }
        if (hasMention && wordquite) {
          if (messageContent.length < 21) {
            message.reply(`You spelled "quiet" wrong>`);
         }
        }

    }
});

function randomMorningCalls() {
    if (ErythinaMorningPhrase.length > 0) {
        return ErythinaMorningPhrase[Math.floor(Math.random() * ErythinaMorningPhrase.length)];
    }
}

function randomRemindersChannel() {
    if (ErythinaRemindersChannelPhrase.length > 0) {
        return ErythinaRemindersChannelPhrase[Math.floor(Math.random() * ErythinaRemindersChannelPhrase.length)];
    }
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const updatePresence = () => {
        client.user.setStatus('idle');
        client.user.setActivity({
            name: `Karuta Bot`,
            type: 'STREAMING',
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
const TRACKED_ROLES = ["1354641345905561884", "1354641345905561883"];
const NOTIFY_CHANNEL_ID = "1355431839640322158";
const REACT_EMOJI = "\u2699"; // "⚙" emoji
const NEXT_PAGE_EMOJI = "➡️";

client.on("messageCreate", async (message) => {
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

    // Karuta Clan Contribution Listener
    if (message.author.id !== KARUTA_ID || !message.embeds.length) return;
    
    const embed = message.embeds[0];
    if (embed.title !== "Clan Contribution" || !embed.fields.length) return;
    
    await message.react(REACT_EMOJI);
    await message.react(NEXT_PAGE_EMOJI);
    
    const filter = (reaction, user) =>
        [NEXT_PAGE_EMOJI, REACT_EMOJI].includes(reaction.emoji.name) &&
        message.guild.members.cache.get(user.id)?.roles.cache.some(role => TRACKED_ROLES.includes(role.id));

    const collector = message.createReactionCollector({ filter, time: 120000 });
    
    collector.on("collect", async (reaction, user) => {
        if (reaction.emoji.name === NEXT_PAGE_EMOJI) {
            await message.channel.send("✅ Read page. Go ahead and continue.");
            return;
        }

        const contributionField = embed.fields[0].value;
        if (!contributionField) return;

        let lazyWorkers = [];
        const lines = contributionField.split("\n");
        for (const line of lines) {
            const parts = line.split(" ");
            if (parts.length < 5) continue;
            
            const mention = parts[2];
            const contribution = parts[4].split("/")[0];
            
            if (contribution.replace("**", "") === "0") {
                lazyWorkers.push(mention);
            }
        }

        if (lazyWorkers.length > 0) {
            const notifyChannel = message.guild.channels.cache.get(NOTIFY_CHANNEL_ID);
            if (notifyChannel) {
                notifyChannel.send(
                    `Dear clan members of Lian faction, please contribute to the clan treasury.\n\n` +
                    `**The following members have not contributed:**\n${lazyWorkers.join(", ")}`
                );
            }
        }
    });
});


// client.on('guildMemberAdd', member => {
//     if (member.user.bot) return; // Avoid greeting bots
    
//     const channelId = '1292688019811336202'; // Replace with the actual channel ID
//     const channel = client.channels.cache.get(channelId);
//     const welcomeMessage = `Hello, welcome <@${member.id}>! this is the main karuta channel, enjoy your stay!`;

//     if (channel) {
//         channel.send(welcomeMessage).catch(console.error);
//     } else {
//         console.log('Welcome channel not found.');
//     }
// });


client.login(process.env.token);
