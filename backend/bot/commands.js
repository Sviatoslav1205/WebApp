const USER_COMMANDS = [
  {
    command: "start",
    description: "restart bot"
  },
  {
    command: "help",
    description: "help command"
  },
  {
    command: "support",
    description: "contact with support"
  }
]

const SUPPORT_COMMANDS = [
  ...USER_COMMANDS,
  {
    command: "start_workday",
    description: "start workday"
  },
  {
    command: "end_workday",
    description: "end workday"
  }
]


// для support зробити команди початку роботи та завершення
// isAvailable буде ставати true або false

module.exports = {
  USER_COMMANDS,
  SUPPORT_COMMANDS
}