module.exports.run = (cleint, message, args) => {
  message.channel.send("pong!")
  message.delete(1000);
}

module.exports.name = "ping"
