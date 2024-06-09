const USER_COMMANDS = [
  {
    command: "start",
    description: "Перезапустити бота"
  },
  {
    command: "help",
    description: "Команда допомоги"
  },
  {
    command: "support",
    description: "Зʼєднатись з менеджером техпідтримки"
  },
  {
    command: "user_id",
    description: "Дізнатися власне ID користувача"
  }
]

const SUPPORT_COMMANDS = [
  ...USER_COMMANDS,
  {
    command: "start_workday",
    description: "Розпочати робочий день"
  },
  {
    command: "end_workday",
    description: "Завершити робочий день"
  }
]


// для support зробити команди початку роботи та завершення
// isAvailable буде ставати true або false

module.exports = {
  USER_COMMANDS,
  SUPPORT_COMMANDS
}