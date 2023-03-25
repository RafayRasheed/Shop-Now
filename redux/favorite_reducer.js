import { createSlice } from "@reduxjs/toolkit";

// const getTheme = ({darkMode}) => {
//     if (darkMode) {
//       return themes.dark;
//     }
//   return themes.light;
// };

const favoriteReducer = createSlice({
  name: "favorite",
  initialState:{
    favorite: []
  },

  reducers: {
    addFavorite(state, action){
        state.favorite.push(action.payload)
    },
    removeFavorite(state, action){
        state.favorite=state.favorite.filter(item=>item.id!==action.payload.id)
    }
  },
});
// Will handle the action type `'counter/increment'`

// Action creators are generated for each case reducer function
export const { addFavorite, removeFavorite } = favoriteReducer.actions;
export default favoriteReducer.reducer;
