var weather = require('weather-js');
exports.run = function(bot, message, args) {

        if (!args[0]) message.channel.sendMessage('I can\'t search for a blank city. Try again, please.')
        else {
            message.channel.sendMessage(':arrows_counterclockwise: Loading data...').then(m => {
                weather.find({ search: args.join(' '), degreeType: 'C' }, (err, result) => {
                    if (err) {
                        m.edit(':no_entry_sign: An error has occurred! Please make sure you entered a valid location.');
                        return;
                    }
                    var data = result[0];
                    var output = `Here's the ${data.forecast.length}-day forecast for **${args.join(' ')}**:\n\n`;

                    data.forecast.map(d => {
                        return `**${d.day}:** Low of ${d.low} ºC, high of ${d.high} ºC. The weather should be ${d.skytextday.toLowerCase()}.\n`;
                    }).forEach(d => output += d);

                    m.edit(output);
                });
            });
        }
    }

exports.info = {
    name: 'climate',
    usage: 'climate <Cityname>',
    description: 'Know the weather Broadcast of any city you want.'
};             