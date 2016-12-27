const Discord = require('discord.js');
const bot = new Discord.Client();
const ddiff = require('return-deep-diff');
const chalk = require('chalk');
const request = require('superagent');
const yt = require('ytdl-core');
const search = require('youtube-search');
const moment = require('moment');
const paste = bot.paste = require('better-pastebin');
const fs = require('fs');
require('moment-duration-format')

var config = bot.config = require('../config.json');
var commands = bot.commands = {};

var prefix = '!';

var web = 1
var ytPrefix = prefix + 'youtube'
var jkPrefix = prefix + 'joke'
var filter = {}
var addchannel = prefix + 'create channel';
var deletechannel = prefix + 'delete channel';
var addvoice = prefix + 'voicechannel create';
var deletevoice = prefix + 'voicechannel delete';
var searchvideo = prefix + 'youtubevideo';
var gif = prefix + 'gif';
var lmgtfyPrefix = prefix + 'lmgtfy'
var pastebinPrefix = prefix + 'paste'


function rnd_selection(base) {
    return String(arguments[Math.floor(Math.random() * arguments.length)]);
}

function loadCommands() {
    fs.readdirSync('./src/commands/').forEach(file => {
        if (file.startsWith('_') || !file.endsWith('.js')) return;
        let command = require(`./commands/${file}`);
        if (typeof command.run !== 'function' || typeof command.info !== 'object') {
            console.error(`(!) Invalid command file: ${file}`);
            return;
        }
        commands[command.info.name] = command;
    });
}

bot.on('ready', () => {
    console.log('Getting Ready To Wake Up.');
    console.log('Hold On.');
    loadCommands();
    console.log('I am Ready');
    paste.setDevKey(config.pastebin.devKey);
    paste.login(config.pastebin.username, config.pastebin.password, function(success, data) {
        if (!success) {
            console.log('Failed (' + data + ')');
            return false;
        }
    })
});

bot.on('guildMemberAdd', member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(`Welcome ${member.user} to ${guild.name}! Hope you will enjoy your stay with us :smiley:.`).catch(console.error);
});
bot.on('guildCreate', guild => {
    guild.createRole({ name: 'JarvisAdmin' })
    guild.defaultChannel.sendMessage(`Hello Guys! I was Invited to ${guild.name}. Thanks for Inviting Me :)`);
});
bot.on('guildMemberRemove', member => {
    let guild = member.guild;
    guild.defaultChannel.sendMessage(`${member.user} Just Left Us. Come back later :smiley:`).catch(console.error);
});

bot.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    let command = message.content.split(' ')[0].substr(config.prefix.length);
    let args = message.content.split(' ').splice(1);
    if (commands[command]) {
        commands[command].run(this, message, args);
    }
});

