const Discord = require('discord.js');
const ANNOUNCEMENT_CHANNEL_ID = '1354658803693518918';

module.exports.run = (client, message, args) => {
    if (!args.length) {
        return message.channel.send("You need to provide a message for the announcement.");
    }

    const announcementText = args[0];
    const imageUrl = args.length > 1 ? args[1] : null;
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
    
    announcementChannel.send({ embeds: [embed] });
    message.delete(); // Delete the command message for cleanliness
};

module.exports.name = "an";
