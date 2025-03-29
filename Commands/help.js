const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    const announcementEmbed = new Discord.MessageEmbed()
        .setTitle("ANNOUNCEMENT COMMAND")
        .setColor("#c0c0c0")
        .setDescription(```
h.an "message" "image_url (optional)" "role_id (optional)"
```
- Sends an announcement to a fixed channel.
- Example: `h.an "Hello everyone!" "https://example.com/image.jpg" "1354641345762955341"`
- If no image is attached, you can use an image URL instead.`);

    const embedEmbed = new Discord.MessageEmbed()
        .setTitle("EMBED COMMAND")
        .setColor("#c0c0c0")
        .setDescription(```
h.embed channel_id "message" "image_url (optional)" "role_id (optional)"
```
- Sends an embed to a specific channel.
- Example: `h.embed 123456789012345678 "Important Update!" "https://example.com/image.jpg" "1354641345762955341"`
- If no image is attached, you can use an image URL instead.`);

    message.channel.send({ embeds: [announcementEmbed, embedEmbed] });
};

module.exports.name = "help";
