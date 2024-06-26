const support = require('../botServices/support.service')
const { SUPPORT_COMMANDS } = require('../commands')
const { inlineKeyboard } = require('../keyboards/support.keyboard')
const { createMainSupportEventListener, createSupportCommandsListener } = require('../eventListeners/support.eventListener')

module.exports = async (bot, msg, userId) => {
  const allSupportAgents = await support.getAllSupportAgents()

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

  createMainSupportEventListener(bot, msg, userId, userMessage, supportAgent, supportAgentMessage)
}