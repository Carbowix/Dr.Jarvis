var request = require('request');

function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

exports.run = function(bot, message, args) {
    
message.reply(":mag_right:  Getting you a Momma Joke right now...").then(m => {
request('http://api.yomomma.info/', function(error, response, body) {
        if (!error && response.statusCode == 200) {
          var yomomma = JSON.parse(body);
          m.edit('', {
				embed: {
					color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					thumbnail: {
						url: ('http://vignette1.wikia.nocookie.net/yomomma/images/e/eb/Maxresdefault_(2).jpg/revision/latest?cb=20151207212731')
					},
					fields: [
						{
							name: 'Yomomma!!  :open_mouth: ',
							value: `${yomomma.joke}`
						}
					],
					timestamp: new Date(),
					footer: {
						text: 'Dr.Jarvis. Expert of Cats'
					}
				}
			});  
             if (error) {
         m.edit(":x: Error has Occured: ", error, ", code: ", response.statusCode);
        } 
          };
});
        })
}
 exports.info = {
    name: 'yomomma',
    usage: 'yomomma',
    description: 'The Bot will get you a yomomma Joke :D.'
};   
