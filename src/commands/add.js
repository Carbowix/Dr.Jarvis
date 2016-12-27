exports.run = function (bot, message, args) {
    let numArray = args.map(n => parseInt(n)).filter(n => n != NaN);
    let total = numArray.reduce((a, b) => a + b);

    message.channel.sendMessage(total).catch(console.error);
};

exports.info = {
    name: 'add',
    usage: 'add <number1> <number2> [number3] [...]',
    description: 'Makes your bot add any numbers'
};