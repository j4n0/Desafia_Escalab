interface IUser {
    email: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    uid?: string;
    phoneNumber?: string;
}

export class User implements IUser {
    email: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    uid?: string;
    phoneNumber?: string;
}