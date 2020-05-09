class Bug {
  id: number
  title: string
  assignee: string

  constructor (id: number, title: string, assignee: string) {
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

  getBugassignee () {
    return this.assignee
  }
}

export default Bug
