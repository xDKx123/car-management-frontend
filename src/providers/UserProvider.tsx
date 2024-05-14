import {User} from '../models/user'
import React, {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer
} from 'react'

type UserState = {
    user: User | undefined
}

type UserAction =
    | {
    type: 'SET_USER',
    data: {
        user: User
    }
}
    |
    {
        type: 'REMOVE_USER'
    }


type UserProvider = {
    children: ReactNode
}

const UserContext = createContext<{
    state: UserState,
    dispatch: Dispatch<UserAction>
} | undefined>(undefined)

const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
    case 'SET_USER':
        return {
            ...state,
            user: action.data.user
        }
    case 'REMOVE_USER':
        //remove localstorage token
        localStorage.removeItem('token')
        return {
            ...state,
            user: undefined
        }
    default:
        throw (new Error(`Unhandled action type: ${action}`))
    }
}

const initialState: UserState = {
    user: undefined
}

const UserProvider = ({children}: UserProvider) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <UserContext.Provider value={{
            state,
            dispatch
        }}
        >
            {children}
        </UserContext.Provider>
    )
}

function useUser() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export {
    UserProvider,
    useUser
}