module.exports = class UserDto {
  userId
  // dateOfBirth
  role

  constructor (user) {
    this.userId = user.user_id
    // this.dateOfBirth = user.date_of_birth
    this.role = user.role
  }
}