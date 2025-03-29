const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    if (args.length < 2) {
        return message.channel.send("You need to provide a channel ID and a message for the announcement.");
    }

    const channelId = args.shift(); // Extract the channel ID
    const matches = message.content.match(/"([\s\S]*?)"/g);
    if (!matches || matches.length < 1) {
        return message.channel.send("Please use quotes around the message and optional image URL.");
    }

    const announcementText = matches[0].replace(/"/g, '').replace(/\\n/g, '\n').replace(/\\t/g, '\t'); // Extract, clean, and format message text
    const imageUrl = matches.length > 1 ? matches[1].replace(/"/g, '') : null; // Extract and clean image URL if present
    const announcementChannel = client.channels.cache.get(channelId);

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
    
    announcementChannel.send({ embeds: [embed] });
    message.delete(); // Delete the command message for cleanliness
};

module.exports.name = "embed";