bot.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(' ')[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(' ').slice(1);

    if (command === 'announce') {
        message.channel.sendMessage('', {
            embed: {
                color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                fields: [
                    {
                        name: ':mega: **Announcement**',
                        value: `**@everyone ${args.join(' ')}**`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: 'Created By: Dr.Jarvis'
                }
            }
        });
        message.delete();
    }


    if (command === 'invite') {
        message.channel.sendMessage('', {
            embed: {
                color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                thumbnail: {
                    url: (`${bot.user.avatarURL}`)
                },
                title: '*How to Invite the Bot*',
                fields: [
                    {
                        name: 'Invite',
                        value: '**Did you like me?**\n\u200BI could always join your servers by inviting me: https://discordapp.com/oauth2/authorize?&client_id=254636420377870346&scope=bot&permissions=14'
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: 'Created By: Dr.Jarvis. Expert of Cats'
                }
            }
        });
        message.delete();
    };

    if (command === 'serverinfo') {
        message.channel.sendMessage('', {
            embed: {
                color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL
                },
                thumbnail: {
                    url: (`${message.guild.iconURL}`)
                },
                fields: [
                    {
                        name: 'Server Information',
                        value: `**Server Name**: ${message.guild.name}\n\u200B**Server ID**: ${message.guild.id}\n\u200B**Server Owner**: ${message.guild.owner}\n\u200B**Number Of Members**: ${message.guild.members.size}\n\u200B**Main Text Channel**: ${message.guild.defaultChannel}
				`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: 'Created By: Dr.Jarvis. Expert of Cats'
                }
            }
        });
        message.delete();
    };


    if (command === 'userinfo') {
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
    } else

        if (command === 'voice') {
            message.channel.sendTTSMessage(args.join(' '));
            message.delete();

        }
        else

            if (command === 'setgame') {
                if (message.author.id !== '176792365527203840') {
                    return message.reply('Only the Owner can use this Command! :)').catch(console.error);
                }
                bot.user.setGame(args.join(' '));
                message.reply('The Game has been set');
                message.delete();
            }
            else


                if (command === 'about') {
                    message.channel.sendMessage('', {
                        embed: {
                            color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                            author: {
                                name: bot.user.username,
                                icon_url: bot.user.avatarURL
                            },
                            thumbnail: {
                                url: (`${bot.user.avatarURL}`)
                            },
                            title: 'About Me',
                            description: 'Don\'t Like to Talk About my self a lot : D',
                            fields: [
                                {
                                    name: 'Info About me',
                                    value: '**Created Since**: Friday December 4, 2016\n\u200B**Creator**: Myth'
                                }
                            ],
                            timestamp: new Date(),
                            footer: {
                                icon_url: bot.user.avatarURL,
                                text: 'Dr.Jarvis. Expert of Cats'
                            }
                        }
                    });
                    message.delete();
                } else

                    if (command === 'stats') {
                        message.channel.sendMessage('', {
                            embed: {
                                color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                                author: {
                                    name: bot.user.username,
                                    icon_url: bot.user.avatarURL
                                },
                                thumbnail: {
                                    url: (`${bot.user.avatarURL}`)
                                },
                                title: 'Stats :chart_with_upwards_trend: ',
                                description: 'This is the Stats coming from me :)',
                                fields: [
                                    {
                                        name: 'Uptime',
                                        value: `:chart_with_upwards_trend:  ${moment.duration(bot.uptime).format('D [days], H [hrs], m [mins], s [secs]')}`
                                    },

                                    {
                                        name: 'Number of Servers Online on',
                                        value: ` :bar_chart:  ${bot.guilds.size} Servers `
                                    },

                                    {
                                        name: 'Number of Users Serving',
                                        value: `:bar_chart:  ${bot.users.size} Users `
                                    },

                                    {
                                        name: 'Memory Usage',
                                        value: `:chart_with_upwards_trend:  Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
                                    }
                                ],
                                timestamp: new Date(),
                                footer: {
                                    icon_url: bot.user.avatarURL,
                                    text: 'Created By: Dr.Jarvis. Expert of Cats'
                                }
                            }
                        });
                        message.delete();
                    } else



                        if (command === 'commands') {
                            message.reply('A direct message has been sent with Instructions to you! :incoming_envelope: ');
                            message.author.sendMessage('', {
                                embed: {
                                    color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                                    author: {
                                        name: bot.user.username,
                                        icon_url: bot.user.avatarURL
                                    },
                                    thumbnail: {
                                        url: (`${bot.user.avatarURL}`)
                                    },
                                    fields: [
                                        {
                                            name: 'Prefix',
                                            value: 'The Prefix is: **!commandname**'
                                        },
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: bot.user.avatarURL,
                                        text: 'Created By: Dr.Jarvis. Expert of Cats'
                                    }
                                }
                            });
                            message.author.sendMessage('', {
                                embed: {
                                    color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                                    author: {
                                        name: bot.user.username,
                                        icon_url: bot.user.avatarURL
                                    },
                                    thumbnail: {
                                        url: (`${bot.user.avatarURL}`)
                                    },
                                    fields: [

                                        {
                                            name: 'utilities Part 1',
                                            value: '**delete channel** text -- Deletes any channel you down want.(Only Owner can do it Right Now.) Type !delete channel **channelname**\n\u200B**create channel** text -- Creates for you a Chatting Channel autmatically.(Only the Owner Can Do it Right Now.) Type !create channel **channelname**\n\u200B**serverinfo** :page_facing_up:  -- Gives you Information about the Server.\n\u200B**userinfo** :clipboard: -- Sends you details about you or any other user.\n\u200B**setgame** :video_game: -- Sets the Status of the bot to your wanted Game. '
                                        },
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: bot.user.avatarURL,
                                        text: 'Created By: Dr.Jarvis. Expert of Cats'
                                    }
                                }
                            });
                            message.author.sendMessage('', {
                                embed: {
                                    color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                                    author: {
                                        name: bot.user.username,
                                        icon_url: bot.user.avatarURL
                                    },
                                    thumbnail: {
                                        url: (`${bot.user.avatarURL}`)
                                    },
                                    fields: [

                                        {
                                            name: 'utilities Part 2',
                                            value: '**voice** :loudspeaker: -- Type !voice text and the bot will speak those words.\n\u200B**ping** :stopwatch: -- This command is to see how many Milliseconds will it takes for the bot to reply Back!\n\u200B**stats** :bar_chart:  -- It gives you the stats of the Bot.\n\u200B**eval** :currency_exchange:  --(Currently Only Owner Can Use it) It allows the bot to evaluate any math you want.\n\u200B**commands** :notebook_with_decorative_cover:  -- The bot Sends you a direct Message with the commmands List\n\u200B**announce** :mega:  --(only the owner can use it Right Now.) The Bot Repeats what you say as a announcement.\n\u200B**Moderation**\n\u200B**kick** :mans_shoe: --(Currently Fixing it) Kick Any user you want Instantly!\n\u200B**delete** :outbox_tray: --(UnderConstruction) Delete any amount of messages you want! instantly'
                                        },
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: bot.user.avatarURL,
                                        text: 'Created By: Dr.Jarvis. Expert of Cats'
                                    }
                                }
                            });
                            message.author.sendMessage('', {
                                embed: {
                                    color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                                    author: {
                                        name: bot.user.username,
                                        icon_url: bot.user.avatarURL
                                    },
                                    thumbnail: {
                                        url: (`${bot.user.avatarURL}`)
                                    },
                                    fields: [

                                        {
                                            name: 'Fun Commands',
                                            value: '**Joke** -- The Bot spreads up a joke to the people to make them Laugh :joy:\n\u200B**roastme** :punch: -- The Bot Roasts you with some words.\n\u200B**advice** :two_men_holding_hands:  -- The Bot Gives you a advice about Life.\n\u200B **cat** :cat: -- This Command Gives you random cat Pictures\n\u200B**8ball** :8ball: -- You can use this command to make the 8ball work! Good luck with the Answer! \n\u200B**add** :1234: -- Makes your bot add any numbers'
                                        },

                                        {
                                            name: 'Other Features',
                                            value: '**Cleverbot** :nerd: , **Insults Filter** :zipper_mouth:, **Invite Filter** :no_entry:'
                                        }
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        icon_url: bot.user.avatarURL,
                                        text: 'Created By: Dr.Jarvis. Expert of Cats'
                                    }
                                }
                            });

                        }


    if (command === 'advice') {
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
    } else

        if (command === 'joke') {
            message.reply('', {
                embed: {
                    color: rnd_selection(3447003, 14365491, 3201849, 13818670, 13577435, 7089371, 14383916),
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    thumbnail: {
                        url: (`${bot.user.avatarURL} `)
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
                                ':joy: I have no home, I have not got control, I can not see any escape. Way past the time I got a new keyboard.')
                            } `
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: 'Dr.Jarvis. Expert of Cats'
                    }
                }
            });
        } else

            if (command === 'coinflip') {
                var responses = ['Heads', 'Tails',];
                message.channel.sendMessage('**Flipping the Coin** :eyes:');
                message.channel.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
            }

    if (command === 'rolldice') {
        var responses = ['1', '2', '3', '4', '5', '6'];
        message.channel.sendMessage('**Rolling The Dice** :eyes:')
        message.channel.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
    }

    if (command === '8ball') {
        let args = message.content.split(' ');
        if (!args[1]) message.channel.sendMessage(':8ball: :x: I Can not Reply to a Empty Question Boy! Try Again.')
        else {
            message.channel.sendMessage(rnd_selection(':8ball: It is certain', ':8ball: It is decidedly so', ':8ball: Without a doubt', ':8ball: Yes, definitely', ':8ball: Don\'t count on it', ':8ball: My reply is no', ':8ball: Outlook not so good', ':8ball: Very doubtful', ':8ball: Most likely', ':8ball: Reply hazy try again', ':8ball: Better not tell you now', ':8ball: Concentrate and ask again', ':8ball: My sources say no', ':8ball: You may rely on it', ':8ball: Cannot predict now', ':8ball: Concentrate and ask again', ':8ball: Ask again later', ':8ball: As I see it, yes'))
        }
    }

    if (command === 'roles') {
        message.channel.sendMessage(`${message.guild.roles.map(r => r.name).join('\n')} `)
    }

    if (command === 'channels') {
        message.channel.sendMessage(`${message.guild.channels.map(g => g.name).join('\n')} `)
    }

    if (command === 'kick') {

        if (message.mentions.users.size === 0) {
            return message.reply('Please mention a user to kick').catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) {
            return message.reply('That user does not seem valid');
        }
        if (!message.guild.member(bot.user).hasPermission('KICK_MEMBERS')) {
            return message.reply('I don\'t have the permissions Kick Permission to do this.').catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} was succesfully kicked.`).catch(console.error);
        }).catch(console.error)
    }

    if (command === 'eval') {
        if (message.author.id !== '176792365527203840') {
            return message.reply('Only the Owner can use this Command! :)').catch(console.error);
        }
        else {
            try {
                var code = args.join(' ');
                var evaled = eval(code);

                if (typeof evaled !== 'string')
                    evaled = require('util').inspect(evaled);

                message.channel.sendCode('xl', clean(evaled));
            } catch (err) {
                message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
        }
    }

}); // END MESSAGE HANDLER

function clean(text) {
    if (typeof (text) === 'string')
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    else
        return text;
}

var Cleverbot = require('cleverbot-node');
var cleverbot = new Cleverbot();
var clevact = '<@254636420377870346>';
bot.on('message', message => {
    if (message.author.bot) return;
    if (message.content === clevact) {
        message.channel.sendMessage('what do you want?')
    }
    try {
        if (message.content.startsWith(clevact)) {
            var clevmsg = message.content.substring(clevact.length + 1)
            Cleverbot.prepare(function() {
                message.channel.startTyping(clevmsg);
                cleverbot.write(clevmsg, function(response) {
                    message.channel.sendMessage(response.message);
                    message.channel.stopTyping(message.channel);
                });
            });
        }
    } catch (err) {
        message.channel.sendMessage('what?');
    }
})

bot.on('message', message => {
    var weather = require('weather-js');
    if (message.content.startsWith(prefix + 'climate')) {
        let args = message.content.split(' ');
        if (!args[1]) message.channel.sendMessage('I can\'t search for a blank city. Try again, please.')
        else {
            weather.find({ search: args.join(' '), degreeType: 'C' }, (err, result) => {
                if (err) console.log(err);
                else {
                    var output = `Here's the 7-day forecast for ${args.join(' ')}:\n\n`;

                    result.forecast.map(d => {
                        return `**${d.day}:** Low of ${d.low} ºC, high of ${d.high} ºC. The weather should be ${d.skytext.toLowerCase()}\n`;
                    }).forEach(d => output += d);

                    console.log(typeof result)

                    message.channel.sendMessage(output);
                };
            });
        }
    }
})

