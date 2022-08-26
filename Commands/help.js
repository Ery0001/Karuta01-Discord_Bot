const Discord = require("discord.js")
exports.run = (client, message, args) => {
 const commands = client.commands.map(command => command.name).join(", ")
  const embed = new Discord.MessageEmbed()
  .setTitle(`Total Commands⋟ ${client.commands.size}`)
  .setDescription(commands)
  .setImage ("https://i.ibb.co/26DkQbz/20220814-232233.jpg")
  .setColor ("#FE0000") 
  .setFooter("My prefix is h.")
  message.channel.send({embeds:[embed]})
message.delete(1000);

  
}

exports.name = "help"