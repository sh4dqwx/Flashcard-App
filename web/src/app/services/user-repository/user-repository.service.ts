import { Injectable } from '@angular/core';
import { User } from '../../classes/User';
import { IUserRepository } from '../../interfaces/IUserRepository';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService implements IUserRepository {
  private apiUrl: string = "http://localhost:5000/"

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

  constructor(private http: HttpClient) { }

  getUser(login: string, password: string): Observable<User> {
    //return this.users.find((user: User) => user.login == login && user.password == password)
    return this.http.post<User>(`${this.apiUrl}/users`, { login, password });
  }

  getUserById(id: number): Observable<User> {
    //return this.users.find((user: User) => user.id == id)
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
}
