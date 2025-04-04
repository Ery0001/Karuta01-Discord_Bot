const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "embed",
    run: async (client, message, args) => {
        if (args.length < 2) {
            return message.reply("You need to provide a channel ID or mention and a message for the announcement.");
        }

        const channelArg = args.shift(); // Only declare once!

        const regex = /"([^"]*)"/g;
        const matches = [...message.content.matchAll(regex)].map(m => m[1]);

        if (matches.length < 1) {
            return message.reply("Please use quotes around the message and optional parameters.");
        }

        const announcementText = matches[0].replace(/\\n/g, '\n').replace(/\\t/g, '\t');

        const imageUrl = message.attachments.size > 0
            ? message.attachments.first().url
            : (matches.length > 1 && matches[1].startsWith("http") ? matches[1] : null);

        const roleIdOrMention = matches.length > 1 ? matches[1] : null;

        // Handle channel ID from mention or raw
        const channelMentionRegex = /<#(\d+)>/;
        const channelIdMatch = channelArg.match(channelMentionRegex);
        const channelId = channelIdMatch ? channelIdMatch[1] : channelArg;

        const announcementChannel = client.channels.cache.get(channelId);

        if (!announcementChannel) {
            return message.reply("Announcement channel not found.");
        }

        let embed = new EmbedBuilder()
            .setDescription(announcementText)
            .setColor("#FC7074")
            .setFooter({ text: `- ${message.author.username}` });

        if (imageUrl) {
            embed.setImage(imageUrl);
        }

        let content = "";
        if (roleIdOrMention) {
            if (roleIdOrMention.startsWith("<@&") && roleIdOrMention.endsWith(">")) {
                content = roleIdOrMention;
            } else {
                content = `<@&${roleIdOrMention}>`;
            }
        }

        try {
            await announcementChannel.send({ content, embeds: [embed] });
            message.reply("Announcement `embed` cmd has completed successfully.");
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while sending the announcement.");
        }
    }
};
