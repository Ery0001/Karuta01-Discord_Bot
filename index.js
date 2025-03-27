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
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
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

const schedules = [
    { time: '0 6 * * *', message: 'Reset Server events and activities' },
    { time: '30 20 * * *', message: 'Guild Bath.' },
    { time: '40 20 * * *', message: 'Guild Boss.' },
    { time: '0 21 * * 2,4,6', message: 'Guild War.' },
    { time: '0 6 * * 1', message: ' Reset Instrumental Performance EXP in Life.' },
    { time: '0 6 * * 1', message: 'The special quest of Tess.' },
    { time: '0 6 * * *', message: 'Reset Elemental Realm.' },
    { time: '30 23 * * 1,3,5,7', message: 'Madness Raid(9:00 to 21:30).' },
    //{ time: '30 23 * * 1,3,5,7', message: 'End Madness Raid.' },
    { time: '0 6 * * 2,4,6,7', message: 'Abyss Ruin.' },
    { time: '0 6 * * 1,3,5,7', message: 'Time Trial.' },
    { time: '0 6 * * 1', message: 'Disaster Crusade reset.' },
    { time: '0 20 * * 2,4,6,7', message: 'Burning Soul Battle.' },
    { time: '0 6 * * 3-5', message: 'Shrine Rivalry.' },
    { time: '0 22 * * 6', message: 'Shrine Peak.' },
    { time: '0 13 * * 2,4,6', message: 'Uncharted Battlefield First Wave.' },
    { time: '0 17 * * 2,4,6', message: 'Uncharted Battlefield Second Wave.' },
    { time: '0 23 * * 2,4,6', message: 'Uncharted Battlefield Third Wave.' },
    { time: '0 24 * * 2,4,6', message: 'Uncharted Battlefield Last Wave.' },
    { time: '0 21 * * 3,5,7', message: 'Top League.' },
    { time: '0 22 * * 1,3,5', message: 'Thunderroar Recess (19:00 to 21:00).' },
    //{ time: '55 21 * * 1,3,5', message: 'Thunderroar Recess.' },
    { time: '0 13 * * 1,3,5,7', message: 'Crystal Battlefield First Wave.' },
    { time: '0 17 * * 1,3,5,7', message: 'Crystal Battlefield Second Wave.' },
    { time: '0 23 * * 1,3,5,7', message: 'Crystal Battlefield Third Wave.' },
    { time: '0 0 * * 1,3,5,7', message: 'Crystal Battlefield Last Wave.' },
    { time: '0 0 * * 1,4', message: 'Scenic Quiz today (9:00 to 23:00).' },
    { time: '0 0 * * 2,6', message: 'Miru Party today (9:00 to 23:00).' },
    { time: '30 12 * * *', message: 'Miru Marathon First Wave.' },
    { time: '30 15 * * *', message: 'Miru Marathon Second Wave.' },
    { time: '30 18 * * *', message: 'Miru Marathon Third Wave.' },
    { time: '30 21 * * *', message: 'Miru Marathon Last Wave.' },
    { time: '0 10 * * 3,5,7', message: 'Holy Fruit and Fog Island (9:00 to 23:00).' },
];

