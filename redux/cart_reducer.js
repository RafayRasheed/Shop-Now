import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const cartReducer = createSlice({
  name: "cart",
  initialState:{
    cart: [],
    amount:0
  },
  reducers: {
    addCart(state, action){
        let cart=[]
        let item=null
        state.amount=0
        state.cart.map((cartItem)=>{
          if(cartItem.id==action.payload.id){
            item=cartItem
            item.quantity+=action.payload.quantity
            item.totalPrice+=action.payload.totalPrice
          }
          else{
            cart.push(cartItem)
          }0
          state.amount+=cartItem.totalPrice
        })
        if(item){
          cart.push(item)
          state.cart=cart
        }
        else{
          state.cart.push(action.payload)
          state.amount+=action.payload.totalPrice
        }
        state.cart.reverse()
    },
    removeCart(state, action){
        state.cart=state.cart.filter(item=>item.id!==action.payload.id)
        state.amount-=action.payload.totalPrice
    },
    cartClear(state){
        state.cart=[]
        state.amount=0
    },
    updateAmount(state, action){
      state.amount+=action.payload
    }
  },
});

export const { addCart, removeCart, cartClear, updateAmount} = cartReducer.actions;
export default cartReducer.reducer;
