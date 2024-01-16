const getMyCommands = async (bot) => {
  let myCommands = await bot.getMyCommands()
  let message = ''
  myCommands.forEach((commandElement) => {
    message += (`/${commandElement.command} — ${commandElement.description} \n`)
  })
  return message
}

module.exports = async (bot, userId) => {
  let myCommands = await getMyCommands(bot)
  await bot.sendMessage(userId, myCommands)
}