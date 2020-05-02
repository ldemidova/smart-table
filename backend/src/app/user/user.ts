class User {
  id: number
  username: string

  constructor (id: number, username: string) {
    this.id = id
    this.username = username
  }

  getUserId () {
    return this.id
  }

  getUserName () {
    return this.username
  }
}

export default User
