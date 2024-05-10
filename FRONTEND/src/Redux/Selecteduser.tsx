import {createSlice }from "@reduxjs/toolkit";

const initialState = {
    selecteduser: null
}

 const SelecteduserSlice = createSlice({
    name: "selecteduser",
    initialState,
    reducers: {
        setselecteduser: (state, action) => {
            state.selecteduser = action.payload
        }
    }
 })


export const { setselecteduser } = SelecteduserSlice.actions

export default SelecteduserSlice.reducer