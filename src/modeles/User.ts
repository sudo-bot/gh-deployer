import cryptoRandomString from 'crypto-random-string';
import * as crypto from 'crypto';
import knex from '@src/knex';

export enum AccountStatus {
    confirmed = 'confirmed',
    disabled = 'disabled',
    unconfirmed = 'unconfirmed',
}

export default class User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    password_salt: string;
    status: string;
    constructor(firstName: string, lastName: string, email: string, username: string, password: string) {
        this.first_name = firstName;
        this.last_name = lastName;
        this.password_salt = cryptoRandomString({ length: 30 });
        this.password = crypto
            .createHash('sha256')
            .update(password + this.password_salt)
            .digest('hex');
        this.username = username;
        this.email = email;
        this.status = AccountStatus.unconfirmed;
    }

    private setId(id: number): void {
        this.id = id;
    }

    private setPassword(password: string): void {
        this.password = password;
    }

    private setPasswordSalt(passwordSalt: string): void {
        this.password_salt = passwordSalt;
    }

    private setAccountStatus(status: AccountStatus): void {
        this.status = status;
    }

    public async save() {
        this.id = await knex
            .knex<User>('users')
            .insert({
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                username: this.username,
                password: this.password,
                password_salt: this.password_salt,
            })
            .into('users');
    }
    public static all(): Promise<User[]> {
        return knex
            .knex<User>('users')
            .select('*')
            .then((users: any) => {
                return users.map((user: any) => {
                    var newUser = new User(user.first_name, user.last_name, user.email, user.username, user.password);
                    newUser.setId(user.id);
                    newUser.setPassword(user.password);
                    newUser.setPasswordSalt(user.password_salt);
                    newUser.setAccountStatus(user.status);
                    return newUser;
                });
            });
    }
    public static getConfirmedUsernames(): Promise<string[]> {
        return knex
            .knex<User>('users')
            .select('username')
            .from('users')
            .where('status', AccountStatus.confirmed)
            .then((users: User[]) => users.map((user) => user.username));
    }
    public async delete() {
        const id: number = this.id || -1;
        await knex.knex<User>('users').where('id', id).delete();
    }
    public getEmail(): string {
        return this.email;
    }
    public getFirstName(): string {
        return this.first_name;
    }
    public getLastName(): string {
        return this.last_name;
    }
    public getUsername(): string {
        return this.username;
    }
    public isConfirmed(): boolean {
        return this.status === AccountStatus.confirmed;
    }
    public isUnConfirmed(): boolean {
        return this.status === AccountStatus.unconfirmed;
    }
    public isDisabled(): boolean {
        return this.status === AccountStatus.disabled;
    }
}
