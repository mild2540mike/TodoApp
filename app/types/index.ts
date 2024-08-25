export interface login {
  username: string
  password: string
}

export interface token {
  username: string
  access_token: string
}

export interface Todo {
  title: string
  description: string
}

export interface TodoState {
  setId: (id: string) => void;
  id: string;
}