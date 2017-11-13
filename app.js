const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const config = require('./config.json');
const embed = new Discord.RichEmbed();
const in_array = require('in_array');
const fs = require('fs');
const ddiff = require('return-deep-diff');
const request = require('request');
const search = require('animelyrics');
const ts = require('console-stamp')(console, {
  pattern: '[dd/mm/yyyy HH:MM:ss.l]',
  datePrefix: '',
  dateSuffix: '',
});

var defaultChannel = '375494044962390016';

// Login authentication token for Bot
client.login(auth.token);

// Print Bot status to console
client.on('ready', () => {
  client.user.setGame(`NHK`);
  console.log(`Logged in as "${client.user.tag}".`);
});

// eval function
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

client.on('guildMemberAdd', (member) => {
  member.guild.channels.get(defaultChannel)
    .send(`${member.user} has spawned.`)
  console.log(`"${member.user.username}" has spawned. at ${new Date()}`);
});

client.on('guildMemberRemove', (member) => {
  member.guild.channels.get(defaultChannel)
    .send(`${member.user} has despawned.`)
  console.log(`"${member.user.username}" has despawned at ${new Date()}.`);
});

// must be in the same voice channel as SA10
client.on('guildMemberSpeaking', (member, speaking) => {
  let guild = member.guild; // get the guild
  if (member.speaking)
    guild.channels.get(defaultChannel).send(`${member.user.username} is speaking.`);
});

// emitted whenever a guild member changes: new role, removed role, nickname
client.on('guildMemberUpdate', (oldMember, newMember) => {
  console.log(ddiff(oldMember, newMember));
});

// server name update, etc.
client.on('guildUpdate', (oldGuild, newGuild) => {
  console.log(ddiff(oldGuild, newGuild));
});

// when someone gets banned
client.on('guildBanAdd', (guild, user) => {
  guild.channels.get(defaultChannel).send(`**${user.username}** was just banned.`);
  console.log(`**${user.username}** was just banned at ${new Date()}.`);
});

// when someone gets unbanned
client.on('guildBanRemove', (guild, user) => {
  guild.channels.get(defaultChannel).send(`**${user.username}** was just unbanned.`);
  console.log(`**${user.username}** was just banned at ${new Date()}.`);
});

// when creating server or bot joins
client.on('guildCreate', (guild) => {
  console.log(`"${client.user}" has joined!`);
  guild.channels.get(defaultChannel).send(`"${client.user}" has joined ${new Date()}`);
});

// when server deleted or bot removed
client.on('guildDelete', (guild) => {
  console.log(`${client.user.tag} has left ${guild.name} (ID: ${guild.id}) at ${new Date()}.`);
  guild.channels.get(defaultChannel).send(`${client.user.tag} has left ${guild.name} at ${new Date()}.`);
});

client.on('messageDeleteBulk', (message) => {
  console.log(`"${message.size}" messages were deleted.`);
});

client.on('channelCreate', (channel) => {
  console.log(`A new ${channel.type} channel "${channel.name}" was created. (channelID = "${channel.id}")`);
});

const getAvatar = async (message) => {
  getAvatarURL = message.author.avatarURL;
};

const music = async (message, inputSongName) => {
  console.log(`DEBUG: inputSongName = ${inputSongName}`);
  dispatcher = message.guild.voiceConnection.playFile(`./music/${inputSongName}.mp3`);
  dispatcher.setVolume(1);
  message.channel.send(`Now playing: **"${inputSongName}"** requested by ${message.member.user}.`);
  client.user.setGame(`${inputSongName}`);

  dispatcher.on('end', () => {
    message.channel.send(`音楽の終わり`)
      .then(() => {
        dispatcher.end();
      });
  });

  dispatcher.on('error', e => {
    console.log(`DEBUG: dispatcher.on('error') = ${e}`);
  });
}

