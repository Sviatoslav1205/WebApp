module.exports = class UserDto {
  userId
  role

  constructor (user) {
    this.userId = user.user_id
    this.role = user.role
  }
}