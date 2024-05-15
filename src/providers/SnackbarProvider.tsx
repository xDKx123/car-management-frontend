import React, {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    useContext,
    useReducer
} from 'react'
import {
    Alert,
    AlertTitle,
    Portal,
    Snackbar,
    Tooltip
} from '@mui/material'
//import {useTranslation} from 'react-i18next'
import { Close } from '@mui/icons-material'
import { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar'

enum SnackbarClassType {
    ok = 'success',
    error = 'error',
    warning = 'warning',
    info = 'info'
}


type SnackbarType = {
    show: boolean,
    content: string
    class: SnackbarClassType | undefined,
}


type SnackbarState = {
    snackbar: SnackbarType
}

type SnackbarAction =
    | {

        type: 'SET_SNACKBAR_OK'
        data: {
            content: string
        }

    }
    | {
        type: 'SET_SNACKBAR_ERROR',
        data: {
            content: string,
        }
    }
    | {
        type: 'SET_SNACKBAR_WARNING',
        data: {
            content: string
        }
    }
    | {
        type: 'SET_SNACKBAR_INFO',
        data: {
            content: string
        }
    }

    | {
        type: 'CLOSE_SNAKBAR'
    }

type SnackbarProviderProps = {
    children: ReactNode
}

const SnackbarContext = createContext<{
    state: SnackbarState,
    dispatch: Dispatch<SnackbarAction>
} | undefined>(undefined)


const SnackbarReducer = (state: SnackbarState, action: SnackbarAction): SnackbarState => {
    switch (action.type) {
        case 'SET_SNACKBAR_OK':
            return {
                ...state,
                snackbar: {
                    show: true,
                    content: action.data.content,
                    class: SnackbarClassType.ok,
                }
            }
        case 'SET_SNACKBAR_ERROR':
            return {
                ...state,
                snackbar: {
                    show: true,
                    content: action.data.content,
                    class: SnackbarClassType.error,
                }
            }
        case 'SET_SNACKBAR_WARNING':
            return {
                ...state,
                snackbar: {
                    show: true,
                    content: action.data.content,
                    class: SnackbarClassType.warning,
                }
            }

        case 'SET_SNACKBAR_INFO':
            return {
                ...state,
                snackbar: {
                    show: true,
                    content: action.data.content,
                    class: SnackbarClassType.info,
                }
            }

        case 'CLOSE_SNAKBAR':
            return initialState


        default:
            throw new Error('Unknown action: ' + action + ' in SnackbarProvider')
    }
}

const initialState: SnackbarState = {
    snackbar: {
        show: false,
        content: '',
        class: undefined,
    }
}

/*
 * SnackbarProvider
 * @param children
 * @constructor
 * @return {JSX.Element}
 *
 * If snackbar is error, then we never auto hide it
 */
const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }: SnackbarProviderProps) => {
    const [state, dispatch] = useReducer(SnackbarReducer, initialState)
    //const {t} = useTranslation()

    const handleSnackbarClose = (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway' && state.snackbar.class === SnackbarClassType.error) {
            return
        }

        dispatchClose()
    }

    const dispatchClose = () => {
        dispatch({
            type: 'CLOSE_SNAKBAR'
        })
    }

    const getCloseAction = () => {
        return (
            <Tooltip title={'close'}>
                <Close
                    onClick={() => {
                        dispatchClose()
                    }}
                ></Close>
            </Tooltip>
        )
    }

    return (
        <SnackbarContext.Provider value={{
            state,
            dispatch
        }}
        >
            <Portal>
                <Snackbar
                    open={state.snackbar.show}
                    autoHideDuration={5000}
                    onClose={handleSnackbarClose}
                    //message={t(state.snackbar.content)}
                    action={getCloseAction()}
                >
                    <Alert severity={state.snackbar.class}>
                        <AlertTitle className={'uppercase'}>{state.snackbar.class}</AlertTitle>
                        {state.snackbar.content}
                    </Alert>
                </Snackbar>
            </Portal>
            {children}
        </SnackbarContext.Provider>
    )
}

export function useSnackbar() {
    const context = useContext(SnackbarContext)
    if (context === undefined) {
        throw new Error('useSnackbar must be used within a SnackbarProvider')
    }
    return context
}

export {
    SnackbarProvider,
    SnackbarContext
}

export type {
    SnackbarAction,
}