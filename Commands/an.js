const { EmbedBuilder } = require('discord.js');

const ANNOUNCEMENT_CHANNEL_ID = '1354658803693518918';

module.exports.run = (client, message, args) => {
    if (!args.length) {
        return message.channel.send("You need to provide a message for the announcement.");
    }

    const announcementText = args[0];
    const imageUrl = args.length > 1 ? args[1] : null;
    const announcementChannel = message.guild.channels.cache.get(ANNOUNCEMENT_CHANNEL_ID);

    if (!announcementChannel) {
        return message.channel.send("Announcement channel not found.");
    }

    const embed = new EmbedBuilder()
        .setDescription(announcementText)
        .setColor(0xffcc00)
        .setFooter({ text: `- ${message.author.username}` });

    if (imageUrl) {
        embed.setImage(imageUrl);
    }

    announcementChannel.send({ embeds: [embed] });
    message.delete(); // Delete the command message for cleanliness
};

module.exports.name = "an";
