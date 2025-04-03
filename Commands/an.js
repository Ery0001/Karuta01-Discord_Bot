const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "an", // Change this to "embed" for embed.js
    run: (client, message, args) => {
        if (args.length < 1) {
            return message.reply("You need to provide a message for the announcement.");
        }

        const regex = /"([^"]*)"/g;
        const matches = [...message.content.matchAll(regex)].map(m => m[1]);

        if (matches.length < 1) {
            return message.reply("Please use quotes around the message and optional parameters.");
        }

        const announcementText = matches[0].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        const imageUrl = message.attachments.size > 0 
            ? message.attachments.first().url 
            : (matches.length > 1 && matches[1].startsWith("http") ? matches[1] : null);

        const roleMentionRegex = /<@&(\d+)>/; // Role mention regex
        const roleIdMatch = matches.length > 1 && matches[1].match(roleMentionRegex);

        let roleId;
        if (roleIdMatch) {
            // If it's a role mention, extract the role ID
            roleId = roleIdMatch[1];
        }

        // Use a fixed channel for the announcement
        const announcementChannel = client.channels.cache.get("1354658803693518918"); // Fixed channel ID
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

        // Send the announcement to the channel, with or without the mentioned role
        const content = roleId ? `<@&${roleId}>` : null;
        announcementChannel.send({ content, embeds: [embed] }).catch(console.error);
        message.delete().catch(console.error);
    }
};
