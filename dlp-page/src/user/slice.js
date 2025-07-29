import {createSlice} from '@reduxjs/toolkit';

// Initial state for the user slice
// This state will hold the current user, loading status, and any error messages
const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

// Create a slice for user-related actions and state
// This slice will handle user sign-in actions and manage the user state
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess:(state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
         signInFailure:(state, action) => {
            state.loading = false;
            state.error = action.payload
         },
         
    }
})

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;
export default userSlice.reducer;