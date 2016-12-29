

var giphy = require('giphy-api')();

exports.run = function(bot, message, args) {

message.channel.sendMessage(":mag_right: Searching for your Term..").then(m => {
giphy.random(`${args.join(" ")}`, function(err, res) {

if (err) {
console.log(err)
}else
if (res) {
m.edit(res.data.url)  
};
})
})
};
exports.info = {
    name: 'gif',
    usage: 'gif <terms>',
    description: 'Searches for a GIF'
};        