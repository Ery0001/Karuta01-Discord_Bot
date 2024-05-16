const express = require("express");
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const cron = require('node-cron');
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
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    allowedMentions: ["users"],
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

const ErythinaMorningPhrase = [
    "Was I harsh yesterday? Sorry, not sorry. Now, do your dailies, darlings! @everyone",
    "Ugh, @everyone better snap outta dreamland and hustle up on those dailies! Like, pronto!",
    "Hey, sleepyheads! Time to rise and shine and get cracking on those dailies, cuties! @everyone",
    "@everyone Get up, get your stuff done. It's not like I care, but we've all got our dailies to tackle. And yes, I'm still fabulous.",
    "Ahem. Listen up, @everyone. The clock's ticking, and if you dawdle too long, you'll find yourself knee-deep in regrets. So, consider this your wake-up call, lovelies!",
    "Did I come off too harsh yesterday? Whatever. Time for dailies, beauties! @everyone",
    "Get your butts outta bed, @everyone! Dailies won't do themselves, you know. And yes, I woke up like this.",
    "Wakey-wakey, sleepyheads! Let's tackle those dailies, angels! @everyone",
    "Hey, rise and shine, @everyone! Dailies await, whether you like it or not. And yes, I'm still the fairest of them all.",
    "Morning, @everyone! Let's not waste time. Dailies won't wait for anyone. And yes, I'm as radiant as ever.",
    "Was I too blunt yesterday? Meh. Dailies time, sweethearts! @everyone. Oh, and by the way, have you seen my new outfit?",
    "Yo, @everyone! Time to kick yesterday's dust off and do those dailies! And yes, I'm still fabulous.",
    "Rise and grind, @everyone! Dailies aren't gonna do themselves, you know. And yes, I'm still flawless.",
    "Did I lay it on thick yesterday? Who cares. Dailies, darlings! @everyone. Oh, and by the way, have I mentioned how stunning I look today?",
    "Attention, @everyone! It's time to tackle those dailies head-on. And yes, I'm still the queen of this castle.",
    "Hey, sleepyheads! Let's rise and conquer those dailies, cuties! @everyone. Oh, and by the way, have you seen my new hairstyle?",
    "No time for slacking, @everyone! Dailies are calling, loud and clear. And yes, I'm still turning heads wherever I go.",
    "Morning, @everyone! Let's make today count. Dailies first, complaints later. And yes, I'm still as fabulous as ever.",
    "Did I ruffle feathers yesterday? Oh well. Dailies, sweethearts! @everyone. And yes, I'm still the envy of all.",
    "Time's ticking, @everyone! Let's hustle up and knock out those dailies. And yes, I'm still the center of attention.",
    "Wake up, @everyone! Dailies won't wait for late risers. And yes, I'm still the belle of the ball.",
    "Alright, @everyone! Rise and grind. Dailies won't tackle themselves. And yes, I'm still as stunning as ever.",
    "Was I too blunt yesterday? Tough luck. Dailies, beauties! @everyone. Oh, and by the way, have you noticed my flawless complexion?",
    "Hey there, @everyone! Time to roll up those sleeves and tackle those dailies, angels! And yes, I'm still as captivating as ever.",
    "Morning, @everyone! Let's make today's dailies count, shall we? And yes, I'm still as charming as ever.",
    "Enough with the snoozing, @everyone! Dailies time is now. And yes, I'm still as radiant as ever.",
    "Did I hit a nerve yesterday? Whatever. Dailies, darlings! @everyone. Oh, and by the way, have you seen my sparkling smile?",
    "Attention, @everyone! Let's tackle those dailies with gusto. And yes, I'm still as glamorous as ever.",
    "Wake up and smell the dailies, @everyone! No time to waste. And yes, I'm still as fabulous as ever.",
    "No excuses, @everyone! Time to dive into those dailies headfirst. And yes, I'm still as stylish as ever.",
    "Alright, @everyone! Let's shake off yesterday's dust and tackle those dailies. And yes, I'm still as captivating as ever.",
    "Morning, @everyone! Dailies await, so let's get to it. And yes, I'm still as dazzling as ever.",
    "Time to rise and shine, @everyone! Dailies aren't gonna do themselves. And yes, I'm still as mesmerizing as ever.",
    "Did I rub some folks the wrong way yesterday? Meh. Dailies, sweethearts! @everyone. Oh, and by the way, have you noticed my radiant aura?",
    "Get up, get moving, @everyone! Dailies won't tackle themselves. And yes, I'm still as enchanting as ever.",
    "Wakey-wakey, @everyone! Dailies are calling, loud and clear. And yes, I'm still as fabulous as ever.",
    "Enough dilly-dallying, @everyone! Dailies time is now. And yes, I'm still as stunning as ever.",
    "Morning, @everyone! Let's kickstart the day with some dailies. And yes, I'm still as captivating as ever.",
    "Did I lay it on thick yesterday? Tough luck. Dailies, beauties! @everyone. Oh, and by the way, have you seen my impeccable grace?",
    "Rise and grind, @everyone! Dailies await, so let's get to it. And yes, I'm still as radiant as ever.",
    "Attention, @everyone! It's time to show those dailies who's boss. And yes, I'm still as charming as ever.",
    "Morning, @everyone! Let's tackle those dailies like pros. And yes, I'm still as captivating as ever.",
    "Time's a-wasting, @everyone! Let's dive into those dailies pronto. And yes, I'm still as alluring as ever.",
    "Up and at 'em, @everyone! Dailies await, so let's get moving. And yes, I'm still as mesmerizing as ever.",
    "Did I step on some toes yesterday? Whoops. Dailies, darlings! @everyone. Oh, and by the way, have you noticed my impeccable poise?",
    "Enough lollygagging, @everyone! Dailies aren't gonna do themselves. And yes, I'm still as captivating as ever."
];

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
            .setDescription("## WELCOME TO NOBLESE!\nRemember to have fun and savor every moment in the game! If you need assistance with daily tasks, simply drop a message in the guild chat, and we'll be more than happy to lend a hand!!\n\n**JOIN US ON (SERVER TIME):**\n- Guild bath at 7:30pm\n- Guild boss at 7:40pm\n- Guild war at 8:00pm\n\n**AUCTION:**\nJust bid as you please, no permission needed")
            .setColor("#B76A82")
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

function randomMorningCalls() {
    if (ErythinaMorningPhrase.length > 0) {
        return ErythinaMorningPhrase[Math.floor(Math.random() * ErythinaMorningPhrase.length)];
    }
}

client.on('ready', async () => {
    console.log('Bot Is Launched')
    client.user.setActivity({
        name: `The Legend Of Neverland`,
        type: 'PLAYING'
    })

    // Schedule multiple messages
    scheduleMessage('30 19 * * *', 'Asia/Manila', '@everyone It\'s time for the Guild bath, folks. Join us or miss out, your loss!', "1237979376872718439");
    scheduleMessage('40 19 * * *', 'Asia/Manila', '@everyone Get ready for the Guild boss battle! Don\'t slack off now, we need everyone!', "1237979376872718439");
    scheduleMessage('0 20 * * 4-6', 'Asia/Manila', '@everyone The Guild war is about to begin! Prepare yourself!', "1237979376872718439");
    scheduleMessage('30 6 * * *', 'Asia/Manila',randomMorningCalls(), "1237979376872718439");

});

client.on('ready', () => {
    client.user.setStatus('idle');
    console.log(`Logged in as ${client.user.tag}`)
})

client.login(process.env.token);
