import React, {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer
} from 'react'
import {Car} from '../models/car'

type CarState = {
    cars: Car[]
}

type CarAction =
    | {
    type: 'SET_CARS',
    data: {
        cars: Car[]
    }
}
    |
    {
        type: 'REMOVE_CARS'
    }


type CarProvider = {
    children: ReactNode
}

const CarContext = createContext<{
    state: CarState,
    dispatch: Dispatch<CarAction>
} | undefined>(undefined)

const carsReducer = (state: CarState, action: CarAction): CarState => {
    switch (action.type) {
    case 'SET_CARS':
        return {
            ...state,
            cars: action.data.cars
        }
    case 'REMOVE_CARS':
        //remove localstorage token
        localStorage.removeItem('token')
        return initialState
    default:
        throw (new Error(`Unhandled action type: ${action}`))
    }
}

const initialState: CarState = {
    cars: []
}

const CarProvider = ({children}: CarProvider) => {
    const [state, dispatch] = useReducer(carsReducer, initialState)

    return (
        <CarContext.Provider value={{
            state,
            dispatch
        }}
        >
            {children}
        </CarContext.Provider>
    )
}

function useCars() {
    const context = useContext(CarContext)
    if (context === undefined) {
        throw new Error('useCar must be used within a CarProvider')
    }
    return context
}

export {
    CarProvider,
    useCars
}