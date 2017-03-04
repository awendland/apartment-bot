/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node slack_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it is running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*
 * Ensure environment has been properly configured
 */
if (!process.env.token) {
  console.log('Error: Specify token in environment')
  process.exit(1)
}

/*
 * Imports
 */
const Botkit = require('botkit')
const os = require('os')
const fetch = require('node-fetch')

const controller = Botkit.slackbot({
  debug: true,
})

/*
 * Start bot
 */
var bot = controller.spawn({
  token: process.env.token
}).startRTM()

/**
 * Respond to greetings
 */
controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', (bot, message) => {
  bot.api.reactions.add({ timestamp: message.ts, channel: message.channel, name: 'robot_face' },
    (err, res) => {
      if (err) {
        bot.botkit.log('Failed to add emoji reaction :(', err)
      }
    })
  controller.storage.users.get(message.user, (err, user) => {
    if (user && user.name) {
      bot.reply(message, 'Hello ' + user.name + '!!')
    } else {
      bot.reply(message, 'Hello')
    }
  })
})

/**
 * Respond to status questions
 */
controller.hears(['status', 'uptime', 'identify yourself', 'who are you', 'what is your name'],
  'direct_message,direct_mention,mention', function(bot, message) {
    const hostname = os.hostname()
    const uptime = `${Math.round(process.uptime() / 3600 * 100) / 100} hours`

    bot.reply(message,
      ':robot_face: I am a bot named <@' + bot.identity.name +
       '>. I have been running for ' + uptime + ' on ' + hostname + '.')
  })

/**
 * Respond to status questions
 */
controller.hears(['status', 'uptime', 'identify yourself', 'who are you', 'what is your name'],
  'direct_message,direct_mention,mention', function(bot, message) {
    const hostname = os.hostname()
    const uptime = `${Math.round(process.uptime() / 3600 * 100) / 100} hours`

    bot.reply(message,
      ':robot_face: I am a bot named <@' + bot.identity.name +
       '>. I have been running for ' + uptime + ' on ' + hostname + '.')
  })
