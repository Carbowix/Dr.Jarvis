const Discord = require('discord.js');
const bot = new Discord.Client();
const ddiff = require('return-deep-diff');
const chalk = require('chalk');
const request = require('superagent');
const yt = require('ytdl-core');
const moment = require('moment');
const paste = bot.paste = require('better-pastebin');
const fs = require('fs');
require('moment-duration-format')
require('./utils.js')

var config = bot.config = require('../src/config/config.json');
var commands = bot.commands = {};

var prefix = '!';

var web = 1
var filter = {}
var addchannel = prefix + 'create channel';
var deletechannel = prefix + 'delete channel';
var addvoice = prefix + 'voicechannel create';
var deletevoice = prefix + 'voicechannel delete';
var searchvideo = prefix + 'youtubevideo';

//invite link https://discordapp.com/oauth2/authorize?&client_id=254636420377870346&scope=bot&permissions=8

function rnd_selection(base) {
	return String(arguments[Math.floor(Math.random() * arguments.length)]);
}

function loadCommands() {
	fs.readdirSync('./src/commands/').forEach(file => {
		if (file.startsWith('_') || !file.endsWith('.js')) return;
		let command = require(`./commands/${file}`);
		if (typeof command.run !== 'function' || typeof command.info !== 'object') {
			console.error(`(!) Invalid command file: ${file}`);
			return;
		}
		commands[command.info.name] = command;
	});
}

function loadModeration() {
	fs.readdirSync('./src/commands/moderation').forEach(file => {
		if (file.startsWith('_') || !file.endsWith('.js')) return;
		let command = require(`./commands/moderation/${file}`);
		if (typeof command.run !== 'function' || typeof command.info !== 'object') {
			console.error(`(!) Invalid command file: ${file}`);
			return;
		}
		commands[command.info.name] = command;
	});
}

bot.on('ready', () => {
	console.log('Getting Ready To Wake Up.');
	loadCommands();
	loadModeration();
	console.log("Commands Are Loaded");
	console.log("Moderation Commands Are Loaded");
	console.log('I am Ready');
	paste.setDevKey(config.pastebin.devKey);
	paste.login(config.pastebin.username, config.pastebin.password, function (success, data) {
		if (!success) {
			console.log('Failed (' + data + ')');
			return false;
		}
	})
});

bot.on('guildMemberAdd', member => {
	let guild = member.guild;
	guild.defaultChannel.sendMessage(`Welcome ${member.user} to ${guild.name}! Hope you will enjoy your stay with us :smiley:.`).catch(console.error);
});
bot.on('guildCreate', guild => {
	guild.createRole({ name: 'JarvisAdmin' })
	guild.defaultChannel.sendMessage(`Hello Guys! I was Invited to ${guild.name}. Thanks for Inviting Me :)`);
});
bot.on('guildMemberRemove', member => {
	let guild = member.guild;
	guild.defaultChannel.sendMessage(`${member.user} Just Left Us. Come back later :smiley:`).catch(console.error);
});

bot.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;
	let command = message.content.split(' ')[0].substr(config.prefix.length);
	let args = message.content.split(' ').splice(1);
	if (commands[command]) {
		commands[command].run(bot, message, args);
	}
});

