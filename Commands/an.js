const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "an",
    run: async (client, message, args) => {
        if (args.length < 1) {
            return message.reply("You need to provide a message for the announcement.");
        }

        const regex = /"([^"]*)"/g;
        const matches = [...message.content.matchAll(regex)].map(m => m[1]);

        if (matches.length < 1) {
            return message.reply("Please use quotes around the message and optional parameters.");
        }

        // Replace \n with newline and \t with tab
        const announcementText = matches[0].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        
        // Check if there is an image URL or attachment
        const imageUrl = message.attachments.size > 0 
            ? message.attachments.first().url 
            : (matches.length > 1 && matches[1].startsWith("http") ? matches[1] : null);

        // Extract role ID from mention or use fallback
        const roleMentionRegex = /<@&(\d+)>/;
        const roleIdMatch = matches.length > 1 && matches[1].match(roleMentionRegex);
        const roleId = roleIdMatch ? roleIdMatch[1] : (matches.length > 2 ? matches[2] : (matches.length === 2 && !imageUrl ? matches[1] : null));

        if (!roleId) {
            return message.reply("You need to mention a role.");
        }

        const announcementChannel = client.channels.cache.get("1354658803693518918");

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

        const content = `<@&${roleId}>`;

        try {
            await announcementChannel.send({ content, embeds: [embed] });
            message.reply("Announcement `embed` cmd has completed successfully.");
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while sending the announcement.");
        }
    }
};
