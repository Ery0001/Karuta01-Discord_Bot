/*module.exports.run = (client, message, args) => {
  let toSay = args.join(" ")
  let textchannel = message.mentions.channels.first()
  if(!toSay) return message.channel({content: "You have to provide something"})
  message.channel.send({content: toSay}) 
  
}

module.exports.name = "say"*/

/*module.exports.run = (client, message, args) => {
  let toSay = args.join(" ");
  let textChannel = message.mentions.channels.first();

  // Check if there's any text to send
  if (!toSay && !message.attachments.size) {
    return message.channel.send("You have to provide something.");
  }

  // Send the text
  if (toSay) {
    message.channel.send(toSay);
  }

  // Send the attachments
  message.attachments.forEach(attachment => {
    message.channel.send({ files: [attachment.url] });
  });
};

module.exports.name = "say";*/

module.exports.run = (client, message, args) => {
  let toSay = args.join(" ");
  let textChannel = message.mentions.channels.first();

  // Check if there's any text to send
  if (!toSay && !message.attachments.size) {
    return message.channel.send("You have to provide something.");
  }

  // Send the text
  if (toSay) {
    message.channel.send(toSay);
  }

  // Send the attachments
  message.attachments.forEach(attachment => {
    message.channel.send({ files: [attachment.url] });
  });

  // Delete the original message
  message.delete();
};

module.exports.name = "say";
