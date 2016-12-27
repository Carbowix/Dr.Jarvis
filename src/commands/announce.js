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
				fields: [
					{
						name: ':mega: **Announcement**',
						value: `**${args.join(' ')}**`
					}
				],
				timestamp: new Date(),
				footer: {
					icon_url: bot.user.avatarURL,
					text: 'Created By: Dr.Jarvis'
				}
			}
		});
		message.delete();
	}
exports.info = {
    name: 'announce',
    usage: 'announce',
    description: 'You can announce something Via the Bot.'
};    