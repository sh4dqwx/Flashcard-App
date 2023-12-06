import { Observable } from 'rxjs';
import { User } from '../classes/User';

export interface IUserRepository {
    getUser: (login: string, password: string) => Observable<User>;
    getUserById: (id: number) => Observable<User>;
}
