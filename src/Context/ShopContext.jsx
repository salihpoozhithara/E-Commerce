/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import Product from './../Pages/Product';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10

    const [search,setSearch] = useState('')
    const [showSearch,setShowSearch] = useState(false)

    // for cart
    const [cartItems,setCartItems] = useState({})

    const addToCart = async (itemId,size) => {
        // for toast notification
        if (!size) {
            toast.error('Select Product Size')
            return
        }

        // copy of cartItems obj
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] +=1
                
            }else{
                cartData[itemId][size] = 1
            }
            
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

    }

    const getCartCount =() =>{
        let totalCount = 0
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }

                } catch (error) {
                    
                }
            }

        }
        return totalCount
    }

    const updateQuantity = async (itemId,size,quantity) =>{

        // copy of cartItems obj
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity

        setCartItems(cartData)

    }

    // cart total
    const getCartAmount = () =>{
        let totalAmount = 0
        for(const items in cartItems){
            let itemInfo = products.find((Product)=> Product._id === items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount
    }




    // useEffect(() =>{
    //     console.log(cartItems);
        
    // },[cartItems])

    const value = {
        products , currency , delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems, addToCart,
        getCartCount,updateQuantity,
        getCartAmount
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