bot.on('message', message => {
    if (message.content.startsWith(prefix + 'shutdown')) {
        message.channel.sendMessage('Going to Sleep! Bye. :wave:')
        console.log('Shutting down...')
        console.log('Shutted Down. Bye!')
        process.exit()
    }
})

bot.on('message', message => {
    if (message.content.startsWith(prefix + 'cat')) {
        message.delete();
        message.channel.sendMessage(':cat:');
        request.get('http://www.random.cat/meow', (err, res) => {
            message.channel.sendMessage(res.body.file);
        });
    };
})
bot.on('message', message => {
    if (message.content.startsWith(prefix + 'dog')) {
        message.channel.sendMessage(':dog:');
        request.get('http://random.dog/woof', (err, res) => {
            message.channel.sendMessage(`http://random.dog/${res.text}`);
        });
    };
})

bot.on('message', message => {
    if (message.content.startsWith(lmgtfyPrefix)) {
        var input = message.content.toUpperCase()
        web = 0
        var imgtfy1 = input.substr(lmgtfyPrefix.length);
        var imgtfyDown = imgtfy1.toLowerCase()
        var imgtfyDownUrl = imgtfyDown.split(' ').join('+');
        var imgtfyUrl = 'http://lmgtfy.com/?q=' + imgtfyDownUrl;
        message.channel.sendMessage('Google is your Friend:  ' + imgtfyUrl);
    }
})

