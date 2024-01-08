import { BeerContext } from "../context/BeerContext";
import { useContext } from "react";

export const useBeerContext = () => {
    const context = useContext(BeerContext)
    if(!BeerContext) {
        throw Error('useBeerContext must be inside BeerContextProvider')
    }

    return context
}