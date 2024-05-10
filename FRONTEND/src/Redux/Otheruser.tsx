import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    otheruser : null
}

 const OtheruserSlice = createSlice({
    name: "otheruser",
    initialState,
    reducers: {
      setotheruser: (state, action) => {
            state.otheruser = action.payload
    }
}
 })

 export const {setotheruser} = OtheruserSlice.actions

 export default OtheruserSlice.reducer