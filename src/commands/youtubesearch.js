var search = require('youtube-search');
var opts = {
  maxResults: 1,
  key: 'AIzaSyCsWvBBnOQNiznYRFujzYi6yX7JysMC2x8'
};

exports.run = function(bot, message, args) {

search(`${args.join(" ")}`, opts, function(err, results) {
  if(err) return console.log(err);
 results.map(function (r) { message.reply(r.title + ': ' + r.link) })	 
})
};    

exports.info = {
    name: 'youtube',
    usage: 'youtube <searchterms>',
    description: 'The Bot will search for any Youtube Video you want.'
};   