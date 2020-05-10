export type UserId = string;

export type User = {
  id: UserId,
  username: string
}

export type Users = User[];

export type UsersState = {
  list: Users | [],
  selected: User
};

export type Bug = {
  id: string,
  title: string,
  username: string
}

export type Bugs = Bug[];

export type BugsParams = {
  page?: number,
  pageSize?: number,
  searchBy?: string,
  userId?: UserId
};

export type BugsAction = {
  type: string,
  payload: BugsState
};

export type BugsState = {
  list: Bugs,
  searchBy: string,
  page: number,
  pageSize: number,
  total: number
};

export type StoreState = {
  bugs: BugsState,
  users: UsersState
}