bot.on('message', message => {
    let args = message.content.split(' ').slice(1);
    var result = args.join(' ');
    if (message.content.startsWith(prefix + 'delete')) {
        let messagecount = parseInt(result);
        message.channel.fetchMessages({ limit: messagecount }).then(messages => message.channel.bulkDelete(messages));
    }
})

bot.on('message', message => {
    if (message.author.id !== '176792365527203840') {
        if (message.content.startsWith(addchannel)) {
            var channelName = message.content.substring(addchannel.length + 1)
            message.channel.guild.createChannel(channelName, 'text')
                .then(() => message.channel.sendMessage(`**` + channelName + `** has been created.`))
                .catch(e => message.reply(`There was an error trying to create: **${e}**`));
        }

        if (message.author.bot) return;
        if (message.content.startsWith(deletechannel)) {
            var channelName = message.content.substring(deletechannel.length + 1)
            message.guild.channels.find('name', channelName).delete()
                .then(() => message.channel.sendMessage(`**` + channelName + `** has been deleted.`))
                .catch(e => message.reply(`There was an error trying to delete: **${e}**`));
        }
    }
});

const badwords = ['fuck', 'gay', 'dick'];

var disabled = false;

bot.on('message', message => {
    if (message.content.startsWith(prefix + 'disablefilter')) {
        disabled = !disabled;
        filter[message.guild.id] = !filter[message.guild.id];
        message.reply(`:zipper_mouth: The swear filter is now **${disabled ? 'disabled :x:' : 'enabled :white_check_mark:'}**`);
        return;
    }

    if (!disabled) {
        badwords.forEach(word => {
            if (message.content.indexOf(word) !== -1) {
                message.delete();
                message.reply('Bad words arent accepted :no_entry:');
                return;
            }
        });
    }
});

bot.login(config.bot_token);