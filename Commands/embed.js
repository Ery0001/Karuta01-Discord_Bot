const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "embed",
    run: (client, message, args) => {
        if (args.length < 2) {
            return message.reply("You need to provide a channel and a message for the announcement.");
        }

        const channelArg = args.shift(); // Extract the channel argument
        const regex = /"([^"]*)"/g;
        const matches = [...message.content.matchAll(regex)].map(m => m[1]);

        if (matches.length < 1) {
            return message.reply("Please use quotes around the message and optional parameters.");
        }

        const announcementText = matches[0].replace(/\n/g, '\n').replace(/\t/g, '\t');
        const imageUrl = message.attachments.size > 0 
            ? message.attachments.first().url 
            : (matches.length > 1 && matches[1].startsWith("http") ? matches[1] : null);

        const roleMentionRegex = /<@&(\d+)>/; // Role mention regex
        const channelMentionRegex = /<#(\d+)>/; // Channel mention regex

        let channelId, roleId;

        // Check if channelArg is a mention (role or channel)
        const channelIdMatch = channelArg.match(channelMentionRegex);
        const roleIdMatch = channelArg.match(roleMentionRegex);

        if (channelIdMatch) {
            // If it's a channel mention, extract the channel ID
            channelId = channelIdMatch[1];
        } else if (roleIdMatch) {
            // If it's a role mention, extract the role ID
            roleId = roleIdMatch[1];
        } else {
            // If it's neither, treat it as a plain ID
            channelId = channelArg;
        }

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

        const content = roleId ? `<@&${roleId}>` : null;
        announcementChannel.send({ content, embeds: [embed] }).catch(console.error);
        message.delete().catch(console.error);
    }
};
