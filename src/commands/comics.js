function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

const xkcd = require('xkcd-imgs');

exports.run = function(bot, message, args) {

			message.channel.sendMessage(':arrows_counterclockwise: Loading comic...').then(m => {
        xkcd.img((err, res) => {
            if (err) {
                m.edit(':no_entry_sign: An error has occurred!');
                console.log(JSON.stringify(err));
                return;
            }
            m.edit("",{embed :{
						color : rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),

						thumbnail: {
						            url: ('http://pedagogblogg.stockholm.se/urflippat/wp-content/uploads/sites/60/2014/09/clipad-icon-1024.png')
						},
						title: "**Comic**",
						image: { url: res.url },
						description: `${res.title}`,
						timestamp: new Date(),
						footer: {
							text: "Created By: Dr.Jarvis"
						}
					}});
            })
        })
    }

 exports.info = {
    name: 'comic',
    usage: 'comic',
    description: 'The Bot Will give you some Comics to read :cool:'
};             