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
    intents: ["GUILDS", "GUILD_MESSAGES"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'] }
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
                .setImage("https://ik.imagekit.io/Zedi/20240518_042602.png?updatedAt=1715977625082")
                /*.setFooter("Noblese Guild");*/
                if (status == 2){
                 embed.setColor("#EE4E4E")
                } else if (status == 1){
                 embed.setColor("#A1DD70")
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
    "@everyone Reminders channel is over here: <#1249229369625546823>. Not that I care if you forget.",
    "@everyone The reminders channel is right here: <#1249229369625546823>. Try not to miss it, okay?",
    "@everyone In case you can’t figure it out, the reminders channel is here: <#1249229369625546823>.",
    "@everyone The reminders channel is over here: <#1249229369625546823>. Use it or don’t, up to you."
];

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
    if (message.content === "eryembed02") {
        let embed = new Discord.MessageEmbed()
            //.setTitle("EDICT OF UNITY")
            .setDescription("We strictly request your adherence to Discord's Terms of Service and guidelines, which can be found at the following links:\n\nTerms of Service: https://discord.com/terms\nGuidelines: https://discord.com/guidelines")
            .setColor("#B76A82")
            /*.setImage("https://ik.imagekit.io/Zedi/20240504_215923.jpg?updatedAt=1714831268770")*/
            .setFooter("Noblese Guild")

        message.channel.send({ embeds: [embed] })
    }
    if (message.content === "eryembed03") {
    let embed = new Discord.MessageEmbed()
        .setDescription("**UNSAFE ZONE:**\n- Avoid attacking guildmates out of the open (Miasma, Madness Raid, etc.).\n\n**SHRINE PEAK:**\n- Avoid attacking guildmates unless on top rank list.\n\n**LADDER ARENA:**\n- If they attack first, you are allowed to retaliate freely.\n- Don't attack guildmates unless the skip button is on cooldown and you cannot defeat the opponent.\n\n**GUILD AUCTION:**\n- Once a bid has been placed, refrain from outbidding.\n- Give priority to those who have won the dice roll in the guild bath.\n- Revealing your bid in guild chat is mandatory if you intend to participate.\n- Qualification for bidding is reserved for those who have participated in guild events.\n\nIf someone violates said rules, kindly send a report at: <#1237979377862709265>.")
        .setColor("#B76A82")

    message.channel.send({ embeds: [embed] })
   }
    if (message.content === "OfficalAnnounce_0001_embed") {
        let embed = new Discord.MessageEmbed()
            .setDescription("## OFFICIAL ANNOUNCEMENT:\n@everyone we are thrilled to share that on May 14, 2024, at 04:50 AM, the **Noblese  guild** will be merging with the esteemed **Overlord guild**. This exciting union marks a new chapter for both guilds as we welcome new members into our community. We look forward to the opportunities this combine will bring and the growth it will inspire. Let us extend our warmest welcome to all the new members!")
            .setColor("#B76A82")
            .setImage("https://ik.imagekit.io/Zedi/20240513_234454.png?updatedAt=1715615188837")
            .setFooter("Noblese Guild")

        message.channel.send({ embeds: [embed] })
    }
    if (message.content === "serverInfo_0001_embed") {
        let embed = new Discord.MessageEmbed()
            .setDescription("## WELCOME TO NOBLESE!\nRemember to have fun and savor every moment in the game! If you need assistance with daily tasks, simply drop a message in the guild chat, and we'll be more than happy to lend a hand!!\n\n**JOIN US ON (SERVER TIME):**\n- Guild bath at 7:30pm\n- Guild boss at 7:40pm\n- Guild war at 8:00pm")
            .setColor("#B76A82")
            .setFooter("Noblese Guild")

        message.channel.send({ embeds: [embed] })
    }
    if (message.content === "OfficalAnnounce_0002_embed") {
        let embed = new Discord.MessageEmbed()
            .setDescription("## OFFICIAL ANNOUNCEMENT:\n@everyone All guild members must now change their Discord server nickname to match their in-game name. Please update your nickname as soon as possible to ensure clear communication.\n\nThank you.")
            .setColor("#B76A82")
            .setImage("https://ik.imagekit.io/Zedi/20240622_001721.png?updatedAt=1718986723655")
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
        const words = messageContent.split(" ");

        if (messageContent.length < 21) {
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
        }

        const hasMention = words.some(word =>
        word.startsWith("erythrina") ||
        word.startsWith("erythrin") ||
        word.startsWith("erythri") ||
        word.startsWith("erythr") ||
        word.startsWith("eryth") ||
        word.startsWith("eryt") ||
        word.startsWith("ery")
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
        word.toLowerCase() === "hi" ||
         word.toLowerCase() === "hey" ||
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
        word.toLowerCase() === "hiya" ||
        word.toLowerCase() === "hola" ||
        word.toLowerCase() === "sup" ||
        word.toLowerCase() === "yo"
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
            word.startsWith("this")
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
        if (hasGreet && hasMention) {
            const ErythinaRelpyGreetings = [
                `Oh, you’re here. nice to meet you.`,
                `Oh, it’s you. hello..`,
                `Pretend that I am not here<:Stare_erythrina:1238029119632048159>`,
                `Hi<:Stare_erythrina:1238029119632048159>`
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
        if (hasInvite && hasLink) {
            message.reply(`take it then <:Stare_erythrina:1238029119632048159>\nhttps://bit.ly/Noblese`);
        }
        if (hasMention && hasThanks) {
            message.reply(`you're welcome <@!${message.author.id}><:Stare_erythrina:1238029119632048159>`);
        }
        if (hasMention && hasAsk) {
            message.reply(`I was used by Cabala ancients to count the time.`);
        }

        if (hasMention && hasSaidQuiet) {
            const ErythinaRelpy = [
                `eh?`,
                `<:catto_tf:1241438766137086084>`
            ];
            const randomReply = ErythinaRelpy[Math.floor(Math.random() * ErythinaRelpy.length)];
            message.reply(randomReply);
        }

/* if (hasMention && hasMentionSchedule) {
 later.date.localTime();

        const currentTime = moment().tz('Asia/Manila');

        const todayStart = currentTime.clone().startOf('day').add(2, 'hours');
        const todayEnd = currentTime.clone().endOf('day').add(1, 'day').subtract(1, 'hours');

        const todaysSchedules = schedules.map(schedule => {
            const parsed = later.parse.cron(schedule.time, true);
            const nextRun = later.schedule(parsed).next(1);
            return {
                nextRun,
                message: schedule.message
            };
        }).filter(schedule => {
            const scheduleTime = moment.tz(schedule.nextRun, 'Asia/Manila');
            const adjustedScheduleTime = scheduleTime.minute() === 0 ? scheduleTime.subtract(1, 'hour') : scheduleTime;
            return adjustedScheduleTime.isBetween(todayStart, todayEnd, null, '[]');
        }).sort((a, b) => a.nextRun - b.nextRun);

        const embed = new MessageEmbed()
            .setTitle('Today\'s Schedules')
            .setColor('#B76A82');

        todaysSchedules.forEach(schedule => {
            const scheduleTime = moment.tz(schedule.nextRun, 'Asia/Manila');
            const adjustedScheduleTime = scheduleTime.minute() === 0 ? scheduleTime.subtract(1, 'hour') : scheduleTime;
            const timeFormatted = adjustedScheduleTime.format('MMM Do, HH:mm');
            const statusField = adjustedScheduleTime.isBefore(currentTime) ? ':white_check_mark:' : '\u200B';

            embed.addField('Time', timeFormatted, true);
            embed.addField('Message', schedule.message, true);
            embed.addField('Status', statusField, true);
        });

        message.channel.send({ embeds: [embed] });
    }*/


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
    scheduleTempMessage('0 20 * * *', 'Asia/Manila', '@everyone Guild activities are approaching in 30 minutes.', "1237979376872718439",300000);
    scheduleTempMessage('20 20 * * *', 'Asia/Manila', '@everyone Guild activities are approaching in 10 minutes.', "1237979376872718439",300000);
    
    scheduleTempMessage('25 20 * * *', 'Asia/Manila', '@everyone Time for the Guild bath in 5 minutes. Join us or miss out, your loss!', "1237979376872718439",600000);
    scheduleTempMessage('30 20 * * *', 'Asia/Manila', 'Guild bath is starting!<:Stare_erythrina:1238029119632048159>', "1237979376872718439",300000);
    scheduleTempMessage('35 20 * * *', 'Asia/Manila', '@everyone Get ready for the Guild boss battle in 5 minutes! Don\'t slack off now, we need everyone!', "1237979376872718439",600000);
    scheduleTempMessage('40 20 * * *', 'Asia/Manila', 'Guild boss is starting!<:Stare_erythrina:1238029119632048159>', "1237979376872718439",300000);
    scheduleTempMessage('55 20 * * 2,4,6', 'Asia/Manila', '@everyone The Guild war is about to begin in 5 minutes! Prepare yourself!', "1237979376872718439",1200000);
    scheduleTempMessage('0 21 * * 2,4,6', 'Asia/Manila', 'Guild war is starting!<:Erythrina_happy:1249365602397716540>', "1237979376872718439",900000);
    scheduleRndmMessage('30 6 * * *', 'Asia/Manila', "1237979376872718439");

    //every 10 minutes
    //scheduleRndmMessage('*/10 * * * *', 'Asia/Manila', '1237979377363320916');
    //scheduleTempMessage('*/1 * * * *', 'Asia/Manila', 'test1', "1237979377363320916",1000);

    
     //Reminders of reminder channel
    scheduleRemindersChannel('0 7 * * *', 'Asia/Manila', "1237979376872718439",3600000);
    scheduleRemindersChannel('0 12 * * *', 'Asia/Manila', "1237979376872718439",3600000);
    scheduleRemindersChannel('30 21 * * *', 'Asia/Manila', "1237979376872718439",3600000);
    
    // Schedule multiple embeds
    // Official{
     //Server Reset
    scheduleEmbed('0 6 * * *', 'Asia/Manila', '### [NOTICE]\nServer events and activities have been reset.', "1249229369625546823", 0);
     // Guild Activity
    scheduleEmbed('30 20 * * *', 'Asia/Manila', '### [NOTICE]\nGuild Bath has started!', "1249229369625546823", 1);
    scheduleEmbed('40 20 * * *', 'Asia/Manila', '### [NOTICE]\nGuild Boss has started!', "1249229369625546823", 1);
    scheduleEmbed('0 21 * * 2,4,6', 'Asia/Manila', '### [NOTICE]\nGuild War has started!', "1249229369625546823", 1);
     // Instrumental Performance
    scheduleEmbed('0 6 * * 1', 'Asia/Manila', '### [NOTICE]\nInstrumental Performance EXP in Life has been refreshed', "1249229369625546823", 0);
     // Special Quest of Tess
    scheduleEmbed('0 6 * * 1', 'Asia/Manila', '### [NOTICE]\nThe special quest of Tess has begun.', "1249229369625546823", 0);
     // Elemental Realm
    scheduleEmbed('0 6 * * *', 'Asia/Manila', '### [NOTICE]\nElemental Realm has been reset!', "1249229369625546823", 0);
     // Madness Raid
    scheduleEmbed('55 9 * * 1,3,5,7', 'Asia/Manila', '### [NOTICE]\nMadness Raid is starting today from 9:00 to 21:30 (server time)!', "1249229369625546823", 1);
    scheduleEmbed('30 23 * * 1,3,5,7', 'Asia/Manila', '### [NOTICE]\nMadness Raid is closing!', "1249229369625546823", 2);
     // Abyss Ruin
    scheduleEmbed('0 6 * * 2,4,6,7', 'Asia/Manila', '### [NOTICE]\nAbyss Ruin is available!', "1249229369625546823", 0);
     // Time Trial 
    scheduleEmbed('0 6 * * 1,3,5,7', 'Asia/Manila', '### [NOTICE]\nTime Trial is available!', "1249229369625546823", 0);
     // Disaster Crusade
    scheduleEmbed('0 6 * * 1', 'Asia/Manila', '### [NOTICE]\nDisaster Crusade has been reset!', "1249229369625546823", 0);
     // Burning Soul Battle
    scheduleEmbed('55 19 * * 2,4,6,7', 'Asia/Manila', '### [NOTICE]\nBurning Soul Battle is starting in 5 minutes!', "1249229369625546823", 1);
     // Starleaf Garden
    /*scheduleEmbed('0 6 * * 2,4,6,7', 'Asia/Manila', '### [NOTICE]\nStarleaf Garden is starting!', "1237979376872718439", 1);*/
     // Shrine Rivalry
    scheduleEmbed('0 6 * * 3-5', 'Asia/Manila', '### [NOTICE]\nShrine Rivalry is available!', "1249229369625546823", 0);
     // Shrine Peak
    scheduleEmbed('55 21 * * 6', 'Asia/Manila', '### [NOTICE]\nShrine Peak is starting in 5 minutes!', "1249229369625546823", 1);
     // Uncharted Battlefield
    scheduleEmbed('55 12 * * 2,4,6', 'Asia/Manila', '### [NOTICE]\nUncharted Battlefield First Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('55 16 * * 2,4,6', 'Asia/Manila', '### [NOTICE]\nUncharted Battlefield Second Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('55 22 * * 2,4,6', 'Asia/Manila', '### [NOTICE]\nUncharted Battlefield Third Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('55 23 * * 2,4,6', 'Asia/Manila', '### [NOTICE]\nUncharted Battlefield Last Wave is starting in 5 minutes!', "1249229369625546823", 1);
     // Top League
    scheduleEmbed('55 20 * * 3,5,7', 'Asia/Manila', '### [NOTICE]\nTop League is starting in 5 minutes!', "1249229369625546823", 1);
     // Thunderroar Recess
    scheduleEmbed('55 19 * * 1,3,5', 'Asia/Manila', '### [NOTICE]\nThunderroar Recess is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('55 21 * * 1,3,5', 'Asia/Manila', '### [NOTICE]\nThunderroar Recess is starting in 5 minutes!', "1249229369625546823", 1);
     // Crystal Battlefield
    scheduleEmbed('55 12 * * 1,3,5,7', 'Asia/Manila', '### [NOTICE]\nCrystal Battlefield First Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('55 16 * * 1,3,5,7', 'Asia/Manila', '### [NOTICE]\nCrystal Battlefield Second Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('55 22 * * 1,3,5,7', 'Asia/Manila', '### [NOTICE]\nCrystal Battlefield Third Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('55 23 * * 1,3,5,7', 'Asia/Manila', '### [NOTICE]\nCrystal Battlefield Last Wave is starting in 5 minutes!', "1249229369625546823", 1);
     // Scenic Quiz
    scheduleEmbed('5 10 * * 1,4', 'Asia/Manila', '### [NOTICE]\nScenic Quiz is starting today from 9:00 to 23:00 (server time)!', "1249229369625546823", 1);
     // Miru Party
    scheduleEmbed('5 10 * * 2,6', 'Asia/Manila', '### [NOTICE]\nMiru Party is starting today from 9:00 to 23:00 (server time)!', "1249229369625546823", 1);
     // Miru Marathon
    scheduleEmbed('25 12 * * *', 'Asia/Manila', '### [NOTICE]\nMiru Marathon First Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('25 15 * * *', 'Asia/Manila', '### [NOTICE]\nMiru Marathon Second Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('25 18 * * *', 'Asia/Manila', '### [NOTICE]\nMiru Marathon Third Wave is starting in 5 minutes!', "1249229369625546823", 1);
    scheduleEmbed('25 21 * * *', 'Asia/Manila', '### [NOTICE]\nMiru Marathon Last Wave is starting in 5 minutes!', "1249229369625546823", 1);
     // Holy Fruit and Fog Island
    scheduleEmbed('5 10 * * 3,5,7', 'Asia/Manila', '### [NOTICE]\nHoly Fruit and Fog Island is available today from 9:00 to 23:00 (server time)!', "1249229369625546823", 0);
     //TEST
    /*scheduleEmbed('23 0 * * *', 'Asia/Manila', '### [NOTICE]\nTEST TEST TEST!', "1237979376872718439", 0);
    scheduleEmbed('23 0 * * *', 'Asia/Manila', '### [NOTICE]\nTEST TEST TEST!', "1237979376872718439", 1);
    scheduleEmbed('23 0 * * *', 'Asia/Manila', '### [NOTICE]\nTEST TEST TEST!', "1237979376872718439", 2);*/
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

client.login(process.env.token);
