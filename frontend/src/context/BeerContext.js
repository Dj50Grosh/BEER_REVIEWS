import { createContext, useReducer } from "react";

export const BeerContext = createContext()

export const beerReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BEERS':
            return {
                beers: action.payload
            }
        case 'CREATE_BEER':
            return {
                beers: [action.payload, ...state.beers]
                }
        case 'DELETE_BEER':
            return {
                beers: state.beers.filter(beer => beer._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const BeerContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(beerReducer, {
        beers: null
    })

    return (
        <BeerContext.Provider value={{...state, dispatch}}>
            {children}
        </BeerContext.Provider>
    )
}