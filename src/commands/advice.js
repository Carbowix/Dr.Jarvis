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
					url: (`${bot.user.avatarURL}`)
				},
				title: 'Advice for you',
				description: 'I will give you a advice from my Heart :heart:',
				fields: [
					{
						name: 'Advice',
						value: `${rnd_selection(':heart:  What you\'re supposed to do when you don\'t like a thing is change it. If you can\'t change it, change the way you think about it. Don\'t complain.', ':heart:  Try to be a rainbow in someone\'s cloud.', ': heart: Never miss a good chance to shut up.', ': heart:  Here\'s some advice. Stay alive.', ':heart: Life is short. Never waste time of your Life.', ':heart:  We cannot change the cards we are dealt, just how we play the hand.', ':heart: Never ruin an apology with an excuse.', ':heart: Don\'t ever take a fence down until you know why it was put up', ':heart: Most likely', ':heart: Don’t take anything personally.', ': heart:  A wise man gets more use from his enemies than a fool from his friends', ':heart: Concentrate and ask again', ':heart: Adapt what is useful, reject what is useless, and add what is specifically your own', ':heart: Always speak politely to an enraged dragon.', ': heart: Do not complain beneath the stars about the lack of bright spots in your life.', ': heart:  Don\'t own so much clutter that you will be relieved to see your house catch fire.', ':heart: Write with the door closed, rewrite with the door open.', ':heart:  Be impeccable with your word.', ':heart:  Always do your best.')} `
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
    name: 'advice',
    usage: 'advice',
    description: 'The Bot will give you a advice from his heart :heart:'
};       