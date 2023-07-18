export interface JwtPayload {
    sub?: string,
    _id?:string,
    username: string,
    roles:string[],
    email: string,
}
