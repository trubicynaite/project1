export type HeaderProps = {
    onMenuClick: () => void
};

export type NavProps = {
    isOpen: boolean
};

export type ChildrenElementProp = { children: React.ReactElement };

export type User = {
    _id: string,
    username: string,
    email: string,
    firstName: string,
    lastname: string,
    dob: string,
    password: string,
    passwordText: string,
    createDate: string,
    publishedBooks: string[],
    likedBooks: string[],
    dislikedBooks: string[],
    reviewedBooks: string[]
};

export type UserNoPass = Omit<User, 'password' | 'passwordText'>;

export type UsersReducerActionTypes =
    { type: 'setData', data: User[] } |
    { type: 'addUser', newUser: User } |
    { type: 'editUser', updatedUser: Partial<User> & { _id: string } } |
    { type: 'logUserOut' };