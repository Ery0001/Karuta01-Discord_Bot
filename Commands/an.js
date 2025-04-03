const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "an", // Command name
    run: async (client, message, args) => {
        if (args.length < 1) {
            return message.reply("You need to provide a message for the announcement.");
        }

        const regex = /"([^"]*)"/g;
        const matches = [...message.content.matchAll(regex)].map(m => m[1]);

        if (matches.length < 1) {
            return message.reply("Please use quotes around the message and optional parameters.");
        }

        // Replace \n with newline and \t with tab in the announcement message
        const announcementText = matches[0].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        
        // Check if there is an image URL or if there's an attachment
        const imageUrl = message.attachments.size > 0 
            ? message.attachments.first().url 
            : (matches.length > 1 && matches[1].startsWith("http") ? matches[1] : null);
        
        // Check for role ID or mention (optional)
        const roleId = matches.length > 2 ? matches[2] : (matches.length === 2 && !imageUrl ? matches[1] : null);

        // Fixed announcement channel ID
        const announcementChannel = client.channels.cache.get("1354658803693518918");
        if (!announcementChannel) {
            return message.reply("Announcement channel not found.");
        }

        let embed = new EmbedBuilder()
            .setDescription(announcementText)
            .setColor("#FC7074")
            .setFooter({ text: `- ${message.author.username}` });

        // Add image to embed if provided
        if (imageUrl) {
            embed.setImage(imageUrl);
        }

        // Mention role if provided
        const content = roleId ? `<@&${roleId}>` : null;

        try {
            // Send the message to the fixed channel
            await announcementChannel.send({ content, embeds: [embed] });
            message.reply("Announcement `embed` cmd has completed successfully.");
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while sending the announcement.");
        }
    }
};
