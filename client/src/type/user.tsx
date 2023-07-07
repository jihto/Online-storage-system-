interface AuthProps{
    email: string;
}


export interface CurrentUser {
    _id: string;
    auth: AuthProps;
    avatar: string;
    createAt: string;
    files: number;
    folders: number;
    role: string;
    updateAt: string;
    username: string;
}