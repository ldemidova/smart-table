export type UserId = string;

export type User = {
  id: UserId,
  username: string
}

export type Users = Array<User>

export type Bug = {
  id: string,
  title: string,
  assignee: string
}

export type Bugs = Array<Bug>
