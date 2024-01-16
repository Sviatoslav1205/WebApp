const support = require('../botServices/support.service')
const { USER_COMMANDS } = require('../commands')
const { resetInlineKeyboard } = require('../keyboards/support.keyboard')

const createMainSupportEventListener = async (bot, msg, userId, userMessage, supportAgent, supportAgentMessage) => {
  let supportAgentId = supportAgent.supportAgentId
  let userName = msg.from.first_name
  
  const supportMessageListener = async (msg) => {
    let isCommand = false
    // let myCommands = await bot.getMyCommands()
    let myCommands = await bot.getMyCommands({
      scope: {
        type: "chat",
        chat_id: msg.from.id
    }})
    // console.log(myCommands)
    myCommands.forEach(command => {
      if (`/${command.command}` === msg.text) {
        isCommand = true
        return
      }
    })
    if (isCommand) return

    if (msg.from.id === supportAgentId) {
      await support.sendMessage(bot, msg, supportAgent, false)
    } else if (msg.from.id === userId) {
      await support.sendMessage(bot, msg, supportAgent, true)
    }
  }

  const supportEditMessageListener = async (msg) => {
    // console.log(msg)
    if (msg.from.id === supportAgentId) {
      await support.editMessage(bot, msg, supportAgent, false)
    } else if (msg.from.id === userId) {
      await support.editMessage(bot, msg, supportAgent, true)
    }
  }

  const endSupportSessionListener = async (msg) => {
    if (msg.data === 'endSupportSession') {
      await support.changeUserToSupport(supportAgentId)
      if (msg.from.id === userId) {
        await bot.sendMessage(userId, 'Ви завершили сеанс з менеджером техпідтримки.')
        await bot.sendMessage(supportAgentId, `Користувач ${userName} завершив сеанс.`)
      } else if (msg.from.id === supportAgentId) {
        await bot.sendMessage(userId, 'Менеджер завершив сеанс.')
        await bot.sendMessage(supportAgentId, `Ви завершили сеанс техпідтримки з користувачем ${userName}.`)
      }

      await bot.editMessageReplyMarkup(resetInlineKeyboard, {
        chat_id: userId,
        message_id: userMessage.message_id
      })

      await bot.editMessageReplyMarkup(resetInlineKeyboard, {
        chat_id: supportAgentId,
        message_id: supportAgentMessage.message_id
      })

      supportAgent.startMessageId = null

      await bot.removeListener('message', supportMessageListener)
      await bot.removeListener('callback_query', endSupportSessionListener)
    }
  }

  await bot.on('message', supportMessageListener)
  await bot.on('edited_message', supportEditMessageListener)
  await bot.on('callback_query', endSupportSessionListener)
}

const createSupportCommandsListener = async (bot) => {
  const supportCommandsListener = async (msg) => {
    const allSupportAgents = await support.getAllSupportAgents()
    let userId = msg.from.id
    let supportAgent = allSupportAgents.find(supportAgent => supportAgent.supportAgentId === userId)
    if (msg.text === '/start_workday') {
      supportAgent.isAvailable = true
      await bot.sendMessage(userId, 'Ви розпочали робочий день. Користувачі можуть з вами звʼязатися.')
    } else if (msg.text === '/end_workday') {
      supportAgent.isAvailable = false
      await bot.setMyCommands(USER_COMMANDS, {
        scope: {
          type: "chat",
          chat_id: userId
      }})
      await bot.sendMessage(userId, 'Ви завершили робочий день. Користувачі більше не зможуть з вами звʼязатися.')
      await bot.removeListener('message', supportCommandsListener)
    }
  }
  return supportCommandsListener
}

module.exports = {
  createMainSupportEventListener,
  createSupportCommandsListener
}