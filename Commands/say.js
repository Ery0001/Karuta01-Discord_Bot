module.exports.run = (client, message, args) => {
  let toSay = args.join(" ")
  let textchannel = message.mentions.channels.first()
  if(!toSay) return message.channel({content: "You have to provide something"})
  message.channel.send({content: toSay}) 
  
}

module.exports.name = "say"