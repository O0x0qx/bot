const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} Şuan Aktif!`);

  bot.user.setActivity("Hakanın bitimini", {type: "WATCHING"});

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = ".";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd.toLowerCase() === `${prefix}kick`){


    let kUye = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUye) return message.channel.send("Böyle bir kullanıcı yok!");
    let kSebep = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bunu yapamazsın!");
    if(kUye.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu kullanıcı banlanamaz!");
    if(kSebep.lenght == 0) return message.chanel.send("Sebep Girilmeli!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicklenen kullanıcı", `${kUye} with ID ${kUye.id}`)
    .addField("Kickleyen kişi", `<@${message.author.id}> (${message.author.id})`)
    .addField("Kanal", message.channel)
    .addField("Zaman", message.createdAt)
    .addField("Sebep:", kSebep);

    let kickChannel = message.guild.channels.find(`name`, "modlog");
    if(!kickChannel) return message.channel.send("modlog kanalı bulamıyorum.");

    message.guild.member(kUser).kick(kSebep);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd.toLowerCase() === `${prefix}ban`){

    let bUye = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUye) return message.channel.send("Böyle bir kullanıcı yok!");
    let bSebep = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUye.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu kişi banlanamaz!");
    if(bSebep == 0) return message.chanel.send("Sebep Girilmeli!");



    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banlanan kullanıcı", `${bUye} (${bUye.id})`)
    .addField("Banlayan yetkili", `<@${message.author.id}> (${message.author.id})`)
    .addField("Kanal", message.channel)
    .addField("Zaman", message.createdAt)
    .addField("Sebep", bSebep);

    let incidentchannel = message.guild.channels.find(`name`, "modlog");
    if(!incidentchannel) return message.channel.send("Modlog kanalı bulamıyorum.");

    message.guild.member(bUye).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd.toLowerCase() === `${prefix}uyar`){


    let rUye = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUye) return message.channel.send("Kullanıcıyı bulamıyorum.");
    let rSebep = args.join(" ").slice(22);
    if(rSebep == 0) return message.chanel.send("Sebep Girilmeli!");


    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Uyarılan kullanıcı", `${rUye} (${rUye.id})`)
    .addField("Uyaran", `${message.author} (${message.author.id})`)
    .addField("Kanal", message.channel)
    .addField("Zaman", message.createdAt)
    .addField("Sebep", rSebep);

    let reportschannel = message.guild.channels.find(`name`, "modlog");
    if(!reportschannel) return message.channel.send("modlog kanalı bulamıyorum.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd.toLowerCase() === `${prefix}sunucubilgi`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Bilgi")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Sunucu adı", message.guild.name)
    .addField("Kurulduğu zaman", message.guild.createdAt)
    .addField("Senin katıldığın zaman", message.member.joinedAt)
    .addField("Toplam kullanıcılar", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd.toLowerCase() === `${prefix}botbilgi`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Bilgi")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot ismi", bot.user.username)
    .addField("Botun kurulma zamanı", bot.user.createdAt);

    return message.channel.send(botembed);
  }

});

bot.login("NDA2MDkxMTU0NTM5NTQ0NTc4.DUt51w.gcPdQ3WrD4tvJyTg_xcINYRCHzE");
