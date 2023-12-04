import { Injectable } from '@angular/core';
import { User } from '../../classes/User';
import { IUserRepository } from '../../interfaces/IUserRepository';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService implements IUserRepository {
  users: User[] = [
    {
      id: 1,
      login: "admin",
      password: "admin"
    },
    {
      id: 2,
      login: "user",
      password: "user"
    }
  ]

  constructor() { }

  async getUser(login: string, password: string): Promise<User | undefined> {
    return this.users.find((user: User) => user.login == login && user.password == password)
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.users.find((user: User) => user.id == id)
  }
}
