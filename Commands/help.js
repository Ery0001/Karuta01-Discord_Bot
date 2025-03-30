const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "help",
    run: (client, message, args) => {
        const announcementEmbed = new EmbedBuilder()
            .setTitle("Command: Announcement")
            .setColor("#c0c0c0")
            .setDescription(
                "Options: `\"message\"` `\"image_url(opt)\"` `\"role_id(opt)\"`\n" +
                "Usage: `\"h.\"` `\"Hello\"` `\"https://img.jpg\"` `\"135464134...\"`\n\n" +
                "For Image, It is recommended to use a public url." +
            )
            .setFooter({ text: `Sends an announcement to a fixed channel.`});

        const embedEmbed = new EmbedBuilder()
            .setTitle("EMBED COMMAND")
            .setColor("#c0c0c0")
            .setDescription(
                "Options: `\channel_id\` `\"message\"` `\"image_url(opt)\"` `\"role_id(opt)\"`\n" +
                "Usage: `\"h.\"` `\135465880..\` `\"Hello\"` `\"https://img.jpg\"` `\"135464134...\"`\n\n" +
                "For Image, It is recommended to use a public url." +
            )
            .setFooter({ text: `Sends an embed to stated channel.`});

        message.channel.send({ embeds: [announcementEmbed, embedEmbed] });
    }
};
