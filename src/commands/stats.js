function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

const moment = require('moment');
require('moment-duration-format')
exports.run = function(bot, message) {

message.channel.sendMessage("",{embed :{
			color : rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
				author: {
					name: bot.user.username,
					icon_url: bot.user.avatarURL
				},
			thumbnail: {
				url: (`${bot.user.avatarURL}`)
			},
			title: "Stats :chart_with_upwards_trend: ",
			description: "This is the Stats coming from me :)",
			fields: [
				{
					name: "Uptime",
					value: `:chart_with_upwards_trend:  ${moment.duration(bot.uptime).format("D [days], H [hrs], m [mins], s [secs]")}`
				},

				{   name: "Number of Servers Online on",
				    value: ` :bar_chart:  ${bot.guilds.size} Servers `
				},

                {
                    name: "Number of Users Serving",
                    value: `:bar_chart:  ${bot.users.size} Users `
                },

			    {
                    name: "Memory Usage",
                    value: `:chart_with_upwards_trend:  Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
				}
			],
			timestamp: new Date(),
			footer: {
				icon_url: bot.user.avatarURL,
				text: "Created By: Dr.Jarvis. Expert of Cats"
			}
		}});
		message.delete();
};
exports.info = {
    name: 'stats',
    usage: 'stats',
    description: 'Gives out the Status of the Bot'
};        

