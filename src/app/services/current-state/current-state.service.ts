import { Injectable } from '@angular/core';
import { User } from '../../classes/User';

@Injectable({
  providedIn: 'root'
})
export class CurrentStateService {
  currentUser: User | null;

  constructor() {
    this.currentUser = null;
  }

  public setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  public removeCurrentUser(): void {
    this.currentUser = null;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}
