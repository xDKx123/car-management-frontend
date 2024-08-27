import {
    Alert,
    AlertTitle,
    Portal,
    Snackbar,
    Tooltip
} from '@mui/material'
import React, {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    useContext,
    useReducer
} from 'react'
//import {useTranslation} from 'react-i18next'
import { Close } from '@mui/icons-material'
import { SnackbarCloseReason } from '@mui/material/Snackbar/Snackbar'
import { ApiError } from '../api/errors'

enum SnackbarClassType {
    ok = 'success',
    error = 'error',
    warning = 'warning',
    info = 'info'
}


type SnackbarType = {
    show: boolean,
    content: string | ApiError | Error,
    class: SnackbarClassType | undefined,
}


type SnackbarState = {
    snackbar: SnackbarType
}

type SnackbarAction =
    | {

        type: 'OK'
        data: {
            content: string | ApiError | Error,
        }

    }
    | {
        type: 'ERROR',
        data: {
            content: string | ApiError | Error,
        }
    }
    | {
        type: 'WARNING',
        data: {
            content: string | ApiError | Error,
        }
    }
    | {
        type: 'INFO',
        data: {
            content: string | ApiError | Error,
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
        case 'OK':
            return {
                ...state,
                snackbar: {
                    show: true,
                    content: action.data.content,
                    class: SnackbarClassType.ok,
                }
            }
        case 'ERROR':
            return {
                ...state,
                snackbar: {
                    show: true,
                    content: action.data.content,
                    class: SnackbarClassType.error,
                }
            }
        case 'WARNING':
            return {
                ...state,
                snackbar: {
                    show: true,
                    content: action.data.content,
                    class: SnackbarClassType.warning,
                }
            }

        case 'INFO':
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

    const renderAlertMessage = () => {
        if (typeof state.snackbar.content === 'string') {
            return state.snackbar.content
        }

        if (state.snackbar.content instanceof ApiError) {
            return state.snackbar.content.getCode()
        }

        if (state.snackbar.content instanceof Error) {
            return state.snackbar.content.message
        }

        return 'unknownError'
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
                        {renderAlertMessage()}
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
    SnackbarContext, SnackbarProvider
}

export type {
    SnackbarAction
}
