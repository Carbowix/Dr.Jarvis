function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

exports.run = function(bot, message, args) {

message.channel.sendMessage('', {
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
						name: 'Server Information',
						value: `**Server Name**: ${message.guild.name}\n\u200B**Server ID**: ${message.guild.id}\n\u200B**Server Owner**: ${message.guild.owner}\n\u200B**Number Of Members**: ${message.guild.members.size}\n\u200B**Main Text Channel**: ${message.guild.defaultChannel}
				`
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
	};

exports.info = {
    name: 'serverinfo',
    usage: 'serverinfo',
    description: 'The Bot Gives you Information about your Server.'
};    