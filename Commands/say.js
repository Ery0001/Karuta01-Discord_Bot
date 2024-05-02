/*module.exports.run = (client, message, args) => {
  let toSay = args.join(" ")
  let textchannel = message.mentions.channels.first()
  if(!toSay) return message.channel({content: "You have to provide something"})
  message.channel.send({content: toSay}) 
  
}

module.exports.name = "say"*/

const { MessageAttachment } = require("discord.js");

module.exports.run = (client, message, args) => {
  let toSay = args.join(" ");
  let textChannel = message.mentions.channels.first();

  // Check if there's any text to send
  if (!toSay && !message.attachments.size) {
    return message.channel.send("You have to provide something.");
  }

  // Create an array to store attachments
  let attachments = [];

  // Add regular attachments to the array
  message.attachments.forEach(attachment => {
    attachments.push(new MessageAttachment(attachment.url));
  });

  // Send the text and attachments
  message.channel.send(toSay, { files: attachments });
};

module.exports.name = "say";
