const { pool } = require("../../db/db")

let supportAgents = []

const updateSupportAgentsFromDB = async () => {
  pool.query("SELECT `user_id` FROM `Users` WHERE `role` = 'support'")
    .then(([result]) => {
      supportAgents = result.map(supportAgent => {
        return {
          supportAgentId: supportAgent.user_id,
          isAvailable: false,
          userId: null,
          startMessageId: null
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
} 
updateSupportAgentsFromDB()

const getAllSupportAgents = async () => {
  return supportAgents
} 

const getAvailableSupportAgents = async () => {
  return supportAgents.filter(supportAgent => supportAgent.isAvailable === true)
}

const changeUserToSupport = async (supportAgentId, userId) => {
  let supportAgent = supportAgents.find(supportAgent => supportAgent.supportAgentId === supportAgentId)
  if (userId) {
    supportAgent.isAvailable = false
    supportAgent.userId = userId
  } else {
    supportAgent.isAvailable = true
    supportAgent.userId = null
  }
}

const getMessageType = async (msg) => {
  if (msg.photo) {
    return {
      type: 'photo',
      media: msg.photo[0].file_id,
      caption: msg.caption,
      parse_mode: msg.parse_mode,
      caption_entities: msg.caption_entities,
      has_spoiler: msg.has_spoiler
    }
  } else if (msg.video) {
    return {
      type: 'video',
      media: msg.video.file_id,
      thumbnail: msg.thumbnail,
      caption: msg.caption,
      parse_mode: msg.parse_mode,
      caption_entities: msg.caption_entities,
      width: msg.width,
      height: msg.height,
      duration: msg.duration,
      supports_streaming: msg.supports_streaming,
      has_spoiler: msg.has_spoiler
    }
  } else if (msg.animation) {
    return {
      type: 'animation',
      media: msg.animation.file_id,
      thumbnail: msg.thumbnail,
      caption: msg.caption,
      parse_mode: msg.parse_mode,
      caption_entities: msg.caption_entities,
      width: msg.width,
      height: msg.height,
      duration: msg.duration,
      has_spoiler: msg.has_spoiler
    }
  } else if (msg.audio) {
    return {
      type: 'audio',
      media: msg.audio.file_id,
      thumbnail: msg.thumbnail,
      caption: msg.caption,
      parse_mode: msg.parse_mode,
      caption_entities: msg.caption_entities,
      duration: msg.duration,
      performer: msg.performer,
      title: msg.title
    }
  } else if (msg.document) {
    return {
      type: 'document',
      media: msg.document.file_id,
      thumbnail: msg.thumbnail,
      caption: msg.caption,
      parse_mode: msg.parse_mode,
      caption_entities: msg.caption_entities,
      disable_content_type_detection: msg.disable_content_type_detection
    }
  }
}

const sendMessage = async (bot, msg, supportAgent, fromUser) => {
  let chatId = fromUser ? supportAgent.supportAgentId : supportAgent.userId
  let fromChatId = fromUser ? supportAgent.userId : supportAgent.supportAgentId
  let messageId = msg.message_id
  
  await bot.copyMessage(chatId, fromChatId, messageId)
}

const editMessage = async (bot, msg, supportAgent, fromUser) => {
  let chatId = fromUser ? supportAgent.supportAgentId : supportAgent.userId
  let messageId = msg.message_id + 1
  
  if (supportAgent.startMessageId === null || supportAgent.startMessageId > messageId) {
    return
  }

  let entities = msg.entities ? msg.entities : null
  if (msg.text) {
    await bot.editMessageText(msg.text, {
      chat_id: chatId,
      message_id: messageId,
      entities: entities
    })
  } else {
    let media = await getMessageType(msg)
    await bot.editMessageMedia(media, {
      chat_id: chatId,
      message_id: messageId,
    })
  }
  
  /* 
    текст -- перевіряти text
    картинка -- перевіряти photo
    відео -- перевіряти video
    музика -- перевіряти audio
    голосове повідомлення -- перевіряти voice
    відео повідомлення -- перевіряти video_note
    файл -- перевіряти document
    розташування -- перевіряти location
    контакт -- перевіряти contact
    стікер -- перевірити sticker
  */
  // console.log(supportAgent)
  // console.log(msg)
}

module.exports = {
  updateSupportAgentsFromDB,
  getAllSupportAgents,
  getAvailableSupportAgents,
  changeUserToSupport,
  sendMessage,
  editMessage
}