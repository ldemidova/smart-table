class BugView {
  id: number
  title: string
  username: string

  constructor ({ id, title, username }) {
    this.id = id
    this.title = title
    this.username = username
  }

  getId () {
    return this.id
  }

  getTitle () {
    return this.title
  }
}

export default BugView