bot.on('message', message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;

	let command = message.content.split(' ')[0];
	command = command.slice(config.prefix.length);

	let args = message.content.split(' ').slice(1);

		if (command === 'voice') {
			message.channel.sendTTSMessage(args.join(' '));
			message.delete();

		}
		else

				if (command === 'about') {
					message.channel.sendMessage('', {
						embed: {
							color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
							author: {
								name: bot.user.username,
								icon_url: bot.user.avatarURL
							},
							thumbnail: {
								url: (`${bot.user.avatarURL}`)
							},
							title: 'About Me',
							description: 'Don\'t Like to Talk About my self a lot : D',
							fields: [
								{
									name: 'Info About me',
									value: '**Created Since**: Friday December 4, 2016\n\u200B**Creator**: Myth'
								}
							],
							timestamp: new Date(),
							footer: {
								icon_url: bot.user.avatarURL,
								text: 'Dr.Jarvis. Expert of Cats'
							}
						}
					});
					message.delete();
				} else

						if (command === 'commands') {
							message.reply('A direct message has been sent with Instructions to you! :incoming_envelope: ');
							message.author.sendMessage('', {
								embed: {
									color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
									author: {
										name: bot.user.username,
										icon_url: bot.user.avatarURL
									},
									thumbnail: {
										url: (`${bot.user.avatarURL}`)
									},
									fields: [
										{
											name: 'Prefix',
											value: 'The Prefix is: **!commandname**'
										},
									],
									timestamp: new Date(),
									footer: {
										icon_url: bot.user.avatarURL,
										text: 'Created By: Dr.Jarvis. Expert of Cats'
									}
								}
							});
							message.author.sendMessage('', {
								embed: {
									color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
									author: {
										name: bot.user.username,
										icon_url: bot.user.avatarURL
									},
									thumbnail: {
										url: (`${bot.user.avatarURL}`)
									},
									fields: [

										{
											name: 'utilities Part 1',
											value: '**delete channel** text -- Deletes any channel you down want.(Only Owner can do it Right Now.) Type !delete channel **channelname**\n\u200B**create channel** text -- Creates for you a Chatting Channel autmatically.(Only the Owner Can Do it Right Now.) Type !create channel **channelname**\n\u200B**serverinfo** :page_facing_up:  -- Gives you Information about the Server.\n\u200B**userinfo** :clipboard: -- Sends you details about you or any other user.\n\u200B**setgame** :video_game: -- Sets the Status of the bot to your wanted Game. '
										},
									],
									timestamp: new Date(),
									footer: {
										icon_url: bot.user.avatarURL,
										text: 'Created By: Dr.Jarvis. Expert of Cats'
									}
								}
							});
							message.author.sendMessage('', {
								embed: {
									color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
									author: {
										name: bot.user.username,
										icon_url: bot.user.avatarURL
									},
									thumbnail: {
										url: (`${bot.user.avatarURL}`)
									},
									fields: [

										{
											name: 'utilities Part 2',
											value: '**voice** :loudspeaker: -- Type !voice text and the bot will speak those words.\n\u200B**ping** :stopwatch: -- This command is to see how many Milliseconds will it takes for the bot to reply Back!\n\u200B**stats** :bar_chart:  -- It gives you the stats of the Bot.\n\u200B**eval** :currency_exchange:  --(Currently Only Owner Can Use it) It allows the bot to evaluate any math you want.\n\u200B**commands** :notebook_with_decorative_cover:  -- The bot Sends you a direct Message with the commmands List\n\u200B**announce** :mega:  --(only the owner can use it Right Now.) The Bot Repeats what you say as a announcement.\n\u200B**Moderation**\n\u200B**kick** :mans_shoe: --(Currently Fixing it) Kick Any user you want Instantly!\n\u200B**delete** :outbox_tray: --(UnderConstruction) Delete any amount of messages you want! instantly'
										},
									],
									timestamp: new Date(),
									footer: {
										icon_url: bot.user.avatarURL,
										text: 'Created By: Dr.Jarvis. Expert of Cats'
									}
								}
							});
							message.author.sendMessage('', {
								embed: {
									color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
									author: {
										name: bot.user.username,
										icon_url: bot.user.avatarURL
									},
									thumbnail: {
										url: (`${bot.user.avatarURL}`)
									},
									fields: [

										{
											name: 'Fun Commands',
											value: '**Joke** -- The Bot spreads up a joke to the people to make them Laugh :joy:\n\u200B**advice** :two_men_holding_hands:  -- The Bot Gives you a advice about Life.\n\u200B **cat** :cat: -- This Command Gives you random cat Pictures\n\u200B**8ball** :8ball: -- You can use this command to make the 8ball work! Good luck with the Answer! \n\u200B**add** :1234: -- Makes your bot add any numbers'
										},

										{
											name: 'Other Features',
											value: '**Cleverbot** :nerd: , **Insults Filter** :zipper_mouth:, **Invite Filter** :no_entry:'
										}
									],
									timestamp: new Date(),
									footer: {
										icon_url: bot.user.avatarURL,
										text: 'Created By: Dr.Jarvis. Expert of Cats'
									}
								}
							});

						} else

			if (command === 'coinflip') {
				var responses = ['Heads', 'Tails',];
				message.channel.sendMessage('**Flipping the Coin** :eyes:');
				message.channel.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
			}

	if (command === 'rolldice') {
		var responses = ['1', '2', '3', '4', '5', '6'];
		message.channel.sendMessage('**Rolling The Dice** :eyes:')
		message.channel.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
	}


	if (command === 'roles') {
		message.channel.sendMessage(`${message.guild.roles.map(r => r.name).join('\n')} `)
	}

	if (command === 'admins') {
		message.channel.sendMessage("**Checking Admins...**").then(m => {
		m.edit('', {
						embed: {
							color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
							author: {
								name: message.guild.name,
								icon_url: message.guild.iconURL
							},
							thumbnail: {
								url: (`${message.guild.iconURL}`)
							},
							fields: [
								{
									name: 'Admins',
									value: `${message.guild.roles.find('name', 'JarvisAdmin').members.map(m => m.user.username).join('\n') || "No Admin is Online Currently"}`
								}
							],
							timestamp: new Date(),
							footer: {
								icon_url: bot.user.avatarURL,
								text: 'Created By Dr.Jarvis'
							}
						}
					});	
		})
	}

	if (command === 'channels') {
		message.channel.sendMessage(`${message.guild.channels.map(g => g.name).join('\n')} `)
	}


}); // END MESSAGE HANDLER

