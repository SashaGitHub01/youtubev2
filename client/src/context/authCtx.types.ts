import { IUser } from "../types/user.types";

export enum ActionConsts {
   FETCH_LOGIN_PENDING = 'FETCH_LOGIN_PENDING',
   FETCH_LOGIN_ERR = 'FETCH_LOGIN_ERR',
   FETCH_LOGIN_FULFILLED = 'FETCH_LOGIN_FULLFILLED',

   FETCH_REG_PENDING = 'FETCH_REG_PENDING',
   FETCH_REG_ERR = 'FETCH_REG_ERR',
   FETCH_REG_FULFILLED = 'FETCH_REG_FULLFILLED',

   FETCH_AUTH_FULFILLED = 'FETCH_AUTH_FULLFILLED',
   FETCH_AUTH_ERR = 'FETCH_AUTH_ERR',

   LOGOUT = 'LOGOUT',
}

export interface IState {
   user: IUser | null,
   isAuthorizing: boolean,
   isFetching: boolean,
   error: string | null,
}

export type AuthCtxType = IState & ActionCreatorsI

export interface FetchLoginPending {
   type: ActionConsts.FETCH_LOGIN_PENDING
}

export interface FetchLoginErr {
   type: ActionConsts.FETCH_LOGIN_ERR,
   payload: string
}

export interface FetchLoginFullfilled {
   type: ActionConsts.FETCH_LOGIN_FULFILLED,
   payload: IUser
}

export interface FetchRegPending {
   type: ActionConsts.FETCH_REG_PENDING
}

export interface FetchRegErr {
   type: ActionConsts.FETCH_REG_ERR,
   payload: string
}

export interface FetchRegFullfilled {
   type: ActionConsts.FETCH_REG_FULFILLED,
   payload: IUser
}

export interface FetchAuthFullfilled {
   type: ActionConsts.FETCH_AUTH_FULFILLED,
   payload: IUser
}

export interface FetchAuthErr {
   type: ActionConsts.FETCH_AUTH_ERR,
}

export interface LogoutI {
   type: ActionConsts.LOGOUT,
}

export type ActionTypes = FetchLoginPending
   | FetchLoginErr
   | FetchLoginFullfilled
   | FetchRegPending
   | FetchRegErr
   | FetchRegFullfilled
   | FetchAuthFullfilled
   | FetchAuthErr
   | LogoutI

export interface ActionCreatorsI {
   fetchAuthFulfilled: (user: IUser) => void;
   fetchAuthErr: () => void;
   fetchLogout: () => void;
   fetchLoginFulfilled: (user: IUser) => void;
   fetchLoginErr: (err: string) => void;
   fetchLoginPending: () => void;
   fetchRegFulfilled: (user: IUser) => void;
   fetchRegErr: (err: string) => void;
   fetchRegPending: () => void;
}