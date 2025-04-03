const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "embed",
    run: async (client, message, args) => {
        if (args.length < 2) {
            return message.reply("You need to provide a channel ID or mention and a message for the announcement.");
        }

        // Extract the first argument which could be either channel mention or raw ID
        const channelArg = args.shift();
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
        
        const roleIdOrMention = matches.length > 1 ? matches[1] : null;  // Extract role mention or ID from the second parameter
        
        let announcementChannel;

        // Check if the channel argument is a mention (e.g., #general)
        if (channelArg.startsWith("<#") && channelArg.endsWith(">")) {
            // It's a mention, extract the channel ID from the mention
            const channelId = channelArg.slice(2, -1);
            announcementChannel = client.channels.cache.get(channelId);
        } else {
            // It's assumed to be a raw channel ID
            announcementChannel = client.channels.cache.get(channelArg);
        }

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
            // If the roleIdOrMention is a valid role mention, use it
            if (roleIdOrMention.startsWith("<@&") && roleIdOrMention.endsWith(">")) {
                content = roleIdOrMention;  // Role mention (e.g., <@&role_id>)
            } else {
                // If it's not a mention, assume it's a raw role ID
                content = `<@&${roleIdOrMention}>`;  // Role ID (e.g., <@&role_id>)
            }
        }

        try {
            // Send the announcement to the specified channel
            await announcementChannel.send({ content, embeds: [embed] });
            message.reply("Announcement `embed` cmd has completed successfully.");
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while sending the announcement.");
        }
    }
};
