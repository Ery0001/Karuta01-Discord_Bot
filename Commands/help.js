const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    run: (client, message, args) => {
        const announcementEmbed = new EmbedBuilder()
            .setTitle("Command: Announcement")
            .setColor("#c0c0c0")
            .setDescription(
                "Syntax: `\"message\"` `\"image_url(opt)\"` `\"role_id(opt)\"`\n" +
                "Usage: `h.an \"Hello\" \"https://img.jpg\" \"135464134...\"`\n\n" +
                "Make Sure to Use Quotation Marks: '" "'\n" +
                "For images, it is recommended to use a public URL." 
            )
            .setFooter({ text: "Sends an announcement to a fixed channel." });

        const embedEmbed = new EmbedBuilder()
            .setTitle("Command: Embed")
            .setColor("#c0c0c0")
            .setDescription(
                "Syntax: `channel_id` `\"message\"` `\"image_url(opt)\"` `\"role_id(opt)\"`\n" +
                "Usage: `h.embed 135465880... \"Hello\" \"https://img.jpg\" \"135464134...\"`\n\n" +
                "Make Sure to Use Quotation Marks: '" "'\n" +
                "For images, it is recommended to use a public URL."
            )
            .setFooter({ text: "Sends an embed to the specified channel." });

        message.channel.send({ embeds: [announcementEmbed, embedEmbed] });
    }
};
