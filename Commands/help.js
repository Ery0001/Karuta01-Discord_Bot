const { prefix } = require('../index.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    run: (client, message, args) => {
        const announcementEmbed = new EmbedBuilder()
            .setTitle("Command: Announcement")
            .setColor("#c0c0c0")
            .setDescription(
                "Usages: `\"message\"` `\"image_url(opt)\"` `\"role_id(opt)\"`\n" +
                "Syntax: `${prefix}an \"Hello\" \"https://img.jpg\" \"135464134...\"`\n\n" +
                "Make Sure to Use Quotation Marks: `\" \"`\n" +
                "For images, it is recommended to use a public URL." 
            )
            .setFooter({ text: "Sends an announcement to a fixed channel." });

        const embedEmbed = new EmbedBuilder()
            .setTitle("Command: Embed")
            .setColor("#c0c0c0")
            .setDescription(
                "Usages: `channel_id` `\"message\"` `\"image_url(opt)\"` `\"role_id(opt)\"`\n" +
                "Syntax: `${prefix}embed 1354... \"Hello\" \"https://img.jpg\" \"1354...\"`\n\n" +
                "Make Sure to Use Quotation Marks: `\" \"`, Except `channel_id`\n" +
                "For images, it is recommended to use a public URL."
            )
            .setFooter({ text: "Sends an embed to the specified channel." });

        message.channel.send({ embeds: [announcementEmbed, embedEmbed] });
    }
};
