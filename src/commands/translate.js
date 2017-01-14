const translate = require('google-translate-api');

function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

exports.run = function(bot, message, args) {

var quotes = message.content.split('"');
var text = quotes[1] ? quotes[1] : ""
var lang = quotes[3] ? quotes[3]: ""    

message.channel.sendMessage("**Translating your Text...**").then(m => {
translate(`${text}`, {to: `${lang}`}).then(res => {
m.edit('', {
				embed: {
					color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					thumbnail: {
						url: ('https://i.stack.imgur.com/P6kbv.png')
					},
					fields: [
						{
							name: 'Translation Results:',
							value: `
**Your Text:** ${text}
**Language Detected**: ${res.from.language.iso}
**Translation To**: ${lang}
**Translation**: ${res.text}`
						}
					],
					timestamp: new Date(),
					footer: {
						text: 'Created By Dr.Jarvis.'
					}
				}
			})
}).catch(err => {
console.error(err);
m.edit(":x: Error Has been Detected:", err);               

})
})
}
exports.info = {
    name: 'translate',
    usage: 'translate  "text" "Language',
    description: 'Posts some text to pastebin'
}   
