
exports.run = function(bot, message, args) {

if (message.author.id !== '176792365527203840') {
return message.reply('Only the Owner can use this Command! :)').catch(console.error);
				}
				bot.user.setGame(args.join(' '));
				message.reply('The Game has been set');
				message.delete();
			}
exports.info = {
    name: 'setgame',
    usage: 'setgame',
    description: 'Set a game for the Bot to Play.'
};               