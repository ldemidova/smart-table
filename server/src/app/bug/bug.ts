class Bug {
  id: number
  title: string
  assignee: number
  username: string

  constructor ({ id, title, assignee, username }) {
    this.id = id
    this.title = title
    this.assignee = assignee
    this.username = username
  }

  getId () {
    return this.id
  }

  getTitle () {
    return this.title
  }

  getAssignee () {
    return this.assignee
  }
}

export default Bug
