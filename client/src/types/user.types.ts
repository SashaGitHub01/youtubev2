export interface LoginInput {
   email: string,
   password: string
}

export interface RegisterInput {
   email: string,
   name: string,
   password: string,
   password2: string,
   location?: string
}

export interface IUser {
   _id: string,
   name: string,
   email: string,
   location?: string,
   avatar: string,
   banner?: string,
   subscribersCount: number,
   isVerified: boolean,
   createdAt: string,
   videosCount?: number,
   viewsCount?: number,
   status?: string
}

export interface IUserInput {
   location?: string,
   banner?: string,
   avatar?: string,
   name?: string
}