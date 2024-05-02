/*module.exports.run = (client, message, args) => {
  let toSay = args.join(" ")
  let textchannel = message.mentions.channels.first()
  if(!toSay) return message.channel({content: "You have to provide something"})
  message.channel.send({content: toSay}) 
  
}

module.exports.name = "say"*/

module.exports.run = (client, message, args) => {
  let toSay = args.join(" ");
  let textChannel = message.mentions.channels.first();
  let attachmentsText = "";

  // Check if there's any text to send
  if (!toSay && !message.attachments.size) {
    return message.channel.send("You have to provide something.");
  }

  // Concatenate text with attachment URLs
  if (toSay) {
    attachmentsText += toSay + "\n";
  }

  // Concatenate attachment URLs
  message.attachments.forEach(attachment => {
    attachmentsText += attachment.url + "\n";
  });

  // Send the combined text and attachments
  message.channel.send(attachmentsText);
};

module.exports.name = "say";
