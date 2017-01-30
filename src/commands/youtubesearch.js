var search = require('youtube-search');
var opts = {
  maxResults: 1,
  key: 'AIzaSyCsWvBBnOQNiznYRFujzYi6yX7JysMC2x8'
};

exports.run = function(bot, message, args) {

message.channel.sendMessage("**:mag_right: Searching for the Video...**").then(m => {  
search(`${args.join(" ")}`, opts, function(err, results) {
  if(err)
  {
    return
    m.edit(`:x: Error Has occurred. Reason: **${err}**`)
    console.log(err);
  }else
 results.map(function (r) { m.edit(r.title + ': ' + r.link) })	 
});
});  
};    

exports.info = {
    name: 'youtube',
    usage: 'youtube <searchterms>',
    description: 'The Bot will search for any Youtube Video you want.'
};   
