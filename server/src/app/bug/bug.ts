class Bug {
  id: number
  title: string
  assignee: string

  constructor ({ id, title, assignee }) {
    this.id = id
    this.title = title
    this.assignee = assignee
  }

  getBugId () {
    return this.id
  }

  getBugTitle () {
    return this.title
  }

  getBugAssignee () {
    return this.assignee
  }
}

export default Bug