client.on("messageCreate", message => {
    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift()
        const command = client.commands.get(commandName)
        if (!command) return
        command.run(client, message, args)
    }
    // if (message.content === "eryembed02") {
    //     let embed = new Discord.MessageEmbed()
    //         //.setTitle("EDICT OF UNITY")
    //         .setDescription("We strictly request your adherence to Discord's Terms of Service and guidelines, which can be found at the following links:nnTerms of Service: https://discord.com/termsnGuidelines: https://discord.com/guidelines")
    //         .setColor("#B76A82")
    //         /*.setImage("https://ik.imagekit.io/Zedi/20240504_215923.jpg?updatedAt=1714831268770")*/
    //         .setFooter("Olympus Guild")

    //     message.channel.send({ embeds: [embed] })
    // }

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
  word.startsWith("@Hibiscus") ||
  word.startsWith("Hibiscus") ||
  word.startsWith("Hibiscu") ||
  word.startsWith("Hibisc") ||
  word.startsWith("Hibis") ||
  word.startsWith("Hibi") ||
  word.startsWith("Hib")
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
            message.reply(`Greetings, I am bot and my owner is <@894665274123513856>. Nice to meet you <@!${message.author.id}>!`);
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
    client.user.setStatus('idle');
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity({
        name: `The Legend Of Neverland`,
        type: 'PLAYING'
    })

    // Schedule multiple messages
    // scheduleTempMessage('0 20 * * *', 'America/Halifax', '@everyone Guild activities are approaching in 30 mins.', "1237979376872718439",300000);
    // scheduleTempMessage('20 20 * * *', 'America/Halifax', '@everyone Guild activities are approaching in 10 mins.', "1237979376872718439",300000);
    
    scheduleTempMessage('25 20 * * 1,3,5,7', 'America/Halifax', '@everyone Time for Guild Bath & Boss in 5 mins ~!!', "1292688019811336202",1200000);
    scheduleTempMessage('25 20 * * 2,4,6', 'America/Halifax', '@everyone Time for Guild Bath & Boss & Wars in 5 mins ~!!', "1292688019811336202",1200000);

    //scheduleTempMessage('25 20 * * *', 'America/Halifax', '@everyone Time for the Guild bath in 5 mins. Join us or miss out, your loss ~!!', "1292688019811336202",600000);
    // scheduleTempMessage('30 20 * * *', 'America/Halifax', 'Guild bath starts!<:Stare_erythrina:1238029119632048159>', "1292688019811336202",300000);
    //scheduleTempMessage('35 20 * * *', 'America/Halifax', "@everyone Get ready for the Guild boss battle in 5 mins! Don't slack off now, we need everyone ~!!", "1292688019811336202",600000);
    // scheduleTempMessage('40 20 * * *', 'America/Halifax', 'Guild boss starts!<:Stare_erythrina:1238029119632048159>', "1292688019811336202",300000);
    //scheduleTempMessage('55 20 * * 2,4,6', 'America/Halifax', '@everyone The Guild war is about to begin in 5 mins! Prepare yourself ~!!', "1292688019811336202",1200000);
    // scheduleTempMessage('0 21 * * 2,4,6', 'America/Halifax', 'Guild war starts!<:Erythrina_happy:1249365602397716540>', "1292688019811336202",900000);
    // scheduleRndmMessage('30 6 * * *', 'America/Halifax', "1237979376872718439");

    //every 10 mins
    //scheduleRndmMessage('*/10 * * * *', 'America/Halifax', '1237979377363320916');
    // scheduleEmbed('*/1 * * * *', 'America/Halifax', '**ATTN: MELTIES**\nUncharted Battlefield starts in 10 mins ~!!', "1333656769175490560", 1);
    scheduleEmbed('0 0 * * 1', 'America/Halifax', '# TROUBLESHOOTING\nToday is Monday\n\n\n-# ⓘ This is a test, kindly contact me if an issue occurs.', "1347160179065749504", 0);
    scheduleEmbed('0 0 * * 2', 'America/Halifax', '# TROUBLESHOOTING\nToday is Tuesday\n\n\n-# ⓘ This is a test, kindly contact me if an issue occurs.', "1347160179065749504", 0);
    scheduleEmbed('0 0 * * 3', 'America/Halifax', '# TROUBLESHOOTING\nToday is Wednesday\n\n\n-# ⓘ This is a test, kindly contact me if an issue occurs.', "1347160179065749504", 0);
    scheduleEmbed('0 0 * * 4', 'America/Halifax', '# TROUBLESHOOTING\nToday is Thursday\n\n\n-# ⓘ This is a test, kindly contact me if an issue occurs.', "1347160179065749504", 0);
    scheduleEmbed('0 0 * * 5', 'America/Halifax', '# TROUBLESHOOTING\nToday is Friday\n\n\n-# ⓘ This is a test, kindly contact me if an issue occurs.', "1347160179065749504", 0);
    scheduleEmbed('0 0 * * 6', 'America/Halifax', '# TROUBLESHOOTING\nToday is Saturday\n\n\n-# ⓘ This is a test, kindly contact me if an issue occurs.', "1347160179065749504", 0);
    scheduleEmbed('0 0 * * 7', 'America/Halifax', '# TROUBLESHOOTING\nToday is Sunday\n\n\n-# ⓘ This is a test, kindly contact me if an issue occurs.', "1347160179065749504", 0);
     //Reminders of reminder channel
    // scheduleRemindersChannel('0 7 * * *', 'America/Halifax', "1237979376872718439",3600000);
    //scheduleRemindersChannel('0 12 * * *', 'America/Halifax', "1237979376872718439",3600000);
    //scheduleRemindersChannel('30 21 * * *', 'America/Halifax', "1237979376872718439",3600000);

    // Schedule multiple embeds
    // Official{
     //Server Reset
    scheduleEmbed('0 6 * * *', 'America/Halifax', '**ATTN: MELTIES**\nServer events and activities have been reset ~!!', "1347152454210420746", 0);
     //Guild war weekly reward
    // scheduleEmbed('0 22 * * 6', 'America/Halifax', '**ATTN: MELTIES** — Weekly guild reward is available ~!!', "1347152454210420746", 0);
     // Guild Activity
    scheduleEmbed('20 20 * * *', 'America/Halifax', '**ATTN: MELTIES**\nGuild Bath & Guild Boss starts in 10 mins ~!!', "1347152454210420746", 1);
    // scheduleEmbed('40 20 * * *', 'America/Halifax', '**ATTN: MELTIES**\nGuild Boss has started ~!!', "1347152454210420746", 1);
    scheduleEmbed('55 20 * * 2,4,6', 'America/Halifax', '**ATTN: MELTIES**\nGuild War starts in 10 mins ~!!', "1347152454210420746", 1);
    // scheduleEmbed('50 21 * * *', 'America/Halifax', '**ATTN: MELTIES** — Guild Auction has started ~!!', "1347152454210420746", 1);
     // Instrumental Performance
    // scheduleEmbed('0 6 * * 1', 'America/Halifax', '**ATTN: MELTIES** — Instrumental Performance EXP in Life has been refreshed ~!!', "1347152454210420746", 0);
     // Special Quest of Tess
    // scheduleEmbed('0 6 * * 1', 'America/Halifax', '**ATTN: MELTIES** — The special quest of Tess is available ~!!', "1347152454210420746", 0);
     // Elemental Realm
    // scheduleEmbed('0 6 * * *', 'America/Halifax', '**ATTN: MELTIES** — Elemental Realm has been reset ~!!', "1347152454210420746", 0);
     // Madness Raid
    // scheduleEmbed('55 9 * * 1,3,5,7', 'America/Halifax', '**ATTN: MELTIES** — Madness Raid starts today from 9:00 to 21:30 (server time) ~!!', "1347152454210420746", 0);
    // scheduleEmbed('30 23 * * 1,3,5,7', 'America/Halifax', '**ATTN: MELTIES** — Madness Raid is closing ~!!', "1347152454210420746", 2);
     // Abyss Ruin
    // scheduleEmbed('0 6 * * 2,4,6,7', 'America/Halifax', '**ATTN: MELTIES** — Abyss Ruin is available ~!!', "1347152454210420746", 0);
     // Time Trial 
    // scheduleEmbed('0 6 * * 1,3,5,7', 'America/Halifax', '**ATTN: MELTIES** — Time Trial is available ~!!', "1347152454210420746", 0);
     // Disaster Crusade
    //scheduleEmbed('50 20 * * 1', 'America/Halifax', '**ATTN: MELTIES**\nDisaster Crusade starts in 10 mins ~!!', "1347152454210420746", 1);
     // Burning Soul Battle
    scheduleEmbed('20 20 * * 2,4,6,7', 'America/Halifax', '**ATTN: MELTIES**\nBurning Soul Battle starts in 10 mins ~!!', "1347152454210420746", 1);
     // Starleaf Garden
    // scheduleEmbed('0 0 * * *', 'America/Halifax', '**ATTN: MELTIES** — Starleaf Garden starts ~!!', "1237979376872718439", 1);
    // scheduleEmbed('55 8 * * *', 'America/Halifax', '**ATTN: MELTIES** — Starleaf Garden is closing in 5 mins ~!!', "1237979376872718439", 2);
     // Shrine Rivalry
    scheduleEmbed('50 5 * * 3-5', 'America/Halifax', '**ATTN: MELTIES**\nShrine Rivalry starts in 10 mins ~!!', "1347152454210420746", 1);
    // scheduleEmbed('30 5 * * 3-5', 'America/Halifax', '**ATTN: MELTIES** — Shrine Rivalry truce time is staring(4:30-5:00 server time) ~!!', "1347152454210420746", 0);
    // scheduleEmbed('0 6 * * 3-5', 'America/Halifax', '**ATTN: MELTIES** — Shrine Rivalry truce time is closing ~!!', "1347152454210420746", 2);
     // Shrine Peak
    scheduleEmbed('50 21 * * 6', 'America/Halifax', '**ATTN: MELTIES**\nShrine Peak starts in 10 mins ~!!', "1347152454210420746", 1);
     // Uncharted Battlefield
    scheduleEmbed('50 12 * * 2,4,6', 'America/Halifax', '**ATTN: MELTIES**\nUncharted Battlefield starts in 10 mins ~!!', "1347152454210420746", 1);
    scheduleEmbed('50 16 * * 2,4,6', 'America/Halifax', '**ATTN: MELTIES**\nUncharted Battlefield starts in 10 mins ~!!', "1347152454210420746", 1);
    scheduleEmbed('50 22 * * 2,4,6', 'America/Halifax', '**ATTN: MELTIES**\nUncharted Battlefield starts in 10 mins ~!!', "1347152454210420746", 1);
    scheduleEmbed('50 23 * * 2,4,6', 'America/Halifax', '**ATTN: MELTIES**\nUncharted Battlefield starts in 10 mins ~!!', "1347152454210420746", 1);
     // Top League
    scheduleEmbed('50 20 * * 3,5,7', 'America/Halifax', '**ATTN: MELTIES**\nTop League starts in 10 mins ~!!', "1347152454210420746", 1);
     // Thunderroar Recess
    scheduleEmbed('50 19 * * 1,3,5', 'America/Halifax', '**ATTN: MELTIES**\nThunderroar Recess starts in 10 mins ~!!', "1347152454210420746", 1);
    scheduleEmbed('50 21 * * 1,3,5', 'America/Halifax', '**ATTN: MELTIES**\nThunderroar Recess starts in 10 mins ~!!', "1347152454210420746", 1);
     // Crystal Battlefield
    scheduleEmbed('50 12 * * 1,3,5,7', 'America/Halifax', '**ATTN: MELTIES**\nCrystal Battlefield starts in 10 mins ~!!', "1347152454210420746", 1);
    scheduleEmbed('50 16 * * 1,3,5,7', 'America/Halifax', '**ATTN: MELTIES**\nCrystal Battlefield starts in 10 mins ~!!', "1347152454210420746", 1);
    scheduleEmbed('50 22 * * 1,3,5,7', 'America/Halifax', '**ATTN: MELTIES**\nCrystal Battlefield starts in 10 mins ~!!', "1347152454210420746", 1);
    scheduleEmbed('50 23 * * 1,3,5,7', 'America/Halifax', '**ATTN: MELTIES**\nCrystal Battlefield starts in 10 mins ~!!', "1347152454210420746", 1);
    // Legion War
    // scheduleEmbed('0 11 * * 1', 'America/Halifax', '**ATTN: MELTIES** — Legion Sciamachy starts in 10 mins ~!!', "1347152454210420746", 1);
    // scheduleEmbed('55 0 * * 7', 'America/Halifax', '**ATTN: MELTIES** — Legion Sciamachy is closing in 10 mins ~!!', "1347152454210420746", 2);
     // Scenic Quiz
    // scheduleEmbed('5 10 * * 1,4', 'America/Halifax', '**ATTN: MELTIES** — Scenic Quiz is available today from 9:00 to 23:00 (server time) ~!!', "1347152454210420746", 0);
     // Miru Party
    // scheduleEmbed('5 10 * * 2,6', 'America/Halifax', '**ATTN: MELTIES** — Miru Party is available today from 9:00 to 23:00 (server time) ~!!', "1347152454210420746", 0);
     // Miru Marathon
    // scheduleEmbed('25 12 * * *', 'America/Halifax', '**ATTN: MELTIES** — Miru Marathon starts in 5 mins ~!!', "1347152454210420746", 1);
    // scheduleEmbed('25 15 * * *', 'America/Halifax', '**ATTN: MELTIES** — Miru Marathon starts in 5 mins ~!!', "1347152454210420746", 1);
    // scheduleEmbed('25 18 * * *', 'America/Halifax', '**ATTN: MELTIES** — Miru Marathon starts in 5 mins ~!!', "1347152454210420746", 1);
    // scheduleEmbed('25 21 * * *', 'America/Halifax', '**ATTN: MELTIES** — Miru Marathon starts in 5 mins ~!!', "1347152454210420746", 1);
     // Holy Fruit and Fog Island
    // scheduleEmbed('5 10 * * 3,5,7', 'America/Halifax', '**ATTN: MELTIES** — Holy Fruit and Fog Island is available today from 9:00 to 23:00 (server time) ~!!', "1347152454210420746", 0);
     //TEST
    /*scheduleEmbed('23 0 * * *', 'America/Halifax', '**ATTN: MELTIES** — TEST TEST TEST ~!!', "1237979376872718439", 0);
    scheduleEmbed('23 0 * * *', 'America/Halifax', '**ATTN: MELTIES** — TEST TEST TEST ~!!', "1237979376872718439", 1);
    scheduleEmbed('23 0 * * *', 'America/Halifax', '**ATTN: MELTIES** — TEST TEST TEST ~!!', "1237979376872718439", 2);*/
    //}
});

/*client.on('guildMemberAdd', member => {
    if (member.user.bot) return;
    const channelId = '1237979376872718439';


    const channel = member.guild.channels.cache.get(channelId);
    
    if (channel) {
        channel.send(`Welcome ${member.user.tag}. Please change your server nickname to your in-game name. Not like it matters to me.`);
    } else {
        console.error('Channel not found');
    }
});*/

client.on('guildMemberAdd', member => {
    if (member.user.bot) return; // Avoid greeting bots
    
    const channelId = '1292688019811336202'; // Replace with the actual channel ID
    const channel = client.channels.cache.get(channelId);
    const welcomeMessage = `Hello, welcome <@${member.id}> to melty ~!!`;

    if (channel) {
        channel.send(welcomeMessage).catch(console.error);
    } else {
        console.log('Welcome channel not found.');
    }
});


client.login(process.env.token);
