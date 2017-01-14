var request = require('request');
var xml2js = require('xml2js');

function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

exports.run = function(bot, message, args) {
request("http://www.fayd.org/api/fact.xml", function(error, response, body) {
        if (!error && response.statusCode == 200) {
          message.reply(":mag_right:  Getting you a fact right now...").then(m => {
          xml2js.parseString(body, function(err, result) {
            m.edit('', {
				embed: {
					color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					thumbnail: {
						url: ('https://pbs.twimg.com/profile_images/2969881129/ab1629f03d646a755830fc704f690b8b_400x400.jpeg')
					},
					fields: [
						{
							name: 'Fact :eyes:',
							value: `${result.facts.fact[0]}`
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
          });
      });
        }
})
    }
    exports.info = {
    name: 'fact',
    usage: 'fact',
    description: 'The Bot will get you a fact.'
};   