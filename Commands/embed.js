const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "embed",
    run: async (client, message, args) => {
        if (args.length < 2) {
            return message.reply("You need to provide a channel ID and a message for the announcement.");
        }

        const channelId = args.shift(); // Extract the channel ID
        const regex = /"([^"]*)"/g;
        const matches = [...message.content.matchAll(regex)].map(m => m[1]);

        if (matches.length < 1) {
            return message.reply("Please use quotes around the message and optional parameters.");
        }

        // Replace \n with newline and \t with tab in the announcement message
        const announcementText = matches[0].replace(/\\n/g, '\n').replace(/\\t/g, '\t');
        
        const imageUrl = message.attachments.size > 0 
            ? message.attachments.first().url 
            : (matches.length > 1 && matches[1].startsWith("http") ? matches[1] : null);
        
        const roleId = matches.length > 2 ? matches[2] : (matches.length === 2 && !imageUrl ? matches[1] : null);

        const announcementChannel = client.channels.cache.get(channelId) || 
            message.guild.channels.cache.find(channel => channel.name === channelId); // Allow channel mention by name
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
        // If the channel is mentioned by name, convert it to a channel mention
        const channelMention = announcementChannel.isTextBased() ? `<#${announcementChannel.id}>` : null;

        // Send the message with optional content (role mention) and channel mention
        try {
            await announcementChannel.send({ content: roleId ? `<@&${roleId}> ${channelMention}` : channelMention, embeds: [embed] });
            message.reply("Announcement `embed` cmd has completed successfully.");
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while sending the announcement.");
        }
    }
};
