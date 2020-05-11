class BugRecord {
  id: number
  title: string
  assignee: string

  constructor ({ id, title, assignee }) {
    this.id = id
    this.title = title
    this.assignee = assignee
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

export default BugRecord
