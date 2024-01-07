import { Injectable } from '@angular/core';
import { User } from '../../classes/User';
import { IUserRepository } from '../../interfaces/IUserRepository';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService implements IUserRepository {
  private apiUrl: string = `${environment.apiUrl}/users`

  constructor(private http: HttpClient) { }

  getUser(login: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, { login, password })
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }
}
