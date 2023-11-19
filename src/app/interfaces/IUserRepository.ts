import { User } from '../classes/User';

export interface IUserRepository {
    getUser: (login: string, password: string) => Promise<User | undefined>;
    getUserById: (id: number) => Promise<User | undefined>;
}
