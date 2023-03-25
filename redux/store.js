import { configureStore } from '@reduxjs/toolkit'
import favoriteReducer from './favorite_reducer';
import themeReducer from './theme_reducer'
import cartReducer from './cart_reducer'
const store = configureStore({
  reducer:{
    theme: themeReducer,
    favorite: favoriteReducer,
    cart:cartReducer,
  }
})
export default store;