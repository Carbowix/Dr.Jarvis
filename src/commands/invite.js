function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

exports.run = function(bot, message, args) {

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
				title: '*How to Invite the Bot*',
				fields: [
					{
						name: 'Invite',
						value: '**Did you like me?**\n\u200BI could always join your servers by inviting me: https://discordapp.com/oauth2/authorize?&client_id=254636420377870346&scope=bot&permissions=14'
					}
				],
				timestamp: new Date(),
				footer: {
					icon_url: bot.user.avatarURL,
					text: 'Created By: Dr.Jarvis. Expert of Cats'
				}
			}
		});
		message.delete();
	}
exports.info = {
    name: 'invite',
    usage: 'invite',
    description: 'The Bot Gives you a Invite link to invite him to your Server!'
};        