var Cleverbot = require('cleverbot-node');
var cleverbot = new Cleverbot();
var clevact = '<@254636420377870346>';
bot.on('message', message => {
	if (message.author.bot) return;
	if (message.content === clevact) {
		message.channel.sendMessage('what do you want?')
	}
	try {
		if (message.content.startsWith(clevact)) {
			var clevmsg = message.content.substring(clevact.length + 1)
			Cleverbot.prepare(function () {
				message.channel.startTyping(clevmsg);
				cleverbot.write(clevmsg, function (response) {
					message.channel.sendMessage(response.message);
					message.channel.stopTyping(message.channel);
				});
			});
		}
	} catch (err) {
		message.channel.sendMessage('what?');
	}
})

bot.on('message', message => {
	if (message.content.startsWith(prefix + 'shutdown')) {
		message.channel.sendMessage('Going to Sleep! Bye. :wave:')
		console.log('Shutting down...')
		console.log('Shutted Down. Bye!')
		process.exit()
	}
})
var meme = require('./config/memes.json');
var Imgflipper = require("imgflipper");
var imgflipper = new Imgflipper(config.imgflip_username, config.imgflip_password);

bot.on('message', message => {
if (message.content.startsWith(prefix + 'creatememe')) {	
var quotes = message.content.split('"');
var type = quotes[0].split(" ")[1];
message.reply("**Generating the Meme...**").then(m => {
 imgflipper.generateMeme(meme[type], quotes[1] ? quotes[1] : "", quotes[3] ? quotes[3] : "", function(err, image) {
if (err)
{
m.edit(":x: Error has Occured. It was reported to the Adminstration", err)	
}else		 
m.edit(image);
 });
 });
};
});	



const badwords = ['fuck', 'gay', 'dick'];

var disabled = false;

bot.on('message', message => {
	if (message.content.startsWith(prefix + 'disablefilter')) {
		disabled = !disabled;
		filter[message.guild.id] = !filter[message.guild.id];
		message.reply(`:zipper_mouth: The swear filter is now **${disabled ? 'disabled :x:' : 'enabled :white_check_mark:'}**`);
		return;
	}

	if (!disabled) {
		badwords.forEach(word => {
			if (message.content.indexOf(word) !== -1) {
				message.delete();
				message.reply('Bad words arent accepted :no_entry:');
				return;
			}
		});
	}
});

bot.login(config.bot_token);