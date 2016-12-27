function rnd_selection(base)
{
	return String(arguments[Math.floor(Math.random()*arguments.length)]);
}

exports.run = function(bot, message, args) {

let user1 = (message.mentions.users.first() || bot.users.find('username', args.join(' ')));
let member1 = message.guild.member(user1)
		if (!user1) {
			message.channel.sendMessage(':x: That user does not exist!');
			return;
		}
		message.guild.members.get(user1.id);
		let spymsg = [
			message.channel.sendMessage('', {
				embed: {
					color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
					author: {
						name: user1.username,
						icon_url: user1.avatarURL
					},
					thumbnail: {
						url: (`${user1.avatarURL}`)
					},
					title: '*User Information*',
					fields: [
						{
							name: `${user1.username}#${user1.discriminator}`,
							value: `
**User ID** : ${user1.id}
**Nickname**  : ${user1.nickname}
**Username**  : ${user1.username}
**Joined From** : ${moment.utc(member1.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
**Discrim**  : ${user1.discriminator}
**Status** : ${user1.presence.status}
**Playing** : ${user1.presence.game ? user1.presence.game.name : 'None'}
**Account Creation Date** : ${moment(user1.createdAt).utc().format('ddd MMM DD YYYY | kk:mm:ss')} (${moment(user1.createdAt).fromNow()})
`
						}
					],
					timestamp: new Date(),
					footer: {
						icon_url: bot.user.avatarURL,
						text: 'Created By: Dr.Jarvis. Expert of Cats'
					}
				}
			})
		];
		console.log(user1.avatarURL)
		message.delete().catch(error => console.log(error.stack)).catch(error => console.log(error.stack));
	}
    
exports.info = {
    name: 'userinfo',
    usage: 'userinfo mention',
    description: 'Mention a user to know everything about him.'
};   