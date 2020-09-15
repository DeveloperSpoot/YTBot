const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "test",
    category: "test",
    description: "Test command.",
    usage: ";Test",
    run: async (client, message, args, prefix, theme) =>{
        const embed = new MessageEmbed()
        .setColor(theme)
        .setTitle("Testing")
        .setDescription("Hoepfully this worked : )")

        message.author.send(embed)
        message.reply("Sent you a dm.")
    }
}