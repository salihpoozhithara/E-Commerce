/* eslint-disable react/prop-types */
import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10

    const value = {
        products , currency , delivery_fee
    }

    return (
        <ShopContext.Provider value={value}>
             {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
