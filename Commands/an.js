const Discord = require('discord.js');
const ANNOUNCEMENT_CHANNEL_ID = '1239586188092768348';

module.exports.run = (client, message, args) => {
    if (args.length < 1) {
        return message.channel.send("You need to provide a message for the announcement.");
    }

    const matches = message.content.match(/"([\s\S]*?)"/g);
    if (!matches || matches.length < 1) {
        return message.channel.send("Please use quotes around the message and optional image URL.");
    }

    const announcementText = matches[0].replace(/"/g, '').replace(/\\n/g, '\n').replace(/\\t/g, '\t'); // Extract, clean, and format message text
    const imageUrl = matches.length > 1 ? matches[1].replace(/"/g, '') : null; // Extract and clean image URL if present
    const roleId = matches.length > 2 ? matches[2].replace(/"/g, '') : null; // Extract role ID if provided
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
    
    const content = roleId ? `<@&${roleId}>` : "";
    announcementChannel.send({ content, embeds: [embed] });
    message.delete(); // Delete the command message for cleanliness
};

module.exports.name = "an";
