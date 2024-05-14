import React, {
    createContext,
    Dispatch,
    lazy,
    ReactNode,
    useContext,
    useReducer
} from 'react'

//Turn this to lazy loading
const DarkTheme = lazy(() => import('../themes/darkTheme'))
const LightTheme = lazy(() => import('../themes/lightTheme'))


type CustomThemeState = {
    isDark: boolean
}

type CustomThemeAction =
    | {
    type: 'SET_THEME',
    data: {
        isDark: boolean
    }
}


type CustomThemeProvider = {
    children: ReactNode
}

const CustomThemeContext = createContext<{
    state: CustomThemeState,
    dispatch: Dispatch<CustomThemeAction>
} | undefined>(undefined)

const customThemeProvider = (state: CustomThemeState, action: CustomThemeAction): CustomThemeState => {
    switch (action.type) {
    case 'SET_THEME':
        return {
            ...state,
            isDark: action.data.isDark
        }
    default:
        throw (new Error(`Unhandled action type: ${action}`))
    }
}

const initialState: CustomThemeState = {
    isDark: false
}

const CustomThemeProvider = ({children}: CustomThemeProvider) => {
    const [state, dispatch] = useReducer(customThemeProvider, initialState)

    return (
        <CustomThemeContext.Provider value={{
            state,
            dispatch
        }}
        >
            {state.isDark ? <DarkTheme>{children}</DarkTheme> : <LightTheme>{children}</LightTheme>}
        </CustomThemeContext.Provider>
    )
}

function useCustomTheme() {
    const context = useContext(CustomThemeContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export {
    CustomThemeProvider,
    useCustomTheme
}