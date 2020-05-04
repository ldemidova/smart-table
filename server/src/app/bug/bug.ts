class Bug {
  id: number
  title: string
  asignee: string

  constructor (id: number, title: string, asignee: string) {
    this.id = id
    this.title = title
    this.asignee = asignee
  }

  getBugId () {
    return this.id
  }

  getBugTitle () {
    return this.title
  }

  getBugAsignee () {
    return this.asignee
  }
}

export default Bug
