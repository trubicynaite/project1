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
    lastName: string,
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

export type LoginCredentials = {
    username: string,
    password: string
};

export type UsersContextTypes = {
    user: UserNoPass | null,
    login: (credentials: LoginCredentials, keepLoggedIn: boolean) => Promise<{ error?: string; success?: string }>,
    register: (data: RegisterBody) => Promise<{ error?: string; success?: string }>;
    editUser: (updates: Partial<UserNoPass> & { password?: string }) => Promise<{ error?: string; success?: string }>;
    logout: () => void;
};

export type RegisterBody = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string
};

export type ProfileEditForm = {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}