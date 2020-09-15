const {Client, Collection, DiscordAPIError, MessageEmebed} = require("discord.js");
const {config} = require ("dotenv");
const fs = require("fs")
const TOKEN = "NzU1MjE0NzU1MjQ0OTMzMTUw.X2ACjA.ASATB5vSI6X1MfGnMzQjEAnP3EI";
const prefix = ";";
const theme = "#aaff00";

const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler =>{
    require(`./handler/${handler}`)(client);
})

client.on("ready", () =>{
    console.log("✅ Bot Online. ✅")
});

client.on("message", async message => {
    if(message.author.bot) return; //If the author is a bot, ignore.
    if(!message.guild) return; //If the message did not come from a server, ignore.
    if(!message.content.startsWith(prefix)) return; //If the message does not start with the prefix, ignore.

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd))
    if(command) 
    command.run(client, message, args, prefix, theme)
})

client.login(TOKEN)