const botconfig = require("./config.json");
const Discord = require("discord.js");


const bot = new Discord.Client({disableEveryone: true});



bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("입국심사방에 '~지시사항' 이라고 입력해 주세요.", {type: "STREAMING"});
})

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

bot.on("message", async message =>{
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

    if(cmd === `${prefix}지시사항`){
            const member = message.mentions.members.last() || message.member;
            let role = message.guild.roles.cache.find(r => r.name === "시민들");
    
            if(message.member.roles.cache.some(r => r.name === "시민들")){
                message.channel.send('이미 역할을 받으셨습니다.');
            } else {
                message.channel.send(`${member.user} 님 확인 되셨습니다.`);
                message.member.roles.add(role).catch(console.error);
            }
        }
    }    
);

bot.login(process.env.TOKEN);   