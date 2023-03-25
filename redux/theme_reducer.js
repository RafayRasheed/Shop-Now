import { createSlice } from "@reduxjs/toolkit";
import themes from "../components/theme/themes";

const getTheme = ({darkMode}) => {
    if (darkMode) {
      return themes.dark;
    }
  return themes.light;
};

const themeReducer = createSlice({
  name: "theme",
  initialState:{
    darkMode:false,
    theme: themes.light
  },

  reducers: {
    setMode(state, action){
      let s=action.payload
      state.darkMode = s
      state.theme = s?themes.dark:themes.light
    } 
  },
});
// Will handle the action type `'counter/increment'`

// Action creators are generated for each case reducer function
export const { setMode } = themeReducer.actions;
export default themeReducer.reducer;
