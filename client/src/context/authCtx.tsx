import React, { PropsWithChildren, useContext, useEffect, useReducer } from 'react'
import { createContext } from "react";
import { useQuery } from 'react-query';
import { AuthApi } from '../API/AuthApi';
import { IUser } from "../types/user.types";
import { IState, ActionConsts, ActionTypes, ActionCreatorsI, AuthCtxType } from './authCtx.types';


const initState: IState = {
   user: null,
   isAuthorizing: true,
   isFetching: false,
   error: null
}


export const AuthContext = createContext<AuthCtxType>({
   ...initState,
} as AuthCtxType)

const authReducer = (state: IState, action: ActionTypes): IState => {
   switch (action.type) {
      case ActionConsts.FETCH_AUTH_FULFILLED:
         return {
            ...state,
            user: action.payload,
            isAuthorizing: false
         }

      case ActionConsts.FETCH_AUTH_ERR:
         return {
            ...state,
            isAuthorizing: false
         }

      case ActionConsts.LOGOUT:
         return {
            ...state,
            isAuthorizing: false,
            isFetching: false,
            user: null,
            error: null
         }

      case ActionConsts.FETCH_LOGIN_FULFILLED:
         return {
            ...state,
            isFetching: false,
            user: action.payload,
            error: null
         }

      case ActionConsts.FETCH_LOGIN_ERR:
         return {
            ...state,
            isFetching: false,
            error: action.payload
         }

      case ActionConsts.FETCH_LOGIN_PENDING:
         return {
            ...state,
            isFetching: true,
         }

      case ActionConsts.FETCH_REG_FULFILLED:
         return {
            ...state,
            isFetching: false,
            user: action.payload,
            error: null
         }

      case ActionConsts.FETCH_REG_ERR:
         return {
            ...state,
            isFetching: false,
            error: action.payload
         }

      case ActionConsts.FETCH_REG_PENDING:
         return {
            ...state,
            isFetching: true,
         }

      default:
         return state
   }
}

//hook
export const useAuth = () => useContext(AuthContext)

//component
interface AuthProviderProps {
   user?: IUser
}

const AuthProvider: React.FC<PropsWithChildren<AuthProviderProps>> = ({ children, user }) => {
   const [state, dispatch] = useReducer(authReducer, initState)
   const actionCreators: ActionCreatorsI = {
      fetchAuthFulfilled: (user: IUser) => dispatch({
         type: ActionConsts.FETCH_AUTH_FULFILLED,
         payload: user
      }),

      fetchAuthErr: () => dispatch({
         type: ActionConsts.FETCH_AUTH_ERR,
      }),

      fetchLogout: () => dispatch({
         type: ActionConsts.LOGOUT
      }),

      fetchLoginFulfilled: (user: IUser) => dispatch({
         type: ActionConsts.FETCH_LOGIN_FULFILLED,
         payload: user
      }),

      fetchLoginErr: (err: string) => dispatch({
         type: ActionConsts.FETCH_LOGIN_ERR,
         payload: err
      }),

      fetchLoginPending: () => dispatch({
         type: ActionConsts.FETCH_LOGIN_PENDING,
      }),

      fetchRegFulfilled: (user: IUser) => dispatch({
         type: ActionConsts.FETCH_REG_FULFILLED,
         payload: user
      }),

      fetchRegErr: (err: string) => dispatch({
         type: ActionConsts.FETCH_REG_ERR,
         payload: err
      }),

      fetchRegPending: () => dispatch({
         type: ActionConsts.FETCH_REG_PENDING,
      }),
   }

   const { refetch } = useQuery('auth', async () => {
      return await AuthApi.auth()
   }, {
      retry: false,
      onSuccess: (data) => {
         actionCreators.fetchAuthFulfilled(data)
      },

      onError: () => {
         actionCreators.fetchAuthErr()
      }
   })

   return (
      <AuthContext.Provider value={{
         ...state,
         ...actionCreators,
         refetchUser: refetch
      }
      }>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider; 