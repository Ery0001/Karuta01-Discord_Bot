const Discord = require('discord.js');
const ANNOUNCEMENT_CHANNEL_ID = '1354658803693518918';

module.exports.run = (client, message, args) => {
    if (args.length < 1) {
        return message.channel.send("You need to provide a message for the announcement.");
    }

    const regex = /"([^"]*)"/g;
    const matches = [...message.content.matchAll(regex)].map(m => m[1]);

    if (matches.length < 1) {
        return message.channel.send("Please use quotes around the message and optional parameters.");
    }

    const announcementText = matches[0].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    const imageUrl = matches.length > 1 && matches[1].startsWith("http") ? matches[1] : null;
    const roleId = matches.length > 2 ? matches[2] : (matches.length === 2 && !imageUrl ? matches[1] : null);

    const announcementChannel = client.channels.cache.get(ANNOUNCEMENT_CHANNEL_ID);
    if (!announcementChannel) {
        return message.channel.send("Announcement channel not found.");
    }

    let embed = new Discord.MessageEmbed()
        .setDescription(announcementText)
        .setColor("#FC7074")
        .setFooter(`- ${message.author.username}`);

    if (imageUrl) {
        embed.setImage(imageUrl);
    }

    const content = roleId ? `<@&${roleId}>` : null;
    announcementChannel.send({ content, embeds: [embed] }).catch(console.error);
    message.delete().catch(console.error);
};

module.exports.name = "an";
