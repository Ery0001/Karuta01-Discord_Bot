const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("COMMAND HELP")
        .setColor("#c0c0c0")
        .setDescription(
            "Here are the available commands and their syntaxes:\n\n" +
            "\u200B\n**__Announcement Command__**\n```\n.an \"message\" \"image_url (optional)\" \"role_id (optional)\"```\n" +
            "- Sends an announcement to a fixed channel.\n" +
            "- Example: `.an \"Hello everyone!\" \"https://example.com/image.jpg\" \"1354641345762955341\"`\n\n" +
            "\u200B\n**__Embed Command__**\n```\n.embed channel_id \"message\" \"image_url (optional)\" \"role_id (optional)\"```\n" +
            "- Sends an embed to a specific channel.\n" +
            "- Example: `.embed 123456789012345678 \"Important Update!\" \"https://example.com/image.jpg\" \"1354641345762955341\"`"
        )
        .setFooter("Use quotes for multi-word messages and optional parameters.");
    
    message.channel.send({ embeds: [embed] });
    // message.delete();
};

module.exports.name = "help";