// Return message when command is sent
client.on('message', message => {
  // if the message doesn't start with the prefix, ignore
  if (!message.content.startsWith(config.prefix)) return;
  console.log('-----------------------------------------------');
  console.log(`DEBUG: prefix = "${config.prefix}"`);
  // isolate the prefix and slice the command at the spaces and divide by commas
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  console.log(`DEBUG: args = "${args}"`);
  // isolate the command by itself
  var command = args.shift().toLowerCase();
  console.log(`DEBUG: command = "${command}"`);

  for (var i = 0; i < args.length; i++) {
    //message.channel.send(`DEBUG: args[${i}] = "${args[i]}"`);
    console.log(`DEBUG: args[${i}] = "${args[i]}"`);
  }

  // Checks that the Bot only reads the message from the sender
  if (message.author.bot) return;
  // Checks that the Bot only reads messages with the prefix
  if (message.content.indexOf(config.prefix) !== 0) return;

  // change prefix
  if (command == 'p' || command == 'prefix') {
    let newPrefix = message.content.split(" ").slice(1, 2)[0];
    console.log(`${newPrefix.length}`);
    if (newPrefix.length >= 2) {
      message.channel.send(`Specified prefix is longer than 1 character. Length = ${newPrefix.length}. Try again. :joy:`);
    } else {
      config.prefix = newPrefix;
      fs.writeFile("./config.json", JSON.stringify(config), (err) => console.err);
      console.log(`DEBUG: newPrefix = "${newPrefix}"`);
      message.channel.send(`The new prefix has been set to "${newPrefix}".`);
    }
  } else

  //args = message.content.split(" ").slice(1);
  if (command == 'e' || command == 'eval') {
    if (message.author.id !== config.ownerID) return;
    try {
      console.log(`DEBUG: message.content.slice(1) = ${message.content.slice(1)}`)
      const args = message.content.split(" ").slice(1);
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {
        code: "xl"
      });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  } else

  /*if (command = 'emit') {
    client.emit("channelCreate", message.channel);
  } else*/

  // help command
  if (command == 'h' || command == 'help') {
    message.channel.send(`\`\`\`SA10 Bot - Dank Bot by 「永遠夏」
General:
  (h)elp                Shows this help message
Moderator:
  (p)refix              Set new prefix (1 character) [Permissions to be changed]
  setgame               Set the game
  setstatus             Set status ("online", "idle", "dnd", "invisible")
Dank:
  yamazaki              Capitalism
  kagawa                KAGAWA LIFE
  sa10                  SA10
  oop                   Object-oriented programming :thinking:
  hikki                 NEET dreams
Music:
  join                  Make SA10 join the voice channel
  leave                 Make SA10 leave the voice channel
  play                  Play a song (must be stored on host's server)
  pause                 Pause the song
  resume                Resume the song
  (vol)ume              Set volume level [1-100]
Google API (Work in progress)
  (g)oogle              Return first google search result
  ytstats subs          Returns the number of subscribers of a YouTube channel
Anime (Work in progress)
  (a)nime               Get a mal page
  mal                   Get a user's mal
Nihongo (Work in progress)
  (j)isho               Translate kanji (漢字) and words (言葉) from jisho.org
Web Scarpe
  TBD\`\`\``);
      } else

  // join voice channel
  if (command == 'join') {
    if (!message.guild) return; //  if the message doesn't come from a guild, ignore it
    let voiceCh = message.member.voiceChannel;
    if (!voiceCh || voiceCh.type !== 'voice') {
      message.channel.send(`You\'re not in a voice channel.`)
        .catch(error => message.channel.send(error));
    } else if (message.guild.voiceConnection) {
      message.channel.send(`Already connected to voice channel.`);
    } else {
      message.channel.send(`Connecting...`)
        .then(() => {
          voiceCh.join()
            .then((connection) => { // 'connection' is an instance of VoiceConnection
              message.channel.send(`Connected to voice channel "${voiceCh.name}"`)
                .catch(error => message.channel.send(error));
            }).catch(error => message.channel.send(error));
        }).catch(error => message.channel.send(error));
    }
  } else

  // leave voice channel
  if (command == 'leave') {
    let voiceCh = message.member.voiceChannel;
    if (!voiceCh) {
      message.channel.send('You\'re not in a voice channel.');
    } else {
      message.channel.send('Leaving voice channel...').then(() => {
        voiceCh.leave();
      }).catch(error => message.channel.send(error));
    }
  } else

  // 'dispatcher' is an instance of a StreamDispatcher
  // stream to voice channel
  if (command == 'play') {
    //const dispatcher = message.member.voiceChannel.connection;
    let inputSongName = args.slice(0).join(" "); // isolate the argument (song name)
    if (!inputSongName) { //if no args were input
      message.channel.send(`You didn't include the song name.
\`Syntax: ${config.prefix}play songName\``);
    } else { // else play dank tunes
      console.log(`DEBUG: play = ${inputSongName}`);
      music(message, inputSongName);
      message.channel.send(embed);
    }
  } else

  // pause music
  if (command == 'pause') {
    message.channel.send('Paused.')
      .then(() => {
        dispatcher.pause();
      });
    console.log(`DEBUG: Paused`);
  } else

  // resume music
  if (command == 'resume') {
    message.channel.send('Resumed.')
      .then(() => {
        dispatcher.resume();
      });
    console.log(`DEBUG: Resumed`);
  } else

  // stop music
  if (command == 'stop') {
    message.channel.send('Music stopped.')
      .then(() => {
        dispatcher.end();
      });
    console.log(`DEBUG: Music stopped.`);
  } else

  // time in milliseconds the stream dispatcher has been playing for
  if (command == 'dur') {
    let d = dispatcher.time;
    let s = parseInt(d / 1000); // convert to seconds
    let m = parseInt(s / 60); // convert to minutes
    let h = parseInt(m / 60); // convert to hours
    message.channel.send(`Current total playing time: **${h}h:${m}m:${s}s**.`);
    console.log(`dispatcher.time = ${d} milliseconds.`);
  } else

  // setVolume
  if (command == 'volume' || command == 'vol') {
    let inputVolume = Math.round(args.slice(0).join(" "));
    console.log(`DEBUG: inputVolume = ${inputVolume}`);
    if (inputVolume > 100 || inputVolume <= 0) {
      console.log(`DEBUG: inputVolume = ${inputVolume}`);
      message.channel.send(`Invalid volume level.
\`Syntax: ${config.prefix}(volume {integer} [Between 1-100]\``)
    } else {
      message.channel.send(`Volume set at: **${inputVolume}%**`)
        .then(() => {
          dispatcher.setVolume(`${inputVolume/100}`);
        });
      console.log(`Volume set at: ${inputVolume}%`);
    }
  } else

  if (command == 'purge') {
    let messagecount = parseInt(args.slice(0).join(" "), 10);
    console.log(`DEBUG: messageCount = "${messagecount}"`);
    message.channel.fetchMessages({
        limit: messagecount + 1
    })
      .then(messages => message.channel.bulkDelete(messages));
  } else

  // setgame
  if (command == 'setgame') {
    let game = args.slice(0).join(" ");
    client.user.setGame(game);
    console.log(`DEBUG: setgame = "${game}"`);
  } else

  // setstatus
  if (command == 'setstatus') {
    //if(!argresult) argresult = 'online';
    let t = client.user.status;
    console.log(`DEBUG: inside t = "${t}"`);
    let status = args.slice(0).join(" ");
    if (in_array(status, ['online', 'idle', 'dnd', 'invisible'])) {
      client.user.setStatus(status);
      message.channel.send(`${client.user.username}'s status has been set to "${status}".`);
      console.log(`DEBUG: inside setstatus = "${status}"`);
    } else {
      message.channel.send(`\`\`\`"${status}" is not a valid status.
Valid statuses: "online", "idle", "dnd", "invisible"\`\`\``);
    }
  } else

  // yamazaki command
  if (command == 'yamazaki') {
    message.channel.send('https://i.imgur.com/aEZnPdJ.jpg');
  } else

  // oop command
  if (command == 'oop') {
    message.channel.send(`https://i.imgur.com/ngH8vC4.png`);
  } else

  // oop command
  if (command == 'sa10') {
    message.channel.send(`https://i.imgur.com/HlkZhOj.png`);
  } else

  // oop command
  if (command == 'hikki') {
    message.channel.send(`https://i.imgur.com/5ynuTux.png`);
  } else

  // kagawa life command
  if (command == 'kagawa') {
    message.channel.send(`Hey Wasshi!~~~ https://i.imgur.com/dEaBvma.jpg`);
  } else

  if (command == 'ytstats') {
    let ytUser = args.slice(0).join(" ");
    console.log(`DEBUG: ytUser = "${ytUser}"`);
    const getJSON = request.get({
      uri: `https://www.googleapis.com/youtube/v3/channels/?forUsername=${ytUser}&part=snippet,statistics&key=${auth.google_api}`,
      json: true
    }, (err, res, body) => {
      if (err) return console.log(err);
      var channelID = body.items[0].id;
      var viewCount = body.items[0].statistics.viewCount;
      var subCount = body.items[0].statistics.subscriberCount;
      var ytImage = body.items[0].snippet.thumbnails.high.url;
      var videoCount = body.items[0].statistics.videoCount;
      console.log(`YouTube channel "${ytUser}" | Subscribers: "${subCount}" | Total Video Views: "${viewCount}" | Total Public Videos: "${videoCount}" | (Channel ID = "${channelID}")`);
      message.channel.send(`YouTube channel **${ytUser}** stats:
      Subscribers: **${subCount}**
      Total Views: **${viewCount}**
      Total Public Videos: **${videoCount}**
      Thumbnail Image: ${ytImage}
      \`(Channel ID = ${channelID})\``);
    });
  } else

  if (command == 'kill') {
    message.channel.send('brb dying.');
    client.destroy();
  }

  if (command == 't') {
    //args.slice(0).join(" ")
    let songName = args.slice(0).join(" ");
    console.log(`DEBUG: songName = "${songName}"`);
    encodeURI = encodeURIComponent(args.slice(0).join(" ").trim());
    console.log(`DEBUG: encodeURI = ${encodeURI}`);
    encodeURL = `https://www.google.com/search?q=site%3Aanimelyrics.com+${encodeURI}`;
    console.log(`DEBUG: encodeURL = ${encodeURL}`);

    search(encodeURI).then(song => {
      console.log(song.anime + ': ' + song.description)
      console.log(`song.info = ${song.info.join('\n')}`)
      console.log('-------------')
      console.log(song.lyrics.join('\n'))

      embed
        .setAuthor(`${message.author.username} requested **{varSongName}**:`)
        .setTitle("Lyrics:")
        .setURL(encodeURL)
        .setColor(0x23d160)
        .addField(`Anime:`,song.anime)
        .addField(`Description:`,song.description)
        .addField(`Info:`,song.info.join('\n'))
        .setDescription(`${song.lyrics.join('\n')}`)
        .addField(`Lyrics`,`[animelyrics.com](${encodeURL})`)
        .setTimestamp()
        .setFooter("SA10 Music");
      message.channel.send({embed});
    }).catch(console.error)
  }
});
