function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

exports.run = function(bot, message, args) {

message.reply('', {
				embed: {
					color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
					author: {
						name: bot.user.username,
						icon_url: bot.user.avatarURL
					},
					thumbnail: {
						url: ('http://www.pauljeter.net/media/portfolio/myhumor-logo.jpg')
					},
					title: 'Joking',
					description: 'Let me give you a joke to make you laugh some :smiley:',
					fields: [
						{
							name: 'Joke :joy:',
							value: `${rnd_selection(':joy: My dog used to chase people on a bike a lot. It got so bad, finally I had to take his bike away.',
								':joy: Two Elephants meet a totally naked guy. After a while one elephant says to the other: “I really don’t get how he can feed himself with that thing!”',
								':joy: I dreamt I was forced to eat a giant marshmallow. When I woke up, my pillow was gone.',
								':joy: My wife’s cooking is so bad we usually pray after our food.', ':joy: Don\'t count on it',
								':joy: I\'d like to buy a new boomerang please.Also, can you tell me how to throw the old one away? ',
								':joy: Coco Chanel once said that you should put perfume on places where you want to be kissed by a man. But hell does that burn!',
								':joy: When my wife starts to sing I always go out and do some garden work so our neighbors can see there\'s no domestic violence going on.',
								':joy: Police officer: Can you identify yourself, sir? Driver pulls out his mirror and says: Yes, it is me.',
								':joy: It is so cold outside I saw a politician with his hands in his own pockets.',
								':joy: I can only guess people with dark-tinted car windows must pick their noses much more aggressively than the rest of us.',
								':joy: I wanted to grow my own food but I couldn’t get bacon seeds anywhere.',
								':joy: I can’t believe I forgot to go to the gym today. That’s 7 years in a row now.',
								':joy: Woke up with a dead leg this morning. I will not take out a loan with the mafia ever again.',
								':joy: A naked women robbed a bank. Nobody could remember her face.',
								':joy: How do you tell that a crab is drunk? It walks forwards',
								':joy: I am selling my talking parrot. Why? Because yesterday, the bastard tried to sell me.',
								':joy: I have no home, I have not got control, I can not see any escape. Way past the time I got a new keyboard.')} `
						}
					],
					timestamp: new Date(),
					footer: {
						text: 'Dr.Jarvis. Expert of Cats'
					}
				}
			});
		}

exports.info = {
    name: 'joke',
    usage: 'joke',
    description: 'The Bot will give you a Joke to make you laugh :joy:'
};               