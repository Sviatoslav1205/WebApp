const support = require('../botServices/support.service')
const { SUPPORT_COMMANDS } = require('../commands')
const { inlineKeyboard } = require('../keyboards/support.keyboard')
const { mainSupportEventListener, createSupportCommandsListener } = require('../eventListeners/support.eventListener')

module.exports = async (bot, msg, userId) => {
  const allSupportAgents = await support.getAllSupportAgents()
  
  // const supportCommandsHandler = async (msg) => {
  //   let userId = msg.from.id
  //   let supportAgent = allSupportAgents.find(supportAgent => supportAgent.supportAgentId === userId)
  //   if (msg.text === '/start_workday') {
  //     supportAgent.isAvailable = true
  //     await bot.sendMessage(userId, 'Ви розпочали робочий день. Користувачі можуть з вами звʼязатися.')
  //   } else if (msg.text === '/end_workday') {
  //     supportAgent.isAvailable = false
  //     await bot.sendMessage(userId, 'Ви завершили робочий день. Користувачі більше не зможуть з вами звʼязатися.')
  //     await bot.removeListener('message', supportCommandsHandler)
  //   }
  // }

  if (allSupportAgents.find(supportAgent => supportAgent.supportAgentId === userId)) {
    await bot.sendMessage(userId, 'Ви менеджер підтримки. Для того, щоб розпочати робочий день, напишіть /start_workday')
    await bot.setMyCommands(SUPPORT_COMMANDS, {
      scope: {
        type: "chat",
        chat_id: userId
    }})
    await bot.on('message', await createSupportCommandsListener(bot))
    return
  } else if (allSupportAgents.find(supportAgent => supportAgent.userId === userId)) {
    return
  }

  let availableSupportAgents = await support.getAvailableSupportAgents()
  if (availableSupportAgents.length === 0) {
    await bot.sendMessage(userId, 'На даний момент усі менеджери техпідтримки зайняті. Спробуйте через кілька хвилин.')
    return
  }
  
  let userMessage = await bot.sendMessage(userId, 'Напишіть своє питання, оператор згодом відповість.', inlineKeyboard)

  let randomSupportAgent = Math.floor(Math.random() * (availableSupportAgents.length))
  let supportAgent = availableSupportAgents[randomSupportAgent]
  let supportAgentId = supportAgent.supportAgentId
  support.changeUserToSupport(supportAgentId, userId)

  let supportAgentMessage = await bot.sendMessage(supportAgentId, `З'єднано з користувачем ${msg.from.first_name}.`, inlineKeyboard)
  supportAgent.startMessageId = supportAgentMessage.message_id
  // console.log(userMessage)
  // console.log(userMessage.message_id)
  // console.log()
  // console.log(supportAgentMessage)
  // console.log(supportAgentMessage.message_id)

  mainSupportEventListener(bot, msg, userId, userMessage, supportAgent, supportAgentMessage)

  // let availableSupportAgents = await support.getAvailableSupportAgents()
  // // console.log(availableSupportAgents)
  // // if (availableSupportAgents.length === 0) return
  // let randomSupportAgent = Math.floor(Math.random() * (availableSupportAgents.length))
  // // console.log(randomSupport)
  // let supportAgent = availableSupportAgents[randomSupportAgent]
  // // console.log(supportUser)
  // support.changeUserToSupport(supportAgent.supportAgentId, userId)

  // let userName = msg.from.first_name
  // let album = []
  
  // const supportMessageHandler = async (msg) => {
  //   let isCommand = false
  //   let myCommands = await bot.getMyCommands()
  //   console.log(myCommands)
  //   myCommands.forEach(command => {
  //     if (`/${command.command}` === msg.text) {
  //       isCommand = true
  //       return
  //     }
  //   })
  //   if (isCommand) return

  //   if (msg.media_group_id) {
  //     album.push(msg)
  //     // return
  //   }
  //   console.log(album)
    
  //   if (msg.from.id === supportAgentId) {
  //     // console.log(await support.sendMessage(bot, msg, supportAgent, false))
  //   } else if (msg.from.id === userId) {
  //     // console.log(await support.sendMessage(bot, msg, supportAgent, true))
  //   }
  // }

  // const supportEditMessageHandler = async (msg) => {
  //   // console.log(msg)
  //   if (msg.from.id === supportAgentId) {
  //     await support.editMessage(bot, msg, supportAgent, false)
  //   } else if (msg.from.id === userId) {
  //     await support.editMessage(bot, msg, supportAgent, true)
  //   }
  // }

  // const endSupportSession = async (msg) => {
  //   if (msg.data === 'endSupportSession') {
  //     await support.changeUserToSupport(supportAgentId)
  //     if (msg.from.id === userId) {
  //       await bot.sendMessage(userId, 'Ви завершили сеанс з менеджером техпідтримки.')
  //       await bot.sendMessage(supportAgentId, `Користувач ${userName} завершив сеанс.`)
  //     } else if (msg.from.id === supportAgentId) {
  //       await bot.sendMessage(userId, 'Менеджер завершив сеанс.')
  //       await bot.sendMessage(supportAgentId, `Ви завершили сеанс техпідтримки з користувачем ${userName}.`)
  //     }

  //     await bot.editMessageReplyMarkup(resetInlineKeyboard, {
  //       chat_id: userId,
  //       message_id: userMessage.message_id
  //     })

  //     await bot.editMessageReplyMarkup(resetInlineKeyboard, {
  //       chat_id: supportAgentId,
  //       message_id: supportAgentMessage.message_id
  //     })

  //     await bot.removeListener('message', supportMessageHandler)
  //     await bot.removeListener('callback_query', endSupportSession)
  //   }
  // }

  // await bot.on('message', supportMessageHandler)
  // await bot.on('edited_message', supportEditMessageHandler)
  // await bot.on('callback_query', endSupportSession)

  // return true
}