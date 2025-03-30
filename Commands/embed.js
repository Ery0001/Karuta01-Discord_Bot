const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "embed",
    run: (client, message, args) => {
        if (args.length < 2) {
            return message.channel.send("You need to provide a channel ID and a message for the announcement.");
        }

        const channelId = args.shift(); // Extract the channel ID
        const regex = /"([^"]*)"/g;
        const matches = [...message.content.matchAll(regex)].map(m => m[1]);

        if (matches.length < 1) {
            return message.channel.send("Please use quotes around the message and optional parameters.");
        }

        const announcementText = matches[0].replace(/\n/g, '\n').replace(/\t/g, '\t');
        const imageUrl = message.attachments.size > 0 
            ? message.attachments.first().url 
            : (matches.length > 1 && matches[1].startsWith("http") ? matches[1] : null);
        
        const roleId = matches.length > 2 ? matches[2] : (matches.length === 2 && !imageUrl ? matches[1] : null);

        const announcementChannel = client.channels.cache.get(channelId);
        if (!announcementChannel) {
            return message.channel.send("Announcement channel not found.");
        }

        let embed = new EmbedBuilder()
            .setDescription(announcementText)
            .setColor("#FC7074")
            .setFooter({ text: `- ${message.author.username}` });

        if (imageUrl) {
            embed.setImage(imageUrl);
        }

        const content = roleId ? `<@&${roleId}>` : null;
        announcementChannel.send({ content, embeds: [embed] }).catch(console.error);
        message.delete().catch(console.error);
    }
};
